import Vue from "vue";
import Vuex from "vuex";
// import * as fb from "../firebase";
import firebase from "../firebase";
const db = firebase.firestore();
const recordsRef = db.collection("records");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    records: []
  },
  mutations: {
    setRecords(state, records) {
      state.records = records;
    }
  },
  actions: {
    testFirebase({ commit }) {
      return new Promise((resolve, reject) => {
        let records = [];
        recordsRef
          .get()
          .then(res => {
            res.forEach(doc => {
              console.log(`${doc.id} => ${doc.data()} ${doc}`);
              records.push({ id: doc.id, ...doc.data() });
            });
            console.log("Employees: ", records);
            commit("setRecords", records);
            resolve(records);
          })
          .catch(err => {
            console.log("Error: ", err);
            reject(err);
          });
      });
    },
    async addDocument({ dispatch }, record) {
      console.log("Record: ", record);
      await recordsRef.add(record).then(res => {
        console.log("Added document: ", res);
        dispatch("testFirebase");
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
            dispatch("testFirebase");
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  modules: {}
});
