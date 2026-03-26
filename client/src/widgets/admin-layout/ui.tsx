import React from "react";
import { Layout } from "antd";
import { Header } from "@/features/header";
import { Link, useLocation } from "react-router-dom";
import { AppRoutes } from "@/shared";
import { LayoutGrid, FileText, Layers, Eye, ClipboardList } from "lucide-react";

const { Content } = Layout;

interface IProps {
  children: React.ReactNode;
  isReadOnly?: boolean;
}

export const AdminLayout = ({ children, isReadOnly }: IProps) => {
  const location = useLocation();

  const getTabClassName = (path: string) => {
    const isActive = location.pathname.startsWith(path);
    return `flex! items-center! gap-2! font-medium! text-sm! transition-all! px-3! sm:px-4! py-3! border-b-2! whitespace-nowrap! ${
      isActive
        ? "text-blue-600! border-blue-600! bg-blue-50/30!"
        : "text-[#62748e]! border-transparent! hover:text-[#1a233a]! hover:bg-slate-50!"
    }`;
  };

  return (
    <Layout className="bg-slate-50!" style={{ minHeight: "100vh" }}>
      <Header isReadOnly={isReadOnly} />

      <div className="bg-white border-b border-slate-200 print:hidden">
        <div className="px-4 sm:px-6 overflow-x-auto scrollbar-hide">
          <nav className="flex items-center min-w-max">
            <Link
              to={AppRoutes.ADMIN_VACANCIES}
              className={getTabClassName(AppRoutes.ADMIN_VACANCIES)}
            >
              <LayoutGrid size={16} />
              <span className="inline">Танзими вакансияҳо</span>
            </Link>

            <Link
              to={AppRoutes.ADMIN_APPLICANTS}
              className={getTabClassName(AppRoutes.ADMIN_APPLICANTS)}
            >
              <FileText size={16} />
              <span className="inline">Рӯйхати довталабон</span>
            </Link>

            <Link
              to={AppRoutes.ADMIN_TEMPLATES}
              className={getTabClassName(AppRoutes.ADMIN_TEMPLATES)}
            >
              <Layers size={16} />
              <span className="inline">Шаблонҳо</span>
            </Link>

            <Link
              to={AppRoutes.POSITIONS}
              className={getTabClassName(AppRoutes.POSITIONS)}
            >
              <Eye size={16} />
              <span className="inline">Намоиши вазифаҳо</span>
            </Link>
            <Link
              to={AppRoutes.ADMIN_QUESTIONNAIRES}
              className={getTabClassName(AppRoutes.ADMIN_QUESTIONNAIRES)}
            >
              <ClipboardList size={16} />
              <span className="inline">Саволномаҳо</span>
            </Link>
            <Link
              to={AppRoutes.ADMIN_TEST_RESULTS}
              className={getTabClassName(AppRoutes.ADMIN_TEST_RESULTS)}
            >
              <ClipboardList size={16} />
              <span className="inline">Руйхати натиҷаҳои тестҳо</span>
            </Link>
          </nav>
        </div>
      </div>

      <Content className="flex-1 px-6 pt-5 pb-0 flex flex-col print:p-0">
        <div className="w-full flex-1">{children}</div>
      </Content>
    </Layout>
  );
};
