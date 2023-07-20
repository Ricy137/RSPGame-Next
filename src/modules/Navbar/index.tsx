"use client";
import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import gameEssentialAtom from "@/services/game";
import Button from "@/components/Button";
const Navbar: React.FC = () => {
  const pathName = usePathname();
  const router = useRouter();
  const setGameEssential = useSetAtom(gameEssentialAtom);

  const handleBack = useCallback(() => {
    setGameEssential(null);
    router.push("/");
  }, []);

  return (
    <div className="fixed p-[24px] w-full h-[80px]">
      {pathName !== "/" && (
        <Button onClick={handleBack}>Back to landing</Button>
      )}
    </div>
  );
};

export default Navbar;
