import { cn } from "@/lib/utils";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

type IconProps = DetailedHTMLProps<
	HTMLAttributes<HTMLSpanElement>,
	HTMLSpanElement
>;

export const LoadIcon = ({ className, ...props }: IconProps) => {
	return (
		<span
			className={cn("icon-[svg-spinners--180-ring-with-bg] w-4 h-4", className)}
			{...props}
		/>
	);
};

export const TrashIcon = ({ className, ...props }: IconProps) => {
	return (
		<span className={cn("icon-[ph--trash] w-4 h-4", className)} {...props} />
	);
};

export const DownloadIcon = ({ className, ...props }: IconProps) => {
	return (
		<span
			className={cn("icon-[ph--download-simple] w-4 h-4", className)}
			{...props}
		/>
	);
};

export const LinkIcon = ({ className, ...props }: IconProps) => {
	return (
		<span className={cn("icon-[ph--link] w-4 h-4", className)} {...props} />
	);
};

export const CopyIcon = ({ className, ...props }: IconProps) => {
	return (
		<span className={cn("icon-[ph--copy] w-4 h-4", className)} {...props} />
	);
};

export const CheckIcon = ({ className, ...props }: IconProps) => {
	return (
		<span className={cn("icon-[ph--check] w-4 h-4", className)} {...props} />
	);
};

export const WarningIcon = ({ className, ...props }: IconProps) => {
	return (
		<span className={cn("icon-[ph--warning] w-4 h-4", className)} {...props} />
	);
};
