'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { RETAILERS } from '@/src/constants/retailers';
import { giftCardService } from '@/src/services/giftCardService';
import { useState } from 'react';
import { Loader2, Plus } from 'lucide-react';

const formSchema = z.object({
  retailerId: z.string().min(1, 'Please select a retailer'),
  value: z.number().min(1, 'Value must be at least 1'),
  price: z.number().min(1, 'Price must be at least 1'),
  cardCode: z.string().min(10, 'Card code is too short'),
});

type FormData = z.infer<typeof formSchema>;

export function GiftCardForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: 50,
      price: 45,
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Logic would be here
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Retailer</label>
        <select 
          {...register('retailerId')}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-slate-400"
        >
          <option value="">Select a retailer</option>
          {RETAILERS.map(r => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
        {errors.retailerId && <p className="text-xs text-red-500">{errors.retailerId.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Card Value ($)</label>
          <input 
            type="number"
            {...register('value', { valueAsNumber: true })}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-slate-400"
          />
          {errors.value && <p className="text-xs text-red-500">{errors.value.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Selling Price ($)</label>
          <input 
            type="number"
            {...register('price', { valueAsNumber: true })}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-slate-400"
          />
          {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Gift Card Code / PIN</label>
        <input 
          type="password"
          placeholder="Enter the secure code..."
          {...register('cardCode')}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-slate-400"
        />
        <p className="text-[10px] text-slate-400 italic">This code will only be visible to the buyer after successful payment.</p>
        {errors.cardCode && <p className="text-xs text-red-500">{errors.cardCode.message}</p>}
      </div>

      <button 
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800 disabled:opacity-50"
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <Plus className="h-4 w-4" />
            List Gift Card
          </>
        )}
      </button>

      {success && (
        <div className="rounded-lg bg-emerald-50 p-4 text-center text-sm font-medium text-emerald-600">
          Gift card listed successfully! It is now pending verification.
        </div>
      )}
    </form>
  );
}
