import { useCreateShortLink } from "@/hooks/use-create-short-link";
import { useDeleteShortLink } from "@/hooks/use-delete-short-link";
import { useExportAllLinks } from "@/hooks/use-export-all-links";
import { useListAllLinks } from "@/hooks/use-list-all-links";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import type { HandleCreateShortLinkProps } from "../components/create-short-link-form";

export const useHomePage = () => {
	const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);
	const [deletingLinkId, setDeletingLinkId] = useState<string | null>(null);

	const exportAllLinks = useExportAllLinks();
	const listAllLinks = useListAllLinks();
	const deleteShortLink = useDeleteShortLink();
	const createShortLink = useCreateShortLink();

	const disableDownloadCSVButton =
		exportAllLinks.isPending ||
		createShortLink.isPending ||
		deleteShortLink.isPending ||
		listAllLinks.isLoading ||
		(listAllLinks.isSuccess && listAllLinks.data.links.length === 0);

	const handleCreateShortLink = ({
		data,
		form,
	}: HandleCreateShortLinkProps) => {
		const { originalUrl, shortCode } = data;

		createShortLink.mutate(
			{
				originalUrl,
				shortCode,
			},
			{
				onSuccess: () => {
					toast.success("Link encurtado com sucesso");
					form.reset();
				},
				onError: (error) => {
					if (
						error instanceof AxiosError &&
						error.response?.data.message === "Short code already exists"
					) {
						const errorMessage = "Esse link encurtado já existe, tente outro";
						toast.error(errorMessage);

						form.setError("shortCode", {
							type: "value",
							message: errorMessage,
						});
						form.setFocus("shortCode");

						return;
					}

					toast.error("Erro ao encurtar o link, tente novamente mais tarde");
				},
			},
		);
	};

	const handleDownloadCSV = () => {
		exportAllLinks.mutate(undefined, {
			onSuccess: (data) => {
				window.open(data.url, "_blank");
			},
			onError: () => {
				toast.error("Erro ao baixar o CSV, tente novamente mais tarde");
			},
		});
	};

	const handleCopyLink = (shortCode: string, linkId: string) => {
		const link = `${window.location.origin}/${shortCode}`;
		navigator.clipboard.writeText(link);
		setCopiedLinkId(linkId);
		toast.info(`Link copiado: ${link}`);

		setTimeout(() => {
			setCopiedLinkId(null);
		}, 2000);
	};

	const handleDeleteShortLink = (id: string) => {
		setDeletingLinkId(id);
		deleteShortLink.mutate(
			{ id },
			{
				onSuccess: () => {
					toast.success("Link deletado com sucesso");
					setDeletingLinkId(null);
				},
				onError: () => {
					toast.error("Erro ao deletar o link, tente novamente mais tarde");
					setDeletingLinkId(null);
				},
			},
		);
	};

	return {
		createShortLink,
		exportAllLinks,
		listAllLinks,
		copiedLinkId,
		deletingLinkId,
		disableDownloadCSVButton,
		handleCopyLink,
		handleCreateShortLink,
		handleDeleteShortLink,
		handleDownloadCSV,
	};
};
