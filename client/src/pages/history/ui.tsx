import { PosHistory } from "@/widgets/pos-history";

interface IProps {
  onNavigate?: (view: "pos" | "history") => void;
}

export function HistoryPage({ onNavigate }: IProps) {
  return <PosHistory onNavigate={onNavigate} />;
}
