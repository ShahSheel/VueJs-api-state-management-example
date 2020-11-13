<template>
  <div id="app">
    <!-- For some reason here, the production script fails as It cannot use the Navbar, works on dev -->

    <div id="navbar">
      <b-navbar toggleable="lg" type="dark" variant="success">
        <b-navbar-brand href="#">Pod Point</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">Units</b-nav-item>
            <b-nav-item href="#" >Favourites</b-nav-item>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Account</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <v-app id="inspire">

      <!-- Here is where we start to display the units! -->
          <!-- create a row -->
      <v-progress-linear v-if="loading" indeterminate color="teal"></v-progress-linear>

        <UnitRow v-if="!loading" v-for="unit in units" :unit="unit" :key="unit.id" ></UnitRow>

    </v-app>
  </div>
</template>
<script>

import {mapState} from 'vuex'
import UnitRow from './UnitRow.vue';
import Auth from "../../api/Auth";

export default {

  components: { UnitRow },

  mixins: [ Auth ],

  data() {

    return {
      loading:true,
      Auth: '',
      unitToggle: {
        status: ''

      },
    }

  },

  mounted() {

    this.loading = true;

    this.$store.dispatch('loadUnits').finally(() => ( this.loading=false ));

    this.token = localStorage.getItem('token');

  },

  computed: {

    ...mapState([
      'units'

    ]),

  },

  methods: {

    breakinghere: function(){

      console.log('Is it breaking on this page?');

    },

  }

}
</script>


