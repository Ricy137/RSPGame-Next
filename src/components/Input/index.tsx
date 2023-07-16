"use client";
import { forwardRef, useRef, useCallback } from "react";
import cx from "clsx";
import composeRef from "@/utils/composeRef";
import style from "./style.module.css";

export type Props = OverWrite<
  React.InputHTMLAttributes<HTMLInputElement>,
  {
    title?: string;
    error?: string;
    inputClassName?: string;
  }
>;

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      inputClassName,
      error,
      defaultValue,
      title,
      onChange,
      ...props
    },
    ref
  ) => {

    return (
      <>
        {title && (
          <label
            htmlFor={props.name}
            className="mb-[4px] text-[14px] text-[#62677B]"
          >
            {title}
          </label>
        )}
        <div className={cx(style.balanceInput_wrapper, className)}>
          <div className="flex justify-between items-center">
            <input
              ref={ref}
              step="0.000000000000000001"
              className={cx(style.balanceInput, inputClassName)}
              autoComplete="off"
              defaultValue={defaultValue}
              onChange={onChange}
              type="number"
              id={props.name}
              autoFocus
              {...props}
            />
            <div className={cx(style.balanceInput_errorBorder)} />
          </div>
        </div>
      </>
    );
  }
);

export default Input;
