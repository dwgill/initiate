import computeDynamicNumber from "./computeDynamicNumber";

describe("computeDynamicNumber()", () => {
  describe("evaluates constants", () => {
    const constants = [
      { prev: null, dyn: "10", result: 10 },
      { prev: 0, dyn: "8", result: 8 },
      { prev: 10, dyn: "18", result: 18 },
      { prev: null, dyn: "14", result: 14 },
      { prev: undefined, dyn: "24", result: 24 },
      { prev: "", dyn: "2", result: 2 },
      { prev: 20, dyn: "14", result: 14 },
      { prev: 15, dyn: "12", result: 12 },
      { prev: 9, dyn: "14", result: 14 },
      { prev: 8, dyn: "14.1", result: 14.1 },
      { prev: 4, dyn: "11.1", result: 11.1 },
      { prev: 1, dyn: "11.5", result: 11.5 },
      { prev: 0, dyn: ".5", result: 0.5 }
    ];

    for (const { prev, dyn, result } of constants) {
      it(`evaluates (${prev}, ${dyn}) to (${result})`, () => {
        expect(computeDynamicNumber(prev, dyn)).toEqual(result);
      });
    }
  });

  describe("evaluates constant offests", () => {
    const constants = [
      { prev: null, dyn: "+10", result: 10 },
      { prev: 0, dyn: "+8", result: 8 },
      { prev: 10, dyn: "+18", result: 28 },
      { prev: null, dyn: "+14", result: 14 },
      { prev: undefined, dyn: "+24", result: 24 },
      { prev: "", dyn: "+2", result: 2 },
      { prev: 20, dyn: "+14", result: 34 },
      { prev: 15, dyn: "+12", result: 15 + 12 },
      { prev: 9, dyn: "+14", result: 9 + 14 },
      { prev: 8, dyn: "+14.1", result: 8 + 14.1 },
      { prev: 4, dyn: "+11.1", result: 4 + 11.1 },
      { prev: 1, dyn: "+11.5", result: 1 + 11.5 },
      { prev: 0, dyn: "+.5", result: 0.5 },
      { prev: null, dyn: "-10", result: -10 },
      { prev: 0, dyn: "-8", result: -8 },
      { prev: 10, dyn: "-18", result: -8 },
      { prev: null, dyn: "-14", result: -14 },
      { prev: undefined, dyn: "-24", result: -24 },
      { prev: "", dyn: "-2", result: -2 },
      { prev: 20, dyn: "-14", result: 6 },
      { prev: 15, dyn: "-12", result: 3 },
      { prev: 9, dyn: "-14", result: 9 - 14 },
      { prev: 8, dyn: "-14.1", result: 8 - 14.1 },
      { prev: 4, dyn: "-11.1", result: 4 - 11.1 },
      { prev: 1, dyn: "-11.5", result: 1 - 11.5 },
      { prev: 0, dyn: "-.5", result: -0.5 }
    ];

    for (const { prev, dyn, result } of constants) {
      it(`evaluates (${prev}, ${dyn}) to (${result})`, () => {
        expect(computeDynamicNumber(prev, dyn)).toEqual(result);
      });
    }
  });

  describe("evaluates dice rolls", () => {
    const diceRolls = [
      { prev: 0, dyn: "1d20", resultHigh: 20, resultLow: 1 },
      { prev: null, dyn: "d20", resultHigh: 20, resultLow: 1 },
      { prev: "", dyn: "1d6", resultHigh: 6, resultLow: 1 },
      { prev: 20, dyn: "1d6+1", resultHigh: 7, resultLow: 2 },
      { prev: 20, dyn: "2d6", resultHigh: 12, resultLow: 2 },
      { prev: null, dyn: "2d6 + 2", resultHigh: 14, resultLow: 4 },
      { prev: null, dyn: "2d4 + 4", resultHigh: 16, resultLow: 6 },
      { prev: null, dyn: "11d8 + 33", resultHigh: 112, resultLow: 44 }
    ];

    for (const { prev, dyn, resultHigh, resultLow } of diceRolls) {
      it(`evaluates (${prev}, ${dyn}) in range [${resultLow}, ${resultHigh}]`, () => {
        const result = computeDynamicNumber(prev, dyn);
        expect(result).toBeLessThanOrEqual(resultHigh);
        expect(result).toBeGreaterThanOrEqual(resultLow);
      });
    }
  });

  describe("evaluates dice roll offsets", () => {
    const diceRolls = [
      { prev: 0, dyn: "+ 1d20", resultHigh: 20, resultLow: 1 },
      { prev: 17, dyn: "+d20", resultHigh: 17 + 20, resultLow: 17 + 1 },
      { prev: 5, dyn: "+1d6", resultHigh: 5 + 6, resultLow: 5 + 1 },
      { prev: 20, dyn: "+ 1d6+1", resultHigh: 20 + 7, resultLow: 20 + 2 },

      { prev: 20, dyn: "-2d6", resultHigh: 20 - 2, resultLow: 20 - 12 },
      { prev: 13, dyn: "-2d6 + 2", resultHigh: 13 - 4, resultLow: 13 - 14 },
      { prev: null, dyn: "- 2d4 + 4", resultHigh: -6, resultLow: -16 },
      { prev: null, dyn: "- 11d8 + 33", resultHigh: -44, resultLow: -112 }
    ];

    for (const { prev, dyn, resultHigh, resultLow } of diceRolls) {
      it(`evaluates (${prev}, ${dyn}) in range [${resultLow}, ${resultHigh}]`, () => {
        const result = computeDynamicNumber(prev, dyn);
        expect(result).toBeLessThanOrEqual(resultHigh);
        expect(result).toBeGreaterThanOrEqual(resultLow);
      });
    }
  });

  it('throws errors with garbage', () => {
    expect(() => {
      computeDynamicNumber(0, "Daniel");
    }).toThrowError("Not valid dynamic string");

    expect(() => {
      computeDynamicNumber(0, "1d20 + a");
    }).toThrowError("Not valid dynamic string");
  })
});
