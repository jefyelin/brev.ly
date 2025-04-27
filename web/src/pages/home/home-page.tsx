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
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
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

	const onSubmit = async (data: FormSchema) => {
		alert(JSON.stringify(data, null, 2));
	};

	return (
		<div className="px-3 py-8 flex flex-col items-center gap-[1.4819rem]">
			<img
				src="./brev.ly-logo.svg"
				alt=""
				className="w-[6.0419rem] h-[1.5181rem]"
			/>
			<div className="flex flex-col gap-3 w-full">
				<Card>
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
													placeholder="localhost:5173/"
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
				<Card className="gap-4 lg:gap-5">
					<CardHeader>
						<CardTitle>Meus Links</CardTitle>
						<CardAction>
							<Button variant="secondary">
								<Icon icon="ph:download-simple" />
								Baixar CSV
							</Button>
						</CardAction>
					</CardHeader>
					<CardContent>content</CardContent>
				</Card>
			</div>
		</div>
	);
};
