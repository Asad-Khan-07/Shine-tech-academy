import { useState } from "react";
import { supabase } from "../lib/supabase";

export function CreateAdminUser() {
  const [email, setEmail] = useState("admin@shinetechacademy.com");
  const [password, setPassword] = useState("Admin@123");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const createUser = async () => {
    setLoading(true);
    setMessage("");
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { role: "admin" } },
      });
      if (error) {
        if (error.message.includes("already registered")) {
          setMessage("⚠️ User already exists. Try logging in.");
        } else {
          setMessage("❌ " + error.message);
        }
      } else {
        setMessage("✅ Admin user created! Try logging in.");
        console.log("User created:", data);
      }
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-xl font-bold text-slate-800">Create Admin User</h2>
        <div className="mt-4 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
            placeholder="Password"
          />
          <button
            onClick={createUser}
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create User"}
          </button>
          {message && (
            <div
              className={`p-3 rounded-xl text-sm ${message.includes("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
            >
              {message}
            </div>
          )}
          <a
            href="/#/admin/login"
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
