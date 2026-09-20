import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Share2, 
  PlusSquare, 
  Check, 
  Copy, 
  QrCode, 
  ExternalLink, 
  X, 
  Apple, 
  Terminal, 
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  HelpCircle,
  KeyRound
} from 'lucide-react';
import QRCode from 'qrcode';

interface IPhoneInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isBn: boolean;
}

export const IPhoneInstallModal: React.FC<IPhoneInstallModalProps> = ({
  isOpen,
  onClose,
  isBn
}) => {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'pwa' | 'security_fix' | 'ipa'>('security_fix');

  // Compute the clean, public shared URL without Google Cloud Run authentication lock
  const getPublicUrl = () => {
    let url = window.location.href;
    // Replace internal dev container subdomain with public preview subdomain
    if (url.includes('ais-dev-')) {
      url = url.replace('ais-dev-', 'ais-pre-');
    }
    return url;
  };

  const publicAppUrl = getPublicUrl();

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(publicAppUrl, {
        width: 260,
        margin: 1.5,
        color: {
          dark: '#1c1917',
          light: '#ffffff'
        }
      }).then((url) => setQrDataUrl(url))
        .catch((err) => console.error('QR code generation error:', err));
    }
  }, [isOpen, publicAppUrl]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicAppUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        id="iphone-install-modal"
        className="bg-stone-900 border border-stone-700 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl text-stone-100 flex flex-col max-h-[94vh]"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 flex items-center justify-between text-white relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold">
              <Apple className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg flex items-center gap-2">
                {isBn ? 'iPhone 15 ইনস্টলেশন ও সিকিউরিটি সমাধান' : 'iPhone 15 Install & Security Fix'}
                <span className="text-[10px] font-black bg-black/40 px-2 py-0.5 rounded-full uppercase tracking-wider text-amber-200">
                  iOS 17/18 Fix
                </span>
              </h3>
              <p className="text-xs text-amber-100 font-medium">
                {isBn 
                  ? 'নিরাপদে ও কোনো বাধা ছাড়াই সাফারিতে অ্যাপ চালু করুন' 
                  : 'Run safely on iPhone Safari without security blocks'}
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
            onClick={() => setActiveTab('security_fix')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'security_fix'
                ? 'bg-amber-500 text-stone-950 shadow-md font-extrabold'
                : 'text-amber-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{isBn ? '🛡️ সিকিউরিটি ইস্যু সমাধান' : 'Security Issue Fix'}</span>
          </button>

          <button
            onClick={() => setActiveTab('pwa')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'pwa'
                ? 'bg-amber-500 text-stone-950 shadow-md font-extrabold'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{isBn ? '📱 পাবলিক কিউআর কোড' : 'Public QR & Link'}</span>
          </button>

          <button
            onClick={() => setActiveTab('ipa')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'ipa'
                ? 'bg-amber-500 text-stone-950 shadow-md font-extrabold'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{isBn ? '💻 Flutter IPA বিল্ড' : 'Flutter IPA'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-sm">
          {activeTab === 'security_fix' && (
            <div className="space-y-4">
              {/* Alert Callout explaining the exact cookie and security popup in the screenshot */}
              <div className="bg-gradient-to-r from-red-950/80 via-stone-900 to-red-950/80 border-2 border-red-500/60 rounded-2xl p-4 text-xs space-y-3 shadow-lg">
                <div className="flex items-center gap-2 text-red-400 font-extrabold text-sm">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <span>{isBn ? 'স্ক্রিনশটের "Action required to load your app" সমাধান' : 'Fixing "Action required to load your app"'}</span>
                </div>
                <div className="bg-stone-950/80 p-3 rounded-xl border border-red-500/30 text-stone-200 space-y-2">
                  <p className="font-bold text-amber-300">
                    {isBn 
                      ? '👉 স্ক্রিনে যে "Authenticate in new window" বাটনটি এসেছে, সেখানে ক্লিক করলেই অ্যাপ ওপেন হয়ে যাবে!'
                      : '👉 Simply tap "Authenticate in new window" on your screen to load the app!'}
                  </p>
                  <p className="text-[11px] text-stone-300 leading-relaxed">
                    {isBn 
                      ? 'আইফোনের Safari ব্রাউজারে ডিফল্টভাবে "Prevent Cross-Site Tracking" চালু থাকে, যার ফলে গুগল ক্লাউড সিকিউরিটি কুকি সেট করতে কনফার্মেশন চায়। বাটনটিতে ট্যাপ করে গুগল অ্যাকাউন্ট ভেরিফাই করলেই অ্যাপ চালু হবে।' 
                      : 'Safari blocks authentication cookies by default. Tapping the button authorizes the cookie and opens the app.'}
                  </p>
                </div>
              </div>

              {/* 2 Easy Fixes for iPhone 15 */}
              <div className="space-y-2.5">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{isBn ? 'আপনার iPhone 15-এ মাত্র ২ ধাপে সমাধান:' : '2 Easy Steps for iPhone 15:'}</span>
                </h4>

                {/* Option 1: Tap the button */}
                <div className="bg-stone-800/90 border border-emerald-500/40 p-3.5 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-lg border border-emerald-600/40">
                      পদ্ধতি ১: সরাসরি স্ক্রিনের বাটনে চাপুন (সবচেয়ে সহজ)
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-xs text-stone-300 space-y-1.5 leading-relaxed">
                    <p>
                      ১. আপনার ফোনের স্ক্রিনে যে <strong>"Authenticate in new window"</strong> বাটনটি দেখা যাচ্ছে, সেটিতে একবার ট্যাপ করুন।
                    </p>
                    <p>
                      ২. একটি ছোট পপ-আপ উইন্ডো ওপেন হয়ে আপনার গুগল পারমিশন ভেরিফাই করবে।
                    </p>
                    <p>
                      ৩. ভেরিফাই হওয়া মাত্র আপনার পুরো <strong>Bangla Ruti Network</strong> অ্যাপটি সাফারিতে লোড হয়ে যাবে!
                    </p>
                  </div>
                </div>

                {/* Option 2: Safari Settings */}
                <div className="bg-stone-800/90 border border-stone-700 p-3.5 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-lg border border-amber-600/40">
                      পদ্ধতি ২: আইফোনের Safari সেটিংসে ১টি অপশন বন্ধ করুন
                    </span>
                    <KeyRound className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="text-xs text-stone-300">
                    বাটন কাজ না করলে বা বারবার একই মেসেজ আসলে:
                  </p>
                  <div className="text-xs text-stone-300 space-y-1.5 leading-relaxed bg-stone-950/70 p-2.5 rounded-xl border border-stone-800">
                    <p>১. আপনার iPhone-এর <strong>Settings (সেটিংস)</strong> অ্যাপে যান।</p>
                    <p>২. নিচে স্ক্রোল করে <strong>Safari</strong> অপশনে চাপুন।</p>
                    <p>৩. নিচে <em>"Privacy & Security"</em> সেকশনে গিয়ে <strong>"Prevent Cross-Site Tracking"</strong> অপশনটি <strong>OFF (বন্ধ)</strong> করে দিন।</p>
                    <p>৪. Safari-তে ফিরে এসে রিলোড (🔄) করুন — আর কখনোই এই সিকিউরিটি মেসেজ আসবে না!</p>
                  </div>
                </div>

                {/* Fix Step 3 */}
                <div className="bg-stone-800/80 border border-stone-700 p-3.5 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-600/40">
                      ধাপ ৩: সাফারিতে হোম স্ক্রিনে যোগ করুন (কোনো ফাইল ডাউনলোড নয়)
                    </span>
                    <PlusSquare className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-xs text-stone-300">
                    {isBn 
                      ? 'আইফোনে APK এর মতো কোনো এক্সটার্নাল ফাইল ডাউনলোড করবেন না (আইফোনে কোনো ফাইল ডাউনলোড করতে গেলে iOS ব্লক করে)। শুধুমাত্র সাফারির নিচে শেয়ার আইকন (Square with arrow) চাপুন এবং "Add to Home Screen" দিন।' 
                      : 'Do not download any APK or profile. Simply tap Share -> Add to Home Screen in Safari.'}
                  </p>
                </div>
              </div>

              {/* Action Button to switch to QR code */}
              <button
                onClick={() => setActiveTab('pwa')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>সরাসরি ক্যামেরা দিয়ে স্ক্যান করতে কিউআর কোড দেখুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {activeTab === 'pwa' && (
            <div className="space-y-4">
              {/* QR Code and Quick Link Card */}
              <div className="bg-stone-800/80 border border-stone-700 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
                <div className="bg-white p-2.5 rounded-2xl shrink-0 shadow-lg flex flex-col items-center">
                  {qrDataUrl ? (
                    <img 
                      src={qrDataUrl} 
                      alt="iPhone 15 Clean Public Install QR Code" 
                      className="w-40 h-40 rounded-lg"
                    />
                  ) : (
                    <div className="w-40 h-40 bg-stone-100 flex items-center justify-center text-stone-400">
                      <QrCode className="w-10 h-10 animate-spin" />
                    </div>
                  )}
                  <span className="text-[10px] text-stone-800 font-black mt-1 uppercase tracking-wider">
                    Scan with iPhone 15 Camera
                  </span>
                </div>

                <div className="flex-1 space-y-2.5 text-center sm:text-left">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                    <Sparkles className="w-3 h-3" />
                    {isBn ? 'পাবলিক সুরক্ষিত লিংক (No Login Required)' : 'Public Secure URL'}
                  </span>
                  <h4 className="font-extrabold text-white text-base">
                    {isBn ? 'আইফোনের ক্যামেরা দিয়ে সরাসরি স্ক্যান করুন' : 'Scan with iPhone Camera'}
                  </h4>
                  <p className="text-stone-300 text-xs leading-relaxed">
                    {isBn 
                      ? 'আপনার iPhone 15-এর ক্যামেরা ওপেন করে কিউআর কোডের দিকে ধরুন এবং সাফারিতে ওপেন করে নিচে Share -> Add to Home Screen করুন।' 
                      : 'Open Camera, point to QR code, tap yellow link to open in Safari, then tap Share -> Add to Home Screen.'}
                  </p>
                  
                  <div className="pt-1 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <button
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-950 font-black" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? (isBn ? 'লিংক কপি হয়েছে!' : 'Link Copied!') : (isBn ? 'পাবলিক লিংক কপি করুন' : 'Copy Public URL')}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 3 Step Visual Guide */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="bg-stone-800/60 border border-stone-700/80 p-3 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-black text-xs flex items-center justify-center">১</span>
                    <ExternalLink className="w-4 h-4 text-stone-400" />
                  </div>
                  <strong className="text-white text-xs font-bold block mb-1">
                    {isBn ? 'Safari-তে লিংক খুলুন' : 'Open in Safari'}
                  </strong>
                  <p className="text-[11px] text-stone-400 leading-snug">
                    {isBn ? 'আইফোনের নিজস্ব Safari ব্রাউজারে লিংকটি চালু করুন।' : 'Open URL inside native iOS Safari.'}
                  </p>
                </div>

                <div className="bg-stone-800/60 border border-stone-700/80 p-3 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-black text-xs flex items-center justify-center">২</span>
                    <Share2 className="w-4 h-4 text-sky-400" />
                  </div>
                  <strong className="text-white text-xs font-bold block mb-1">
                    {isBn ? 'নীল Share বাটন চাপুন' : 'Tap Share Icon'}
                  </strong>
                  <p className="text-[11px] text-stone-400 leading-snug">
                    {isBn ? 'সাফারির নিচে থাকা শেয়ার আইকনে ট্যাপ করুন।' : 'Tap the share button at bottom bar.'}
                  </p>
                </div>

                <div className="bg-stone-800/60 border border-stone-700/80 p-3 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-stone-950 font-black text-xs flex items-center justify-center">৩</span>
                    <PlusSquare className="w-4 h-4 text-emerald-400" />
                  </div>
                  <strong className="text-white text-xs font-bold block mb-1">
                    {isBn ? 'Add to Home Screen' : 'Add to Home Screen'}
                  </strong>
                  <p className="text-[11px] text-stone-400 leading-snug">
                    {isBn ? '"হোম স্ক্রিনে যোগ করুন" চাপলেই আইকন চলে আসবে।' : 'Tap Add to Home Screen and done!'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ipa' && (
            <div className="space-y-3">
              <div className="bg-stone-800/80 border border-stone-700 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
                  <Terminal className="w-4 h-4" />
                  <span>{isBn ? 'Flutter ও Xcode দিয়ে iOS .ipa বিল্ড' : 'Build iOS .ipa package'}</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {isBn 
                    ? 'আপনি যদি একজন ডেভেলপার হন এবং Mac ব্যবহার করে সরাসরি .ipa ফাইল দিয়ে আইফোন 15-এ রান করাতে চান:' 
                    : 'If you want to package an unsigned .ipa for TestFlight or sideloading:'}
                </p>

                <div className="bg-stone-950 p-3 rounded-xl font-mono text-[11px] text-amber-300 overflow-x-auto space-y-1.5 border border-stone-800">
                  <div className="text-stone-500"># ১. ডিপেনডেন্সি ইন্সটল</div>
                  <div>flutter pub get</div>
                  <div className="text-stone-500 mt-2"># ২. iOS Pods তৈরি</div>
                  <div>cd ios &amp;&amp; pod install &amp;&amp; cd ..</div>
                  <div className="text-stone-500 mt-2"># ৩. আনসাইনড .ipa বিল্ড</div>
                  <div>flutter build ipa --no-codesign</div>
                  <div className="text-stone-500 mt-2"># ৪. Xcode-এ রান করুন</div>
                  <div>open ios/Runner.xcworkspace</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between">
          <span className="text-[11px] text-stone-400">
            {isBn ? 'iPhone 15 • Bangla Ruti Network (BRN)' : 'iPhone 15 • Bangla Ruti Network (BRN)'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors cursor-pointer"
          >
            {isBn ? 'ঠিক আছে, বুঝেছি' : 'Understood'}
          </button>
        </div>
      </div>
    </div>
  );
};
