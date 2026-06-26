import { Request, Response } from "express";
import { error, success } from "../../shared/utils/apiResponse.util";
import { prisma } from "../../infrastructure/prisma/prisma.client";
import { AuthServiceImplementation } from "./auth.service.impl";
import { LoginRequestDto } from "./dtos/login.dto";
import { RegisterRequestDto } from "./dtos/register.dto";

export class AuthController {
  private constructor(private readonly service: AuthServiceImplementation) {}

  public static build(service: AuthServiceImplementation) {
    return new AuthController(service);
  }

  /**
   * Authenticates a user and initiates a login session.
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {Promise<Object>} The authenticated user data and session token.
   */
  public async login(request: Request, response: Response) {
    try {
      const body: LoginRequestDto = request.body;

      const data = await this.service.login(body.email, body.password);

      success(response, data).send();
    } catch (err: any) {
      error(response, err, err.message).send();
    }
  }

  /**
   * Authenticates a user and initiates the registration process.
   *
   * @param {string} email - The user's email address.
   * @param {string} username - The user's username.
   * @param {string} password - The user's password.
   * @returns {Promise<Object>} The authenticated user data and session token.
   */
  public async register(request: Request, response: Response) {
    try {
      const body: RegisterRequestDto = request.body;

      await this.service.register(body.email, body.password, body.username);

      success(response).send();
    } catch (err: any) {
      error(response, err, err.message).send();
    }
  }
}
