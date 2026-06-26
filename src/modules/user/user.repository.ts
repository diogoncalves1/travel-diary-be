import { User } from "./user.entity";

export interface UserRepository {
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
  find(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByEmailOrUsername(email: string, username: string): Promise<User | null>;
}
