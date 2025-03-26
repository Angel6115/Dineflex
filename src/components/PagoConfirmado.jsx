import React from "react";
import { motion } from "framer-motion";

export default function PagoConfirmado() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-green-100 border border-green-300 text-green-800 p-6 rounded-lg text-center"
    >
      <h2 className="text-2xl font-bold mb-2">✅ Pago Confirmado</h2>
      <p>Gracias por usar DineFlex. ¡Disfruta tu comida!</p>
    </motion.div>
  );
}
