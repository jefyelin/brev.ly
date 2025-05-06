import type { AxiosResponse } from "axios";
import { serverInstance } from "./server-instance";

export interface ExportAllLinksResponse {
	fileName: string;
	url: string;
}

export async function exportAllLinks(): Promise<ExportAllLinksResponse> {
	const response = await serverInstance.get<
		null,
		AxiosResponse<ExportAllLinksResponse>
	>("links/export");

	return response.data;
}
