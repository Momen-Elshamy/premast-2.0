import { variables } from "./variables.js";

export async function Signup(email, password) {
   let url = variables.url + "/api/1.1/wf/signup";
   let data = { email: email, password: password };
   let response = await fetch(url, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: "Bearer " + variables.token,
      },
      body: JSON.stringify(data),
   });
   return response.json();
}

export async function Login(email, password) {
   let url = variables.url + "/api/1.1/wf/login";
   let data = { email: email, password: password };
   let response = await fetch(url, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: "Bearer " + variables.token,
      },
      body: JSON.stringify(data),
   });
   return response.json();
}
