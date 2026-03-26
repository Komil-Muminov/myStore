import { Lock } from "lucide-react";
import { Button } from "antd";

interface IProps {
  onShowLogin: () => void;
}


export const RegistrationClosed = ({ onShowLogin }: IProps) => {
  return (
    <div className="absolute inset-0 z-20 backdrop-blur-xl bg-white/50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500 rounded-[24px]">
      <div className="relative mb-4">
        <div className="absolute inset-0 rounded-full bg-red-400/30 blur-xl scale-150" />
        <div className="relative w-20 h-20 rounded-full bg-linear-to-br from-red-400 to-rose-600 flex items-center justify-center shadow-xl shadow-rose-400/40 ring-4 ring-rose-100">
          <Lock className="w-9 h-9 text-white drop-shadow" />
        </div>
      </div>
      
      <h2 className="text-xl font-bold text-[#1a2b49] tracking-tight mb-1">
        Қабули анкетҳо баста аст
      </h2>
      
      <p className="text-slate-500 text-sm mb-5 leading-relaxed max-w-[260px]">
        Қабули анкетҳои нав муваққатан қатъ карда шудааст. 
        Танҳо довталабони сабтшуда метавонанд ворид шудан.
      </p>

      <Button 
        type="primary"
        onClick={onShowLogin}
        className="h-11 px-8 rounded-xl bg-[#1a233a]! hover:bg-[#25304a]! border-none shadow-lg shadow-slate-200 font-semibold transition-colors text-sm!"
      >
        Ман аллакай сабти ном шудаам
      </Button>
    </div>
  );
};
