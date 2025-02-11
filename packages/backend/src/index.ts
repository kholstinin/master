import Fastify from "fastify";
import cors from "@fastify/cors";

import { initRoutes } from "./routes.ts";

const fastify = Fastify({
  logger: true
});

await fastify.register(cors, {
  origin: "*"
});

initRoutes(fastify);

fastify.listen({ port: 4000, host: "0.0.0.0" }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
