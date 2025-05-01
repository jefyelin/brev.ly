import { serverInstance } from "./server-instance";

export interface CreateShortLinkResponse {
	id: string;
	originalUrl: string;
	shortCode: string;
	accessCount: number;
	createdAt: string;
}

export interface CreateShortLinkBody {
	originalUrl: string;
	shortCode: string;
}

export async function createShortLink(
	body: CreateShortLinkBody,
): Promise<CreateShortLinkResponse> {
	const response = await serverInstance.post<CreateShortLinkResponse>(
		"links",
		body,
	);

	return response.data;
}
