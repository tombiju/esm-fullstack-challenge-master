import { useLogin } from "react-admin";
import { useState } from "react";

const CustomLoginPage = () => {
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !phone) {
      alert("Please enter your email or phone number.");
      return;
    }
    login({ email: email || undefined, phone: phone || undefined });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Passwordless Login</h2>
      <p>Enter your email or phone number:</p>
      
      <input
        type="email"
        placeholder="Email (optional)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />

      <input
        type="tel"
        placeholder="Phone (optional, e.g. +15551234567)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />

      <button type="submit" style={{ width: '100%' }}>
        Send Magic Link / OTP
      </button>
    </form>
  );
};

export default CustomLoginPage;
