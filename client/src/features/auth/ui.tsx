import React, { useState } from "react";
import type { TUserRole } from "@/entities/usersRole/model";
import { FundProjectionScreenOutlined } from "@ant-design/icons";
import { LoginForm } from "../login";
// import { ApiRoutes } from "@/shared/configs/ApiRoutes";
// import { useGetQuery } from "@/shared/hooks/useGetQuery";
// import { EmailHelpModal } from "../login/ui/EmailHelpModal";
// import { LoginForm } from "../login";
// import { useGetQuery, ApiRoutes } from "@/shared";
// import { EmailHelpModal } from "../login/ui/EmailHelpModal";

interface IProps {
	onLoginSuccess?: (role: TUserRole, token: string, fullName: string) => void;
}

export const AuthLayout: React.FC<IProps> = ({ onLoginSuccess }) => {
	const [imgError, setImgError] = useState(false);
	const [, setIsHelpOpen] = useState(false);

	const [showLoginFields, setShowLoginFields] = useState(false);
	return (
		<div className="auth min-h-screen bg-[#f5f8fa] flex flex-col font-sans">
			<header className="auth__header flex justify-end items-center p-6 md:px-12 w-full">
				<button
					onClick={() => setIsHelpOpen(true)}
					className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-[#182035] hover:border-slate-300 transition-all shadow-sm active:scale-95 group"
				>
					<FundProjectionScreenOutlined
						size={18}
						className="text-blue-500 group-hover:rotate-12 transition-transform"
					/>
					<span className="text-sm font-medium ">Ёрии техникӣ</span>
				</button>
			</header>

			<main className="auth__main flex-1 flex flex-col items-center justify-center px-4 md:px-6 w-full max-w-2xl mx-auto -mt-16">
				<div
					className={`auth__logo flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-sm mb-6 bg-white border border-yellow-500/30 ${""}`}
				>
					{!imgError ? (
						<img
							src={""}
							alt="Accounts Chamber Logo"
							className="auth__logo-img w-full h-full object-cover"
							onError={() => setImgError(true)}
						/>
					) : (
						<div className="auth__logo-fallback w-full h-full bg-linear-to-br from-yellow-300 to-yellow-600 rounded-full flex items-center justify-center">
							<span className="text-white font-bold text-xl">ПҲҶТ</span>
						</div>
					)}
				</div>
				<div className="auth__form-container bg-white rounded-4xl p-5 md:p-10 w-full max-w-[420px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] box-border overflow-hidden">
					<LoginForm
						onSuccess={onLoginSuccess}
						showLoginFields={showLoginFields}
						onShowLoginFields={() => setShowLoginFields(true)}
					/>
				</div>
			</main>
			{/* helper */}
			{/* <EmailHelpModal
				open={true}
				onClose={() => setIsHelpOpen(false)}
			/> */}

			<footer className="auth__footer py-4 flex flex-col items-center justify-center text-sm text-slate-400 font-medium">
				<p className="auth__footer-copy mb-1">
					© {new Date().getFullYear()} Палатаи ҳисоби Ҷумҳурии Тоҷикистон
				</p>
			</footer>
		</div>
	);
};
