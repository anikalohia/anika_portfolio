// Contact.jsx
import React, { useState } from "react";

export default function Contact() {
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });

  const validate = (form) => {
    const name = form.querySelector('input[name=name]')?.value.trim() || "";
    const email = form.querySelector('input[name=email]')?.value.trim() || "";
    const message = form.querySelector('textarea[name=message]')?.value.trim() || "";
    const next = { name: "", email: "", message: "" };
    if (name.length < 2) next.name = "Please enter your full name.";
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    if (!emailOk) next.email = "Please enter a valid email address.";
    if (message.length < 10) next.message = "Message should be at least 10 characters.";
    setErrors(next);
    return !next.name && !next.email && !next.message;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validate(form)) return;
    const name = form.querySelector('input[name=name]')?.value || '';
    const email = form.querySelector('input[name=email]')?.value || '';
    const message = form.querySelector('textarea[name=message]')?.value || '';
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:yourmail@example.com?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center bg-black  text-white px-6 py-12 rounded-[75px] mx-[3rem] shadow-[#4a82daa3]  "
    >
      <div className="w-full max-w-6xl  ">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-2">📩 Contact Me</h2>
          <p className="text-gray-400 mb-3 text-sm">I usually reply within 24–48 hours.</p>
          <p className="text-gray-300">Have a question, project idea, or just want to say hi?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Info Card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
            <h3 className="text-2xl font-semibold mb-2">Let’s build something great</h3>
            <p className="text-gray-300 mb-6">I’m open to freelance work, internships, collaborations, and hackathons.</p>
            <div className="space-y-3 text-gray-200">
              <div className="flex items-center gap-3"><span>📍</span><span>India</span></div>
              <div className="flex items-center gap-3"><span>⏱️</span><span>Timezone: IST (UTC+5:30)</span></div>
              <div className="flex items-center gap-3"><span>💬</span><span>Preferred: Email or LinkedIn</span></div>
            </div>
            <div className="h-px w-full bg-white/10 my-6" />
            <div className="flex flex-wrap gap-3">
              <a href="mailto:anikalohia2@gmail.com" className="px-4 py-2 rounded-xl bg-sky-500/20 border border-sky-400/40 hover:bg-sky-500/30 transition">Email</a>
              <a href="https://github.com/anikalohia" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-white/10 border border-white/15 hover:bg-white/15 transition">GitHub</a>
              <a href="https://linkedin.com/in/anika-lohia" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-white/10 border border-white/15 hover:bg-white/15 transition">LinkedIn</a>
            </div>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div>
                <label className="block mb-2 text-sm text-gray-300">Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Jane Doe"
                  className={`w-full p-4 rounded-2xl bg-gray-800 text-white outline-none focus:ring-2 ${errors.name ? 'ring-2 ring-rose-500' : 'focus:ring-sky-400'}`}
                  aria-invalid={!!errors.name}
                  required
                />
                {errors.name && <p className="mt-2 text-sm text-rose-400">{errors.name}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className={`w-full p-4 rounded-2xl bg-gray-800 text-white outline-none focus:ring-2 ${errors.email ? 'ring-2 ring-rose-500' : 'focus:ring-sky-400'}`}
                  aria-invalid={!!errors.email}
                  required
                />
                {errors.email && <p className="mt-2 text-sm text-rose-400">{errors.email}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-300">Message</label>
                <textarea
                  placeholder="Tell me about your project or idea..."
                  rows="6"
                  name="message"
                  className={`w-full p-4 rounded-2xl bg-gray-800 text-white outline-none focus:ring-2 ${errors.message ? 'ring-2 ring-rose-500' : 'focus:ring-sky-400'}`}
                  aria-invalid={!!errors.message}
                  required
                ></textarea>
                {errors.message && <p className="mt-2 text-sm text-rose-400">{errors.message}</p>}
              </div>
              <button
                type="submit"
                className="w-full p-4 rounded-2xl bg-sky-500 hover:bg-sky-600 transition font-semibold"
              >
                Send Message 🚀
              </button>
              <p className="text-xs text-gray-400 text-center">By sending, your email client will open with your message prefilled.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

