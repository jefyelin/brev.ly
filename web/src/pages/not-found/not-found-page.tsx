import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { NavLink } from "react-router";

export const NotFoundPage = () => {
	return (
		<div className="px-3 py-8 flex items-center min-h-dvh h-fit lg:px-0 lg:grid lg:grid-cols-10">
			<Card className="mx-auto lg:max-w-[61.25rem] lg:col-start-3 lg:col-end-8">
				<CardContent className="flex flex-col gap-6 px-5 py-12 lg:px-12 lg:py-16 items-center text-center">
					<img
						src="/404.svg"
						alt="Not Found"
						className="w-[10.25rem] h-[4.5rem]"
					/>
					<Text variant="xl" className="text-gray-600" as="h2">
						Link não encontrado
					</Text>
					<Text variant="md-regular" className="text-gray-500" as="p">
						O link que você está tentando acessar não existe, foi removido ou é
						uma URL inválida. Saiba mais em{" "}
						<NavLink to="/">
							<Text className="text-blue-base underline">brev.ly</Text>
						</NavLink>
						.
					</Text>
				</CardContent>
			</Card>
		</div>
	);
};
