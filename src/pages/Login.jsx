import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "../integrations/supabase";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (data.user && data.session) {
        toast.success("Logged in successfully");
        navigate("/");
      } else {
        throw new Error("Login failed. Please try again.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <form onSubmit={handleLogin} className="space-y-6 bg-gray-800 p-8 rounded-xl shadow-2xl">
            <h2 className="text-3xl font-bold text-center text-white mb-6">Login</h2>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300">
              Log In
            </Button>
            <p className="text-center text-gray-400 mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                Sign up
              </Link>
            </p>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default Login;