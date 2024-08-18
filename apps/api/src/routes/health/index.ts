import { createRoute } from "@hono/zod-openapi";
import { OpenAPIHono } from "@hono/zod-openapi";
import { env } from "hono/adapter";
import { HealthSchema } from "./schema";
import { ErrorSchema } from "@/common/schema";

const app = new OpenAPIHono();

const root = createRoute({
  method: "get",
  path: "/",
  summary: "Health",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: HealthSchema,
        },
      },
      description: "Health check",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Returns an error",
    },
  },
});
function isHealthy(): boolean {
  return false;
}
app.openapi(root, async (c) => {
  if (isHealthy()) {
    return c.json({
      data: {
        healthy: true,
      },
    });
  }

  return c.json({
    code: "not_found",
    message: "The provided list does not exist.",
    requestId: "ada12exad",
  });
});

export default app;
