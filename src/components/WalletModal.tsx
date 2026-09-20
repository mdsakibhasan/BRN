import React, { useState } from 'react';
import { 
  X, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Smartphone, 
  CreditCard, 
  Sparkles, 
  History,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WalletTransaction, Language } from '../types';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  walletBalance: number;
  transactions: WalletTransaction[];
  onTopUpSuccess: (amount: number, method: 'bKash' | 'Nagad', trxId: string) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  language,
  walletBalance,
  transactions,
  onTopUpSuccess
}) => {
  const isBn = language === 'bn';
  const [selectedMethod, setSelectedMethod] = useState<'bKash' | 'Nagad'>('bKash');
  const [amount, setAmount] = useState<number>(200);
  const [phone, setPhone] = useState<string>('01711987654');
  const [otp, setOtp] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const [step, setStep] = useState<'amount' | 'phone' | 'otp' | 'pin' | 'success'>('amount');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [generatedTrxId, setGeneratedTrxId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'recharge' | 'history'>('recharge');

  if (!isOpen) return null;

  const quickAmounts = [100, 200, 300, 500, 1000];

  const handleStartRecharge = () => {
    if (amount < 20) return;
    setStep('phone');
  };

  const handleSendOtp = () => {
    if (!phone || phone.length < 11) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('otp');
    }, 800);
  };

  const handleVerifyOtp = () => {
    if (!otp) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('pin');
    }, 600);
  };

  const handleCompletePin = () => {
    if (!pin) return;
    setIsProcessing(true);

    setTimeout(() => {
      const prefix = selectedMethod === 'bKash' ? 'BKS' : 'NGD';
      const randomTrx = prefix + Math.random().toString(36).substring(2, 9).toUpperCase();
      setGeneratedTrxId(randomTrx);
      setIsProcessing(false);
      setStep('success');

      // Trigger celebratory confetti
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });

      // Credit balance to main app
      onTopUpSuccess(amount, selectedMethod, randomTrx);
    }, 1200);
  };

  const resetFlow = () => {
    setStep('amount');
    setOtp('');
    setPin('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">
                {isBn ? 'BRN ওয়ালেট রিচার্জ ও ব্যালেন্স' : 'BRN Ruti Wallet & Top-up'}
              </h2>
              <p className="text-xs text-stone-400">
                {isBn ? 'bKash / Nagad দিয়ে রিচার্জ করে ১৫ মিনিটে অর্ডার করুন' : 'Instant 1-Click Order with In-app Balance'}
              </p>
            </div>
          </div>
          <button 
            id="close-wallet-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-100 uppercase tracking-wider">
                {isBn ? 'বর্তমান ব্যবহারযোগ্য ব্যালেন্স' : 'Available Wallet Balance'}
              </p>
              <p className="text-3xl sm:text-4xl font-black mt-1 tracking-tight">
                ৳{walletBalance}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-100">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                {isBn ? '৫% রুটি বোনাস চালু' : '5% Bonus Active'}
              </span>
              <p className="text-[11px] text-amber-100/90 mt-1">
                {isBn ? 'মিরপুর ১১ ও ১২ এক্সপ্রেস' : 'Mirpur 11/12 Delivery'}
              </p>
            </div>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-stone-200 bg-stone-50">
          <button
            id="tab-wallet-recharge"
            onClick={() => { setActiveTab('recharge'); resetFlow(); }}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'recharge'
                ? 'border-amber-500 text-amber-700 bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>{isBn ? 'টাকা রিচার্জ করুন' : 'Add Money'}</span>
          </button>
          <button
            id="tab-wallet-history"
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'history'
                ? 'border-amber-500 text-amber-700 bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <History className="w-4 h-4" />
            <span>{isBn ? 'লেনদেন হিস্ট্রি' : 'History'}</span>
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'recharge' ? (
            <div>
              {/* Step 1: Select Gateway & Amount */}
              {step === 'amount' && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                      {isBn ? 'পেমেন্ট গেটওয়ে নির্বাচন করুন:' : 'Select Payment Gateway:'}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {/* bKash */}
                      <button
                        type="button"
                        id="select-gateway-bkash"
                        onClick={() => setSelectedMethod('bKash')}
                        className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 transition-all cursor-pointer ${
                          selectedMethod === 'bKash'
                            ? 'border-[#E2136E] bg-pink-50/50 shadow-md shadow-pink-500/10'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#E2136E] text-white flex items-center justify-center font-black text-sm shrink-0">
                          bK
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-black text-stone-900">bKash</p>
                          <p className="text-[11px] text-pink-700 font-semibold">{isBn ? 'বিকাশ পেমেন্ট' : 'Direct Checkout'}</p>
                        </div>
                      </button>

                      {/* Nagad */}
                      <button
                        type="button"
                        id="select-gateway-nagad"
                        onClick={() => setSelectedMethod('Nagad')}
                        className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 transition-all cursor-pointer ${
                          selectedMethod === 'Nagad'
                            ? 'border-[#F7921E] bg-orange-50/50 shadow-md shadow-orange-500/10'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#F7921E] text-white flex items-center justify-center font-black text-sm shrink-0">
                          ন
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-black text-stone-900">Nagad</p>
                          <p className="text-[11px] text-orange-700 font-semibold">{isBn ? 'নগদ পেমেন্ট' : 'Fast Checkout'}</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Preset amounts */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                      {isBn ? 'রিচার্জের পরিমাণ (টাকা):' : 'Recharge Amount (BDT):'}
                    </label>
                    <div className="grid grid-cols-5 gap-2 mb-3">
                      {quickAmounts.map((q) => (
                        <button
                          key={q}
                          type="button"
                          id={`amount-preset-${q}`}
                          onClick={() => setAmount(q)}
                          className={`py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                            amount === q
                              ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                              : 'bg-white text-stone-700 border-stone-200 hover:border-amber-400'
                          }`}
                        >
                          ৳{q}
                        </button>
                      ))}
                    </div>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 font-bold text-lg">
                        ৳
                      </span>
                      <input
                        type="number"
                        id="custom-recharge-amount-input"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full pl-9 pr-4 py-3 rounded-2xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 font-black text-lg text-stone-900 outline-none"
                        placeholder="100"
                        min="20"
                        max="10000"
                      />
                    </div>
                  </div>

                  {/* Info notice */}
                  <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">
                        {isBn ? 'ওয়ালেটের সুবিধা:' : 'Wallet Advantage:'}
                      </p>
                      <p className="text-amber-800 leading-relaxed mt-0.5">
                        {isBn 
                          ? 'একবার bKash বা Nagad দিয়ে ওয়ালেটে রিচার্জ করলে প্রতিবার অর্ডার করার সময় পেমেন্ট করার ঝামেলা থাকবে না। মাত্র ১ ক্লিকে ১৫ মিনিটে গরম রুটি চলে আসবে!'
                          : 'Top-up once to bypass OTP verification on every order. Order hot ruti in a single tap with guaranteed 15-minute delivery!'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    id="wallet-proceed-btn"
                    onClick={handleStartRecharge}
                    className={`w-full py-3.5 rounded-2xl text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                      selectedMethod === 'bKash' 
                        ? 'bg-[#E2136E] hover:bg-[#c00f5c]' 
                        : 'bg-[#F7921E] hover:bg-[#e07d0f]'
                    }`}
                  >
                    <span>{isBn ? `${selectedMethod} দিয়ে ৳${amount} যোগ করুন` : `Add ৳${amount} via ${selectedMethod}`}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Step 2: Phone input */}
              {step === 'phone' && (
                <div className="space-y-4">
                  <div className={`p-4 rounded-2xl text-white flex items-center justify-between ${
                    selectedMethod === 'bKash' ? 'bg-[#E2136E]' : 'bg-[#F7921E]'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5" />
                      <span className="font-extrabold">{selectedMethod} Payment</span>
                    </div>
                    <span className="font-black text-lg">৳{amount}</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {isBn ? `আপনার ${selectedMethod} অ্যাকাউন্ট নম্বর:` : `Your ${selectedMethod} Mobile Number:`}
                    </label>
                    <input
                      type="tel"
                      id="gateway-phone-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:border-amber-500 font-bold text-stone-900 tracking-wider outline-none"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setStep('amount')}
                      className="w-1/3 py-3 rounded-xl border border-stone-300 font-bold text-xs text-stone-600 hover:bg-stone-100 cursor-pointer"
                    >
                      {isBn ? 'বাতিল' : 'Back'}
                    </button>
                    <button
                      type="button"
                      id="gateway-phone-confirm-btn"
                      onClick={handleSendOtp}
                      disabled={isProcessing}
                      className={`w-2/3 py-3 rounded-xl text-white font-bold text-xs cursor-pointer ${
                        selectedMethod === 'bKash' ? 'bg-[#E2136E]' : 'bg-[#F7921E]'
                      }`}
                    >
                      {isProcessing ? (isBn ? 'যাচাই করা হচ্ছে...' : 'Processing...') : (isBn ? 'OTP পাঠান' : 'Send OTP')}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: OTP */}
              {step === 'otp' && (
                <div className="space-y-4">
                  <div className="text-center p-3 bg-stone-100 rounded-2xl">
                    <p className="text-xs text-stone-500">{isBn ? 'ভেরিফিকেশন কোড পাঠানো হয়েছে:' : 'OTP Sent to:'}</p>
                    <p className="font-bold text-stone-900">{phone}</p>
                    <button 
                      type="button"
                      onClick={() => setOtp('654321')}
                      className="text-[11px] text-amber-700 font-bold underline mt-1 cursor-pointer"
                    >
                      {isBn ? 'টেস্ট কোড 654321 অটো-ফিল করুন' : 'Autofill Test Code: 654321'}
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {isBn ? '৬-ডিজিটের ভেরিফিকেশন কোড (OTP):' : '6-Digit Verification Code:'}
                    </label>
                    <input
                      type="text"
                      id="gateway-otp-input"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      placeholder="654321"
                      className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:border-amber-500 text-center font-black text-xl tracking-widest outline-none"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setStep('phone')}
                      className="w-1/3 py-3 rounded-xl border border-stone-300 font-bold text-xs text-stone-600 hover:bg-stone-100 cursor-pointer"
                    >
                      {isBn ? 'পেছনে' : 'Back'}
                    </button>
                    <button
                      type="button"
                      id="gateway-otp-confirm-btn"
                      onClick={handleVerifyOtp}
                      disabled={isProcessing}
                      className={`w-2/3 py-3 rounded-xl text-white font-bold text-xs cursor-pointer ${
                        selectedMethod === 'bKash' ? 'bg-[#E2136E]' : 'bg-[#F7921E]'
                      }`}
                    >
                      {isProcessing ? (isBn ? 'যাচাই হচ্ছে...' : 'Verifying...') : (isBn ? 'কোড কনফার্ম করুন' : 'Confirm Code')}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: PIN */}
              {step === 'pin' && (
                <div className="space-y-4">
                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-center">
                    <Lock className="w-6 h-6 text-stone-700 mx-auto mb-1" />
                    <p className="text-xs font-bold text-stone-800">
                      {isBn ? `${selectedMethod} পিন প্রবেশ করান:` : `Enter your ${selectedMethod} PIN:`}
                    </p>
                    <p className="text-[11px] text-stone-500">
                      {isBn ? 'টাকা অবিলম্বে আপনার BRN ওয়ালেটে যুক্ত হবে' : 'Secure gateway transfer directly into BRN Wallet'}
                    </p>
                    <button 
                      type="button"
                      onClick={() => setPin('12345')}
                      className="text-[11px] text-amber-700 font-bold underline mt-1 cursor-pointer"
                    >
                      {isBn ? 'টেস্ট পিন 12345 অটো-ফিল করুন' : 'Autofill Test PIN: 12345'}
                    </button>
                  </div>

                  <div>
                    <input
                      type="password"
                      id="gateway-pin-input"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      maxLength={5}
                      placeholder="•••••"
                      className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:border-amber-500 text-center font-black text-2xl tracking-widest outline-none"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setStep('otp')}
                      className="w-1/3 py-3 rounded-xl border border-stone-300 font-bold text-xs text-stone-600 hover:bg-stone-100 cursor-pointer"
                    >
                      {isBn ? 'পেছনে' : 'Back'}
                    </button>
                    <button
                      type="button"
                      id="gateway-pin-submit-btn"
                      onClick={handleCompletePin}
                      disabled={isProcessing}
                      className={`w-2/3 py-3.5 rounded-xl text-white font-extrabold text-sm cursor-pointer shadow-md ${
                        selectedMethod === 'bKash' ? 'bg-[#E2136E] hover:bg-[#c00f5c]' : 'bg-[#F7921E] hover:bg-[#e07d0f]'
                      }`}
                    >
                      {isProcessing ? (isBn ? 'রিচার্জ সম্পন্ন হচ্ছে...' : 'Crediting Balance...') : (isBn ? `৳${amount} নিশ্চিত করুন` : `Confirm ৳${amount}`)}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Success */}
              {step === 'success' && (
                <div className="text-center py-4 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-stone-900">
                      {isBn ? 'রিচার্জ সফল হয়েছে!' : 'Wallet Top-up Successful!'}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      {isBn ? `${selectedMethod} থেকে ৳${amount} আপনার BRN অ্যাকাউন্টে যুক্ত হয়েছে।` : `৳${amount} has been added to your BRN Ruti balance via ${selectedMethod}.`}
                    </p>
                  </div>

                  <div className="bg-stone-100 rounded-2xl p-3 text-xs text-stone-700 font-mono flex items-center justify-between">
                    <span className="text-stone-500">TrxID:</span>
                    <span className="font-bold text-stone-900">{generatedTrxId}</span>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      id="wallet-done-close-btn"
                      onClick={onClose}
                      className="w-full py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm cursor-pointer shadow-md"
                    >
                      {isBn ? 'এখনই গরম রুটি অর্ডার করুন' : 'Order Hot Ruti Now'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Transaction History */
            <div className="space-y-3">
              {transactions.length === 0 ? (
                <div className="text-center py-8 text-stone-400 text-xs">
                  {isBn ? 'এখনও কোনো লেনদেন হয়নি' : 'No transactions recorded yet'}
                </div>
              ) : (
                transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-3 rounded-2xl border border-stone-200 hover:border-stone-300 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        tx.type === 'credit'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {tx.type === 'credit' ? (
                          <ArrowDownLeft className="w-4 h-4" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-900">{tx.note}</p>
                        <p className="text-[10px] text-stone-400">{tx.date} • {tx.trxId}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-sm font-black ${
                        tx.type === 'credit' ? 'text-emerald-600' : 'text-stone-900'
                      }`}>
                        {tx.type === 'credit' ? '+' : '-'}৳{tx.amount}
                      </span>
                      <span className="block text-[10px] text-stone-400 font-medium">
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
