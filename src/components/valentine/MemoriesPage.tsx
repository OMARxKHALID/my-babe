import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import FloatingHearts from "./FloatingHearts";
import CameraIcon from "./icons/CameraIcon";
import FlowerIcon from "./icons/FlowerIcon";
import SparkleIcon from "./icons/SparkleIcon";
import { useSound } from "../../hooks/useSound";

interface MemoriesPageProps {
  onComplete: () => void;
}

const memories = [
  {
    id: 1,
    image: "/zainab/1.jpg",
    caption: "You in arms!",
    description:
      "Imagine, you've just come out of arms and even then, you look so stunning... goodness, babe.",
  },
  {
    id: 2,
    image: "/zainab/2.jpg",
    caption: "White dress!!",
    description:
      "I love this white dress you have - you have no idea how much I love this picture.",
  },
  {
    id: 3,
    image: "/zainab/3.jpg",
    caption: "My World",
    description:
      "You looks so innocent there looking at the mirror and you're truly beautiful from every angle.",
  },
  {
    id: 4,
    image: "/zainab/4.jpg",
    caption: "That Look...",
    description:
      "You're so pretty, especially when you look at me like that... I love you.",
  },
  {
    id: 5,
    image: "/zainab/5.jpg",
    caption: "My Babe",
    description: "Oh, look at this babe... you're so precious :(((",
  },
];

const MemoryCard = ({
  memory,
  index,
}: {
  memory: (typeof memories)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 py-24`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Image Wrap */}
      <div className="w-full md:w-3/5">
        <motion.div
          className="aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-white group relative"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={memory.image}
            alt={memory.caption}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
      </div>

      {/* Text Wrap */}
      <div className="w-full md:w-2/5 text-center md:text-left space-y-4">
        <motion.h2
          className="text-4xl md:text-5xl font-serif-italic text-primary"
          initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {memory.caption}
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-xl leading-relaxed font-light"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
        >
          "{memory.description}"
        </motion.p>
      </div>
    </motion.div>
  );
};

const MemoriesPage = ({ onComplete }: MemoriesPageProps) => {
  const { playSound } = useSound();

  return (
    <div className="min-h-screen gradient-romantic relative overflow-x-hidden">
      <FloatingHearts count={15} />

      {/* Header */}
      <motion.div
        className="max-w-4xl mx-auto text-center pt-32 pb-16 px-6 space-y-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-heavy text-primary tracking-tight">
            my valentine,
          </h1>
          <div className="h-1 w-24 bg-primary/20 mx-auto rounded-full" />
        </div>

        <p className="text-xl md:text-2xl text-muted-foreground font-serif-italic leading-relaxed px-4">
          "You look beautiful even when you're tired, and usually when we are on
          Video call, I keep on complimenting you because you're pretty as
          hell... <br />
          I always take pictures of you, even the candid ones, and looking back
          at them, you look so good babe :( <br />
          For now, here are some of my favorite photos!"
        </p>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="pt-12 text-primary/30"
        >
          <p className="text-sm font-bold uppercase tracking-[0.3em] mb-2">
            Relive our moments
          </p>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="mx-auto"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Memories Container */}
      <div className="container max-w-6xl mx-auto px-6 pb-40">
        {memories.map((memory, index) => (
          <MemoryCard key={memory.id} memory={memory} index={index} />
        ))}
      </div>

      {/* Bottom Action */}
      <motion.div
        className="text-center py-32 bg-white/30 backdrop-blur-sm border-t border-white/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="space-y-6 max-w-2xl mx-auto px-6">
          <p className="text-2xl md:text-3xl text-foreground font-serif-italic">
            Every moment with you is a gift...
          </p>
          <p className="text-muted-foreground mb-10">
            But I have something even more special for you.
          </p>
          <motion.button
            className="btn-romantic flex items-center gap-3 mx-auto px-10 py-5 text-xl shadow-romantic-lg"
            onClick={() => {
              playSound("buttonClick");
              playSound("sparkle");
              onComplete();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Continue to my flowers</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default MemoriesPage;
