import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateShortLinkForm } from "./components/create-short-link-form";
import { MyLinksAction } from "./components/my-links-header";
import { ShortLinkList } from "./components/short-link-list";
import { useHomePage } from "./hooks/use-home-page";

export const HomePage = () => {
	const {
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
	} = useHomePage();

	return (
		<div className="px-3 py-8 flex flex-col items-center gap-[1.4819rem] lg:items-start lg:gap-8 lg:max-w-[61.25rem] lg:mx-auto lg:px-0 lg:pt-[5.5rem] min-h-dvh h-fit">
			<img
				src="/brev.ly-logo.svg"
				alt="Logo Brev.ly"
				className="w-[6.0419rem] h-[1.5181rem]"
			/>
			<div className="flex flex-col gap-3 w-full lg:grid lg:grid-cols-10">
				<Card className="w-full lg:col-span-4 h-fit">
					<CardHeader>
						<CardTitle>Novo Link</CardTitle>
					</CardHeader>
					<CardContent>
						<CreateShortLinkForm
							isLoading={createShortLink.isPending}
							handleCreateShortLink={handleCreateShortLink}
						/>
					</CardContent>
				</Card>
				<Card className="gap-4 lg:gap-5 w-full lg:col-span-6 h-fit max-h-[43.75rem] overflow-y-auto">
					<CardHeader>
						<CardTitle>Meus Links</CardTitle>
						<MyLinksAction
							disableDownloadCSVButton={disableDownloadCSVButton}
							isLoading={exportAllLinks.isPending}
							handleDownloadCSV={handleDownloadCSV}
						/>
					</CardHeader>
					<CardContent>
						<ShortLinkList
							copiedLinkId={copiedLinkId}
							deletingLinkId={deletingLinkId}
							isLoading={listAllLinks.isLoading}
							isSuccess={listAllLinks.isSuccess}
							links={listAllLinks.data?.links}
							handleCopyLink={handleCopyLink}
							handleDeleteShortLink={handleDeleteShortLink}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
