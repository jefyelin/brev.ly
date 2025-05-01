import axios from "axios";

export const serverInstance = axios.create({
	baseURL: "http://localhost:3333/",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});
