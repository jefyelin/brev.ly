import axios from "axios";

export const serverInstance = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});
