import React from "react";
import { Result, Button } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

interface IProps {
  onBack?: () => void;
}

export const RegistrationClosed: React.FC<IProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <Result
        icon={<ClockCircleOutlined style={{ color: "#faad14", fontSize: "64px" }} />}
        title={<span className="text-2xl font-bold text-slate-800">Қабули дархостҳо муваққатан қатъ карда шуд</span>}
        subTitle={
          <div className="text-lg text-slate-500 mt-4 max-w-md mx-auto">
            Дар айни замон қабули анкетҳо барои иштирок дар озмун баста аст. 
            Лутфан, барои гирифтани маълумоти иловагӣ дертар ба сайт ворид шавед ё бо Палатаи ҳисоби Ҷумҳурии Тоҷикистон тамос гиред.
          </div>
        }
        extra={
          onBack && (
            <Button type="primary" size="large" onClick={onBack} className="mt-4 rounded-lg px-8">
              Ба ақиб
            </Button>
          )
        }
      />
    </div>
  );
};
