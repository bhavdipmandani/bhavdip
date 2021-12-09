import axios from 'axios';
//mock API
let API_URL = 'http://localhost:8000/product_list';
   export default function callApi(endpoint, method = 'GET', data) {
       return axios({
           method,
           url: `${API_URL}/${endpoint}`,
           data: data.products
       }).catch(err => {
           console.log(err);
       });
}