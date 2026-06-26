import { LoginOutputDto } from "./dtos/login.dto";

export interface AuthService {
  login(email: string, password: string): Promise<LoginOutputDto>;
  register(email: string, password: string, username: string): Promise<void>;
}
