"use client";
import { ReactNode, useCallback, useEffect } from "react";
import { Provider } from "jotai";
import { useAtom } from "jotai";
import { useAccountsAtom } from "@/services/accounts";
import { errorMessage } from "@/utils/error";

const JotaiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider>
      <AccountWrapper>{children}</AccountWrapper>
    </Provider>
  );
};

export default JotaiProvider;

const AccountWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { initial } = useAccountsAtom();

  useEffect(() => {
    try {
      initial();
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        const message = errorMessage(err);
        alert(message);
      }
    }
  }, []);
  return <>{children}</>;
};
