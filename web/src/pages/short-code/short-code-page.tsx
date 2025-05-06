import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useShortCodePage } from "./hooks/use-short-code-page";

export const ShortCodePage = () => {
	const { originalUrl } = useShortCodePage();

	return (
		<div className="px-3 py-8 flex items-center min-h-dvh h-fit lg:px-0 lg:grid lg:grid-cols-10">
			<Card className="mx-auto lg:max-w-[61.25rem] lg:col-start-3 lg:col-end-8">
				<CardContent className="flex flex-col gap-6 px-5 py-12 lg:px-12 lg:py-16 items-center text-center">
					<img
						src="/brev.ly-logo-icon.svg"
						alt="Brev.ly Logo"
						className="w-12 h-12"
					/>
					<Text variant="xl" className="text-gray-600" as="h2">
						Redirecionando...
					</Text>
					<div className="flex flex-col">
						<Text variant="md-regular" className="text-gray-500" as="p">
							O link será aberto automaticamente em alguns instantes.
						</Text>
						<Text variant="md-regular" className="text-gray-500" as="p">
							{originalUrl ? (
								<>
									Não foi redirecionado?{" "}
									<a href={originalUrl}>
										<Text className="text-blue-base underline">
											Acesse aqui
										</Text>
									</a>
								</>
							) : (
								"Carregando o link..."
							)}
						</Text>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
