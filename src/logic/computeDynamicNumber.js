import droll from "droll";

const constantRE = /^[0-9]*\.?[0-9]+$/;
const isConstantNumber = str => constantRE.test(str);
const isDiceRoll = str => droll.validate(str);

/**
 * @param {number} prevValue
 * @param {string} dynamicNum
 * @return {number}
 */
function computeDynamicNumber(prevValue, dynamicNum) {
  prevValue = prevValue || 0;
  dynamicNum = (dynamicNum || "").replace(/\s+/g, "");

  if (!dynamicNum) {
    return prevValue;
  }

  if (isConstantNumber(dynamicNum)) {
    return Number(dynamicNum);
  }

  
  if (dynamicNum[0] === "+") {
    const dynamicWithoutPlus = dynamicNum.substring(1).trim();
    if (isConstantNumber(dynamicWithoutPlus)) {
      return prevValue + Number(dynamicWithoutPlus);
    }
    
    if (isDiceRoll(dynamicWithoutPlus)) {
      return prevValue + droll.roll(dynamicWithoutPlus).total;
    }
  } else if (dynamicNum[0] === "-") {
    const dynamicWithoutMinus = dynamicNum.substring(1).trim();
    if (isConstantNumber(dynamicWithoutMinus)) {
      return prevValue - Number(dynamicWithoutMinus);
    }
    
    if (isDiceRoll(dynamicWithoutMinus)) {
      return prevValue - droll.roll(dynamicWithoutMinus).total;
    }
  }
  
  if (isDiceRoll(dynamicNum)) {
    return droll.roll(dynamicNum).total;
  }

  throw new Error("Not valid dynamic string");
}

export default computeDynamicNumber;
