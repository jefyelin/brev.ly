import type { AxiosResponse } from "axios";
import { serverInstance } from "./server-instance";

export interface Link {
	id: string;
	originalUrl: string;
	shortCode: string;
	description: string;
	accessCount: number;
	createdAt: string;
}

export interface ListAllLinksResponse {
	links: Link[];
}

export async function listAllLinks(): Promise<ListAllLinksResponse> {
	const response = await serverInstance.get<
		null,
		AxiosResponse<ListAllLinksResponse>
	>("links");

	return response.data;
}
