import { PropsWithChildren, ComponentProps } from "react";
import Link from "next/link";
import cx from "clsx";

interface CardProps {
  title: string;
  content: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, content, link }) => {
  return (
    <Link href={link}>
      <div className="p-[40px] flex flex-col justify-between items-center w-[250px] h-[250px] rounded-[24px] border-dash border-[1px] border-[#DCDEE0] bg-white cursor-pointer hover:bg-[#FFFFFF14]">
        <div className="text-[24px] leading-[32px]">{title}</div>
        <div className="text-[16px] leading-[24px]">{content}</div>
      </div>
    </Link>
  );
};

export const WrapperCard: React.FC<
  PropsWithChildren & ComponentProps<"div">
> = ({ children, className, ...props }) => (
  <div
    className={cx(
      "p-[40px] rounded-[24px] border-dashed border-[1px] border-[#DCDEE0] bg-white",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default Card;
