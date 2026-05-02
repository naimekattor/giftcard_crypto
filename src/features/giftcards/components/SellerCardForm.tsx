'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { RETAILERS } from '@/constants/retailers';
import { Button } from '@/components/ui/Button';
import { Loader2, Plus, ArrowRight, ArrowLeft, Upload, ShieldCheck, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const formSchema = z.object({
  retailer: z.string().min(1, 'Please select a retailer'),
  value: z.string().min(1, 'Enter card value'),
  quantity: z.number().min(1).default(1),
  cardCode: z.string().min(5, 'Gift card code is too short'),
  pin: z.string().optional(),
  price: z.string().min(1, 'Enter selling price'),
  sellerWallet: z.string().startsWith('0x', 'Enter a valid ETH/USDC wallet address (starting with 0x)'),
});

type FormData = z.infer<typeof formSchema>;

export function SellerCardForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { register, handleSubmit, formState: { errors }, watch, trigger } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
    }
  });

  const nextStep = async () => {
    const fieldsToValidate = step === 1 
      ? ['retailer', 'value', 'price', 'cardCode'] 
      : ['sellerWallet'];
    
    const isValid = await trigger(fieldsToValidate as any);
    if (isValid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('retailer', data.retailer);
      formData.append('value', data.value);
      formData.append('price', data.price);
      formData.append('card_code', data.cardCode);
      formData.append('card_pin', data.pin || '');
      formData.append('seller_wallet_address', data.sellerWallet);
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      const response = await fetch('http://localhost:4000/cards/sell', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Submission failed');
      
      setSuccess(true);
    } catch (e) {
      console.error(e);
      alert('Error listing card. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 px-6 bg-white rounded-[2rem] shadow-xl border border-slate-100"
      >
        <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-10 h-10 text-brand" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4">Card Listed Successfully!</h2>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          Your gift card is now active in the marketplace. You will receive payment automatically to your wallet after the 24-hour hold period once sold.
        </p>
        <Button onClick={() => window.location.reload()} className="bg-brand hover:bg-brand/90 text-white rounded-xl px-8 h-12 font-bold">
          List Another Card
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Header */}
      <div className="flex justify-between items-center mb-10 px-2">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
              step >= s ? 'bg-brand text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              {s}
            </div>
            {s === 1 && <div className={`w-24 h-1 mx-4 rounded-full transition-all ${
              step > 1 ? 'bg-brand' : 'bg-slate-100'
            }`} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-[2rem] p-8 shadow-2xl border border-slate-100 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-1">Enter Card Details</h2>
                <p className="text-slate-500 text-sm mb-6">Provide the details for each gift card you want to sell</p>
              </div>

              {/* Retailer Section */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Retailer</label>
                <select 
                  {...register('retailer')}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-brand focus:border-transparent"
                >
                  <option value="">Select Retailer</option>
                  {RETAILERS.map(r => (
                    <option key={r.id} value={r.name}>{r.name}</option>
                  ))}
                </select>
                {errors.retailer && <p className="text-xs text-cta mt-1 font-medium">{errors.retailer.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Card Value (£)</label>
                  <input 
                    type="text"
                    placeholder="e.g. 100"
                    {...register('value')}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-brand"
                  />
                  {errors.value && <p className="text-xs text-cta mt-1 font-medium">{errors.value.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Selling Price (£)</label>
                  <input 
                    type="text"
                    placeholder="e.g. 90"
                    {...register('price')}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-brand"
                  />
                  {errors.price && <p className="text-xs text-cta mt-1 font-medium">{errors.price.message}</p>}
                </div>
              </div>

              {/* Upload Section */}
              <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 text-center group hover:border-brand/50 transition-colors">
                <input 
                  type="file" 
                  id="card-upload" 
                  className="hidden" 
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
                <label htmlFor="card-upload" className="cursor-pointer flex flex-col items-center">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6 text-slate-400 group-hover:text-brand" />
                  </div>
                  <p className="text-sm font-bold text-slate-700">
                    {selectedFile ? selectedFile.name : 'Upload card image *'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Auto-extracts code & PIN (Mock)</p>
                </label>
              </div>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-bold">or enter details manually</span></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gift Card Code *</label>
                  <input 
                    type="text"
                    placeholder="Enter gift card code"
                    {...register('cardCode')}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-brand"
                  />
                  {errors.cardCode && <p className="text-xs text-cta mt-1 font-medium">{errors.cardCode.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">PIN *</label>
                  <input 
                    type="text"
                    placeholder="Enter PIN"
                    {...register('pin')}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-brand"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  type="button" 
                  onClick={nextStep}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white h-14 rounded-xl text-lg font-bold flex items-center justify-center gap-2 group"
                >
                  Continue to Payout Method
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-1">Payout Information</h2>
                <p className="text-slate-500 text-sm mb-6">Where should we send your cryptocurrency?</p>
              </div>

              <div className="bg-brand/5 p-6 rounded-2xl border border-brand/10 mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Crypto Wallet Address</h3>
                    <p className="text-xs text-slate-500 font-medium">Compatible with ETH & USDC (ERC-20)</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <input 
                    type="text"
                    placeholder="0x..."
                    {...register('sellerWallet')}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm font-mono font-medium outline-none transition-all focus:ring-2 focus:ring-brand"
                  />
                  {errors.sellerWallet && <p className="text-xs text-cta mt-1 font-medium">{errors.sellerWallet.message}</p>}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <ShieldCheck className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Funds are held for 24 hours after purchase to ensure buyer safety. Payouts are processed automatically to the address provided above.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button 
                  type="button" 
                  onClick={prevStep}
                  variant="outline"
                  className="flex-1 border-slate-200 text-slate-600 h-14 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] bg-brand hover:bg-brand/90 text-white h-14 rounded-xl text-lg font-bold flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      List Card for Sale
                      <Plus className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
