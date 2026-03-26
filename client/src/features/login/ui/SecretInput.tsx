import { Form, Input } from "antd";
import { Lock, Eye, EyeOff } from "lucide-react";
import { INPUT_CLASS_NAME } from "../lib";

interface IProps {
	isCandidate: boolean;
	isActive: boolean;
	value: string;
	onChange: (value: string) => void;
}

export const SecretInput = ({
	isCandidate,
	isActive,
	value,
	onChange,
}: IProps) => {
	return (
		<Form.Item
			label={
				<span className="text-sm! font-medium! text-slate-600!">
					{isCandidate ? "Рамзӣ тасдиқ" : "Рамз"}
				</span>
			}
			name="secret"
			rules={[
				{
					required: true,
					message: isCandidate
						? "Лутфан рамзӣ тасдиқро ворид кунед!"
						: "Лутфан рамзро ворид кунед!",
				},
			]}
			className="login__item mb-6!"
		>
			<Input.Password
				prefix={
					<Lock
						size={18}
						className="login__icon text-slate-400! mr-2!"
					/>
				}
				iconRender={(visible) =>
					visible ? (
						<Eye
							size={18}
							className="text-slate-400! hover:text-blue-600! transition-colors duration-200"
						/>
					) : (
						<EyeOff
							size={18}
							className="text-slate-400! hover:text-blue-600! transition-colors duration-200"
						/>
					)
				}
				placeholder={isCandidate ? "• • • • • •" : "••••••••"}
				disabled={!isActive}
				maxLength={isCandidate ? 6 : undefined}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className={INPUT_CLASS_NAME}
			/>
		</Form.Item>
	);
};
