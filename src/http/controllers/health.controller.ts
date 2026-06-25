import type { Request, Response } from "express";

export class HealthController {
  private constructor() {}

  public static build() {
    return new HealthController();
  }

  /**
   * this is a method only for test
   */
  public async test(req: Request, response: Response) {
    const data = {
      status: "ok",
      timestamp: Date.now(),
    };

    response.status(200).json(data).send();
  }
}
