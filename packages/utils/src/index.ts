type EnvType<T extends readonly string[]> = Env<T> & {
  readonly [K in T[number]]: string;
};

export class Env<T extends readonly string[]> {
  private constructor(
    requiredEnvVars: T,
    optionalEnvVars: readonly string[] = []
  ) {
    for (const key of requiredEnvVars) {
      const value = process.env[key];
      if (value === undefined) {
        throw new Error(`Missing required environment variable: ${key}`);
      }
    }
    const keys = [...requiredEnvVars, ...optionalEnvVars];
    for (const key of keys) {
      Object.defineProperty(this, key, {
        value: process.env[key],
        writable: false,
        configurable: false,
        enumerable: true,
      });
    }
  }

  static init<T extends readonly string[]>(
    requiredEnvVars: T,
    optionalEnvVars: readonly string[] = []
  ): EnvType<T> {
    return new Env(requiredEnvVars, optionalEnvVars) as EnvType<T>;
  }
}
