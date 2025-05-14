import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash screen after animation completes (3.5 seconds)
    const timer = setTimeout(() => {
      setShowSplash(false);
      // Give extra time for exit animation before notifying parent
      setTimeout(onFinish, 500);
    }, 3500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-slate-900 z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex flex-col items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 1
            }}
          >
            <motion.img
              src="/assets/mr-sindhu-logo.png"
              alt="Mr Sindhu Furniture and Electronics"
              className="w-64 h-64 object-contain mb-6"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10,
                delay: 0.3
              }}
            />
            
            <motion.div
              className="h-1 bg-primary rounded-full w-48 mt-4 overflow-hidden relative"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            
            <motion.p
              className="text-white text-lg mt-4 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              Your Home, Our Expertise
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;