import { Button } from "@/components/ui/button";
import { LinkIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useGetOriginalUrl } from "@/hooks/use-get-original-url";
import { useIncrementLinkAccessCount } from "@/hooks/use-increment-link-access-count";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const useShortCodePage = () => {
	const { shortCode } = useParams();

	const getOriginalUrl = useGetOriginalUrl({ shortCode });
	const incrementLinkAccessCount = useIncrementLinkAccessCount();

	const originalUrl =
		getOriginalUrl.isSuccess && getOriginalUrl.data?.originalUrl
			? getOriginalUrl.data.originalUrl
			: "";

	const navigate = useNavigate();

	useEffect(() => {
		const isNotFoundError =
			getOriginalUrl.isError &&
			getOriginalUrl.error instanceof AxiosError &&
			getOriginalUrl.error.response?.status === 404;
		const isBadRequestError =
			getOriginalUrl.isError &&
			getOriginalUrl.error instanceof AxiosError &&
			getOriginalUrl.error.response?.status === 400;

		if (isNotFoundError || isBadRequestError) {
			navigate("/link/not-found");
			return;
		}

		if (getOriginalUrl.isError) {
			toast.error("Erro ao buscar o link, tente novamente mais tarde");
			navigate("/");
		}
	}, [getOriginalUrl.isError, navigate, getOriginalUrl.error]);

	useEffect(() => {
		if (
			getOriginalUrl.isSuccess &&
			incrementLinkAccessCount.isSuccess &&
			originalUrl
		) {
			window.location.href = originalUrl;
		}
	}, [
		getOriginalUrl.isSuccess,
		incrementLinkAccessCount.isSuccess,
		originalUrl,
	]);

	useEffect(() => {
		function handleIncrementLinkAccessCount() {
			const linkId = getOriginalUrl.data?.id;

			if (linkId) {
				incrementLinkAccessCount.mutate(
					{ id: linkId },
					{
						onError: () => {
							toast.warn(
								({ closeToast }) => (
									<div className="flex flex-col items-start gap-2">
										<Text className="font-medium text-yellow-600">
											Falha ao contabilizar o acesso do link
										</Text>
										<Text className="text-sm text-gray-600">
											Você pode acessar o link clicando no botão abaixo.
										</Text>
										<Button
											variant="secondary"
											className=""
											onClick={() => {
												window.location.href = originalUrl;
												closeToast();
											}}
										>
											<LinkIcon />
											Abrir link
										</Button>
									</div>
								),
								{
									autoClose: 6000,
									closeOnClick: false,
								},
							);
						},
					},
				);
			}
		}

		if (originalUrl) {
			handleIncrementLinkAccessCount();
		}
	}, [incrementLinkAccessCount.mutate, originalUrl, getOriginalUrl.data?.id]);

	return {
		originalUrl,
	};
};
