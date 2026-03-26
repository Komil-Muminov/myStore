import "antd/dist/reset.css";
import "@/App.css";

import { useState } from "react";

import { HistoryPage } from "@/pages/history";
import { PosPage } from "@/pages/pos";

function App() {
  const [view, setView] = useState<"pos" | "history">("pos");

  return (
    view === "pos" ? (
      <PosPage onNavigate={setView} />
    ) : (
      <HistoryPage onNavigate={setView} />
    )
  );
}

export default App;
