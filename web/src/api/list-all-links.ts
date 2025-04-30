import type { AxiosResponse } from "axios";
import { serverInstance } from "./server-instance";

export interface ListAllLinksResponse {
	links: {
		id: string;
		originalUrl: string;
		shortCode: string;
		description: string;
		accessCount: number;
		createdAt: string;
	}[];
}

export async function listAllLinks(): Promise<ListAllLinksResponse> {
	const response = await serverInstance.get<
		null,
		AxiosResponse<ListAllLinksResponse>
	>("links");

	return response.data;
}
