import { Answers } from "inquirer";
import { writeFile } from "fs";
import cli from "./lib";

cli((answers: Answers) => {
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
});
