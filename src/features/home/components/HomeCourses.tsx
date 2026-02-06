"use client";

import React from "react";
import { motion } from "motion/react";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

const baseImages = Array.from(
  { length: 16 },
  (_, i) => `/courses/a${i + 1}.png`,
);

const repeatTo = 30;

const marqueeImages = Array.from({ length: repeatTo }, (_, i) => {
  return baseImages[i % baseImages.length];
});

const HomeCourses = () => {
  return (
    <section className="relative w-full bg-black">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-black" />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3">
          <p className="inline-flex w-fit items-center gap-2  bg-black text-xs font-semibold text-white h-20">
            Course Gallery
          </p>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            A quick look at the course vibe.
            <span className="block bg-linear-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              Books, notes, and study vibes.
            </span>
          </motion.h2>

          <p className="max-w-2xl text-sm text-white/70 sm:text-base">
            Smooth 3D gallery that fits every screen.
          </p>
        </div>

        <div className="rounded-2xl border border-white/12 bg-white/4 p-3 shadow-[0_18px_70px_rgba(0,0,0,0.55)] sm:p-4">
          <ThreeDMarquee
            images={marqueeImages}
            className={[
              "w-full",
              "h-105 sm:h-130 lg:h-160",
              "rounded-2xl",
            ].join(" ")}
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black to-transparent" />
    </section>
  );
};

export default HomeCourses;
