"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Section({
  id, className, children,
}: { id: string; className?: string; children: React.ReactNode; }) {
  return (
    <section id={id} className={cn("section relative flex items-center", className)}>
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
        className="mx-auto w-full max-w-5xl"
      >
        {children}
      </motion.div>
    </section>
  );
}
