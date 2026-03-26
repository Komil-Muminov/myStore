export const INPUT_CLASS_NAME =
  "login__input group rounded-[14px]! py-3! text-slate-800! bg-white! border! border-slate-200! hover:border-blue-500! focus-within:border-blue-500! focus-within:ring-4! focus-within:ring-blue-50! focus-within:shadow-none! transition-all duration-200 [&>input]:bg-transparent! [&>input:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset]!";

export const checkIsAdmin = (value: string) => {
  return value.length > 2 && /^\d+$/.test(value);
};

export const getOtpBtnText = (countdown: number, otpSent: boolean) => {
  if (countdown > 0) return `${countdown}с`;
  return otpSent ? "Аз нав" : "Рамзӣ тасдиқ";
};

export const getLoginLabel = (value: string) => {
  return checkIsAdmin(value) ? "Рақами дохилӣ / Телефон" : "Почтаи электронӣ";
};
