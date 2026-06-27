"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/animations";

type RevealVariant = "fadeUp" | "fadeIn" | "stagger";

type RevealOnScrollProps = {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  threshold?: number;
  className?: string;
};

export default function RevealOnScroll({
  children,
  variant = "fadeUp",
  delay = 0,
  threshold = 0.12,
  className,
}: RevealOnScrollProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants =
    variant === "fadeIn"
      ? fadeIn
      : variant === "stagger"
        ? staggerContainer
        : fadeInUp;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={variants}
      transition={variant === "fadeUp" ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
