import { PrismaClient } from "@prisma/client";
import { User } from "../user.entity";
import { UserRepository } from "../user.repository";

export class UserRepositoryPrisma implements UserRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new UserRepositoryPrisma(prisma);
  }

  public async save(user: User): Promise<void> {
    const data = {
      id: user.id,
      email: user.email,
      password: user.password,
      username: user.username,
    };

    await this.prisma.user.create({ data });
  }

  public async update(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async find(id: string): Promise<User | null> {
    const aUser = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!aUser) {
      return null;
    }

    return User.restore({
      id: aUser.id,
      email: aUser.email,
      username: aUser.username,
      password: aUser.password,
    });
  }

  public async findByEmail(email: string): Promise<User | null> {
    const aUser = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!aUser) {
      return null;
    }

    return User.restore({
      id: aUser.id,
      email: aUser.email,
      username: aUser.username,
      password: aUser.password,
    });
  }

  public async findByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<User | null> {
    const aUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (!aUser) {
      return null;
    }

    return User.restore({
      id: aUser.id,
      email: aUser.email,
      username: aUser.username,
      password: aUser.password,
    });
  }
}
