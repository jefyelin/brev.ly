import { getOriginalUrl } from "@/api/get-original-url";
import { useQuery } from "@tanstack/react-query";

interface UseGetOriginalUrlParams {
	shortCode?: string;
}

export const useGetOriginalUrl = ({ shortCode }: UseGetOriginalUrlParams) => {
	return useQuery({
		queryKey: ["getOriginalUrl", shortCode],
		queryFn: () => (shortCode ? getOriginalUrl({ shortCode }) : null),
		enabled: !!shortCode,
	});
};
