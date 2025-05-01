import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { useCreateShortLink } from "@/hooks/use-create-short-link";
import { useDeleteShortLink } from "@/hooks/use-delete-short-link";
import { useListAllLinks } from "@/hooks/use-list-all-links";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import { toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
	originalUrl: z.string().url("URL inválida"),
	shortCode: z
		.string()
		.min(3, "Deve ter pelo menos 3 caracteres")
		.max(20, "Deve ter no máximo 20 caracteres")
		.regex(/^[a-zA-Z0-9_-]+$/, {
			message: "Apenas letras, números, - e _ são permitidos",
		}),
});

type FormSchema = z.infer<typeof formSchema>;

export const HomePage = () => {
	const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);
	const [deletingLinkId, setDeletingLinkId] = useState<string | null>(null);

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			originalUrl: "",
			shortCode: "",
		},
	});

	const listAllLinks = useListAllLinks();
	const deleteShortLink = useDeleteShortLink();
	const createShortLink = useCreateShortLink();

	const location = window.location.origin.replace(/^https?:\/\//, "");

	const onSubmit = async (data: FormSchema) => {
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

	return (
		<div className="px-3 py-8 flex flex-col items-center gap-[1.4819rem] lg:items-start lg:gap-8 lg:max-w-[61.25rem] lg:mx-auto lg:px-0 lg:pt-[5.5rem] min-h-dvh h-fit">
			<img
				src="./brev.ly-logo.svg"
				alt="Logo Brev.ly"
				className="w-[6.0419rem] h-[1.5181rem]"
			/>
			<div className="flex flex-col gap-3 w-full lg:grid lg:grid-cols-10">
				<Card className="w-full lg:col-span-4 h-fit">
					<CardHeader>
						<CardTitle>Novo Link</CardTitle>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								className="flex flex-col gap-4"
								onSubmit={form.handleSubmit(onSubmit)}
							>
								<FormField
									control={form.control}
									name="originalUrl"
									render={({ field }) => (
										<FormItem>
											<FormLabel>link original</FormLabel>
											<FormControl>
												<Input
													placeholder="https://exemplo.com.br"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="shortCode"
									render={({ field }) => (
										<FormItem>
											<FormLabel>link encurtado</FormLabel>
											<FormControl>
												<Input
													placeholder={`${location}/`}
													fixedPlaceholder
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button variant="primary" className="mt-2" type="submit">
									Salvar Link
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
				<Card className="gap-4 lg:gap-5 w-full lg:col-span-6 h-fit">
					<CardHeader>
						<CardTitle>Meus Links</CardTitle>
						<CardAction>
							<Button variant="secondary" disabled>
								<Icon icon="ph:download-simple" />
								Baixar CSV
							</Button>
						</CardAction>
					</CardHeader>
					<CardContent>
						{listAllLinks.isLoading ? (
							<>
								<Separator />
								<div className="flex flex-col gap-3 px-[1.0625rem] pt-4 pb-6 justify-center items-center">
									<Icon
										icon="svg-spinners:90-ring-with-bg"
										width={32}
										height={32}
										className="text-gray-400"
									/>
									<Text className="text-gray-500">Carregando links...</Text>
								</div>
							</>
						) : (
							<>
								{listAllLinks.data?.links ? (
									<>
										{listAllLinks.data.links.length === 0 && (
											<>
												<Separator />
												<div className="flex flex-col gap-3 px-[1.0625rem] pt-4 pb-6 justify-center items-center">
													<Icon
														icon="ph:link"
														width={32}
														height={32}
														className="text-gray-400"
													/>
													<Text className="text-gray-500">
														Ainda não existem links cadastrados
													</Text>
												</div>
											</>
										)}
										{listAllLinks.data.links.map((link) => (
											<div className="flex flex-col gap-3 pb-3" key={link.id}>
												<Separator />
												<div className="flex flex-row justify-between items-center gap-4">
													<div className="flex flex-col gap-1 overflow-hidden">
														<NavLink
															to={`/${link.shortCode}`}
															className="overflow-hidden"
														>
															<Text
																variant="md-semibold"
																className="text-blue-base truncate block"
																title={`${location}/${link.shortCode}`}
															>
																{`${location}/${link.shortCode}`}
															</Text>
														</NavLink>
														<Text
															variant="sm-regular"
															className="text-gray-500 truncate"
															title={link.originalUrl}
														>
															{link.originalUrl}
														</Text>
													</div>
													<div className="flex flex-row gap-3 items-center min-w-fit">
														<Text
															variant="sm-regular"
															className="text-gray-500 text-nowrap"
														>
															{link.accessCount === 0
																? "0 acessos"
																: link.accessCount === 1
																	? `${link.accessCount} acesso`
																	: `${link.accessCount} acessos`}
														</Text>
														<div className="flex gap-1">
															<Button
																variant="secondary"
																onClick={() =>
																	handleCopyLink(link.shortCode, link.id)
																}
															>
																<Icon
																	icon={
																		copiedLinkId === link.id
																			? "ph:check"
																			: "ph:copy"
																	}
																/>
															</Button>
															<Button
																variant="secondary"
																onClick={() => handleDeleteShortLink(link.id)}
																disabled={deletingLinkId !== null}
															>
																{deletingLinkId === link.id ? (
																	<Icon icon="svg-spinners:90-ring-with-bg" />
																) : (
																	<Icon icon="ph:trash" />
																)}
															</Button>
														</div>
													</div>
												</div>
											</div>
										))}
									</>
								) : null}
							</>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
