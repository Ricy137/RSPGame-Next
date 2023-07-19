import { atomsWithMutation } from "jotai-tanstack-query";

// const accountsAtom = atom<string[]>([]);

export const [, accountsAtom] = atomsWithMutation(() => ({
  mutationKey: ["accounts"],
  mutationFn: async ({ type }: { type: "initial" | "connect" }) => {
    if (typeof window === "undefined") return [];
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return [];
    }
    let network = window.ethereum.networkVersion;
    if (network !== "5") {
      alert("Please change your network to goerli");
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
