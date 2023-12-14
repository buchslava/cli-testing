import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";

import { Answers } from "inquirer";
import { stdin } from "mock-stdin";

import cli from "./lib";

const DOWN = "\x1B\x5B\x42";
const ENTER = "\x0D";

describe("Cli", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockStdin: any;

  const pauseAndSend = async (data: string[]): Promise<void> =>
    new Promise((resolve) => {
      process.nextTick(() => {
        mockStdin.send(data);
        resolve();
      });
    });

  beforeEach(async () => {
    mockStdin = stdin();
  });

  afterEach(async () => {
    mockStdin.restore();
  });

  it("should get the correct data on happy flow 1", (done: () => void) => {
    cli([async () => true], (answers: Answers) => {
      expect(answers).toStrictEqual({
        name: "Foo Bar",
        iceCream: "Strawberry",
        programmingLanguage: "Golang",
      });
      done();
    });

    (async () => {
      for (const commands of [
        ["Foo Bar", ENTER],
        [DOWN, ENTER],
        [DOWN, DOWN, ENTER],
      ]) {
        await pauseAndSend(commands as string[]);
      }
    })();
  });

  it("should get the correct data on happy flow 2", (done: () => void) => {
    cli([async () => true], (answers: Answers) => {
      expect(answers).toStrictEqual({
        name: "Someone Else",
        iceCream: "Strawberry",
        programmingLanguage: "Golang",
      });
      done();
    });

    (async () => {
      for (const commands of [
        ["Someone Else", ENTER],
        [DOWN, DOWN, ENTER],
        [DOWN, DOWN, DOWN, ENTER],
      ]) {
        await pauseAndSend(commands as string[]);
      }
    })();
  });

  it("should validator get the correct name", (done: () => void) => {
    cli(
      [
        async (input: string) => {
          expect(input).toStrictEqual("Someone Else");
          done();
        },
      ],
      () => null
    );

    (async () => {
      for (const commands of [["Someone Else", ENTER]]) {
        await pauseAndSend(commands as string[]);
      }
    })();
  });
});
