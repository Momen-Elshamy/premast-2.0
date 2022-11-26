/*
all users api routes from plus.premast.com
plus.premast.com is based on bubble.io
*/

import { plus } from "./variables.js";

export async function Signup(email, password) {
   let url = plus.url + "/api/1.1/obj/user";
   let data = { email: email, password: password };
   let response = await fetch(url, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: "Bearer " + plus.token,
      },
      body: JSON.stringify(data),
   });
   return response.json();
}

export async function Login(email, password) {
   let url = plus.url + "/api/1.1/wf/login";
   let data = { email: email, password: password };
   let response = await fetch(url, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: "Bearer " + plus.token,
      },
      body: JSON.stringify(data),
   });
   return response.json();
}
