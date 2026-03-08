import platoIcon from "@/assets/plato-icon.png";
import { AnimatePresence, motion } from "framer-motion";
import { useChatContext } from "./ChatContext";

const ChatNavbarIcon = () => {
  const { toggleOpen } = useChatContext();

  return (
    <button
      onClick={toggleOpen}
      className="relative h-9 w-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      aria-label="Toggle chat"
    >
      <div
        className="h-8 w-8 animated-gradient-icon-bright"
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
    </button>
  );
};

export default ChatNavbarIcon;
