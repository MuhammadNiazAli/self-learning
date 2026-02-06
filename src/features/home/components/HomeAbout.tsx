"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const HomeAbout = () => {
  const cards = [
    {
      k: "01",
      title: "A roadmap that stays in order",
      desc: "You learn fundamentals first, then real patterns. No random jumps, no missing steps, no confusion.",
    },
    {
      k: "02",
      title: "Project-first learning",
      desc: "Every section ends with a small build. You practice immediately, so the concepts stick in your mind.",
    },
    {
      k: "03",
      title: "Only what helps in real work",
      desc: "We cut the fluff and keep the skills you will use. You learn what teams expect in real projects.",
    },
  ];

  const list = [
    "Clear tracks: Frontend, Backend, and Full-Stack.",
    "Short lessons with examples you can copy and test.",
    "Mini projects, checklists, and practice tasks per topic.",
    "Notes and cheat sheets for fast revision before interviews.",
  ];

  return (
    <section className="relative w-full">
      <LampContainer className="rounded-none">
        {/* Content */}
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Left */}
            <div className="lg:col-span-6">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
                Built for self-taught developers
              </p>

              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mt-6 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
              >
                Stop guessing what to learn next.
                <span className="block bg-linear-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                  Follow one path, from zero to ship-ready.
                </span>
              </motion.h2>

              <p className="mt-4 max-w-2xl text-pretty text-sm text-white/70 sm:text-base">
                The internet has unlimited tutorials, but the order is often wrong.
                You finish one video and still feel stuck on the next step.
              </p>

              <p className="mt-3 max-w-2xl text-pretty text-sm text-white/70 sm:text-base">
                This site fixes that problem.
                Each topic connects to the next one, so your learning feels like progress, not noise.
              </p>

              <p className="mt-3 max-w-2xl text-pretty text-sm text-white/70 sm:text-base">
                You will build small projects while learning.
                That practice becomes your portfolio pieces, not just theory in your head.
              </p>

              <ul className="mt-6 grid gap-2 text-sm text-white/75 sm:grid-cols-2">
                {list.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3"
                  >
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300/85" />
                    <span className="leading-snug">{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/courses"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-linear-to-r from-cyan-300 to-emerald-300 px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110 active:translate-y-px sm:w-auto"
                >
                  Start the Roadmap
                </Link>

                <Link
                  href="/about"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 active:translate-y-px sm:w-auto"
                >
                  How it Works
                </Link>
              </div>

              <p className="mt-4 text-xs text-white/55">
                One curriculum, clear steps, and practice after every section.
              </p>
            </div>

            {/* Right */}
            <div className="lg:col-span-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {cards.map((c, idx) => (
                  <motion.div
                    key={c.k}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.35, delay: idx * 0.06 }}
                    whileHover={{ y: -2 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_16px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white/70">
                        {c.k}
                      </span>
                      <span className="h-8 w-8 rounded-xl bg-linear-to-br from-cyan-300/25 to-emerald-300/25 ring-1 ring-white/10" />
                    </div>

                    <h3 className="mt-4 text-base font-semibold text-white">
                      {c.title}
                    </h3>

                    <p className="mt-2 text-sm text-white/70">{c.desc}</p>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.35, delay: 0.22 }}
                  className="rounded-2xl border border-white/10 bg-linear-to-br from-white/6 to-white/2 p-5 shadow-[0_16px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:col-span-2"
                >
                  <h3 className="text-base font-semibold text-white">
                    Learn, build, and show your work
                  </h3>

                  <p className="mt-2 text-sm text-white/70">
                    You do not need long projects to improve.
                    Small builds done consistently beat big plans that never ship.
                  </p>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/85" />
                      <span>Each step has a goal and a clear next move.</span>
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10 active:translate-y-px"
                    >
                      Ask a Question
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

     
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black to-transparent" />
      </LampContainer>
    </section>
  );
};

export default HomeAbout;

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative z-0 flex w-full flex-col items-center justify-center overflow-hidden bg-blackmt-10 mt-10 lg:mt-0",
        className
      )}
    >
      <div className="relative isolate z-0 mt-35.5 -mb-50 flex w-full flex-1 scale-y-125 items-center justify-center">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto right-1/2 h-56 w-120 overflow-visible text-white [--conic-position:from_70deg_at_center_top] bg-[conic-gradient(var(--conic-position),var(--tw-gradient-stops))] from-cyan-500 via-transparent to-transparent"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-black mask-[linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-black mask-[linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto left-1/2 h-56 w-120 text-white [--conic-position:from_290deg_at_center_top] bg-[conic-gradient(var(--conic-position),var(--tw-gradient-stops))] from-transparent via-transparent to-cyan-500"
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-black mask-[linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-black mask-[linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-black blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />

        <div className="absolute inset-auto z-50 h-36 w-md -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl" />

        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-24 rounded-full bg-cyan-400 blur-2xl"
        />

        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-0.5 w-120 -translate-y-28 bg-cyan-400"
        />

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-50 bg-black" />
      </div>

      <div className="relative z-50 w-full">{children}</div>
    </div>
  );
};
