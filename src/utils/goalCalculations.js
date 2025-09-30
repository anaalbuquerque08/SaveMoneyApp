 
export const calculateSequentialSum = (deposits) => {
  return (deposits * (deposits + 1)) / 2;
};
 
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
 
export const generateBlockChallenge = (targetValue) => {
  const depositsList = [];
  let currentSum = 0;
  let blockValue = 20;  
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
    blockValue += 20; 
  }

  return {
    depositsList,
    totalDeposits: depositsList.length,
  };
};
 
export const generateFixedChallenge = (targetValue, fixedDepositValue) => {
  const totalDeposits = Math.ceil(targetValue / fixedDepositValue);
  const finalValue = totalDeposits * fixedDepositValue;
  return {
    fixedDepositValue,
    totalDeposits,
    finalValue,
  };
};
 
export const calculateGoalTotals = (goals) => {
  const totalCurrent = goals.reduce((sum, goal) => sum + goal.currentValue, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetValue, 0);
  return {
    totalCurrent,
    totalTarget
  };
};
