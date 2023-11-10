import Vuex from 'vuex';


export default new Vuex.Store({
  state: {
    userData: {},  
    spouseData: {},
    debitOrderDetails: {}, 
    childData: [],    
    selectedPremium: null,
    selectedCover: null,  
    selectedPolicy: null,
  },
  mutations: {
    setUserData(state, userData) {
      state.userData = userData;
    },
    setSpouseData(state, spouseData) {
      state.spouseData = spouseData;
    },
    setDebitOrderDetails(state, debitOrderDetails) {
      state.debitOrderDetails = debitOrderDetails;
    },
    addChild(state, child) {
      state.childData.push(child);
    },
    setSelectedPremium(state, premium) {
      state.selectedPremium = premium;
    },
    setSelectedCover(state, cover) {
      state.selectedCover = cover; 
    },
    setSelectedPolicy(state, policy) {
      state.selectedPolicy = policy;
    },
  },
  actions: {
    updateUserData({ commit }, userData) {
      commit('setUserData', userData);
    },
    updateSpouseData({ commit }, spouseData) {
      commit('setSpouseData', spouseData);
    },
    updateDebitOrderDetails({ commit }, debitOrderDetails) {
      commit('setDebitOrderDetails', debitOrderDetails);
    },    
    addChild({ commit }, child) {
      commit('addChild', child);
    },
    updateSelectedPremium({ commit }, premium) {
      commit('setSelectedPremium', premium);
    },
    updateSelectedCover({ commit }, cover) {
      commit('setSelectedCover', cover);
    },
    updateSelectedPolicy({ commit }, policy) {
      commit('setSelectedPolicy', policy);
    },
  },
  getters: {
    getUserData(state) {
      return state.userData;
    },
    getSpouseData(state) {
      return state.spouseData;
    },
    getDebitOrderDetails(state) {
      return state.debitOrderDetails;
    },
    getChildData(state) {
      return state.childData;
    },
    getSelectedPremium(state) {
      return state.selectedPremium; 
    },
    getSelectedCover(state) {
      return state.selectedCover; 
  },
  getSelectedPolicy(state) {
    return state.selectedPolicy;
  },
},
});


// import Vuex from 'vuex';

// Vue.use(Vuex);

// const individualsModule = {
//   namespaced: true, // Enable namespacing for the module
//   state: {
//     individuals: [],
//   },
//   mutations: {
//     addIndividual(state, individual) {
//       state.individuals.push(individual);
//     },
//   },
//   // actions: {
//   //   createIndividual({ commit }, individual) {
//   //     commit('addIndividual', individual);
//   //   },
//   // },
//   actions: {
//     createIndividual({ commit, rootState }, individualData) {
//       const userData = rootState.userData; // Access userData from the root state
//       const individual = {
//         ...userData, // Include userData in the individual object
//         ...individualData, // Include additional individual data if needed
//       };
//       commit('addIndividual', individual);
//     },
//   },
//   getters: {
//     getIndividuals(state) {
//       return state.individuals;
//     },
//   },
// };

// const spousesModule = {
//   // Similar structure for spouse data
// };

// const kidsModule = {
//   // Similar structure for kids data
// };

// export default new Vuex.Store({
//   modules: {
//     individuals: individualsModule,
//     spouses: spousesModule,
//     kids: kidsModule,
//   },
// });

// // export default new Vuex.Store({
// //   state: {
// //     userData: {}, // Initialize userData here
// //   },
// //   mutations: {
// //     setUserData(state, userData) {
// //       state.userData = userData;
// //     },
// //   },
// //   actions: {
// //     updateUserData({ commit }, userData) {
// //       commit('setUserData', userData);
// //     },
// //   },
// //   getters: {
// //     getUserData(state) {
// //       return state.userData;
// //     },
// //   },
// // });
