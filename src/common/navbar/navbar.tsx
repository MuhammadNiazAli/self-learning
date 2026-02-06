"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

type CourseItem = {
  label: string;
  href: string;
  badgeUrl: string;
};

type CourseGroup = {
  title: string;
  items: CourseItem[];
};

type NavItem =
  | { label: string; href: string }
  | { label: string; children: CourseGroup[] };

const FALLBACK_BADGE =
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg";

function BadgeIcon({
  src,
  alt,
  size = 18,
}: {
  src: string;
  alt: string;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <Image
      key={src}
      src={failed ? FALLBACK_BADGE : src}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="h-4.5 w-4.5 shrink-0"
    />
  );
}

const CaretIcon = ({ open }: { open: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={[
      "transition-transform duration-200",
      open ? "rotate-180" : "rotate-0",
    ].join(" ")}
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BrandMark = (
  <Image
    src="/logo/developer.png"
    className="rounded-full"
    width={30}
    height={30}
    alt="logo"
  ></Image>
);

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const navItems: NavItem[] = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      {
        label: "Courses",
        children: [
          {
            title: "Core Tools",
            items: [
              {
                label: "VS Code",
                href: "/courses/vscode",
                badgeUrl:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
              },
              {
                label: "Git",
                href: "/courses/git",
                badgeUrl:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
              },
              {
                label: "GitHub",
                href: "/courses/github",
                badgeUrl:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
              },
            ],
          },
          {
            title: "Frontend Basics",
            items: [
              {
                label: "HTML",
                href: "/courses/html",
                badgeUrl:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
              },
              {
                label: "CSS",
                href: "/courses/css",
                badgeUrl:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
              },
              {
                label: "JavaScript",
                href: "/courses/javascript",
                badgeUrl:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
              },
              {
                label: "TypeScript",
                href: "/courses/typescript",
                badgeUrl:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
              },
            ],
          },
          {
            title: "Animation",
            items: [
              {
                label: "GSAP",
                href: "/courses/gsap",
                badgeUrl: "https://gsap.com/favicon.ico",
              },
              {
                label: "Framer Motion",
                href: "/courses/framer-motion",
                badgeUrl: "https://www.framer.com/motion/favicon.ico",
              },
            ],
          },
          {
            title: "3D & Graphics",
            items: [
              {
                label: "Three.js",
                href: "/courses/threejs",
                badgeUrl:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
              },
              {
                label: "WebGL",
                href: "/courses/webgl",
                badgeUrl:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opengl/opengl-original.svg",
              },
            ],
          },
          {
            title: "Frontend Frameworks",
            items: [
              {
                label: "React.js",
                href: "/courses/react",
                badgeUrl:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
              },
              {
                label: "Next.js",
                href: "/courses/nextjs",
                badgeUrl:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
              },
              {
                label: "Vue.js",
                href: "/courses/vue",
                badgeUrl:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
              },
              {
                label: "Nuxt.js",
                href: "/courses/nuxt",
                badgeUrl:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg",
              },
            ],
          },
          {
            title: "Backend",
            items: [
              {
                label: "Node.js",
                href: "/courses/nodejs",
                badgeUrl:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
              },
              {
                label: "Express.js",
                href: "/courses/express",
                badgeUrl:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
              },
              {
                label: "NestJS",
                href: "/courses/nestjs",
                badgeUrl:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
              },
              {
                label: "Fastify",
                href: "/courses/fastify",
                badgeUrl:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastify/fastify-original.svg",
              },
            ],
          },
          {
            title: "Databases",
            items: [
              {
                label: "MongoDB",
                href: "/courses/mongodb",
                badgeUrl:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
              },
              {
                label: "MySQL",
                href: "/courses/mysql",
                badgeUrl:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
              },
              {
                label: "PostgreSQL",
                href: "/courses/postgresql",
                badgeUrl:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
              },
            ],
          },
          {
            title: "State & UI",
            items: [
              {
                label: "Redux",
                href: "/courses/redux",
                badgeUrl:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
              },
              {
                label: "TanStack Query",
                href: "/courses/tanstack-query",
                badgeUrl: "https://tanstack.com/favicon.ico",
              },
              {
                label: "shadcn/ui",
                href: "/courses/shadcn",
                badgeUrl: "https://ui.shadcn.com/favicon.ico",
              },
              {
                label: "Aceternity UI",
                href: "/courses/aceternity",
                badgeUrl: "https://aceternity.com/favicon.ico",
              },
            ],
          },
        ],
      },
      { label: "Authour", href: "/authour" },
      { label: "Contact Us", href: "/contact" },
    ],
    [],
  );

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDesktop, setOpenDesktop] = useState<string | null>(null);
  const [openMobile, setOpenMobile] = useState<string | null>(null);

  // Close dropdown when route changes (NO useEffect setState)
  const lastPathRef = useRef<string>(pathname ?? "");
  // eslint-disable-next-line react-hooks/refs
  if (pathname && lastPathRef.current !== pathname) {
    // eslint-disable-next-line react-hooks/refs
    lastPathRef.current = pathname;
    if (mobileOpen) setMobileOpen(false);
    if (openDesktop) setOpenDesktop(null);
    if (openMobile) setOpenMobile(null);
  }

  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest("[data-dd-root]")) setOpenDesktop(null);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setOpenDesktop(null);
        setOpenMobile(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  const dropdownMotion = {
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 },
    animate: reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    exit: reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 },
    transition: { duration: 0.18, ease: "easeOut" as const },
  };

  return (
    <header className="sticky top-0 z-50">
      <nav
        className={[
          "relative border-b backdrop-blur-xl",
          "border-white/10",
          "bg-black/70 shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
        ].join(" ")}
        aria-label="Primary"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-white/10 to-transparent" />

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group flex items-center gap-2 cursor-pointer"
          >
            <div className="relative grid h-10 w-10 place-items-center rounded-full bg-linear-to-br from-pink-300 to-emerald-300 ring-1 ring-white/10">
              <span className="text-black">{BrandMark}</span>
              <span className="absolute -inset-1 rounded-2xl bg-white/10 opacity-0 blur-md transition group-hover:opacity-100" />
            </div>

            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight text-white">
                Muhammad Niaz Ali
              </div>
              <div className="text-xs text-white/65">
                Full Stack Web Developer
              </div>
            </div>
          </Link>

          <div className="hidden items-center justify-center gap-1 lg:flex">
            {navItems.map((item) => {
              const hasChildren = "children" in item;

              if (!hasChildren) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={[
                      "relative rounded-xl px-3 py-2 text-sm font-medium cursor-pointer",
                      "transition-colors duration-200",
                      isActive(item.href)
                        ? "text-white"
                        : "text-white/75 hover:text-white",
                      "hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50",
                    ].join(" ")}
                  >
                    {item.label}
                    <span
                      className={[
                        "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full transition-all duration-200",
                        isActive(item.href)
                          ? "bg-linear-to-r from-cyan-300 to-emerald-300"
                          : "bg-transparent",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                  </Link>
                );
              }

              const open = openDesktop === item.label;

              return (
                <div
                  key={item.label}
                  className="relative"
                  data-dd-root
                  onMouseEnter={() => setOpenDesktop(item.label)}
                  onMouseLeave={() => setOpenDesktop(null)}
                >
                  <button
                    type="button"
                    className={[
                      "group flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium cursor-pointer",
                      "transition-colors duration-200",
                      open
                        ? "bg-white/6 text-white"
                        : "text-white/75 hover:text-white hover:bg-white/5",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50",
                    ].join(" ")}
                    aria-haspopup="true"
                    aria-expanded={open}
                    onClick={() => setOpenDesktop(open ? null : item.label)}
                  >
                    {item.label}
                    <span className="text-white/70">
                      <CaretIcon open={open} />
                    </span>
                  </button>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        {...dropdownMotion}
                        className="absolute left-1/2 top-[calc(100%+12px)] w-190 -translate-x-1/2"
                      >
                        <div className="rounded-2xl border border-white/10 bg-[#0b0f14]/99 shadow-[0_20px_70px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                            <p className="text-sm font-semibold text-white">
                              Courses
                            </p>
                            <p className="text-xs text-white/60">
                              Pick a topic and start learning.
                            </p>
                          </div>

                          <div
                            className={[
                              "theme-scroll max-h-105 overflow-y-auto overscroll-contain",
                              "px-4 py-4 pr-3",
                            ].join(" ")}
                          >
                            <div className="grid grid-cols-3 gap-6">
                              {item.children.map((group) => (
                                <div key={group.title} className="min-w-0">
                                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/55">
                                    {group.title}
                                  </div>

                                  <ul className="space-y-1">
                                    {group.items.map((c) => (
                                      <li key={c.href}>
                                        <Link
                                          href={c.href}
                                          className={[
                                            "group flex items-center gap-3 rounded-xl px-2 py-2 cursor-pointer",
                                            "transition duration-200",
                                            "hover:bg-white/6 hover:translate-x-px",
                                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50",
                                            "active:translate-y-px",
                                          ].join(" ")}
                                        >
                                          <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 transition group-hover:bg-white/7">
                                            <BadgeIcon
                                              src={c.badgeUrl}
                                              alt={`${c.label} icon`}
                                            />
                                          </span>

                                          <span className="min-w-0">
                                            <span className="block truncate text-sm font-semibold text-white">
                                              {c.label}
                                            </span>
                                            <span className="block text-xs text-white/55 transition group-hover:text-white/70">
                                              Online
                                            </span>
                                          </span>

                                          <span className="ml-auto text-white/30 transition group-hover:text-white/70">
                                            <svg
                                              width="16"
                                              height="16"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              aria-hidden="true"
                                            >
                                              <path
                                                d="M9 18l6-6-6-6"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </svg>
                                          </span>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
                            <p className="text-xs text-white/60">
                              Want a roadmap page for beginners?
                            </p>
                            <Link
                              href="/courses"
                              className="text-xs font-semibold text-white cursor-pointer hover:text-white/90"
                            >
                              View all →
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className={[
                "hidden lg:inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold cursor-pointer",
                "text-black bg-linear-to-r from-cyan-300 to-emerald-300",
                "ring-1 ring-white/10 shadow-sm",
                "transition duration-200 hover:brightness-110 active:translate-y-px",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60",
              ].join(" ")}
            >
              Contact
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </Link>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl cursor-pointer hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50 lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <div className="relative h-5 w-6">
                <span
                  className={[
                    "absolute left-0 top-0 h-0.5 w-6 rounded-full bg-white transition",
                    mobileOpen ? "translate-y-2 rotate-45" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 top-2 h-0.5 w-6 rounded-full bg-white transition",
                    mobileOpen ? "opacity-0" : "opacity-100",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 top-4 h-0.5 w-6 rounded-full bg-white transition",
                    mobileOpen ? "-translate-y-2 -rotate-45" : "",
                  ].join(" ")}
                />
              </div>
            </button>
          </div>
        </div>

        <div
          className={[
            "lg:hidden overflow-hidden border-t border-white/10 bg-black/70 backdrop-blur-xl",
            "transition-[max-height,opacity] duration-300",
            mobileOpen ? "max-h-190 opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const hasChildren = "children" in item;

                if (!hasChildren) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={[
                        "rounded-xl px-3 py-3 text-sm font-semibold transition cursor-pointer",
                        isActive(item.href)
                          ? "bg-white/8 text-white"
                          : "text-white/80 hover:bg-white/5 hover:text-white",
                        "active:translate-y-px",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  );
                }

                const open = openMobile === item.label;

                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/4"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold text-white/90 cursor-pointer hover:bg-white/5 active:translate-y-px"
                      aria-expanded={open}
                      onClick={() => setOpenMobile(open ? null : item.label)}
                    >
                      <span>{item.label}</span>
                      <span className="text-white/70">
                        <CaretIcon open={open} />
                      </span>
                    </button>

                    <div
                      className={[
                        "overflow-hidden transition-[max-height,opacity] duration-300",
                        open ? "max-h-140 opacity-100" : "max-h-0 opacity-0",
                      ].join(" ")}
                    >
                      <div className="theme-scroll max-h-105 overflow-y-auto overscroll-contain px-3 pb-3 pr-2">
                        <div className="grid gap-4 pt-1">
                          {item.children.map((group) => (
                            <div key={group.title}>
                              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/55">
                                {group.title}
                              </div>

                              <div className="grid gap-1">
                                {group.items.map((c) => (
                                  <Link
                                    key={c.href}
                                    href={c.href}
                                    className={[
                                      "flex items-center gap-3 rounded-xl px-2 py-2 text-sm cursor-pointer",
                                      "text-white/80 hover:bg-white/6 hover:text-white",
                                      "transition duration-200 active:translate-y-px",
                                    ].join(" ")}
                                  >
                                    <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 transition hover:bg-white/7">
                                      <BadgeIcon
                                        src={c.badgeUrl}
                                        alt={`${c.label} icon`}
                                      />
                                    </span>

                                    <span className="font-semibold">
                                      {c.label}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 text-center text-xs text-white/55">
              Build skills step by step.
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
