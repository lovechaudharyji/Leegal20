"use client";

import { useState } from "react";
import { signInWithGoogle } from "@/lib/localAuth";
import { Button } from "@/components/ui/button";

type GoogleSignInButtonProps = {
  nextUrl?: string;
  className?: string;
};

export function GoogleSignInButton({ nextUrl = "/dashboard", className }: GoogleSignInButtonProps) {
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setError(null);
    const res = await signInWithGoogle(nextUrl);
    if (!res.ok) {
      setError(res.error || "Failed to start Google sign in");
    }
  }

  return (
    <div className={className}>
      {error && <div className="mb-2 text-sm text-red-500">{error}</div>}
      <Button
        type="button"
        variant="outline"
        className="w-full rounded-xl border-black/10 bg-white/50 py-6 text-[15px] font-semibold text-[#141B34] hover:bg-white/80"
        onClick={onClick}
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          className="mr-2 size-5"
        />
        Continue with Google
      </Button>
    </div>
  );
}
