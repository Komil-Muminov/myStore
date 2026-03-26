import "@/App.css";
import { AuthLayout } from "./features/auth";

function App() {
	return (
		<main>
			<h3 className="bg-red-500">
				<AuthLayout />
			</h3>
		</main>
	);
}

export default App;
