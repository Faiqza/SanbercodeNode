import bcrypt from "bcrypt";

export const encrypt = (password: string): string => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};