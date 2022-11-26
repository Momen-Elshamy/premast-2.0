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
