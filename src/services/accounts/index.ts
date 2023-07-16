import { atomsWithMutation } from "jotai-tanstack-query";

// const accountsAtom = atom<string[]>([]);

export const [, accountsAtom] = atomsWithMutation(() => ({
  mutationKey: ["accounts"],
  mutationFn: async ({ type }: { type: "initial" | "connect" }) => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return [];
    }
    if (type === "initial") {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      return accounts;
    } else {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts;
    }
  },
}));
