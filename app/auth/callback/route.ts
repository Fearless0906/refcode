import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const url = new URL(next, origin);
      return NextResponse.redirect(url);
    }
  }

  // Check if user is already authenticated (for password-based login)
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // User is already authenticated, redirect to dashboard
    const url = new URL("/dashboard", origin);
    return NextResponse.redirect(url);
  }

  // If no code and no user, this might be a direct access to /auth/callback
  // Redirect to login with an error message
  const url = new URL("/login?error=Invalid authentication attempt", origin);
  return NextResponse.redirect(url);
}
