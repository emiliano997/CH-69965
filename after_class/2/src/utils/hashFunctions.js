import bcrypt from "bcrypt";

const SALT_ROUND = 10;

export async function createHash(password) {
  const hashPassword = await bcrypt.hash(
    password,
    bcrypt.genSaltSync(SALT_ROUND)
  );
  return hashPassword;
}

export async function verifyPassword(password, hash) {
  const isPasswordCorrect = await bcrypt.compare(password, hash);
  return isPasswordCorrect;
}
