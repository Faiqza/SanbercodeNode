import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../utils/env";

export interface IRequestWithUser  extends Request {
  user?: { id: string };
}

const authMiddleware = (req: IRequestWithUser , res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = { id: (decoded as any).id };
    next();
  });
};

export default authMiddleware;