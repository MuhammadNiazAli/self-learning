import React from "react";
import Image from "next/image";

const HomeAuthor = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-black blur-3xl" />
        <div className="absolute -bottom-48 -right-30 h-130 w-130 rounded-full bg-black blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] bg-size-[22px_22px] opacity-40" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-[#01080A] to-transparent blur-sm" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black">
              <div className="relative aspect-4/5 w-full sm:aspect-16/10 lg:aspect-4/5">
                <Image
                  src="/logo/me.png"
                  alt="Author portrait"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Overlay caption */}
              <div className="absolute inset-x-0 bottom-0 bg-black to-transparent p-5">
                <p className="text-sm font-medium text-white/90">
                  Building in public, one feature at a time.
                </p>
                <p className="mt-1 text-xs text-white/70">
                  Notes, roadmaps, and projects that actually ship.
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full">
            <p className="inline-flex items-center rounded-full border border-white/10 bg-black px-3 py-1 text-sm text-white/80">
              About the Creator
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              I built this site to learn web development—and make the journey
              easier for you.
            </h2>

            <p className="mt-4 text-base leading-7 text-white/75 sm:text-lg">
              My goal is simple: explain web development in plain English with a
              clear, step-by-step path you can follow.
            </p>

            <p className="mt-3 text-base leading-7 text-white/75 sm:text-lg">
              You’ll get focused practice tasks, real project workflows, and a
              roadmap that helps you stay consistent without getting lost.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                {
                  title: "Learn by building",
                  desc: "Short lessons, then real tasks.",
                },
                {
                  title: "Roadmap that makes sense",
                  desc: "No random topics, only order.",
                },
                {
                  title: "Practical projects",
                  desc: "Portfolio-friendly outcomes.",
                },
                {
                  title: "Step-by-step flow",
                  desc: "You always know what’s next.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-black p-4"
                >
                  <p className="text-sm font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Beginner Friendly",
                "Clear Roadmap",
                "Hands-on Practice",
                "Project Driven",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-sm text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#roadmap"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
              >
                View the Roadmap
              </a>

              <a
                href="#courses"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-black/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-black"
              >
                Explore Courses
              </a>
            </div>

            {/* Small note */}
            <p className="mt-4 text-sm text-white/60">
              Tip: Start with the roadmap, then pick one project and finish it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAuthor;
