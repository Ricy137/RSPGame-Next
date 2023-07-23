"use client";
import { ReactNode, useCallback, useEffect } from "react";
import { Provider, useAtom } from "jotai";
import { useShowToast } from "@/components/Toast";
import { asyncAccountsAtom } from "@/services/accounts";
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
  const [, initial] = useAtom(asyncAccountsAtom);
  const showToast = useShowToast();

  useEffect(() => {
    const initialize = async () => {
      try {
        await initial("initial");
      } catch (err) {
        console.log(err);
        if (err instanceof Error) {
          const message = errorMessage(err);
          showToast({ content: message, type: "failed" });
        }
      }
    };
    initialize();
  }, []);
  return <>{children}</>;
};
