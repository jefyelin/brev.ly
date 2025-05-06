import { incrementLinkAccessCount } from "@/api/increment-link-access-count";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useIncrementLinkAccessCount = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: incrementLinkAccessCount,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["links"] });
		},
	});
};
