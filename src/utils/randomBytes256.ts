import { randomBytes } from "ethers";

export const randomBytes256 = () => {
  const saltArray = randomBytes(32);
  let salt = BigInt(1);
  saltArray.forEach((saltElement) => {
    salt = salt * BigInt(saltElement);
  });
  return salt;
};
