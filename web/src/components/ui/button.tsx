import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Text } from "./text";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive w-full",
	{
		variants: {
			variant: {
				primary:
					"bg-blue-base shadow-xs enabled:hover:bg-blue-dark h-12 text-white rounded-[8px] p-[15px]",
				secondary:
					"bg-gray-200 text-gray-500 h-8 enabled:hover:ring-blue-base enabled:hover:ring-1 rounded-[4px] w-fit p-2",
			},
		},
		defaultVariants: {
			variant: "primary",
		},
	},
);

function Button({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Text
			variant={variant === "primary" ? "md" : "sm-semibold"}
			className="inline-flex w-full"
			as="div"
		>
			<Comp
				data-slot="button"
				className={cn(buttonVariants({ variant, className }))}
				type="button"
				{...props}
			/>
		</Text>
	);
}

export { Button, buttonVariants };
