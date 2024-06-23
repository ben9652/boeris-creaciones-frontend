import { User } from "./user.entities";

export interface ApiMessage {
    mensaje: string | User;
    error: boolean;
}