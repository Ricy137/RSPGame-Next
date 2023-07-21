"use client";
import { ReactNode, useCallback, useEffect } from "react";
import { Provider } from "jotai";
import { useShowToast } from "@/components/Toast";
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
  const showToast = useShowToast();

  useEffect(() => {
    try {
      initial();
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        const message = errorMessage(err);
        showToast({ content: message, type: "failed" });
      }
    }
  }, []);
  return <>{children}</>;
};
