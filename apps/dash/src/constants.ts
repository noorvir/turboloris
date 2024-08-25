import { Env } from "@yotai/utils";

const requiredEnvVars = ["DB_URL"];
const optionalEnvVars: readonly string[] = [];

export const constants = Env.init(requiredEnvVars, optionalEnvVars);
