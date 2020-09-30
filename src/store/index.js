import Vue from "vue";
import Vuex from "vuex";
import firebase from "../firebase";

const db = firebase.firestore();
const recordsRef = db.collection("records");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    records: [],
    visibleRecords: [],
    currentRecords: [],
    filter: {
      totalPrice: {
        from: null,
        to: null
      },
      itemsCount: {
        from: null,
        to: null
      }
    }
  },
  mutations: {
    setRecords(state, records) {
      state.records = records;
    },
    setVisibleRecords(state, records) {
      state.visibleRecords = records;
    },
    setCurrentRecords(state, records) {
      state.currentRecords = records;
    }
  },
  getters: {
    visibleRecords(state) {
      return state.visibleRecords;
    },
    currentRecords(state) {
      return state.currentRecords;
    }
  },
  actions: {
    getRecords({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        let records = [];
        recordsRef
          // .orderBy("surname")
          .get()
          .then(res => {
            res.forEach(doc => {
              // console.log(`${doc.id} => ${doc.data()} ${doc}`);
              records.push({ id: doc.id, ...doc.data() });
            });
            console.log("Employees: ", records);
            commit("setRecords", records);
            commit("setVisibleRecords", records);
            dispatch("sortRecords");
            resolve(records);
          })
          .catch(err => {
            console.log("Error: ", err);
            reject(err);
          });
      });
    },

    createRecord({ dispatch }, record) {
      console.log("Record: ", record);
      return new Promise((resolve, reject) => {
        recordsRef
          .add(record)
          .then(res => {
            // console.log("Added document: ", res);
            dispatch("getRecords").then(() => {
              console.log("HERE?");
              resolve(res);
            });
          })
          .catch(err => reject(err));
      });
    },

    editRecord({ dispatch }, record) {
      console.log("Editing record: ", record);
      return new Promise((resolve, reject) => {
        recordsRef
          .doc(record.id)
          .set(record)
          .then(res => {
            console.log("Document updated: ", res);
            dispatch("getRecords");
            resolve(res);
          })
          .catch(err => reject(err));
      });
    },

    deleteRecord({ dispatch }, record) {
      return new Promise((resolve, reject) => {
        recordsRef
          .doc(record.id)
          .delete()
          .then(() => {
            dispatch("getRecords");
            resolve();
          })
          .catch(err => reject(err));
      });
    },

    filterRecords({ state, commit, dispatch }, filters) {
      const count = {
        from: filters.count.from ? filters.count.from : 0,
        to: filters.count.to ? filters.count.to : Number.MAX_SAFE_INTEGER
      };
      const price = {
        from: filters.price.from ? filters.price.from : 0,
        to: filters.price.to ? filters.price.to : Number.MAX_SAFE_INTEGER
      };

      const result = [...state.records].filter(record => {
        return (
          record.totalPrice >= +price.from &&
          record.totalPrice <= +price.to &&
          record.itemsCount >= +count.from &&
          record.itemsCount <= +count.to
        );
      });

      commit("setVisibleRecords", result);
      dispatch("sortRecords");
    },

    resetFilters({ state, commit, dispatch }) {
      commit("setVisibleRecords", state.records);
      dispatch("sortRecords");
    },

    sortRecords({ state, commit, dispatch }, sortBy = "surname") {
      let result = [...state.visibleRecords];

      switch (sortBy) {
        case "surname":
          result.sort(function(a, b) {
            let first = a.surname + a.name + a.patronymic;
            let second = b.surname + b.name + b.patronymic;

            if (first > second) {
              return 1;
            }
            if (second > first) {
              return -1;
            }
            return 0;
          });
          break;

        case "-surname":
          result.sort(function(a, b) {
            let first = a.surname + a.name + a.patronymic;
            let second = b.surname + b.name + b.patronymic;

            if (first > second) {
              return -1;
            }
            if (second > first) {
              return 1;
            }
            return 0;
          });
          break;

        case "itemsCount":
          result.sort(function(a, b) {
            return a.itemsCount - b.itemsCount;
          });
          break;

        case "-itemsCount":
          result.sort(function(a, b) {
            return b.itemsCount - a.itemsCount;
          });
          break;

        case "totalPrice":
          result.sort(function(a, b) {
            return a.totalPrice - b.totalPrice;
          });
          break;

        case "-totalPrice":
          result.sort(function(a, b) {
            return b.totalPrice - a.totalPrice;
          });
          break;

        default:
          break;
      }

      commit("setVisibleRecords", result);
      dispatch("paginateRecords");
    },

    paginateRecords({ state, commit }, page = 1, limit = 10) {
      let result = state.visibleRecords.slice((page - 1) * limit, page * limit);
      commit("setCurrentRecords", result);
    }
  },
  modules: {}
});
