import express from "express";
import type { Express } from "express";

export class ApiExpress {
  private constructor(readonly app: Express) {}

  public static build() {
    const app = express();
    app.use(express.json());
    return new ApiExpress(app);
  }

  public registerRoutes(routes: any) {
    this.app.use("/api/v1", routes);
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log("Server running on port " + port);
    });
  }
}
