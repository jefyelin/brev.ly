import { Button } from "./components/ui/button";
import { Text } from "./components/ui/text";

export function App() {
	return (
		<div className="flex flex-col gap-4">
			<Button>Button</Button>
			<Text variant="xl" className="text-blue-base">
				xl
			</Text>
			<Text variant="lg">lg</Text>
			<Text variant="md">md</Text>
			<Text variant="sm-regular">sm-regular</Text>
			<Text variant="sm-semibold">sm-semibold</Text>
			<Text variant="xs">xs</Text>
		</div>
	);
}
