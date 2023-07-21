// import Error from "next/error"
export const errorMessage = (error: Error & { code?: string }) => {
  if (error.code === "ACTION_REJECTED") {
    return "User rejected the transaction";
  } else if (error.code === "CALL_EXCEPTION") {
    return "Transaction reverted, make sure you've entered the right data and you have the right to operate the transaction";
  } else if (error.code === "INSUFFICIENT_FUNDS") {
    return "Insufficient funds";
  }
  return error.message;
};
