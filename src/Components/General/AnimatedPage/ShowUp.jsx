
import { motion } from "framer-motion";

export default function ShowUp({ children }) {
  return (
    <motion.div
          className="bttnShadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
