import { Route, Routes } from "react-router";
import { HomePage } from "./pages/home/home-page";
import { NotFoundPage } from "./pages/not-found/not-found-page";
import { ShortCodePage } from "./pages/short-code/short-code-page";

export function App() {
	return (
		<Routes>
			<Route index element={<HomePage />} />
			<Route path=":shortCode" element={<ShortCodePage />} />
			<Route path="/link/not-found" element={<NotFoundPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}
