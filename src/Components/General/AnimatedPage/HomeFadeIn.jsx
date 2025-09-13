
import { motion } from "framer-motion";

export default function HomeFadeIn({ children }) {
  return (
    <motion.div
        className="page-wrapper"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
