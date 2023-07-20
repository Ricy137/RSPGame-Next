import { randomBytes } from "ethers";

//Make the random number random enough and has long enough length
export const randomBytes256 = () => {
  const saltArray = randomBytes(32);
  let salt = BigInt(1);
  saltArray.forEach((saltElement) => {
    //prevent 0 from reducing the randomness
    if (saltElement === 0) {
      salt = salt * BigInt(1);
    } else {
      salt = salt * BigInt(saltElement);
    }
  });
  return salt;
};
