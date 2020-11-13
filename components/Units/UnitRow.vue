<template>
  <div class="container" >
    <div class="unit-image">
      <!-- Location Icon -->
      <v-icon
        large
        color="green darken-2"
        style="font-size: 60px; float: left"
        >mdi-map-marker-outline
      </v-icon>
    </div>

    <!-- Avaliable Button -->
    <div class="unit-charge">
      <div v-if="renderUnit.status == 'avaliable'" style="float:right;">
        <v-btn
          color="success"
          style="width: 100%;"
          elevation="2"
          :loading="loading"
          @click="actionStart(renderUnit.id, renderUnit.status)"
          >Start
        </v-btn>
      </div>
      <!-- Stop Button -->
      <div
        v-else
        style="float:right;">
        <p>
          {{ renderUnit.status  }}
        </p>
        <v-btn
          color="warning"
          depressed
          style="width: 100%;"
          elevation="2"
          :loading="loading"
          @click="actionStop(renderUnit.id, renderUnit.chargeID, renderUnit.status)"
          v-if="renderUnit.status == 'charging'"
        >Stop</v-btn>
      </div>
    </div>
    <!-- Self explanatory -->
    <div class="unit-name" >{{ renderUnit.name }} </div>
    <div class="unit-address" style="padding-bottom: 20px;">
      {{ renderUnit.address }} -  {{ renderUnit.postcode }}
    </div>
    <div class="unit-charges-total" style="padding-bottom: 20px; text-align: center;">
      <div v-if="renderUnit.charges == '' || renderUnit.charges.length === 0 "> No charges yet </div>
      <div v-else> {{ renderUnit.charges.length }} Charges </div>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<script>
import ToggleUnitAPI from "../../api/ToggleUnit";
import axios from "axios";
import globals from '../../globals.js';
import Auth from "../../api/Auth";

export default {
  name: "UnitRow.vue",
  mixins: [ ToggleUnitAPI, Auth ],
  props: {
    unit: Object, // Load Prop
  },
  data() { return {

    loading: false,
    renderUnit: { // Bind prop to data for rendering
      id: this.unit.id,
      name: this.unit.name,
      status: this.unit.status,
      address: this.unit.address,
      postcode: this.unit.postcode,
      charges: '' , // Conditionally load this
      chargeID: '',

    }

  }},

  mounted() {

    // Mount the prop and get the charge ID
    if( Object.keys(this.$props.unit.charges).length !== 0) {

      console.log("Updating...");

      this.renderUnit.charges = this.$props.unit.charges;
      this.renderUnit.chargeID = this.renderUnit.charges[this.renderUnit.charges.length - 1].id;

    }
  },

  methods: {

    getUnit: function ( id ){

      axios.get(globals.endpoints.unit + "/" + id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      })
        .then(data => {

            this.renderUnit.id = data.data[0].id;
            this.renderUnit.name =  data.data[0].name;
            this.renderUnit.status = data.data[0].status;
            this.renderUnit.address = data.data[0].address;
            this.renderUnit.postcode =  data.data[0].postcode;
            this.renderUnit.charges = data.data[0].charges;
            // Here I need to get the charge ID of the newly created item
            this.renderUnit.chargeID = this.renderUnit.charges[ this.renderUnit.charges.length -1 ].id;

          }
        )
        .catch(error => {
          console.log(error)
        })

    },


  }

}
</script>
