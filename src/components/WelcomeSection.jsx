import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Terminal, Lock, Unlock, Zap } from "lucide-react";

const WelcomeSection = () => {
  const [randomChars, setRandomChars] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const newChar = String.fromCharCode(33 + Math.floor(Math.random() * 94));
      setRandomChars(prev => (prev + newChar).slice(-100));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-blue-400 overflow-hidden font-mono">
      <div className="absolute inset-0 z-0 opacity-20">
        <pre className="text-xs leading-3">{randomChars}</pre>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 p-8 bg-black bg-opacity-70 rounded-xl border border-blue-500 shadow-2xl max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4"
        >
          <Terminal className="w-12 h-12 text-blue-500" />
          <h2 className="text-4xl font-bold text-blue-500">Lovable Benchmarks</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl text-center text-blue-300 max-w-xl"
        >
          Welcome to the future of automated benchmarking for GPT Engineer. Unlock the full potential of AI-driven engineering solutions.
        </motion.p>

        <div className="flex space-x-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link to="/login" className="flex items-center">
                <Lock className="mr-2 h-4 w-4" />
                Access Terminal
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild variant="outline" size="lg" className="border-blue-500 text-blue-500 hover:bg-blue-900">
              <Link to="/signup" className="flex items-center">
                <Unlock className="mr-2 h-4 w-4" />
                Request Clearance
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button asChild variant="link" className="text-blue-400 hover:text-blue-300">
            <Link to="/about" className="flex items-center">
              <Zap className="mr-2 h-4 w-4" />
              Decrypt Intel
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomeSection;