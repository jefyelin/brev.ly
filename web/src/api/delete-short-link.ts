import { serverInstance } from "./server-instance";

export interface DeleteShortLinkResponse {
	message: string;
}

export interface DeleteShortLinkParams {
	id: string;
}

export async function deleteShortLink({
	id,
}: DeleteShortLinkParams): Promise<DeleteShortLinkResponse> {
	const response = await serverInstance.delete<DeleteShortLinkResponse>(
		`links/${id}`,
	);
	return response.data;
}
