/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

type ServiceCard = {
  title: string;
  subtitle: string;
  href: string;
  index: string;
  imageSrc: string;
  imageAlt: string;
};

const services: ServiceCard[] = [
  {
    index: "01",
    title: "Full Stack Web Development",
    subtitle: "Frontend + backend + database, end-to-end delivery.",
    href: "/services/full-stack",
    imageSrc: "/cards/1.png",
    imageAlt: "Full stack service preview",
  },
  {
    index: "02",
    title: "Frontend Development",
    subtitle: "Pixel-perfect UI, smooth UX, strong performance.",
    href: "/services/frontend",
    imageSrc: "/cards/2.png",
    imageAlt: "Frontend service preview",
  },
  {
    index: "03",
    title: "Backend Development",
    subtitle: "APIs, auth, scaling, clean database design.",
    href: "/services/backend",
    imageSrc: "/cards/3.png",
    imageAlt: "Backend service preview",
  },
];

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);

    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mq.matches);

    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, [query]);

  return matches;
}

function CornerLabel({ text, align }: { text: string; align: "tl" | "br" }) {
  const base =
    "absolute select-none text-xs font-bold tracking-widest text-white/70";
  if (align === "tl")
    return <div className={`${base} left-4 top-4`}>{text}</div>;
  return <div className={`${base} bottom-4 right-4 rotate-180`}>{text}</div>;
}

const HomeServices = () => {
  const constraintsRef = useRef<HTMLDivElement | null>(null);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <section className="relative w-full bg-black -mt-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-black " />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
       
        <div className="mb-10 flex flex-col gap-3">
          <p className="inline-flex w-fit items-center gap-2  bg-black text-xs font-semibold text-white h-20">
            My Services
          </p>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Pick what you need.
            <span className="block bg-linear-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              Drag the cards like playing cards.
            </span>
          </motion.h2>

          <p className="max-w-2xl text-sm text-white/70 sm:text-base">
            Each card opens a service page.
            {isDesktop
              ? " The cards stay inside this section while dragging."
              : " On mobile, cards are normal and scroll-friendly."}
          </p>
        </div>

        <div ref={constraintsRef} className="relative">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="flex items-stretch justify-center">
                <motion.div
                  drag={isDesktop}
                  dragConstraints={isDesktop ? constraintsRef : undefined}
                  dragElastic={isDesktop ? 0.22 : 0}
                  dragMomentum={false}
                  dragTransition={
                    isDesktop
                      ? { bounceStiffness: 800, bounceDamping: 22 }
                      : undefined
                  }
                  whileTap={isDesktop ? { scale: 0.98 } : undefined}
                  className={[
                    "relative w-full max-w-sm",

                    "aspect-auto sm:aspect-3/4",

                    "min-h-140 sm:min-h-0",
                    "rounded-[34px]",
                    "border border-white/12 bg-white/4",
                    "p-6 text-white",
                    "shadow-[0_18px_70px_rgba(0,0,0,0.55)]",
                    "overflow-hidden",
                    isDesktop
                      ? "cursor-grab active:cursor-grabbing"
                      : "cursor-default",
                    "transition hover:bg-white/6",

                    isDesktop
                      ? "touch-none select-none"
                      : "touch-auto select-text",
                  ].join(" ")}
                >
                  <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />
                  <div className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-emerald-300/10 blur-3xl" />

                  <CornerLabel text={s.index} align="tl" />
                  <CornerLabel text={s.index} align="br" />

                  <div className="relative flex h-full flex-col">
                    <div className="pt-10">
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/75">
                        Service
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
                      </div>

                      <h3 className="text-xl font-bold leading-snug text-white">
                        {s.title}
                      </h3>

                      <p className="mt-3 text-[13px] leading-relaxed text-white/70">
                        {s.subtitle}
                      </p>

                      <div className="mt-5">
                        <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                          <Image
                            src={s.imageSrc}
                            alt={s.imageAlt}
                            fill
                            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                            className="object-cover"
                            priority={s.index === "01"}
                          />
                        </div>

                        <p className="mt-2 text-xs text-white/55">
                          {isDesktop
                            ? "Drag me around, I will bounce back at the edges."
                            : "Tap Open to view details."}
                        </p>
                      </div>
                    </div>

                    <div className="relative mt-auto pt-6">
                      <div className="mb-4 h-px w-full bg-white/10" />

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-xs text-white/55">
                          Click to open details
                        </span>

                        <Link
                          href={s.href}
                          className={[
                            "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/85",
                            "transition hover:bg-white/10 hover:text-white active:translate-y-px",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50",
                            "w-20 justify-center sm:w-auto",
                          ].join(" ")}
                        >
                          Open
                          <span aria-hidden className="text-white/70">
                            →
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black to-transparent" />
    </section>
  );
};

export default HomeServices;
