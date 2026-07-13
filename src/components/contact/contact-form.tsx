'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { CONTACT } from '@/config/site';
import { PROBLEM_TYPES } from '@/config/content';
import { cn } from '@/lib/utils/cn';

interface BookingFields {
  name: string;
  phone: string;
  email?: string;
  pincode?: string;
  service: string;
  message?: string;
}

const FIELD =
  'h-[56px] w-full rounded-md border border-glass-border bg-white/70 px-16 text-body text-ink placeholder:text-ink-muted focus-visible:border-ocean';

/**
 * ContactForm — a booking form that submits by opening a pre-filled WhatsApp
 * chat (static-export friendly, no backend). Validates gently with friendly
 * messages; falls back to email/phone in the surrounding page.
 */
export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFields>();
  const [sent, setSent] = useState(false);

  const onSubmit = (data: BookingFields) => {
    const lines = [
      '*New Service Request — RO Care India*',
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      data.email ? `Email: ${data.email}` : '',
      data.pincode ? `PIN Code: ${data.pincode}` : '',
      `Service: ${data.service}`,
      data.message ? `Details: ${data.message}` : '',
    ].filter(Boolean);
    const url = `${CONTACT.whatsappHref}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSent(true);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-16" noValidate>
      <div className="grid gap-16 sm:grid-cols-2">
        <div>
          <input
            className={FIELD}
            placeholder="Full name"
            aria-label="Full name"
            {...register('name', { required: 'Please tell us your name.' })}
          />
          {errors.name && <p className="mt-4 text-small text-danger">{errors.name.message}</p>}
        </div>
        <div>
          <input
            className={FIELD}
            placeholder="Phone number"
            inputMode="tel"
            aria-label="Phone number"
            {...register('phone', {
              required: 'A phone number lets us reach you.',
              pattern: { value: /^[0-9]{10}$/, message: 'Looks like this number is incomplete.' },
            })}
          />
          {errors.phone && <p className="mt-4 text-small text-danger">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid gap-16 sm:grid-cols-2">
        <input className={FIELD} placeholder="Email (optional)" aria-label="Email" {...register('email')} />
        <input className={FIELD} placeholder="PIN code (optional)" aria-label="PIN code" {...register('pincode')} />
      </div>

      <div>
        <select
          className={cn(FIELD, 'appearance-none')}
          aria-label="Service needed"
          defaultValue=""
          {...register('service', { required: 'Please choose a service.' })}
        >
          <option value="" disabled>
            Select a service
          </option>
          {PROBLEM_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.service && <p className="mt-4 text-small text-danger">{errors.service.message}</p>}
      </div>

      <textarea
        className={cn(FIELD, 'h-auto py-16')}
        rows={4}
        placeholder="Tell us about your requirement (optional)"
        aria-label="Additional details"
        {...register('message')}
      />

      <button
        type="submit"
        className="inline-flex h-[60px] items-center justify-center rounded-full bg-gradient-ocean text-button text-white shadow-glow transition-transform duration-200 ease-primary hover:-translate-y-1"
      >
        💬 Send via WhatsApp
      </button>

      {sent && (
        <p className="text-center text-small font-semibold text-success">
          Thank you! Your request opened in WhatsApp — hit send and we’ll be in touch shortly.
        </p>
      )}
    </form>
  );
}
