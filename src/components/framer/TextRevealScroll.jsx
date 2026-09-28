import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function TextRevealScroll({
  text = "",
  className = "",
  mode = "words",
  dimOpacity = 0.18
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.45"]
  });

  const elements = mode === "chars" ? text.split("") : text.split(" ");

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {elements.map((el, i) => {
        const start = i / elements.length;
        const end = start + 1 / elements.length;

        return (
          <WordOrChar
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            dimOpacity={dimOpacity}
          >
            {el}
            {mode === "words" ? " " : ""}
          </WordOrChar>
        );
      })}
    </span>
  );
}

function WordOrChar({ children, progress, range, dimOpacity }) {
  const opacity = useTransform(progress, range, [dimOpacity, 1]);
  const y = useTransform(progress, range, [4, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block transition-colors duration-150"
    >
      {children}
    </motion.span>
  );
}
