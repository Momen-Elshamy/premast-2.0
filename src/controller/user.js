/*
 */
import { Signup as SignupPlus } from "../services/plus.premast.com/user.js";
import { Signup as SignupPremast } from "../services/premast.com/user.js";
import { Signup as SignupApp } from "../services/app.premast.com/user.js";
import { Login as LoginApp } from "../services/app.premast.com/user.js";
import { Login as LoginPlus } from "../services/plus.premast.com/user.js";
import { Login as LoginPremast } from "../services/premast.com/user.js";

export async function signup(email, password) {
   // signup first on premast app
   let signupApp = await SignupApp(email, password);
   if (signupApp.status === "success") {
      // signup for premast.com on wordpress from api
      let premastData = await SignupPremast(email, password);

      // signup for plus.premast.com on bubble.io from api
      let plusData = await SignupPlus(email, password);

      // waite both signup are ready
      // and then return the data
      return {
         success: true,
         login_link: signupApp.response.login_link,
         premast: premastData,
         plus: plusData,
      };
   } else {
      return {
         success: false,
         code: signupApp.reason,
         message: signupApp.message,
         error: signupApp,
      };
   }
}

export async function login(email, password) {
   let result = {
      success: false,
      error: null,
      message: "",
      code: "",
      login_link: "",
      source: "",
      response: "",
   };
   let login = await LoginApp(email, password);
   if (login.status === "success") {
      result = {
         success: true,
         login_link: login.response.login_link,
         source: "app",
         response: login,
      };
   } else if (login.statusCode === 400 && login.reason === "INVALID_LOGIN_CREDENTIALS") {
      result = {
         success: false,
         error: login,
         message: login.message,
         code: login.reason,
         source: "app",
         response: login,
      };
   } else if (login.statusCode === 400 && login.reason === "NOT_VALID_EMAIL") {
      // try login on plus.premast.com
      let loginPlus = await LoginPlus(email, password);
      let loginPremast = await LoginPremast(email, password);
      if (loginPlus.status === "success" || loginPremast.status === 200) {
         let signupApp = await SignupApp(email, password);
         if (signupApp.status === "success") {
            // @do change user data (profile image, name, etc) from data returned from endpoints
            result = {
               success: true,
               login_link: signupApp.response.login_link,
               source: "app",
               response: signupApp,
            };
         }
      } else {
         result = {
            success: false,
            error: loginPlus,
            message: loginPlus.message,
            code: loginPlus.reason,
            source: "plus",
            response: loginPlus,
         };
      }
   } else {
      result = {
         success: false,
         error: login,
         message: login.message,
         code: login.reason,
         source: "app",
         response: login,
      };
   }
   return result;
}

// login by googel
export async function loginByGoogle() {
   // login by google
   let url = "https://accounts.google.com/o/oauth2/v2/auth";
}
