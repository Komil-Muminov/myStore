import React from "react";
import { Modal, Typography, Space, Divider } from "antd";
import {
  Inbox,
  ShieldAlert,
  RefreshCcw,
  MailQuestion,
  MousePointerClick,
} from "lucide-react";

const { Title, Text } = Typography;

interface EmailHelpModalProps {
  open: boolean;
  onClose: () => void;
}

export const EmailHelpModal: React.FC<EmailHelpModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Modal
      title={
        <Space>
          <MailQuestion className="text-blue-500" size={24} />
          <span className="text-lg font-bold text-[#182035]">
            Агар рамз ба почта наояд
          </span>
        </Space>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={500}
      centered
      className="email-help-modal"
      bodyStyle={{ padding: "24px 32px 32px" }}
    >
      <div className="space-y-8 mt-4">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100">
            <ShieldAlert className="text-amber-500" size={20} />
          </div>
          <div>
            <Title level={5} className="!mb-1">
              Қуттии "Спам"-ро санҷед
            </Title>
            <Text type="secondary">
              Баъзан филтрҳои почта номаҳои автоматиро ба папкаи <b>Спам</b>{" "}
              мепартоянд.
            </Text>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
            <RefreshCcw className="text-blue-500" size={20} />
          </div>
          <div>
            <Title level={5} className="!mb-1">
              30 сония интизор шавед
            </Title>
            <Text type="secondary">
              Ирсоли рамз метавонад вобаста ба сервери почтаи шумо каме вақт
              гирад.
            </Text>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100">
            <Inbox className="text-indigo-500" size={20} />
          </div>
          <div>
            <Title level={5} className="!mb-1">
              Дурустии почтаро санҷед
            </Title>
            <Text type="secondary">
              Боварӣ ҳосил кунед, ки суроғаи почтаи электрониро бе хатогӣ ворид
              кардед.
            </Text>
          </div>
        </div>

        <Divider className="!my-6" />

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div className="flex items-start gap-3">
            <MousePointerClick className="text-slate-400 mt-1" size={30} />
            <Text className="text-[13px] text-slate-600 leading-relaxed">
              Агар пас аз 1 дақиқа рамз наомад, тугмаи <b>"Аз нав"</b>
              -ро дубора пахш кунед.
            </Text>
          </div>
        </div>
      </div>
    </Modal>
  );
};
