<template>
    <v-app>
        <v-container
          fluid
          fill-height>
          <v-layout
            align-center
            justify-center>
            <v-flex
              xs12
              sm8
              md4f>
              <v-card  class="elevation-2">
                <v-toolbar
                  color="green"
                  dark
                  flat>
                  <v-toolbar-title>Login form</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="Email Address"
                      name="email"
                      type="email"
                      v-model="form.email"
                      required
                    ></v-text-field>

                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      type="password"
                      v-model="form.password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green"  :loading="loading" @click.native="sendLoginRequest( form )">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
    </v-app>
</template>
<script>

import axios from 'axios';
import globals from '../../globals.js';

export default {
  data() {
    return {
      loading: false,
      form: {
        email: '',
        password: ''
      },
    }
  },
  methods: {
    sendLoginRequest: function( data ) {
      this.loading = true
     axios
        .post(globals.endpoints.login, data )
        .then( response => {
          this.loading = false
          localStorage.setItem('token', response.data.success.token ); // One time Login call just for this
          this.$router.push({ name: 'Units' })
         }
       )
       .catch(error => {
         this.loading = false
         console.log(error)
       });
    },
  }
}
</script>

