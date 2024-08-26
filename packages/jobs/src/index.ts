import { Env } from "@yotai/utils";
import PgBoss from "pg-boss";

const constants = Env.init(["DB_URL"]);

export async function main() {
  console.log("Starting PgBoss");

  //   const pool = new Pool({
  //     connectionString: constants.DB_URL,
  //   });
  //   const options = {
  //     db: {
  //       executeSql: (text: string, values: any[]) => {
  //         console.log(JSON.stringify({ text, values }));
  //         return pool.query(text, values);
  //       },
  //     },
  //   };

  console.log(constants.DB_URL);
  let boss = new PgBoss(constants.DB_URL);
  boss.on("error", (error) => console.error("PgBoss error:", error));

  try {
    boss = await boss.start();
    console.log("PgBoss started");

    // const isInstalled = await boss.isInstalled();
    // console.log("Is PgBoss installed?", isInstalled);
    //
    // if (!isInstalled) {
    //   console.log("Installing PgBoss schema...");
    // await boss.install();
    //   console.log("PgBoss schema installed");
    // }

    if (!(await boss.getQueue("welcome_email"))) {
      await boss.createQueue("welcome_email");
    }
    // Define the job handler
    await boss.work("welcome_email", async ([job]: any) => {
      throw new Error("Test error");
      console.log(`[welcome_email] Processing job for ${job.data.email}`);
      // Simulate work
      //   await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`[welcome_email] Job completed for ${job.data.email}`);
    });

    // Send a job
    const jobId = await boss.send("welcome_email", { email: "john@doe.com" });
    console.log(`Job created with ID: ${jobId}`);

    // Wait for the job to be processed
    await new Promise((resolve) => setTimeout(resolve, 20000));

    // Get queue information
    const queue = await boss.getQueue("welcome_email");
    console.log("Queue status:", queue);

    // List all jobs in the queue
    const jobs = await boss.fetch("welcome_email");
    console.log("Jobs in queue:", jobs);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Graceful shutdown
    console.log("Stopping PgBoss");
    await boss.stop();
    console.log("PgBoss stopped");
  }
}

main()
  .catch(console.error)
  .finally(() => process.exit(0));
