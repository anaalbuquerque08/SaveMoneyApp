import { motion } from "framer-motion";

export default function HomeFadeIn({ children }) {
  return (
    <motion.div
      className="page-wrapper"
      style={{ height: "78vh", transformOrigin: "bottom" }}  
      initial={{ opacity: 0, y: 50, scaleY: 0 }}
      animate={{ opacity: 1, y: 0, scaleY: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],  
      }}
    >
      {children}
    </motion.div>
  );
}
