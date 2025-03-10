import cs from "classnames";
import cn from "classnames";
import { useController } from "react-hook-form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

type CheckboxProps<T extends FieldValues> = {
	name: FieldPath<T>;
	control: Control<T>;
	label: string;
	className?: string;
	inputClassName?: string;
	disabled?: boolean;
};

function Checkbox<T extends FieldValues>({
	name,
	control,
	label,
	className,
	inputClassName,
	disabled,
}: CheckboxProps<T>) {
	const {
		field,
		fieldState: { error },
	} = useController({
		name,
		control,
	});

	const handleChange = () => {
		field.onChange(!field.value); // Toggle the value
	};

	const handleKeyPress = (event: React.KeyboardEvent) => {
		if (event.key === "Enter" || event.key === " ") {
			handleChange();
		}
	};

	return (
		<div className={cs("flex items-center gap-2", className)}>
			<div className="relative">
				<input
					type="checkbox"
					id={`${name}-${field.value}`}
					name={name}
					checked={!!field.value}
					onChange={handleChange}
					onKeyPress={handleKeyPress}
					aria-checked={!!field.value}
					className={cn(
						"h-5 w-5 cursor-pointer rounded border border-surface-border bg-white",
						field.value && "bg-surface-primary-default",
					)}
				/>
				<div
					className={cs(
						"w-6 h-6 border-2 rounded-md flex justify-center items-center cursor-pointer transition-all",
						{
							"border-[#c7ccd0]": !error && !field.value,
							"border-[#ffc222]": !!field.value, // Selected (checked) state
							"border-[#d32a1b]": error,
						},
					)}
					onClick={handleChange}
					onKeyPress={handleKeyPress}
					tabIndex={0}
					role="checkbox"
					aria-checked={!!field.value}
				>
					{field.value && (
						<div className="w-3 h-3 bg-[#ffc222] rounded-md" /> // Filled square when checked
					)}
				</div>
			</div>
			<label
				htmlFor={name}
				className="text-base font-normal font-['Inter'] text-[#3c3e3f] cursor-pointer"
				onClick={handleChange}
				onKeyPress={handleKeyPress}
			>
				{label}
			</label>
		</div>
	);
}

export default Checkbox;
