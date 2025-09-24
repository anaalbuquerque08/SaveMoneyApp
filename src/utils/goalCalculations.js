// src/utils/goalCalculations.js

//? Criei esse arquivo para colocar todas as funções que fazem cálculos com os dados das metas.
//? Assim, fica tudo organizadinho e eu posso usar essas funções em qualquer lugar que precisar!

/**
 * Calcula o total de valores atuais e de meta de um array de metas.
 * @param {Array<Object>} goals - O array de metas.
 * @returns {Object} Um objeto com os totais.
 */
export const calculateGoalTotals = (goals = []) => {
  const totalCurrent = goals.reduce((sum, goal) => sum + (Number(goal.currentValue) || 0), 0);
  const totalTarget = goals.reduce((sum, goal) => sum + (Number(goal.targetValue) || 0), 0);
  
  return { totalCurrent, totalTarget };
};

//? Esta função calcula a sequência de depósitos para o desafio sequencial.
//? Ela descobre quantos depósitos são necessários para atingir um valor-alvo.
export const generateSequentialChallenge = (targetValue) => {
  let totalDeposits = 0;
  let finalValue = 0;
  while (finalValue < targetValue) {
    totalDeposits++;
    finalValue += totalDeposits;
  }
  
  return { totalDeposits, finalValue };
};

//? Esta nova função calcula o valor total de uma sequência, a partir do número de depósitos.
//? Por exemplo, se você disser 5, ela soma 1+2+3+4+5 e retorna 15.
export const calculateSequentialSum = (totalDeposits) => {
  if (totalDeposits <= 0) return 0;
  return (totalDeposits * (totalDeposits + 1)) / 2;
};