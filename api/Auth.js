export default {

  // We need to create the authorization header
  mounted(){

    this.auth = {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }
  }
}
