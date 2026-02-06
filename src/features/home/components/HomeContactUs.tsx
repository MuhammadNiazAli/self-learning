import React from "react";

const HomeContactUs = () => {
  return (
    <section className="relative w-full overflow-hidden">
    
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-black blur-3xl" />
        <div className="absolute -bottom-48 -right-30 h-130 w-130 rounded-full bg-black blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] bg-size-[22px_22px] opacity-40" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="mx-auto inline-flex w-fit items-center rounded-full border border-white/10 bg-black px-3 py-1 text-sm text-white/80">
            Contact
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Let’s talk about your idea.
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">
            Send a message and I’ll reply with the next steps, timeline, and what
            I need from you to start.
          </p>
        </div>

      
        <div className="mx-auto max-w-2xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black p-6 sm:p-8">
            <div className="pointer-events-none absolute inset-0 opacity-60">
              <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
            </div>

            <form className="relative space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-white/80">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-white/80">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-white/80">
                  Message
                </label>
                <textarea
                  placeholder="Write your message..."
                  rows={6}
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/35 focus:border-white/20"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <p className="text-xs text-white/55">
                  By sending, you agree to be contacted back.
                </p>

                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90 cursor-pointer"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          <p className="relative mt-5 text-center text-sm text-white/60">
            Tip: Add a link or screenshot in the message if you want faster help.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeContactUs;
