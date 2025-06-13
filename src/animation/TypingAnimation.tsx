// TypingAnimation.tsx
import { useEffect, useState } from "react";

interface TypingAnimationProps {
  text: string;
  duration: number;
  onDone?: () => void;
}

const TypingAnimation = ({ text, duration, onDone }: TypingAnimationProps) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!text) {
      setDisplayed("");
      return;
    }
    let current = 0;
    const total = text.length;
    const interval = duration / (total || 1);

    setDisplayed(""); // reset before typing

    const timer = setInterval(() => {
      current++;
      setDisplayed(text.slice(0, current));
      if (current >= total) {
        clearInterval(timer);
        if (onDone) onDone();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [text, duration, onDone]);

  // Ghost text for layout stability
  return (
    <span style={{ display: "block", position: "relative", width: "100%", wordBreak: "break-all" }}>
      {/* Ghost text for layout, fully transparent but visible */}
      <span style={{ opacity: 0 }}>{text}</span>
      {/* Animated text, absolutely positioned over the ghost */}
      <span
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          color: "inherit",
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
        }}
      >
        {displayed}
      </span>
    </span>
  );
};

export default TypingAnimation;