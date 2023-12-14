import { prompt, Answers } from "inquirer";
import { writeFile } from "fs";

async function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function cli(
  validators: ((input: string) => void)[],
  resultHandler: (answers: Answers) => void
) {
  prompt([
    {
      name: "name",
      type: "input",
      message: "What's your name?",
      validate: validators[0],
    },
    {
      name: "iceCream",
      type: "list",
      message: "Which is your favorite of the following ice cream flavors?",
      choices: ["Green tea", "Strawberry", "Blackberry", "Chile", "Vanilla"],
    },
    {
      name: "programmingLanguage",
      type: "list",
      message: "What programming language do you prefer?",
      choices: [
        "Basic",
        "Golang",
        "Javascript",
        "Cobol",
        "Java",
        "Rust",
        "C++",
      ],
    },
  ]).then(resultHandler);
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
      }
    );
  }
);
