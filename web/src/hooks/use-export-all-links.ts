import { exportAllLinks } from "@/api/export-all-links";
import { useMutation } from "@tanstack/react-query";

export const useExportAllLinks = () => {
	return useMutation({
		mutationFn: exportAllLinks,
	});
};
