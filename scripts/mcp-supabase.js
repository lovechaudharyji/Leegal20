import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load .env.local from project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const server = new Server(
  {
    name: "supabase-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_tables",
        description: "List all tables in the public schema",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "execute_sql",
        description: "Execute a SQL query (requires permissions)",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "The SQL query to execute",
            },
          },
          required: ["query"],
        },
      },
      {
        name: "get_schema_info",
        description: "Get detailed schema information for a table",
        inputSchema: {
          type: "object",
          properties: {
            table: {
              type: "string",
              description: "Table name",
            },
          },
          required: ["table"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    if (request.params.name === "list_tables") {
      // This is a rough way to list tables via PostgREST if we don't have direct SQL access
      // But typically we can query information_schema if allowed.
      // With simple Anon key, listing tables might be restricted.
      // Let's try querying information_schema.tables via standard RPC or select if possible.
      // Actually, standard Supabase query:
      const { data, error } = await supabase
        .from("information_schema.tables")
        .select("*")
        .eq("table_schema", "public");
      
      // If direct access to information_schema is blocked (common), we might need an RPC or just try to list known entities.
      // For now, let's try a direct query if the key allows it.
      // NOTE: Anon keys usually CANNOT query information_schema directly.
      
      if (error) {
         return {
            content: [
              {
                type: "text",
                text: `Error listing tables (likely permission issue with Anon key): ${error.message}. You may need a Service Role key or a dedicated RPC function to list tables.`,
              },
            ],
            isError: true,
          };
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    }

    if (request.params.name === "execute_sql") {
      const query = request.params.arguments?.query;
      // Supabase JS client doesn't support raw SQL execution directly on the client side easily without an RPC function `exec_sql`.
      // We will assume an RPC function named 'exec_sql' exists, OR warn the user.
      
      const { data, error } = await supabase.rpc('exec_sql', { query });
      
      if (error) {
          // If RPC fails, maybe we can't do it.
          return {
            content: [
              {
                type: "text",
                text: `Error executing SQL: ${error.message}. Ensure you have an 'exec_sql' RPC function created in Supabase or use the Service Role key with a different library.`,
              },
            ],
            isError: true,
          };
      }
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    }
    
    if (request.params.name === "get_schema_info") {
        const table = request.params.arguments?.table;
        // Mock implementation since we can't easily introspect without admin
        // But we can try to select 1 record to see structure
        const { data, error } = await supabase.from(table).select('*').limit(1);
         if (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error getting info for ${table}: ${error.message}`,
              },
            ],
            isError: true,
          };
      }
       return {
        content: [
          {
            type: "text",
            text: `Sample data for ${table}: ${JSON.stringify(data, null, 2)}`,
          },
        ],
      };
    }

    throw new Error("Tool not found");
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
