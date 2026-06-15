'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle, Upload, Cake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Failed to submit inquiry:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-amber-600 dark:text-violet-400 font-medium text-sm uppercase tracking-widest">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-zinc-900 dark:text-zinc-50 mt-3 mb-4">
              Request a Custom Design
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8">
              Have something special in mind? Our master bakers love bringing your vision to life.
              Share your ideas, and we will create something truly unique for your celebration.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-md border border-amber-200 bg-amber-50 flex items-center justify-center flex-shrink-0 dark:border-violet-500/30 dark:bg-violet-950/70">
                  <Cake className="w-6 h-6 text-amber-600 dark:text-violet-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Custom Designs</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    From themed birthday cakes to elaborate wedding designs, we do it all
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-md border border-amber-200 bg-amber-50 flex items-center justify-center flex-shrink-0 dark:border-violet-500/30 dark:bg-violet-950/70">
                  <Upload className="w-6 h-6 text-amber-600 dark:text-violet-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Share Inspiration</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    Send us photos or describe your dream cake, and we will make it happen
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-md border border-amber-200 bg-amber-50 flex items-center justify-center flex-shrink-0 dark:border-violet-500/30 dark:bg-violet-950/70">
                  <Send className="w-6 h-6 text-amber-600 dark:text-violet-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Quick Response</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    We respond to all inquiries within 24 hours with a personalized quote
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-md shadow-soft border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800">
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-serif font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                  Message Sent!
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Thank you for reaching out. We will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-zinc-900 dark:text-zinc-200 font-medium">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Smith"
                      className="h-12 rounded-md border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-500 focus:border-amber-500 focus:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-violet-500 dark:focus:ring-violet-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-zinc-900 dark:text-zinc-200 font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="h-12 rounded-md border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-500 focus:border-amber-500 focus:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-violet-500 dark:focus:ring-violet-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-zinc-900 dark:text-zinc-200 font-medium">
                    Tell Us About Your Vision
                  </Label>
                  <Textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your ideal cake: theme, flavors, size, special dietary requirements..."
                    className="resize-none rounded-md border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-500 focus:border-amber-500 focus:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-violet-500 dark:focus:ring-violet-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-900 dark:text-zinc-200 font-medium">
                    Upload Inspiration (Optional)
                  </Label>
                  <div className="border-2 border-dashed border-zinc-200 rounded-md p-6 text-center hover:border-amber-500 hover:bg-amber-50 transition-colors cursor-pointer dark:border-zinc-800 dark:hover:border-violet-500 dark:hover:bg-violet-950/40">
                    <Upload className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Drag and drop or click to upload
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
