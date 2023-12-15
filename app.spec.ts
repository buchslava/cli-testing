import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from "@jest/globals";

import { Answers } from "inquirer";
import { stdin } from "mock-stdin";

import cli from "./lib";

import * as funcModule from "./lib";

const DOWN = "\x1B\x5B\x42";
const ENTER = "\x0D";

describe("Cli", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockStdin: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let validatorSpy: any;

  const getValidatorSpy = () => jest.spyOn(funcModule, "nameValidator");

  const pauseAndSend = async (data: string): Promise<void> =>
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
    validatorSpy.mockRestore();
  });

  it("should get the correct data on happy flow 1", (done: () => void) => {
    validatorSpy = getValidatorSpy().mockImplementationOnce(() =>
      Promise.resolve(true)
    );

    cli((answers: Answers) => {
      expect(answers).toStrictEqual({
        name: "Foo Bar",
        iceCream: "Chile",
        programmingLanguage: "Javascript",
      });
      done();
    });

    (async () => {
      for (const command of [
        "Foo Bar",
        ENTER,
        DOWN,
        DOWN,
        DOWN,
        ENTER,
        DOWN,
        DOWN,
        ENTER,
      ]) {
        await pauseAndSend(command);
      }
    })();
  });

  it("should get the correct data on happy flow 2", (done: () => void) => {
    validatorSpy = getValidatorSpy().mockImplementationOnce(() =>
      Promise.resolve(true)
    );

    cli((answers: Answers) => {
      expect(answers).toStrictEqual({
        name: "Someone Else",
        iceCream: "Blackberry",
        programmingLanguage: "Cobol",
      });
      done();
    });

    (async () => {
      for (const command of [
        "Someone Else",
        ENTER,
        DOWN,
        DOWN,
        ENTER,
        DOWN,
        DOWN,
        DOWN,
        ENTER,
      ]) {
        await pauseAndSend(command);
      }
    })();
  });

  it("should get an error from validator in case of incorrect input", (done: () => void) => {
    validatorSpy = getValidatorSpy().mockImplementationOnce(() =>
      Promise.resolve("Incorrect user!")
    );

    cli(() => null);

    (async () => {
      for (const command of ["Foo Bar", ENTER]) {
        await pauseAndSend(command);
      }
    })();

    setImmediate(() => {
      validatorSpy.mock.results[0].value.then((result: string) => {
        expect(result).toStrictEqual("Incorrect user!");
        done();
      });
    });
  });
});
