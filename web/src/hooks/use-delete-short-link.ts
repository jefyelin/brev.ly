import { deleteShortLink } from "@/api/delete-short-link";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteShortLink = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteShortLink,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["links"] });
		},
	});
};
