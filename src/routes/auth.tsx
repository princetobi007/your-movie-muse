import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — ReelMatch" },
      { name: "description", content: "Sign in or create a free ReelMatch account to sync your watchlist and favorites." },
      { property: "og:title", content: "Sign in — ReelMatch" },
      { property: "og:description", content: "Sign in or create a free ReelMatch account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

const input = "mt-1 w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none";

function AuthPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up" | "forgot">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => { if (user) navigate({ to: "/my-list", replace: true }); }, [user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setNotice(null);
    try {
      if (mode === "in") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else if (mode === "up") {
        if (password.length < 8) throw new Error("Use at least 8 characters for your password.");
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } });
        if (error) throw error;
        setNotice("Check your email and click the confirmation link to finish signing up.");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
        if (error) throw error;
        setNotice("If that email has an account, a reset link is on its way.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (r.error) toast.error("Google sign-in didn't work. Please try again.");
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="font-display text-5xl">{mode === "up" ? "Create account" : mode === "forgot" ? "Reset password" : "Welcome back"}</h1>
      <p className="mt-2 text-sm text-muted-foreground">Save your watchlist and favorites on every device.</p>
      {mode !== "forgot" && (
        <>
          <button onClick={google} className="mt-8 w-full rounded-full border border-border bg-card py-3 text-sm font-semibold hover:border-primary">Continue with Google</button>
          <p className="my-5 text-center text-xs uppercase tracking-widest text-muted-foreground">or</p>
        </>
      )}
      {notice ? (
        <p className="mt-6 rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm" role="status">{notice}</p>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div><label htmlFor="email" className="text-sm font-semibold">Email</label><input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={input} autoComplete="email" /></div>
          {mode !== "forgot" && (
            <div><label htmlFor="password" className="text-sm font-semibold">Password</label><input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={input} autoComplete={mode === "up" ? "new-password" : "current-password"} /></div>
          )}
          <button disabled={busy} className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground hover:brightness-110 disabled:opacity-50">
            {busy ? "Please wait…" : mode === "in" ? "Sign in" : mode === "up" ? "Create account" : "Send reset link"}
          </button>
        </form>
      )}
      <div className="mt-6 flex flex-col gap-2 text-center text-sm text-muted-foreground">
        {mode === "in" && <button onClick={() => setMode("forgot")} className="hover:text-foreground">Forgot password?</button>}
        <button onClick={() => { setMode(mode === "in" ? "up" : "in"); setNotice(null); }} className="hover:text-foreground">
          {mode === "in" ? "New here? Create an account" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
