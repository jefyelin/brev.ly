import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { LoadIcon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormReturn, useForm } from "react-hook-form";
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

export type FormSchema = z.infer<typeof formSchema>;

export interface HandleCreateShortLinkProps {
	data: FormSchema;
	form: UseFormReturn<FormSchema, unknown, FormSchema>;
}

interface CreateShortLinkFormProps {
	isLoading: boolean;
	handleCreateShortLink: ({ data, form }: HandleCreateShortLinkProps) => void;
}

export const CreateShortLinkForm = ({
	isLoading,
	handleCreateShortLink,
}: CreateShortLinkFormProps) => {
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			originalUrl: "",
			shortCode: "",
		},
	});

	const disableSaveLinkButton =
		isLoading ||
		!form.watch("originalUrl").trim() ||
		!form.watch("shortCode").trim();

	const location = window.location.origin.replace(/^https?:\/\//, "");

	const onSubmit = async (data: FormSchema) => {
		handleCreateShortLink({ data, form });
	};

	return (
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
								<Input placeholder="https://exemplo.com.br" {...field} />
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
				<Button
					variant="primary"
					className="mt-2"
					type="submit"
					disabled={disableSaveLinkButton}
				>
					{isLoading ? (
						<>
							<LoadIcon />
							Salvando Link
						</>
					) : (
						"Salvar Link"
					)}
				</Button>
			</form>
		</Form>
	);
};
