import { cn } from "@/lib/utils";
import { useLayoutEffect, useRef, useState } from "react";
import { Text } from "./text";

type InputProps = React.ComponentProps<"input"> & {
	fixedPlaceholder?: boolean;
};

function Input({ className, type, fixedPlaceholder, ...props }: InputProps) {
	const fixedPlaceholderRef = useRef<HTMLDivElement>(null);

	const [inputPaddingLeft, setInputPaddingLeft] = useState<number>(16);

	useLayoutEffect(() => {
		if (fixedPlaceholder && fixedPlaceholderRef.current && props.placeholder) {
			const updatePadding = () => {
				if (fixedPlaceholderRef.current) {
					setTimeout(() => {
						// biome-ignore lint/style/noNonNullAssertion: not applicable
						setInputPaddingLeft(fixedPlaceholderRef.current!.offsetWidth + 16);
					}, 100);
				}
			};

			document.fonts.ready.then(updatePadding);

			const mutationObserver = new MutationObserver(updatePadding);
			mutationObserver.observe(fixedPlaceholderRef.current, {
				subtree: true,
				childList: true,
				characterData: true,
			});

			const resizeObserver = new ResizeObserver(updatePadding);
			resizeObserver.observe(fixedPlaceholderRef.current);

			return () => {
				mutationObserver.disconnect();
				resizeObserver.disconnect();
			};
		}
	}, [fixedPlaceholder, props.placeholder]);

	return (
		<Text
			as="div"
			className="flex w-full relative items-center"
			variant="md-regular"
		>
			{fixedPlaceholder && (
				<Text
					variant="md-regular"
					className="text-gray-400 absolute left-[1.0625rem]"
					ref={fixedPlaceholderRef}
				>
					{props.placeholder}
				</Text>
			)}
			<input
				type={type}
				data-slot="input"
				data-fixed-placeholder={fixedPlaceholder}
				className={cn(
					"placeholder-gray-400 data-fixed-placeholder:placeholder-transparent flex h-12 w-full min-w-0 rounded-[8px] border border-gray-300 bg-transparent pr-4 py-[15px] shadow-xs transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 caret-blue-base",
					"focus-visible:inset-ring-blue-base focus-visible:inset-ring-[0.5px] focus-visible:border-blue-base",
					"aria-invalid:inset-ring-danger aria-invalid:border-danger aria-invalid:inset-ring-[0.5px]",
					className,
				)}
				style={{
					paddingLeft: inputPaddingLeft,
				}}
				{...props}
			/>
		</Text>
	);
}

export { Input };
