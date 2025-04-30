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
import { useListAllLinks } from "@/hooks/use-list-all-links";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import { z } from "zod";

const formSchema = z.object({
	originalLink: z.string().url("URL inválida"),
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
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			originalLink: "",
			shortCode: "",
		},
	});

	const listAllLinks = useListAllLinks();

	const onSubmit = async (data: FormSchema) => {
		alert(JSON.stringify(data, null, 2));
	};

	const location = window.location.origin.replace(/^https?:\/\//, "");

	const handleCopyLink = (shortCode: string) => {
		const link = `${window.location.origin}/${shortCode}`;
		navigator.clipboard.writeText(link);
	};

	return (
		<div className="px-3 py-8 flex flex-col items-center gap-[1.4819rem] lg:items-start lg:gap-8 lg:max-w-[61.25rem] lg:mx-auto lg:px-0 lg:pt-[5.5rem] min-h-dvh h-fit">
			<img
				src="./brev.ly-logo.svg"
				alt=""
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
									name="originalLink"
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
																onClick={() => handleCopyLink(link.shortCode)}
															>
																<Icon icon="ph:copy" />
															</Button>
															<Button variant="secondary">
																<Icon icon="ph:trash" />
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
