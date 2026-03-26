import { PosCashier } from "@/widgets/pos-cashier";

interface IProps {
  onNavigate?: (view: "pos" | "history") => void;
}

export function PosPage({ onNavigate }: IProps) {
  return <PosCashier onNavigate={onNavigate} />;
}
