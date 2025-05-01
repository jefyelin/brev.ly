import { createShortLink } from "@/api/create-short-link";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateShortLink = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createShortLink,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["links"] });
		},
	});
};
