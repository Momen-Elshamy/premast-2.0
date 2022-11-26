import { LitElement, html, css } from "lit";

class IconButtonLit extends LitElement {
   static get styles() {
      return css`
         #icon-button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            cursor: pointer;
            background-color: transparent;
            border: none;
            outline: none;
            padding: 12px 24px;
            font-size: var(--font-size);
            font-weight: 400;
            color: var(--color-primary);
            font-family: "Roboto", sans-serif;
         }
         #icon-button img {
            width: auto;
            height: 100%;
            margin-right: 10px;
         }
      `;
   }

   static get properties() {
      return {
         image: { type: String },
         label: { type: String },
      };
   }
   render() {
      return html`
         <button id="icon-button">
            <img src="${this.image}" />
            <span>${this.label}</span>
         </button>
      `;
   }
}
if (!customElements.get("pmst-icon-button")) {
   customElements.define("pmst-icon-button", IconButtonLit);
}

export default class IconButton {
   constructor(name) {
      this.name = "Icon Button";
      this.initialize = function (instance, context) {
         this.instance = instance;
         this.context = context;
         instance.data.el = this;
         // SECTION add icon button element
         let iconBtn = document.createElement("pmst-icon-button");
         instance.canvas[0].appendChild(iconBtn);
         // register click event
         instance.canvas[0].addEventListener("click", () => {
            instance.triggerEvent("on_click");
         });
      };

      this.updated = function (instance, properties, context) {
         this.instance = instance;
         this.properties = properties;
         this.context = context;
         // SECTION update the icon button element
         let iconBtn = instance.canvas[0].querySelector("pmst-icon-button");
         iconBtn.image = properties.image;
         iconBtn.label = properties.label;
         // set style css varaibles
         iconBtn.style.setProperty("--color-primary", properties.bubble.font_color());
         iconBtn.style.setProperty("--font-size", properties.bubble.font_size());
      };
      this.preview = function (instance, properties) {
         this.instance = instance;
         this.properties = properties;
         let template = /*html*/ `
         <button id="icon-button">
            <img src="${properties.image}" />
            <span>${properties.label}</span>
         </button>
         `;
         instance.canvas[0].innerHTML = template;
      };
   }
}
