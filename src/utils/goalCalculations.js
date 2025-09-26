// goalCalculations.js

/**
 * Calculates the sum of a sequential challenge up to a given number of deposits.
 * @param {number} deposits The number of deposits.
 * @returns {number} The total value.
 */
export const calculateSequentialSum = (deposits) => {
  return (deposits * (deposits + 1)) / 2;
};

/**
 * Generates a sequential challenge based on a target value.
 * @param {number} targetValue The target value for the goal.
 * @returns {{totalDeposits: number, finalValue: number}} The challenge info.
 */
export const generateSequentialChallenge = (targetValue) => {
  let finalValue = 0;
  let totalDeposits = 0;
  while (finalValue < targetValue) {
    totalDeposits++;
    finalValue += totalDeposits;
  }
  return {
    totalDeposits,
    finalValue,
  };
};

/**
 * Generates a block challenge by creating a list of deposits that sum to the target value.
 * This logic follows a specific pattern: 10 deposits of R$20, then 10 of R$40, and so on.
 * The last deposit is adjusted to match the target value exactly.
 * @param {number} targetValue The target value for the goal.
 * @returns {{depositsList: number[], totalDeposits: number}} The challenge info.
 */
export const generateBlockChallenge = (targetValue) => {
  const depositsList = [];
  let currentSum = 0;
  let blockValue = 20; // Valor inicial do depósito
  const depositsPerBlock = 10;

  while (currentSum < targetValue) {
    for (let i = 0; i < depositsPerBlock; i++) {
      if (currentSum + blockValue <= targetValue) {
        depositsList.push(blockValue);
        currentSum += blockValue;
      } else {
        const remaining = targetValue - currentSum;
        if (remaining > 0) {
          depositsList.push(remaining);
          currentSum += remaining;
        }
        break;
      }
    }
    if (currentSum >= targetValue) {
      break;
    }
    blockValue += 20; // Aumenta o valor para o próximo bloco
  }

  return {
    depositsList,
    totalDeposits: depositsList.length,
  };
};

/**
 * Generates a fixed challenge based on a target value and a fixed deposit value.
 * @param {number} targetValue The target value for the goal.
 * @param {number} fixedDepositValue The fixed amount for each deposit.
 * @returns {{fixedDepositValue: number, totalDeposits: number, finalValue: number}} The challenge info.
 */
export const generateFixedChallenge = (targetValue, fixedDepositValue) => {
  const totalDeposits = Math.ceil(targetValue / fixedDepositValue);
  const finalValue = totalDeposits * fixedDepositValue;
  return {
    fixedDepositValue,
    totalDeposits,
    finalValue,
  };
};


/**
 * Calculates the total current value and total target value from a list of goals.
 * @param {Array<Object>} goals The list of goals.
 * @returns {{totalCurrent: number, totalTarget: number}} The calculated totals.
 */
export const calculateGoalTotals = (goals) => {
  const totalCurrent = goals.reduce((sum, goal) => sum + goal.currentValue, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetValue, 0);
  return {
    totalCurrent,
    totalTarget
  };
};
