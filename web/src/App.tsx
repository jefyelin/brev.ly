import { Icon } from "@iconify/react";
import { Button } from "./components/ui/button";

export function App() {
	return (
		<div className="flex flex-col gap-4">
			<Button>Button</Button>
			<Button disabled>Button</Button>
			<Button variant="secondary">Button</Button>
			<Button variant="secondary" disabled>
				Button
			</Button>
			<Button variant="secondary">
				<Icon icon="ph:acorn-light" />
			</Button>
		</div>
	);
}
