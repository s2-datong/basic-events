import { AdminMiddleware } from "./Admin";
import { AuthMiddleware } from "./Auth";

export const AuthAdminMiddleware = [AuthMiddleware, AdminMiddleware];