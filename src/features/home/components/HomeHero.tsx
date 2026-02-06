"use client";

import React from "react";
import Link from "next/link";
import { WavyBackground } from "@/components/ui/wavy-background"; 

const HomeHero = () => {
  return (
    <section className="relative w-full overflow-hidden">
     
      <div className="relative min-h-[85vh] md:min-h-[92vh]">
       
        <WavyBackground
          containerClassName="absolute inset-0 h-full w-full"
          className="h-full w-full"
          backgroundFill="#000000"
          blur={12}
          speed="fast"
          waveOpacity={0.55}
          waveWidth={55}
          colors={["#22d3ee", "#34d399", "#a78bfa", "#f472b6", "#38bdf8"]}
        />

       
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
              Learn • Build • Ship
            </p>

            <h1 className="mt-6 text-balance text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Learn Web Development
              <span className="block bg-linear-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                Step by Step
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm text-white/70 sm:text-base">
              Follow a clear roadmap and practice with real projects.
              Build frontend and backend skills using tools used in real jobs.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="inline-flex w-full items-center justify-center rounded-xl bg-linear-to-r from-cyan-300 to-emerald-300 px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110 active:translate-y-px sm:w-auto"
              >
                Explore Courses
              </Link>

              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 active:translate-y-px sm:w-auto"
              >
                Contact Us
              </Link>
            </div>
          </div>

        
          <div className="mt-10 flex items-center gap-2 text-xs text-white/55">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
            <span>Scroll to see more</span>
          </div>
        </div>

        
        <div className="pointer-events-none absolute inset-0 z-5 bg-linear-to-b from-black/35 via-black/15 to-black/55" />
      </div>
    </section>
  );
};

export default HomeHero;
