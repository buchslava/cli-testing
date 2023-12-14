import { prompt } from "inquirer";
import { writeFile } from "fs";

async function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

prompt([
  {
    name: "name",
    type: "input",
    message: "What's your name?",
    validate: async function (input: string) {
      await sleep(1500);
      if (input === "wrong") {
        return "Incorrect user!";
      }
      return true;
    },
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
    choices: ["Basic", "Golang", "Javascript", "Cobol", "Java", "Rust", "C++"],
  },
]).then((answers) => {
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
});
