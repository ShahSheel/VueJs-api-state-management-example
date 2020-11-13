/** Globals **/


const endpoints = {

  login: "http://127.0.0.1:8000/api/login",
  unit: "http://127.0.0.1:8000/api/v2/units",

}

const headers =  {
  'Authorization': localStorage.getItem('token'),
}

module.exports = { endpoints: endpoints, headers: headers };
