import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isInfo = toast.type === 'info';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-5 ${
              isSuccess
                ? 'bg-white border-emerald-200 text-slate-800 shadow-emerald-500/10'
                : isInfo
                ? 'bg-white border-blue-200 text-slate-800 shadow-blue-500/10'
                : 'bg-white border-amber-200 text-slate-800 shadow-amber-500/10'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#10B981]" />}
              {isInfo && <Info className="w-5 h-5 text-[#2563FF]" />}
              {isWarning && <AlertCircle className="w-5 h-5 text-[#F59E0B]" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-[#101936]">{toast.title}</h4>
              <p className="text-xs text-[#64708A] mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
