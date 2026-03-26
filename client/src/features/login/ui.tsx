import React, { useState, useEffect, useRef } from "react";
import { LogIn } from "lucide-react";
import { Form, Button, message } from "antd";
import { ApiRoutes, useMutationQuery, useGetQuery } from "@/shared";
import type { TUserRole, IApiError } from "@/shared";
import { checkIsAdmin, getOtpBtnText, getLoginLabel } from "./lib";
import { RegistrationClosed } from "./ui/RegistrationClosed";
import { EmailInput } from "./ui/EmailInput";
import { SecretInput } from "./ui/SecretInput";

interface IProps {
  onSuccess?: (role: TUserRole, token: string, fullName: string) => void;
  showLoginFields?: boolean;
  onShowLoginFields?: () => void;
}

export const LoginForm: React.FC<IProps> = ({
  onSuccess,
  showLoginFields = false,
  onShowLoginFields,
}) => {
  const [form] = Form.useForm();

  const [now] = useState(() => Date.now());
  const { data: regData } = useGetQuery<{
    isRegistrationEnabled: boolean;
  }>({
    url: ApiRoutes.REGISTRATION_STATUS,
    queryKey: [ApiRoutes.REGISTRATION_STATUS],
    params: { t: now },
    options: { staleTime: 0 },
  });

  const isRegistrationClosed = regData?.isRegistrationEnabled === false;

  const [loginValue, setLoginValue] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [secretValue, setSecretValue] = useState("");
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isSpecialAdmin = ["palata", "km", "am", "ui"].includes(
    loginValue.toLowerCase(),
  );

  const isAdmin = checkIsAdmin(loginValue) || isSpecialAdmin;

  const isCandidate = !isAdmin;
  const isEnoughChars = loginValue.length > 2;
  const isSecondFieldActive = isAdmin ? true : otpSent;

  const startCountdown = () => {
    setCountdown(30);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const { mutate: requestOtp, isPending: isSendingOtp } = useMutationQuery({
    onSuccess: () => {
      message.success("Рамз ба почтаи шумо фиристода шуд!");
      setOtpSent(true);
      startCountdown();
    },
    onError: (error: IApiError) => {
      message.error(error.message);
    },
  });

  const { mutate: login, isPending: isLoggingIn } = useMutationQuery({
    onSuccess: (data: {
      user: { role: TUserRole; fullName: string };
      token: string;
    }) => {
      message.success("Хуш омадед!");
      if (onSuccess) onSuccess(data.user.role, data.token, data.user.fullName);
    },
    onError: (error: IApiError) => {
      message.error(error.message);
    },
  });

  const handleSendOtp = () => {
    if (!loginValue) {
      message.warning("Лутфан почтаи электрониро ворид кунед");
      return;
    }
    requestOtp({
      url: ApiRoutes.SEND_OTP,
      method: "POST",
      data: { email: loginValue },
    });
  };

  const onFinish = (values: { email?: string; secret: string }) => {
    const emailToUse = values.email || loginValue;
    const payload = isCandidate
      ? { email: emailToUse, otp: values.secret }
      : { email: emailToUse, password: values.secret };

    login({
      url: ApiRoutes.LOGIN,
      method: "POST",
      data: payload,
    });
  };

  const onLoginValueChange = (val: string) => {
    setLoginValue(val);
    setOtpSent(false);
    setCountdown(0);
    if (timerRef.current) clearInterval(timerRef.current);

    setSecretValue("");

    form.setFieldsValue({ email: val, secret: "" });

    if (!val) {
      setTimeout(() => {
        form.setFields([{ name: "email", errors: [] }]);
      }, 10);
    }
  };

  return (
    <div className="login-container relative w-full min-h-[330px] flex flex-col">
      {isRegistrationClosed && !showLoginFields && onShowLoginFields && (
        <RegistrationClosed onShowLogin={onShowLoginFields} />
      )}

      <Form
        form={form}
        name="login"
        layout="vertical"
        onFinish={onFinish}
        className={`login__form w-full flex-1 transition-all duration-500 ${isRegistrationClosed && !showLoginFields ? "blur-md opacity-30 pointer-events-none scale-95" : "opacity-100 scale-100"}`}
        size="large"
      >
        <EmailInput
          label={getLoginLabel(loginValue)}
          value={loginValue}
          onChange={onLoginValueChange}
          isCandidate={isCandidate}
          isEnoughChars={isEnoughChars}
          isSendingOtp={isSendingOtp}
          disabled={isSendingOtp}
          isSendBtnDisabled={
            isSendingOtp || countdown > 0 || loginValue.length === 0
          }
          sendBtnText={getOtpBtnText(countdown, otpSent)}
          onSendOtp={handleSendOtp}
          countdown={countdown}
        />

        <SecretInput
          isCandidate={isCandidate}
          isActive={isSecondFieldActive}
          value={secretValue}
          onChange={setSecretValue}
        />

        <Form.Item className="login__item mb-0!">
          <Button
            type="primary"
            htmlType="submit"
            icon={<LogIn size={18} className="login__btn-icon" />}
            loading={isLoggingIn}
            disabled={isLoggingIn || !secretValue || !isSecondFieldActive}
            className="login__btn w-full! h-auto! py-4! rounded-[14px]! bg-[#1a233a]! hover:bg-[#25304a]! disabled:bg-[#1a233a]/60! disabled:text-white/40! font-semibold! text-sm! shadow-none! border-none! transition-colors"
          >
            Ворид шудан
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
