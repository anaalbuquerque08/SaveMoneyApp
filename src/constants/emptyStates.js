//Aqui eu coloquei os valores dos estados iniciais quando não possui meta ou deposito. 
//Refere ao Estado - EmptyState

const emptyStates = {
  goals: {
    text: "Você ainda não possui nenhuma meta :(",
    buttonLabel: "Comece a juntar <3",
    route: "/create-goal"
  },
  deposit: {
    text: "Você ainda não possui nenhum depósito :(",
    buttonLabel: "Primeiro Depósito",
    route: "/goals"
  },
};

export default emptyStates;
