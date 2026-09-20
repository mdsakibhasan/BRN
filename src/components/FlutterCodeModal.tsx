import React, { useState } from 'react';
import { X, Code2, Copy, Check, Download, FileCode, Terminal, Sparkles, ExternalLink } from 'lucide-react';
import { FLUTTER_CODE_FILES } from '../data/flutterCode';
import { Language } from '../types';

interface FlutterCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const FlutterCodeModal: React.FC<FlutterCodeModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const isBn = language === 'bn';
  const [selectedFileIndex, setSelectedFileIndex] = useState(1); // default to main.dart
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentFile = FLUTTER_CODE_FILES[selectedFileIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([currentFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentFile.filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="bg-stone-900 rounded-3xl max-w-4xl w-full h-[88vh] overflow-hidden shadow-2xl border border-stone-800 flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-stone-950 text-white border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  {isBn ? 'Flutter (Dart) সোর্স কোড এক্সপোর্টার' : 'Flutter (Dart) Production Source Code'}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Dart 3 / Material 3
                </span>
              </div>
              <p className="text-xs text-stone-400">
                {isBn 
                  ? 'Project IDX, VS Code অথবা Android Studio-তে সরাসরি পেস্ট করে রান করতে পারেন' 
                  : 'Ready to run in Google Project IDX, Cursor, or VS Code with Flutter SDK'}
              </p>
            </div>
          </div>

          <button
            id="close-flutter-code-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Instructions banner */}
        <div className="bg-gradient-to-r from-sky-950 to-stone-900 px-5 py-2.5 border-b border-stone-800 text-xs text-stone-300 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-sky-400" />
            <span>
              {isBn 
                ? 'কমান্ড: flutter create bangla_ruti_network && flutter run' 
                : 'Terminal: flutter create bangla_ruti_network && flutter run'}
            </span>
          </div>
          <a
            href="https://idx.google.com"
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 hover:text-sky-300 flex items-center gap-1 font-bold underline"
          >
            <span>Google Project IDX</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Main code workspace */}
        <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
          {/* File sidebar */}
          <div className="w-full sm:w-64 bg-stone-950/80 border-r border-stone-800/80 p-3 overflow-y-auto space-y-1">
            <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider px-2 py-1">
              {isBn ? 'প্রজেক্ট ফাইলসমূহ:' : 'Dart Project Files:'}
            </p>
            {FLUTTER_CODE_FILES.map((file, idx) => (
              <button
                key={file.filename}
                onClick={() => setSelectedFileIndex(idx)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono flex items-center gap-2.5 transition-all cursor-pointer ${
                  selectedFileIndex === idx
                    ? 'bg-sky-500/20 text-sky-200 border border-sky-500/40 font-bold'
                    : 'text-stone-400 hover:bg-stone-900 hover:text-stone-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="truncate">{file.filename}</span>
              </button>
            ))}

            <div className="pt-4 mt-4 border-t border-stone-800/80 px-2 text-[11px] text-stone-400 space-y-2">
              <p className="font-bold text-stone-300">
                {isBn ? 'ফিচারসমূহ:' : 'Key Modules:'}
              </p>
              <ul className="list-disc pl-4 space-y-1 text-[10px]">
                <li>Mirpur 11 & 12 2km Radius Check</li>
                <li>In-app BRN Wallet Top-up (bKash & Nagad)</li>
                <li>Live 15-Min Delivery Countdown Timer</li>
                <li>Material 3 & Hind Siliguri Typography</li>
              </ul>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="flex-1 flex flex-col bg-stone-900 overflow-hidden">
            {/* Action toolbar */}
            <div className="px-4 py-2 bg-stone-950/50 border-b border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-sky-400 font-bold">
                  {currentFile.path}
                </span>
                <p className="text-[10px] text-stone-400">
                  {currentFile.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="copy-flutter-code-btn"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">{isBn ? 'কপি হয়েছে' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isBn ? 'কোড কপি' : 'Copy'}</span>
                    </>
                  )}
                </button>

                <button
                  id="download-flutter-file-btn"
                  onClick={handleDownloadFile}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-950 hover:bg-sky-900 text-sky-300 border border-sky-600/40 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isBn ? 'ডাউনলোড' : 'Download'}</span>
                </button>
              </div>
            </div>

            {/* Code Pre container */}
            <div className="flex-1 p-4 overflow-auto font-mono text-xs text-stone-300 leading-relaxed select-text bg-[#0d1117]">
              <pre>
                <code>{currentFile.code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
