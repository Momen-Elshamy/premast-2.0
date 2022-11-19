export default class helloBubble {
  constructor(name) {
    this.name = "Hello Bubble";
    this.id = new Date().getTime();

    this.initialize = function (instance, context) {
      this.instance = instance;
      this.context = context;
      // this.instance.data.el = this; // to send el to update function
      console.log("///// el ID is //////", this.id);
      window[`${this.id}`] = this;
    };

    this.updated = function (instance, properties, context) {
      this.instance = instance;
      this.properties = properties;
      this.context = context;
      this.addHello();
    };

    this.preview = function (instance, properties) {
      this.instance = instance;
      this.properties = properties;
      this.addHello();
    };

    this.addHello = function () {
      let style = /*css*/ `
      .row{
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
      .col{
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 8px;
      }
      `;
      let template = /*html*/ `
      <style>${style}</style>
      <div class="col" style="width: fit-content;background: aquamarine;">
      <h1> Hello Bubble App</h1>
      <h4 style="font-size: 13px;"> ID: ${this.id}</h4>
      <h4 style="font-size: 13px;"> el width: ${this.properties.bubble.width()}</h4>
      <h4 style="font-size: 13px;"> el height: ${this.properties.bubble.height()}</h4>
      </div>
    `;
      this.instance.canvas[0].innerHTML = template;
    };
  }
}
