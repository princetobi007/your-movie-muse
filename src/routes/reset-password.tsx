import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set a new password — ReelMatch" },
      { name: "description", content: "Choose a new password for your ReelMatch account." },
      { property: "og:title", content: "Set a new password — ReelMatch" },
      { property: "og:description", content: "Choose a new password for your ReelMatch account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) { toast.error("Use at least 8 characters."); return; }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) { toast.error("This reset link has expired. Request a new one."); return; }
    toast.success("Password updated");
    navigate({ to: "/my-list" });
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="font-display text-5xl">New password</h1>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="pw" className="text-sm font-semibold">New password</label>
          <input id="pw" type="password" required autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none" />
        </div>
        <button disabled={busy} className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground disabled:opacity-50">{busy ? "Saving…" : "Save password"}</button>
      </form>
    </div>
  );
}
