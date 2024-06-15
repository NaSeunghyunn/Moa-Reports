import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon?: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & RefAttributes<SVGSVGElement>
  >;
  name: string;
  errors?: string[];
}

export default function FormInput({
  Icon,
  name,
  errors,
  className,
  ...rest
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        className={`input input-bordered flex items-center gap-2 text-black ${className}`}
      >
        {Icon && <Icon className="size-6" />}
        <input {...rest} name={name} className="grow" />
      </label>
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
