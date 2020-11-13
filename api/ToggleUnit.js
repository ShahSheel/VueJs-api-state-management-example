import axios from 'axios';
import globals from '../globals.js';



export default {


  methods: {
      actionStart: function (id, status) {

        // Enable Loading flag
        this.loading = true;
          // POST to start charge
        axios.post(globals.endpoints.unit + "/" + id + '/charges', this.RFC399String(status),{
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
        })
            .then( data => {

              // Update Unit
               this.getUnit(id);
               this.loading = false;

            })
            .catch(error => {
              console.log((error));

              this.loading = false;

            })
        },

      actionStop: function (id, chargeID, status) {

        // Enable Loading flag
        this.loading = true;
        // POST to stop charge
        axios.post(globals.endpoints.unit + "/" +  id + '/charges/' + chargeID, this.RFC399String(status),{
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
        }).then( data => {
                // Update Unit
                this.getUnit(id);
                this.loading = false;

              })
              .catch(error => {
                this.loading = false;

              })


      },


      RFC399String: function (status) {

      const date = new Date();

        // Construct RFC399 String and return as a JSON for it to be used in the body
       return status != "charging" ? {'started_at': date.toISOString()} : {'finished_at': date.toISOString()}

      },

}

}
