"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function TestLoginPage() {
  const [email, setEmail] = useState("mentor@test.com");
  const [password, setPassword] = useState("test123");
  const { login, user, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    const success = await login(email, password);
    
    if (success) {
      setTimeout(() => {
        router.push("/admin");
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-8">
      <div className="max-w-md w-full space-y-4">
        <h1 className="text-2xl font-bold">Test Login</h1>
        
        <div>
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 rounded"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Test Login
        </button>

        <div className="mt-4 p-4 bg-gray-800 rounded">
          <h2 className="font-bold mb-2">Current State:</h2>
          <p>Authenticated: {isAuthenticated ? "Yes" : "No"}</p>
          <p>User: {user ? JSON.stringify(user, null, 2) : "None"}</p>
        </div>
      </div>
    </div>
  );
}
