import { Button } from "@/components/ui/button";
import { CardAction } from "@/components/ui/card";
import { DownloadIcon, LoadIcon } from "@/components/ui/icon";

interface MyLinksActionProps {
	disableDownloadCSVButton: boolean;
	isLoading: boolean;
	handleDownloadCSV: () => void;
}

export const MyLinksAction = ({
	disableDownloadCSVButton,
	isLoading,
	handleDownloadCSV,
}: MyLinksActionProps) => {
	const onDownloadCSV = () => {
		handleDownloadCSV();
	};

	return (
		<CardAction>
			<Button
				variant="secondary"
				disabled={disableDownloadCSVButton}
				onClick={onDownloadCSV}
			>
				{isLoading ? <LoadIcon /> : <DownloadIcon />}
				Baixar CSV
			</Button>
		</CardAction>
	);
};
