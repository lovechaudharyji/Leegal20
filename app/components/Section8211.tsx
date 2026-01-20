import type { ReactNode } from "react";

type Section8211Props = {
  className?: string;
  children?: ReactNode;
};

/**
 * Figma node: 10-8211
 * Heading: "Explore more features in Leegal Nation"
 */
export function Section8211({ className, children }: Section8211Props) {
  return (
    <section className={["w-full", className ?? ""].join(" ")}>
      <div className="mx-auto w-full max-w-[1600px] px-6">
        <h2
          className="text-center text-[36px] font-semibold leading-[140%] text-[#000000]"
          style={{
            fontFamily:
              '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
          }}
        >
          Explore more features in{" "}
          <span className="text-[#3960F9]">Leegal Nation</span>
        </h2>

        <p
          className="mx-auto mt-4 w-full max-w-[596.875px] text-center text-[18px] font-medium text-[#555555]"
          style={{
            fontFamily:
              '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
            lineHeight: "normal",
          }}
        >
          Unlock powerful features in Leegal Nation to
          enhance your productivity
          <br />
          creativity, all with secure and seamless
          performance
        </p>

        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}


