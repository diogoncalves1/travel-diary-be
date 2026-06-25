import { ApiExpress } from "./http/express";
import { router } from "./http/routes";

function main() {
  const api = ApiExpress.build();

  api.registerRoutes(router);

  api.start(8001);
}

main();
