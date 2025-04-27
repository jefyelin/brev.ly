"use client";

import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";
import { Text } from "./text";

function Label({
	className,
	children,
	...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
	return (
		<LabelPrimitive.Root
			data-slot="label"
			className={cn(
				"flex items-center gap-2 text-gray-500 leading-none select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
				className,
			)}
			{...props}
		>
			<Text variant="xs">{children}</Text>
		</LabelPrimitive.Root>
	);
}

export { Label };
