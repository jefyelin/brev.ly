import type { AxiosResponse } from "axios";
import { serverInstance } from "./server-instance";

export interface GetOriginalUrlResponse {
	id: string;
	originalUrl: string;
}

interface GetOriginalUrlParams {
	shortCode: string;
}

export async function getOriginalUrl({
	shortCode,
}: GetOriginalUrlParams): Promise<GetOriginalUrlResponse> {
	const response = await serverInstance.get<
		null,
		AxiosResponse<GetOriginalUrlResponse>
	>(`links/${shortCode}`);

	return response.data;
}
