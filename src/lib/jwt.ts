import { Secret, sign, verify } from "jsonwebtoken";

export const createToken = (username: string, password: string) => {
  // Define the payload
  const payload = { username, password };

  // Define the secret key (should be stored securely and not hardcoded)
  const secretKey = "YOUR_SECRET_KEY"; // Replace with your secret key

  // Define token options, including expiry in 30 days
  const options = { expiresIn: "30d" };

  // Generate the token
  const token = sign(payload, secretKey, options);

  return token;
};

export const verifyToken = (token: string) => {
  // Define the payload

  // Define the secret key (should be stored securely and not hardcoded)
  const secretKey = "YOUR_SECRET_KEY"; // Replace with your secret key

  // Define token options, including expiry in 30 days

  // Generate the token
  const isValid = verify(token, secretKey);

  return isValid;
};
