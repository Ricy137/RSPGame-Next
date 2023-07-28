"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";
const Navbar: React.FC = () => {
  const pathName = usePathname();
  return (
    <div className="fixed p-[24px] w-full h-[80px]">
      {pathName !== "/" && (
        <Link href="/">
          <Button>
            {pathName !== "/result"
              ? "Back to landing"
              : "restart from landing"}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
