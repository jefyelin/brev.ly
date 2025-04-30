import { listAllLinks } from "@/api/list-all-links";
import { useQuery } from "@tanstack/react-query";

export const useListAllLinks = () => {
	return useQuery({ queryKey: ["links"], queryFn: listAllLinks });
};
