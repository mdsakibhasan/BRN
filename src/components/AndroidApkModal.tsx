import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Smartphone, 
  Check, 
  Copy, 
  ExternalLink, 
  X, 
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Share2,
  Layers,
  ArrowDownCircle,
  ShieldCheck,
  Terminal,
  QrCode
} from 'lucide-react';
import QRCode from 'qrcode';

interface AndroidApkModalProps {
  isOpen: boolean;
  onClose: () => void;
  isBn?: boolean;
}

export const AndroidApkModal: React.FC<AndroidApkModalProps> = ({
  isOpen,
  onClose,
  isBn = true
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'direct_install' | 'pwabuilder' | 'cli'>('direct_install');

  // Compute public clean URL for mobile devices
  const getAppUrl = () => {
    let url = window.location.href;
    if (url.includes('ais-dev-')) {
      url = url.replace('ais-dev-', 'ais-pre-');
    }
    return url;
  };

  const currentUrl = getAppUrl();
  // PWABuilder direct packaging URL
  const pwaBuilderUrl = `https://www.pwabuilder.com?site=${encodeURIComponent(currentUrl)}`;

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(currentUrl, {
        width: 240,
        margin: 1.5,
        color: {
          dark: '#1c1917',
          light: '#ffffff'
        }
      }).then(setQrCodeUrl).catch(console.error);
    }
  }, [isOpen, currentUrl]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const bubblewrapCommand = `npm i -g @bubblewrap/cli\nbubblewrap init --manifest="${currentUrl}manifest.webmanifest"\nbubblewrap build`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(bubblewrapCommand);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        id="android-apk-modal"
        className="bg-stone-900 border border-stone-700 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl text-stone-100 flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 flex items-center justify-between text-white relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold">
              <Smartphone className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg flex items-center gap-2">
                {isBn ? 'Android APK ও ইন্সটল ব্যবস্থা' : 'Android APK & Installation'}
                <span className="text-[10px] font-black bg-black/40 px-2 py-0.5 rounded-full uppercase tracking-wider text-emerald-200">
                  Android APK
                </span>
              </h3>
              <p className="text-xs text-emerald-100 font-medium">
                {isBn 
                  ? 'অ্যান্ড্রয়েড ফোনে সরাসরি ১-ট্যাপে ইন্সটল ও APK প্যাকেজ' 
                  : 'Install instantly on Android or generate APK package'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab selector */}
        <div className="flex border-b border-stone-800 bg-stone-950/80 p-1.5 gap-1 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('direct_install')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'direct_install'
                ? 'bg-emerald-500 text-stone-950 shadow-md font-extrabold'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <ArrowDownCircle className="w-3.5 h-3.5" />
            <span>{isBn ? '⚡ সরাসরি ১-ক্লিক ইন্সটল' : 'Direct Install'}</span>
          </button>

          <button
            onClick={() => setActiveTab('pwabuilder')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'pwabuilder'
                ? 'bg-emerald-500 text-stone-950 shadow-md font-extrabold'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isBn ? '📦 ১-ক্লিকে APK জেনারেটর' : '1-Click APK Builder'}</span>
          </button>

          <button
            onClick={() => setActiveTab('cli')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'cli'
                ? 'bg-emerald-500 text-stone-950 shadow-md font-extrabold'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{isBn ? '💻 CLI দিয়ে তৈরি' : 'Google TWA Build'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-sm">
          {activeTab === 'direct_install' && (
            <div className="space-y-4">
              {/* Highlight card */}
              <div className="bg-gradient-to-r from-emerald-950/70 to-stone-900 border border-emerald-500/40 rounded-2xl p-4 text-xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isBn ? 'অ্যান্ড্রয়েডে কোনো ঝামেলা ছাড়া দ্রুততম ইন্সটল' : 'Fastest Android Installation'}</span>
                </div>
                <p className="text-stone-300 leading-relaxed">
                  {isBn 
                    ? 'অ্যান্ড্রয়েড ফোনে Chrome দিয়ে লিংকটি ওপেন করলে স্বয়ংক্রিয়ভাবে "Install App" পপ-আপ আসে। ইন্সটল চাপলেই প্লে-স্টোরের মতো অরিজিনাল অ্যাপ আইকন ফোনের স্ক্রিনে চলে আসে।'
                    : 'Open link in Android Chrome to see the 1-tap "Install App" prompt. Works natively with full screen and push notifications.'}
                </p>
              </div>

              {/* QR and Copy Link */}
              <div className="bg-stone-800/80 border border-stone-700 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
                <div className="bg-white p-2.5 rounded-2xl shrink-0 shadow-lg flex flex-col items-center">
                  {qrCodeUrl ? (
                    <img 
                      src={qrCodeUrl} 
                      alt="Android QR Code" 
                      className="w-36 h-36 rounded-lg"
                    />
                  ) : (
                    <div className="w-36 h-36 bg-stone-100 flex items-center justify-center text-stone-400">
                      <QrCode className="w-8 h-8 animate-spin" />
                    </div>
                  )}
                  <span className="text-[9px] text-stone-800 font-black mt-1 uppercase tracking-wider">
                    Scan on Android Phone
                  </span>
                </div>

                <div className="flex-1 space-y-2.5 text-center sm:text-left">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                    <Sparkles className="w-3 h-3" />
                    {isBn ? 'পাবলিক অ্যান্ড্রয়েড লিংক' : 'Public Android URL'}
                  </span>
                  <h4 className="font-extrabold text-white text-base">
                    {isBn ? 'আপনার অ্যান্ড্রয়েডে ওপেন করুন' : 'Open on your Android device'}
                  </h4>
                  <p className="text-stone-300 text-xs leading-relaxed">
                    {isBn 
                      ? 'নিচের লিংকটি কপি করে আপনার অ্যান্ড্রয়েড ফোনের Chrome ব্রাউজারে পেস্ট করুন বা কিউআর কোড স্ক্যান করুন:' 
                      : 'Copy link to open in Android Chrome:'}
                  </p>
                  
                  <div className="pt-1 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <button
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-stone-950 font-black" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? (isBn ? 'লিংক কপি হয়েছে!' : 'Link Copied!') : (isBn ? 'লিংক কপি করুন' : 'Copy Link')}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 3 Step Android Guide */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-400">
                  {isBn ? 'অ্যান্ড্রয়েড ফোনে ৩টি সহজ ধাপ:' : '3 Simple Steps on Android:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-3 bg-stone-800/60 border border-stone-700/70 rounded-xl space-y-1">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-stone-950 font-black text-[11px] flex items-center justify-center">১</span>
                    <strong className="text-white block font-bold">লিংক খুলুন</strong>
                    <p className="text-stone-400 text-[11px]">Android ফোনের Chrome ব্রাউজারে লিংকটি ওপেন করুন।</p>
                  </div>

                  <div className="p-3 bg-stone-800/60 border border-stone-700/70 rounded-xl space-y-1">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-stone-950 font-black text-[11px] flex items-center justify-center">২</span>
                    <strong className="text-white block font-bold">ইন্সটল ব্যানার</strong>
                    <p className="text-stone-400 text-[11px]">নিচে স্বয়ংক্রিয়ভাবে "Add to Home screen" বা "Install" বাটন আসবে।</p>
                  </div>

                  <div className="p-3 bg-stone-800/60 border border-stone-700/70 rounded-xl space-y-1">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-stone-950 font-black text-[11px] flex items-center justify-center">৩</span>
                    <strong className="text-white block font-bold">অ্যাপ রেডি</strong>
                    <p className="text-stone-400 text-[11px]">ট্যাপ করলেই প্লে-স্টোর অ্যাপের মতো অ্যান্ড্রয়েডে ইন্সটল হয়ে যাবে।</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pwabuilder' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-stone-800 via-stone-850 to-stone-900 border border-stone-700 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    অফিসিয়াল APK ও AAB প্যাকেজার
                  </span>
                  <Download className="w-4 h-4 text-emerald-400" />
                </div>

                <h4 className="text-sm font-extrabold text-white">
                  PWABuilder দিয়ে ১-ক্লিকে Android APK ডাউনলোড করুন
                </h4>

                <p className="text-xs text-stone-300 leading-relaxed">
                  PWABuilder (Microsoft & Google স্পনসরড) আপনার এই অ্যাপের কোডটি স্বয়ংক্রিয়ভাবে স্ক্যান করে সম্পূর্ণ সাইনড <strong>.apk</strong> ও Google Play Store-এর জন্য <strong>.aab</strong> ফাইল তৈরি করে দেয়।
                </p>

                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-xs space-y-1.5">
                  <div className="text-stone-400">অ্যাপের ম্যানিফেস্ট লিংক:</div>
                  <div className="font-mono text-[11px] text-emerald-400 break-all select-all">
                    {currentUrl}manifest.webmanifest
                  </div>
                </div>

                <a
                  href={pwaBuilderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-stone-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <span>PWABuilder-এ APK প্যাকেজ তৈরি করুন</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="text-xs text-stone-400 space-y-1 bg-stone-950/60 p-3 rounded-xl border border-stone-800">
                <p className="font-bold text-stone-300">PWABuilder-এ যাওয়ার পর করণীয়:</p>
                <p>১. সাইটটিতে প্রবেশ করে "Start" বাটনে চাপুন।</p>
                <p>২. "Package for Stores" এ গিয়ে <strong>Android</strong> সিলেক্ট করুন।</p>
                <p>৩. "Generate Package" দিলেই সরাসরি আপনার ফোনে বা পিসিতে .apk ফাইল ডাউনলোড হয়ে যাবে!</p>
              </div>
            </div>
          )}

          {activeTab === 'cli' && (
            <div className="space-y-3">
              <div className="bg-stone-800/80 border border-stone-700 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <Terminal className="w-4 h-4" />
                  <span>Google Bubblewrap (Official TWA CLI)</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  গুগলের অফিসিয়াল Bubblewrap CLI ব্যবহার করে টার্মিনাল থেকে প্রফেশনাল Android APK তৈরি করতে নিচের কমান্ডগুলো ব্যবহার করুন:
                </p>

                <div className="bg-stone-950 p-3 rounded-xl font-mono text-[11px] text-emerald-300 overflow-x-auto space-y-1.5 border border-stone-800 relative">
                  <div className="text-stone-500"># ১. Google Bubblewrap CLI ইনস্টল</div>
                  <div>npm i -g @bubblewrap/cli</div>
                  <div className="text-stone-500 mt-2"># ২. ম্যানিফেস্ট দিয়ে প্রোজেক্ট শুরু</div>
                  <div>bubblewrap init --manifest="{currentUrl}manifest.webmanifest"</div>
                  <div className="text-stone-500 mt-2"># ৩. সরাসরি APK ও AAB বিল্ড</div>
                  <div>bubblewrap build</div>
                  
                  <button
                    onClick={handleCopyScript}
                    className="mt-3 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedScript ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedScript ? 'কমান্ড কপি হয়েছে' : 'কমান্ডগুলো কপি করুন'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between">
          <span className="text-[11px] text-stone-400">
            {isBn ? 'Android • Bangla Ruti Network (BRN)' : 'Android • Bangla Ruti Network (BRN)'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors cursor-pointer"
          >
            {isBn ? 'ঠিক আছে' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
