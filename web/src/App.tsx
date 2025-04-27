import { Route, Routes } from "react-router";
import { HomePage } from "./pages/home/home-page";

export function App() {
	return (
		<Routes>
			<Route index element={<HomePage />} />
			<Route path=":shortCode" element={<h1>Shortcode Page</h1>} />
		</Routes>
	);
}
