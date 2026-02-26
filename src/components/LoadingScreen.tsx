import { motion } from "framer-motion";
import platoIcon from "@/assets/plato-icon.png";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[hsl(220,20%,4%)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        <motion.div
          className="h-14 w-14 animated-gradient-icon-bright"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            WebkitMaskImage: `url(${platoIcon})`,
            maskImage: `url(${platoIcon})`,
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
        <motion.div
          className="h-0.5 w-24 rounded-full overflow-hidden bg-white/10"
        >
          <motion.div
            className="h-full animated-gradient-icon-bright"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
