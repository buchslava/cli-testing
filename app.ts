import { Answers } from "inquirer";
import { writeFile } from "fs";
import cli from "./lib";

async function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

cli(
  [
    async (input: string) => {
      await sleep(1500);
      if (input === "wrong") {
        return "Incorrect user!";
      }
      return true;
    },
  ],
  (answers: Answers) => {
    writeFile(
      `result-${new Date().toISOString()}.json`,
      JSON.stringify(answers, null, 2),
      (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Done...");
        process.exit(0);
      }
    );
  }
);
