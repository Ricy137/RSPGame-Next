"use client";
import {
  useState,
  useCallback,
  MouseEvent,
  ReactNode,
  forwardRef,
} from "react";
import cx from "clsx";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { RPSSLIcons } from "@/components/Icons";
import { Move } from "@/services/game";
import renderReactNode from "@/utils/renderReactNode";

interface MoveItemProps {
  selectedValue?: number;
  value: number;
  icon: ReactNode | Function;
  onClick: (selectedValue: number) => void;
}

const MoveItem: React.FC<MoveItemProps> = ({
  selectedValue,
  value,
  icon,
  onClick,
}) => {
  const handleClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    onClick(value);
  }, []);

  return (
    <div
      onClick={handleClick}
      className={cx(
        "p-[16px] flex flex-row items-center gap-x-[8px] w-full h-[300px] text-[16px] leading-[24px] border-[1px] border-[#111111] hover:border-[#292E41] text-[#111111] hover:text-[#292E41] hover:bg-[#292E410a] cursor-pointer",
        selectedValue === value &&
          "border-[#292E41] text-[#292E41] bg-[#292E410a]"
      )}
    >
      {renderReactNode(icon)}
      {Move[value - 1]}
    </div>
  );
};

const MoveBard = forwardRef<
  HTMLSelectElement,
  ReturnType<UseFormRegister<any>> & { setValue: UseFormSetValue<any> }
>(({ setValue, onChange, onBlur, name, ...props }, _forwardRef) => {
  const { ref, ...rest } = props;
  const [selectedValue, setSelectedValue] = useState<number>();

  const onClick = useCallback((newSelectedValue: number) => {
    setValue(name, newSelectedValue);
    setSelectedValue(newSelectedValue);
  }, []);

  return (
    <>
      <div className="w-full grid grid-cols-5 items-center">
        <select
          // hidden
          className="hidden"
          ref={_forwardRef}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          value={selectedValue}
          {...rest}
        >
          {Move.map((move, index) => (
            <option key={move} value={index + 1} />
          ))}
        </select>
        {Move.map((move, index) => (
          <MoveItem
            key={move}
            value={index + 1}
            icon={RPSSLIcons[index]}
            onClick={onClick}
            selectedValue={selectedValue}
          />
        ))}
      </div>
    </>
  );
});

export default MoveBard;
