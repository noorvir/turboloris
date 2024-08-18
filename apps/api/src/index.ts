import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { requestId } from "hono/request-id";

import healthRoutes from "./routes/health";

const app = new OpenAPIHono({
  defaultHook: (result, c) => {
    console.log(result);
    if (!result.success) {
      return c.json({ success: false, errors: result.error.errors }, 422);
    }
  },
});

app.use("*", requestId());

app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
  type: "http",
  scheme: "bearer",
});

app.get(
  "/",
  swaggerUI({
    url: "/openapi",
  })
);

app.doc("/openapi", {
  openapi: "3.1.0",
  info: {
    version: "1.0.0",
    title: "Yotai API",
  },
});

app.route("/health", healthRoutes);

export default app;
