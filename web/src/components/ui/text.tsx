import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const textVariants = cva("", {
	variants: {
		variant: {
			xl: "text-[24px] leading-[32px] font-bold",
			lg: "text-[18px] leading-[24px] font-bold",
			md: "text-[14px] leading-[18px] font-semibold",
			"sm-regular": "text-[12px] leading-[16px] font-normal",
			"sm-semibold": "text-[12px] leading-[16px] font-semibold",
			xs: "text-[10px] leading-[14px] font-normal uppercase",
		},
	},
	defaultVariants: {
		variant: "md",
	},
});

export interface TextProps
	extends React.HTMLAttributes<HTMLElement>,
		VariantProps<typeof textVariants> {
	as?: React.ElementType;
	asChild?: boolean;
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
	({ className, variant, as, asChild, ...props }, ref) => {
		const Comp = asChild ? Slot : as || "span";

		return (
			<Comp
				ref={ref}
				className={cn(textVariants({ variant, className }))}
				{...props}
			/>
		);
	},
);

Text.displayName = "Text";
