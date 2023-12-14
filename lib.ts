import { prompt, Answers } from "inquirer";

export default function cli(
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
