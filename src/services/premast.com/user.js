/*
all users api routes from premast.com
premast.com is based on wordpress
*/

export async function Signup(email, password) {
   let url = "https://premast.com/wp-json/pmst/v1/signup";
   let data = { username: email, password: password };
   let response = await fetch(url, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return response.json();
}

export async function Login(email, password) {
   let url = "https://premast.com/wp-json/pmst/v1/login";
   let data = { username: email, password: password };
   let response = await fetch(url, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return {
      status: response.status,
      statusText: response.statusText,
      response: await response.json(),
   };
}

// api routes for update user data
/**
 *
 * @param {string} email user email
 * @param {object} data user data need to update
 * @param {string} data.full_name user full name
 * @param {string} data.avatar user avatar url
 * @returns {object} response
 */
export async function UpdateUser(data) {
   // @do convert plus api from test to live on premast.com server (wp)
   let url = "https://premast.com/wp-json/pmst/v1/admin/update-user";
   let headers = {
      "Content-Type": "application/json",
   };
   let response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
   });
   return response.json();
}
