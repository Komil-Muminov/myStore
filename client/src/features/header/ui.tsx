import { Button, message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

import { ApiRoutes, AppRoutes, useGetQuery, useMutationQuery } from "@/shared";
import { RegistrationToggle } from "./ui/RegistrationToggle";
import { ExamToggle } from "./ui/ExamToggle";

interface IMeResponse {
  user: {
    role: string;
    fullName: string;
  };
}

interface IProps {
  homePath?: string;
  isReadOnly?: boolean;
}

export const Header = ({ homePath, isReadOnly }: IProps) => {
  const queryClient = useQueryClient();
  const { data: userData } = useGetQuery<IMeResponse>({
    url: ApiRoutes.ME,
    options: {
      staleTime: 5 * 60 * 1000,
    },
  });

  const user = userData?.user;
  const fullName = user?.fullName || "Пользователь";
  const role = user?.role || localStorage.getItem("role") || "user";
  const isAdmin = role === "admin";

  const clearLocalSession = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    queryClient.clear();
    window.location.href = AppRoutes.LOGIN;
  };

  const { mutate: logout, isPending: isLoggingOut } = useMutationQuery({
    onSuccess: () => {
      clearLocalSession();
    },
    onError: (error) => {
      message.error(error.message);
      clearLocalSession();
    },
  });

  return (
    <header className="header flex items-center justify-between px-6 py-3.5 bg-white border-b border-slate-200 sticky top-0 z-50 print:hidden">
      <div className="header__left flex items-center gap-5">
        <Link
          to={homePath || (isAdmin ? AppRoutes.ADMIN_VACANCIES : AppRoutes.POSITIONS)}
          className="header__logo flex items-center gap-3 hover:opacity-90 transition-opacity"
        >
          <div className="w-11 h-11 rounded-full bg-[#1a233a] text-white flex items-center justify-center font-bold text-sm">
            KM
          </div>
          <div className="hidden sm:flex flex-col justify-center">
            <span className="text-[12px] font-bold text-slate-500 leading-tight uppercase tracking-wider">
              MyStore
            </span>
            <span className="text-[12px] font-extrabold text-[#182035] leading-tight">
              Admin Panel
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-4 print:hidden">
          <span className="text-slate-500 text-[14px] font-medium">
            Панели идоракунӣ
          </span>
        </div>
      </div>

      <div className="header__right flex items-center gap-4 print:hidden">
        {isAdmin && (
          <div className="flex items-center gap-2 sm:gap-4">
            <RegistrationToggle isReadOnly={isReadOnly} />
            <ExamToggle isReadOnly={isReadOnly} />
          </div>
        )}

        <div className="hidden sm:block text-right">
          <div className="text-[13px] font-bold text-[#182035] leading-none mb-1.5 line-clamp-1 max-w-[250px]">
            {fullName}
          </div>
          <div className="text-[11px] text-slate-400 font-medium leading-none">
            {isAdmin ? "Admin" : "User"}
          </div>
        </div>

        <Button
          type="text"
          shape="circle"
          icon={<LogOut size={16} />}
          onClick={() => logout({ url: ApiRoutes.LOGOUT, method: "POST" })}
          loading={isLoggingOut}
          disabled={isLoggingOut}
          className="text-slate-400 hover:text-red-500 hover:bg-red-50"
        />
      </div>
    </header>
  );
};
