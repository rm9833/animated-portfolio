import React, { useState } from 'react';
import { Mail, Phone, MapPin, Download, Send, Loader2, Sparkles } from 'lucide-react';
import { ContactStatus } from '../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState<ContactStatus>(ContactStatus.IDLE);
  const [externalMsg, setExternalMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(ContactStatus.SENDING);
    setExternalMsg(null);

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxDOx6ld6i7KqQ16xNro7ZquwdHoErjTNrItkwnunfeOm7Hkm-LtuFUvzwasQqcEA6N/exec';

    try {
      const formPayload = new FormData();
      formPayload.append('Name', formData.name);
      formPayload.append('Email', formData.email);
      formPayload.append('Message', formData.message);

      // NOTE: Google Apps Script may not send CORS headers. Using `mode: 'no-cors'`
      // avoids the browser blocking the request, but the response will be opaque
      // (we cannot verify success). For production, use a server-side proxy.
      await fetch(scriptURL, { method: 'POST', body: formPayload, mode: 'no-cors' });
      setStatus(ContactStatus.SUCCESS);
      setExternalMsg('Message sent successfully (sent using no-cors)');
      setFormData({ name: '', email: '', message: '' });

      window.setTimeout(() => setExternalMsg(null), 5000);
    } catch (error) {
      console.error('Error sending to script:', error);
      setStatus(ContactStatus.ERROR);
      setExternalMsg('There was an error sending your message.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Me</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Left Side: Contact Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white">Let's start a conversation</h3>
            <p className="text-gray-400">
              I'm open to opportunities, SAP consultations, or discussing the latest in AI.
              Fill out the form and I'll get back to you shortly!
            </p>


            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">rahulmaurya9859@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">+91 87790 59939</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </div>

            <a
              href="https://docs.google.com/document/d/1-o_KuXdWvzn2oUl-hPYpIddbogHKLjPc/export?format=pdf"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg rounded-lg transition-colors border border-slate-600 font-medium group"
              aria-label="Download resume"
            >
              <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              Download Resume
            </a>

          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700 shadow-xl relative overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20"></div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all outline-none resize-none"
                  placeholder="How can I help you?"
                />
              </div>

              <button
                type="submit"
                disabled={status === ContactStatus.SENDING}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === ContactStatus.SENDING ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Sending & Analyzing...
                  </>
                ) : (
                  <>
                    Send Message <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Success message */}
            {status === ContactStatus.SUCCESS && (
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg animate-fade-in">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-500/20 rounded-full shrink-0">
                    <Sparkles className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-green-400 font-semibold mb-1">Message Sent!</p>
                    <p className="text-gray-300 text-sm italic">Thanks — I'll respond as soon as possible.</p>
                  </div>
                </div>
              </div>
            )}

            {status === ContactStatus.ERROR && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">Something went wrong. Please try again later.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;