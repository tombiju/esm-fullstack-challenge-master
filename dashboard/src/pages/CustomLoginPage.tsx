import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const EmailLoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending magic link...");

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      console.error(error);
      setStatus("Error sending magic link.");
    } else {
      setStatus("Check your email for the magic link!");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", textAlign: "center" }}>
      <h2>Sign in via Email</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          required
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Send Magic Link
        </button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default EmailLoginPage;
