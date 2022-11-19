function(instance, context) {

    let template = `<div style="width: fit-content;background: aquamarine;">
    <h1> Hello New Responsive</h1>
    </div>`;

    instance.canvas.append(template);


    let bubbleTest = new bubble();

    bubbleTest.name = "bubbleTest";
    bubbleTest.initialize(instance, context);
    
 
}