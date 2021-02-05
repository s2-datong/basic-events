import { User } from "../db/models/User";
import { sign } from "jsonwebtoken";
import { config } from "../config";

export const Register = async (firstname: string, lastname: string, email: string, password: string) => {
    const accountExists = await User.EmailExists(email);
    if(accountExists) throw new Error("This email is already in use");

    const user = new User(firstname, lastname, email, password);
    await user.save();

    return {message: "Account created"};
}

export const Login = async ( email: string, password: string ) => {
    const user = await User.login(email, password);
    const payload = {
        first_name: user.first_name,
        roles: user.roles,
        id: String(user.id)
    }

    const token = sign(payload, config.jwt_secret, {expiresIn: config.jwt_expires});
    return {
        user: payload,
        token
    }
}