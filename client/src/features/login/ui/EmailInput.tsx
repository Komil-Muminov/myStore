import { Form, Input, Button } from "antd";
import { Mail, Send } from "lucide-react";
import { INPUT_CLASS_NAME } from "../lib";

interface IProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  isCandidate: boolean;
  isEnoughChars: boolean;
  isSendingOtp: boolean;
  isSendBtnDisabled: boolean;
  sendBtnText: string;
  onSendOtp: () => void;
  countdown: number;
  disabled: boolean;
}

export const EmailInput = ({
  label,
  value,
  onChange,
  isCandidate,
  isEnoughChars,
  isSendingOtp,
  isSendBtnDisabled,
  sendBtnText,
  onSendOtp,
  countdown,
  disabled,
}: IProps) => {
  return (
    <Form.Item
      label={
        <span className="text-sm font-medium text-slate-600">{label}</span>
      }
      name="email"
      rules={[
        { required: true, message: "Лутфан логинро (email) ворид кунед!" },
        {
          validator: (_, value) => {
            if (!value) return Promise.resolve();

            const isNumericAdmin = /^\d+$/.test(value);

            const specialAdmins = ["palata", "km", "am", "ui"];
            const isSpecialAdmin = specialAdmins.includes(value.toLowerCase());

            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

            if (isNumericAdmin || isSpecialAdmin || isEmail) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error("Лутфан формати дурусти email ворид кунед!"),
            );
          },
        },
      ]}
      className="login__item mb-2!"
    >
      <Input
        prefix={
          <Mail size={18} className="login__icon text-slate-400! mr-2!" />
        }
        suffix={
          isEnoughChars && isCandidate ? (
            <Button
              size="small"
              type="link"
              loading={isSendingOtp}
              disabled={isSendBtnDisabled}
              onClick={onSendOtp}
              className="login__otp-btn text-blue-600! hover:text-blue-700! font-semibold! px-1! h-auto! text-xs! flex items-center gap-1 whitespace-nowrap"
              icon={countdown === 0 ? <Send size={13} /> : null}
            >
              {sendBtnText}
            </Button>
          ) : null
        }
        disabled={disabled}
        placeholder="example@email.com"
        value={value}
        onChange={(e) => {
          const newValue = e.target.value.replace(/\s+/g, "");
          onChange(newValue);
        }}
        className={INPUT_CLASS_NAME}
      />
    </Form.Item>
  );
};
