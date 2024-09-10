import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "../integrations/supabase";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Terminal, Lock, Unlock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const randomChar = String.fromCharCode(33 + Math.floor(Math.random() * 94));
      document.getElementById("random-chars").textContent += randomChar;
      if (document.getElementById("random-chars").textContent.length > 50) {
        document.getElementById("random-chars").textContent = document.getElementById("random-chars").textContent.slice(-50);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsDecrypting(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (data.user && data.session) {
        toast.success("Access granted. Welcome, hacker.");
        navigate("/");
      } else {
        throw new Error("Login failed. Security breach detected.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDecrypting(false);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-black text-blue-400 overflow-hidden font-mono">
      <Navbar />

      <div className="absolute inset-0 z-0 opacity-20">
        <pre className="text-xs leading-3" id="random-chars"></pre>
      </div>

      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <form onSubmit={handleLogin} className="space-y-6 bg-black bg-opacity-70 p-8 rounded-xl shadow-2xl border border-blue-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-500 opacity-5 animate-pulse"></div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center justify-center mb-6"
            >
              <Terminal className="w-12 h-12 text-blue-500 mr-2" />
              <h2 className="text-3xl font-bold text-blue-500">Secure Login</h2>
            </motion.div>
            <div className="space-y-2 relative">
              <Label htmlFor="email" className="text-blue-400">Identifier</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-black border-blue-500 text-blue-400 focus:ring-blue-500 focus:border-blue-500"
              />
              <motion.div
                className="absolute right-2 top-8 text-blue-500"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Lock className="w-4 h-4" />
              </motion.div>
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="password" className="text-blue-400">Access Code</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-black border-blue-500 text-blue-400 focus:ring-blue-500 focus:border-blue-500"
              />
              <motion.div
                className="absolute right-2 top-8 text-blue-500"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              >
                <Unlock className="w-4 h-4" />
              </motion.div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                type="submit" 
                className="w-full bg-blue-500 hover:bg-blue-600 text-black transition-colors duration-300 relative overflow-hidden group"
                disabled={isDecrypting}
              >
                {isDecrypting ? (
                  <span className="flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <Terminal className="w-4 h-4" />
                    </motion.div>
                    Decrypting...
                  </span>
                ) : (
                  <span>Initialize Access</span>
                )}
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
              </Button>
            </motion.div>
            <p className="text-center text-blue-300 mt-4">
              Need clearance?{" "}
              <Link to="/signup" className="text-blue-200 hover:text-blue-100 transition-colors duration-300">
                Request Access
              </Link>
            </p>
          </form>
        </motion.div>
      </main>

      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:block w-1 h-1 bg-blue-500 rounded-full opacity-70"
          style={{
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

export default Login;