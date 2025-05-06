import type { Link } from "@/api/list-all-links";
import { Button } from "@/components/ui/button";
import {
	CheckIcon,
	CopyIcon,
	LinkIcon,
	LoadIcon,
	TrashIcon,
} from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { NavLink } from "react-router";

interface ShortLinkListProps {
	copiedLinkId: string | null;
	deletingLinkId: string | null;
	isLoading: boolean;
	isSuccess: boolean;
	links?: Link[];
	handleCopyLink: (shortCode: string, linkId: string) => void;
	handleDeleteShortLink: (id: string) => void;
}

export const ShortLinkList = ({
	copiedLinkId,
	deletingLinkId,
	isLoading,
	isSuccess,
	links,
	handleCopyLink,
	handleDeleteShortLink,
}: ShortLinkListProps) => {
	const location = window.location.origin.replace(/^https?:\/\//, "");

	return (
		<>
			{isLoading ? (
				<>
					<Separator />
					<div className="flex flex-col gap-3 px-[1.0625rem] pt-4 pb-6 justify-center items-center">
						<LoadIcon className="text-gray-400 w-8 h-8" />
						<Text className="text-gray-500">Carregando links...</Text>
					</div>
				</>
			) : (
				<>
					{isSuccess ? (
						<>
							{links?.length === 0 && (
								<>
									<Separator />
									<div className="flex flex-col gap-3 px-[1.0625rem] pt-4 pb-6 justify-center items-center">
										<LinkIcon className="text-gray-400" />
										<Text className="text-gray-500">
											Ainda não existem links cadastrados
										</Text>
									</div>
								</>
							)}
							{links?.map((link) => (
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
													{copiedLinkId === link.id ? (
														<CopyIcon />
													) : (
														<CheckIcon />
													)}
												</Button>
												<Button
													variant="secondary"
													onClick={() => handleDeleteShortLink(link.id)}
													disabled={deletingLinkId !== null}
												>
													{deletingLinkId === link.id ? (
														<LoadIcon />
													) : (
														<TrashIcon />
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
		</>
	);
};
