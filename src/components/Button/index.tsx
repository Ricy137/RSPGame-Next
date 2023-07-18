import React, {
  createElement,
  forwardRef,
  type ReactNode,
  type PropsWithChildren,
} from "react";
import cx from "clsx";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  loading?: boolean | "start" | "end";
}

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  (
    {
      children,
      className,
      disabled = false,
      fullWidth = false,
      loading = false,
      ...props
    },
    _forwardRef
  ) => {
    return (
      <button
        className={cx(
          "px-[14px] flex flex-row justify-center items-center h-[32px] whitespace-nowrap cursor-pointer border-[1px] text-[14px] rounded-[8px] leading-[22px] bg-[#111111] text-[#F1F1F3] hover:bg-[#292E41] hover:text-[#F1F1F3]",
          (loading || disabled) &&
            "pointer-events-none cursor-not-allowed opacity-30",
          fullWidth ? "w-full" : "w-fit",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
