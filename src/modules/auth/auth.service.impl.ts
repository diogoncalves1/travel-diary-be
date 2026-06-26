import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthService } from "./auth.service";
import { UserRepositoryPrisma } from "../user/prisma/user.repository.prisma";
import { User } from "../user/user.entity";
import { LoginOutputDto } from "./dtos/login.dto";
import { AppError } from "../../shared/errors/AppError";

export class AuthServiceImplementation implements AuthService {
  private constructor(readonly repository: UserRepositoryPrisma) {}

  public static build(repository: UserRepositoryPrisma) {
    return new AuthServiceImplementation(repository);
  }

  public async login(email: string, password: string): Promise<LoginOutputDto> {
    const user = await this.repository.findByEmail(email);

    if (!user) throw new AppError("User not found");

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new AppError("INVALID_CREDENTIALS");
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" },
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    };
  }

  public async register(
    email: string,
    password: string,
    username: string,
  ): Promise<void> {
    const userTest = await this.repository.findByEmailOrUsername(
      email,
      username,
    );

    if (userTest) throw new AppError("Email or username already in use");

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = User.create(email, passwordHash, username);

    await this.repository.save(user);
  }
}
