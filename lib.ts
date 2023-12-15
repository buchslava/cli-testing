import { prompt, Answers } from "inquirer";

async function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const nameValidator = async (input: string) => {
  await sleep(1500);
  if (input === "wrong") {
    return "Incorrect user!";
  }
  return true;
};

export default function cli(resultHandler: (answers: Answers) => void) {
  prompt([
    {
      name: "name",
      type: "input",
      message: "What's your name?",
      validate: nameValidator,
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
