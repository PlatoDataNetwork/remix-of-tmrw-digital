import { useState } from "react";
import { motion } from "framer-motion";

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
}

const AnimatedImage = ({ src, alt, className = "" }: AnimatedImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={loaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-full h-full object-cover ${!loaded ? "opacity-0" : ""}`}
      />
    </div>
  );
};

export default AnimatedImage;
