import React from "react";
import { Result, Button } from "antd";
import { RefreshCw, AlertTriangle } from "lucide-react";
import type { FallbackProps } from "react-error-boundary";

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const errorMessage = error instanceof Error ? error.message : String(error);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f5f8fa] p-4">
      <div className="bg-white rounded-[24px] p-2 md:p-6 w-full max-w-2xl shadow-[0_20px_60px_rgb(0,0,0,0.06)] border border-slate-100 animate-in fade-in zoom-in-95 duration-300">
        <Result
          status="500"
          title={
            <span className="text-2xl font-bold text-[#182035]">
              Хатогӣ рух дод!
            </span>
          }
          subTitle={
            <span className="text-slate-500 text-[15px] leading-relaxed max-w-md mx-auto block mt-2">
              Мутаассифона, ҳангоми боркунии ин саҳифа хатогӣ ба амал омад. Мо
              аллакай дар болои он кор карда истодаем.
            </span>
          }
          extra={
            <div className="flex flex-col items-center gap-8 mt-4 w-full px-4 md:px-12">
              <div className="w-full text-left bg-red-50/50 border border-red-100 rounded-2xl p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-red-500">
                  <AlertTriangle size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Тафсилоти хатогӣ (Барои таҳиягар):
                  </span>
                </div>
                <code className="text-[13px] text-red-700/80 font-mono break-words bg-white/60 p-3 rounded-xl border border-red-50">
                  {errorMessage}
                </code>
              </div>

              <Button
                type="primary"
                size="large"
                icon={<RefreshCw size={18} className="mr-1" />}
                onClick={resetErrorBoundary}
                className="h-14 px-8 rounded-2xl bg-[#1a233a] hover:bg-[#25304a] font-semibold text-[15px] border-none shadow-lg shadow-slate-200 transition-all flex items-center justify-center"
              >
                Саҳифаро навсозӣ кунед
              </Button>
            </div>
          }
        />
      </div>
    </div>
  );
};
