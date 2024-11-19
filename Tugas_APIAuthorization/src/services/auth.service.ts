import UserModel from "../models/user.model";
import jwt from "jsonwebtoken";
import { SECRET } from "../utils/env";
import bcrypt from "bcrypt";

export const register = async (data: any) => {
  const user = new UserModel(data);
  await user.save();
  return user;
};

export const login = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
  return token;
};

export const updateProfile = async (id: string, data: any) => {
  const user = await UserModel.findByIdAndUpdate(id, data, { new: true });
  return user;
};