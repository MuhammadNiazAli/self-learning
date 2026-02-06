"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaRedditAlien,
  FaStackOverflow,
  FaXTwitter,
  FaDiscord,
} from "react-icons/fa6";

const Footer = () => {
  const brand = {
    name: "Muhammad Niaz Ali",
    role: "Full Stack Web Developer",
    logo: "/logo/developer.png",
  };

  const socials = [
    { label: "GitHub", icon: <FaGithub />, href: "https://github.com/" },
    { label: "LinkedIn", icon: <FaLinkedin />, href: "https://www.linkedin.com/" },
    { label: "Facebook", icon: <FaFacebook />, href: "https://www.facebook.com/" },
    { label: "Reddit", icon: <FaRedditAlien />, href: "https://www.reddit.com/" },
    { label: "Stack Overflow", icon: <FaStackOverflow />, href: "https://stackoverflow.com/" },
    { label: "Medium", icon: "M", href: "https://medium.com/" },
    { label: "X", icon: <FaXTwitter />, href: "https://x.com/" },
    { label: "Discord", icon: <FaDiscord />, href: "https://discord.com/" },
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Courses", href: "/courses" },
    { label: "Author", href: "/authour" }, 
    { label: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Support", href: "/contact" },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden border-t border-black bg-black">
     
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-black blur-3xl" />
        <div className="absolute -bottom-56 -right-24 h-112 w-md rounded-full bg-[#020C0D] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] bg-size-[22px_22px] opacity-35" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:px-8">
   
        <div className="rounded-3xl border border-white/10 bg-white/3 p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          
            <div className="lg:col-span-5">
              <Link href="/" className="group inline-flex items-center gap-3">
                <span className="relative grid h-12 w-12 place-items-center rounded-full bg-linear-to-br from-pink-300 to-emerald-300 ring-1 ring-white/10">
                  <Image
                    src={brand.logo}
                    alt="Logo"
                    width={35}
                    height={40}
                    className="rounded-full w-10 h-10 object-cover"
                  />
                  <span className="absolute -inset-1 rounded-2xl bg-white/10 opacity-0 blur-md transition group-hover:opacity-100" />
                </span>

                <span className="leading-tight">
                  <span className="block text-sm font-semibold tracking-tight text-white">
                    {brand.name}
                  </span>
                  <span className="block text-xs text-white/65">{brand.role}</span>
                </span>
              </Link>

              <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
                I share practical tutorials and project-based learning.
                The goal is simple: build skills and ship clean work.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {["Beginner Friendly", "Project Driven", "Step-by-step"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/75"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Work with me
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/5 hover:text-white"
                >
                  View courses
                </Link>
              </div>
            </div>

           
            <nav className="lg:col-span-4" aria-label="Footer navigation">
              <p className="text-sm font-semibold text-white">Quick links</p>

              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
                {quickLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="group inline-flex items-center justify-between rounded-xl border border-white/5 bg-black/20 px-3 py-2 text-sm text-white/75 transition hover:border-white/10 hover:bg-white/5 hover:text-white"
                  >
                    <span>{l.label}</span>
                    <span className="text-white/35 transition group-hover:text-white/70">→</span>
                  </Link>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm font-semibold text-white">Contact</p>
                <p className="mt-1 text-sm leading-6 text-white/70">
                  Use the contact page for project work or questions.
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Contact
                </Link>
              </div>
            </nav>

          
            <div className="lg:col-span-3">
              <p className="text-sm font-semibold text-white">Social</p>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Follow for updates and new uploads.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-white/80 transition hover:bg-white/5 hover:text-white"
                  >
                    <span className="text-lg transition group-hover:scale-105">
                      {s.icon}
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm font-semibold text-white">Note</p>
                <p className="mt-1 text-sm leading-6 text-white/70">
                  Replace the icons with your real profile links.
                </p>
              </div>
            </div>
          </div>
        </div>

       
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/60">
            © {year} {brand.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full border border-white/10 bg-white/3 px-3 py-1 text-xs text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
