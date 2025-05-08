import axios from "axios";

export const serverInstance = axios.create({
	baseURL: import.meta.env.VITE_SERVER_CLIENT_URL,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});
