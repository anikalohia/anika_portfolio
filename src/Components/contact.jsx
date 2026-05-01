import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (form) => {
    const name = form.querySelector('input[name=name]')?.value.trim() || "";
    const email = form.querySelector('input[name=email]')?.value.trim() || "";
    const message = form.querySelector('textarea[name=message]')?.value.trim() || "";
    const next = { name: "", email: "", message: "" };
    
    if (name.length < 2) next.name = "Please enter your name.";
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    if (!emailOk) next.email = "Please enter a valid email.";
    if (message.length < 10) next.message = "Message is a bit too short.";
    
    setErrors(next);
    return !next.name && !next.email && !next.message;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validate(form)) return;
    
    setIsSubmitting(true);
    const name = form.querySelector('input[name=name]')?.value || '';
    const email = form.querySelector('input[name=email]')?.value || '';
    const message = form.querySelector('textarea[name=message]')?.value || '';
    
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    
    setTimeout(() => {
      window.location.href = `mailto:anikalohia2@gmail.com?subject=${subject}&body=${body}`;
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <section id="contact" className="min-h-screen py-24 px-6 relative overflow-hidden">
      {/* Background Decorative */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[150px] -z-10" />

      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Get In <span className="text-sky-400">Touch</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'm always open to discussing new opportunities and ideas.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8">
              <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-sky-400/10 text-sky-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-widest font-mono">Email</p>
                    <a href="mailto:anikalohia2@gmail.com" className="text-lg text-white hover:text-sky-400 transition-colors">anikalohia2@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-indigo-400/10 text-indigo-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-widest font-mono">Location</p>
                    <p className="text-lg text-white">India (IST)</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-sm text-gray-400 mb-6 uppercase tracking-widest font-mono">Socials</p>
                <div className="flex gap-4">
                  {[
                    { name: 'GitHub', url: 'https://github.com/anikalohia', icon: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path> },
                    { name: 'LinkedIn', url: 'https://linkedin.com/in/anika-lohia', icon: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></> },
                  ].map(social => (
                    <a 
                      key={social.name}
                      href={social.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-sky-400/20 hover:border-sky-400/50 hover:-translate-y-1 transition-all duration-300"
                      aria-label={social.name}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{social.icon}</svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Anika Lohia"
                    className={`w-full px-6 py-4 rounded-2xl bg-[#030712] border transition-all duration-300 outline-none ${errors.name ? 'border-rose-500/50 focus:border-rose-500' : 'border-white/10 focus:border-sky-400'}`}
                    required
                  />
                  {errors.name && <p className="text-xs text-rose-400 ml-1">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="hello@example.com"
                    className={`w-full px-6 py-4 rounded-2xl bg-[#030712] border transition-all duration-300 outline-none ${errors.email ? 'border-rose-500/50 focus:border-rose-500' : 'border-white/10 focus:border-sky-400'}`}
                    required
                  />
                  {errors.email && <p className="text-xs text-rose-400 ml-1">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Your Message</label>
                <textarea
                  name="message"
                  placeholder="I'd love to hear about your project..."
                  rows="6"
                  className={`w-full px-6 py-4 rounded-2xl bg-[#030712] border transition-all duration-300 outline-none resize-none ${errors.message ? 'border-rose-500/50 focus:border-rose-500' : 'border-white/10 focus:border-sky-400'}`}
                  required
                ></textarea>
                {errors.message && <p className="text-xs text-rose-400 ml-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-sky-500 hover:bg-sky-400 disabled:bg-sky-800 text-gray-900 font-bold text-lg shadow-xl shadow-sky-500/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="w-6 h-6 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin" />
                ) : (
                  <>
                    Send Message
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

