import { serverInstance } from "./server-instance";

export interface IncrementLinkAccessCountResponse {
	message: string;
}

export interface IncrementLinkAccessCountParams {
	id: string;
}

export async function incrementLinkAccessCount({
	id,
}: IncrementLinkAccessCountParams): Promise<IncrementLinkAccessCountResponse> {
	const response = await serverInstance.patch<IncrementLinkAccessCountResponse>(
		`links/${id}/hit`,
	);
	return response.data;
}
