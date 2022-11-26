import { signup } from "../../../controller/user";
import { login } from "../../../controller/user";
export default class LoginBtn {
   constructor(name) {
      this.name = "Login Button";

      this.initialize = function (instance, context) {
         this.instance = instance;
         this.context = context;
         instance.data.el = this;
         // register click event
         instance.canvas[0].addEventListener("click", () => {
            instance.triggerEvent("on_click");
         });
         this.renderButton(instance, context);
      };

      this.updated = function (instance, properties, context) {
         console.log("button update function", properties);
         this.instance = instance;
         this.properties = properties;
         this.context = context;
         let button = instance.canvas[0].querySelector("#login-button");
         button.innerHTML = properties.label;
      };

      this.preview = function (instance, properties) {
         this.instance = instance;
         this.properties = properties;
         this.renderButton(instance, properties, null);
      };

      this.login = function (instance, properties, context) {
         console.log("login function", properties);
         let loginButton = instance.canvas[0].querySelector("#login-button");
         loginButton.oldInnerHTML = loginButton.innerHTML;
         loginButton.innerHTML = "";
         loginButton.classList.add("loading");
         let email = properties.email;
         let password = properties.password;
         if (email && password) {
            login(email, password).then((response) => {
               console.log(response);
               if (response.success) {
                  window.location.href = response.login_link;
               } else {
                  loginButton.classList.remove("loading");
                  loginButton.innerHTML = loginButton.oldInnerHTML;
                  instance.publishState("error", response.message);
                  instance.triggerEvent("error");
               }
            });
         } else {
            loginButton.classList.remove("loading");
            loginButton.innerHTML = loginButton.oldInnerHTML;
            instance.publishState("error", "Email and password are required");
            instance.triggerEvent("error");
         }
      };

      this.signup = function (instance, properties, context) {
         let loginButton = instance.canvas[0].querySelector("#login-button");
         loginButton.oldInnerHTML = loginButton.innerHTML;
         loginButton.innerHTML = "";
         loginButton.classList.add("loading");
         let email = properties.email;
         let password = properties.password;
         // check if email and password are valid
         if (email && password) {
            signup(properties.email, properties.password).then((response) => {
               loginButton.classList.remove("loading");
               loginButton.innerHTML = loginButton.oldInnerHTML;
               console.log(response);
               if (response.success) {
                  // go to login link
                  window.location.href = response.login_link;
               } else {
                  instance.publishState("error", response.message);
                  instance.triggerEvent("error");
               }
            });
         } else {
            loginButton.classList.remove("loading");
            loginButton.innerHTML = loginButton.oldInnerHTML;
            instance.publishState("error", "Please enter a valid email and password");
            instance.triggerEvent("error");
         }
      };

      this.renderButton = function (instance, properties, context) {
         let loginButton = document.createElement("button");
         loginButton.id = "login-button";
         // add css style to loginButton
         loginButton.style.cssText = `
         background-color: transparent;
         border: none;
         width: 100%;
         height: 100%;
         cursor: pointer;
         color: inherit;
         font: inherit;
         `;

         // loader css class
         let loader = document.createElement("style");
         loader.innerHTML = `
         .loading {
            position: relative;
            cursor: default;
            
         }
         .loading::after {
            content: '';
            display: block;
            width: 1.2em;
            height: 1.2em;
            position: absolute;
            left: calc(50% - 0.75em);
            top: calc(50% - 0.75em);
            border: 0.15em solid transparent;
            border-right-color: white;
            border-radius: 50%;
            animation: button-anim 0.7s linear infinite;
            opacity: 0;
         }
         @keyframes button-anim {
            0% {
               transform: rotate(0deg);
               opacity: 0;
            }
            50% {
               opacity: 1;
            }
            100% {
               transform: rotate(360deg);
               opacity: 0;
            }
         }*/
         `;
         instance.canvas[0].appendChild(loader);

         // add loginButton to canvas
         instance.canvas.append(loginButton);
         // add button element to instance
         instance.data.button = loginButton;
      };
   }
}
