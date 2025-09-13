
import React from "react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  return (
<motion.div
  className="page-wrapper"
  animate={{ height: "90vh" }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
>
  <p>This is the InformationPage page.</p>
</motion.div>


  );
}
