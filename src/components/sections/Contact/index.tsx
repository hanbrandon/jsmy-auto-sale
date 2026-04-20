"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { translations } from "@/constants/translations";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Phone, MapPin, Send, Car, Search, DollarSign, ShoppingBag, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

type FormType = "CARFAX" | "NEW_CAR" | "BUY_USED" | "SELL_CAR";

export const Contact = () => {
  const [activeForm, setActiveForm] = useState<FormType>("NEW_CAR");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = translations.en;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          type: activeForm,
          message: data.notes || data.message,
          data: data, // Send everything else as dynamic data
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setIsSubmitted(true);
      e.currentTarget.reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setIsSending(false);
    }
  };

  const forms = [
    { id: "NEW_CAR", label: "New Car Inquiry", icon: Car },
    { id: "CARFAX", label: "Carfax Request", icon: Search },
    { id: "BUY_USED", label: "Buy Used Car", icon: ShoppingBag },
    { id: "SELL_CAR", label: "Sell Your Car", icon: DollarSign },
  ] as const;

  const inputStyles = "w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-white/20 transition-all placeholder:text-white/20 text-sm text-white hover:bg-white/[0.07]";
  const labelStyles = "text-[10px] font-bold uppercase tracking-widest text-white/40 pl-1 mb-2 block";
  const selectStyles = "w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-white/20 transition-all text-sm text-white appearance-none cursor-pointer hover:bg-white/[0.07]";

  return (
    <Section id="contact" disableContain>
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Heading 
                tag={t.contact.tag}
                title1="Your Direct"
                title2="Connection"
              />
              <p className="text-white/60 mt-6 max-w-md leading-relaxed">
                Whether you're looking for a new lease, a certified pre-owned vehicle, or want to check your car's history, we're here to help.
              </p>

              <div className="space-y-8 mt-12">
                <div className="flex gap-6 items-start group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors shrink-0">
                    <Phone size={20} className="text-white/60 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Direct Line</div>
                    <a href="tel:7146810161" className="text-xl font-bold hover:text-white transition-colors">714.681.0161</a>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors shrink-0">
                    <MapPin size={20} className="text-white/60 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Location</div>
                    <div className="text-xl font-bold leading-tight">Irvine & San Diego, CA</div>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors shrink-0">
                    <Clock size={20} className="text-white/60 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Business Hours</div>
                    <div className="text-xl font-bold leading-tight">Mon - Sat: 9AM - 7PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 p-6 md:p-10 xl:p-14 rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl"
          >
            {/* Form Switcher */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-10 p-1.5 bg-white/5 rounded-[2rem] border border-white/5">
              {forms.map((form) => (
                <button
                  key={form.id}
                  onClick={() => setActiveForm(form.id as FormType)}
                  className={cn(
                    "flex flex-col items-center justify-center py-4 px-2 rounded-[1.5rem] transition-all gap-2 border border-transparent",
                    activeForm === form.id 
                      ? "bg-white text-black shadow-xl" 
                      : "text-white/40 hover:text-white hover:bg-white/5"
                  )}
                >
                  <form.icon size={20} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{form.label}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-full min-h-[400px] flex flex-col items-center justify-center text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-2xl shadow-white/20">
                    <CheckCircle2 size={40} className="text-black" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Request Received</h3>
                  <p className="text-white/60 max-w-sm">
                    Thank you for your inquiry. Our team will contact you shortly via your preferred method.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key={activeForm}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className={labelStyles}>Full Name</label>
                      <input type="text" id="name" name="name" required className={inputStyles} placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className={labelStyles}>Email Address</label>
                      <input type="email" id="email" name="email" required className={inputStyles} placeholder="john@example.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className={labelStyles}>Phone Number</label>
                      <input type="tel" id="phone" name="phone" required className={inputStyles} placeholder="(123) 456-7890" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="method" className={labelStyles}>Preferred Contact</label>
                      <select id="method" name="method" className={selectStyles}>
                        <option value="call">Phone Call</option>
                        <option value="text">Text Message</option>
                        <option value="email">Email</option>
                      </select>
                    </div>
                  </div>

                  {/* Dynamic Fields based on Form Type */}
                  {activeForm === "CARFAX" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-sm text-white/80 leading-relaxed">
                          <span className="text-white font-bold">Important:</span> Carfax reports require a small processing fee of <span className="text-white font-bold">$10</span>. 
                          Please send the fee via Zelle or Venmo to <span className="text-white font-bold">714-681-0161</span> after submitting this form.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="vin" className={labelStyles}>VIN (Vehicle Identification Number)</label>
                        <input type="text" id="vin" name="vin" required className={inputStyles} placeholder="17-digit VIN" />
                      </div>
                    </motion.div>
                  )}

                  {activeForm === "NEW_CAR" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="make" className={labelStyles}>Make</label>
                        <input type="text" id="make" name="make" required className={inputStyles} placeholder="e.g. Tesla" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="model" className={labelStyles}>Model</label>
                        <input type="text" id="model" name="model" required className={inputStyles} placeholder="e.g. Model Y" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="purchase_type" className={labelStyles}>Type</label>
                        <select id="purchase_type" name="purchase_type" className={selectStyles}>
                          <option value="lease">Lease</option>
                          <option value="finance">Finance</option>
                          <option value="cash">Cash Purchase</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {activeForm === "BUY_USED" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="budget" className={labelStyles}>Budget Range</label>
                        <input type="text" id="budget" name="budget" className={inputStyles} placeholder="e.g. $20k - $30k" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="car_type" className={labelStyles}>Car Type</label>
                        <select id="car_type" name="car_type" className={selectStyles}>
                          <option value="sedan">Sedan</option>
                          <option value="suv">SUV</option>
                          <option value="truck">Truck</option>
                          <option value="ev">Electric/Hybrid</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {activeForm === "SELL_CAR" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="my_car" className={labelStyles}>Vehicle Details</label>
                        <input type="text" id="my_car" name="my_car" required className={inputStyles} placeholder="Year, Make, Model, Mileage" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="condition" className={labelStyles}>Condition</label>
                        <select id="condition" name="condition" className={selectStyles}>
                          <option value="excellent">Excellent</option>
                          <option value="good">Good</option>
                          <option value="fair">Fair</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  <div className="space-y-2">
                    <label htmlFor="notes" className={labelStyles}>Additional Notes</label>
                    <textarea id="notes" name="notes" rows={4} className={cn(inputStyles, "resize-none")} placeholder="Tell us more about your request..."></textarea>
                  </div>

                  <div className="flex flex-col gap-4">
                    {error && (
                      <p className="text-red-400 text-xs font-bold pl-1">{error}</p>
                    )}
                    <Button 
                      type="submit" 
                      className="w-full py-4 text-sm font-black tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed" 
                      aria-label={`Submit ${forms.find(f => f.id === activeForm)?.label}`}
                      disabled={isSending}
                    >
                      {isSending ? (
                        <>
                          <Loader2 size={16} className="mr-3 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Submit {forms.find(f => f.id === activeForm)?.label}
                          <Send size={16} className="ml-3" aria-hidden="true" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};
