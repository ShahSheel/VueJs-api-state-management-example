import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import globals from '../globals.js';

Vue.use(vuex, axios);

export default new vuex.Store({


    state: {
        units: [],
    },

    actions: {
      // Use Axios
      loadUnits({ commit }){
          axios.get(globals.endpoints.unit, {

            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            },

          })
            .then( data => {
                let units = data.data
                commit('SET_UNITS', units)
              }
            )
            .catch(error => {
              console.log(error)
            })
      },

      updateUnit({ commit }, payload ){
        commit('UPDATE_UNITS',payload )
      },

    },

    mutations: {
        SET_UNITS (state, units){
          state.units = units
        },

      UPDATE_UNITS: (state, payload) => {


        // let updatedUnit = state.units.find(data => data.id === payload.data[0].id )

        // console.log(updatedUnit);

          console.log(state);

          console.log();


        state.units = payload.data[0]

      }

    }

})
