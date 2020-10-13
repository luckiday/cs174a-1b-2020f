let vertShaderText = `
precision mediump float;
attribute vec2 vertPosition;
attribute vec3 vertColor;

varying vec3 fragColor;

void main() {
    fragColor = vertColor;
    gl_Position = vec4(vertPosition, 0.0, 1.0);
}
`

let fragShaderText = `
precision mediump float;

varying vec3 fragColor;

void main() {
    gl_FragColor = vec4(fragColor, 1.0);
}
`

const InitDemo = function (){
    console.log("The demo is running");
    let canvas = document.getElementById("glDemo");
    let gl = canvas.getContext("webgl");
    if(!gl){
        console.log("Error: your browser does not support webgl!");
    }
    gl.clearColor(0.6, 0.8, 0.5, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    /**
     * Create shaders
     */
    let vertShader = gl.createShader(gl.VERTEX_SHADER);
    let fragShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertShader, vertShaderText);
    gl.shaderSource(fragShader, fragShaderText);
    gl.compileShader(vertShader);
    gl.compileShader(fragShader);

    if(!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)){
        console.error("ERROR compile program!", gl.getShaderInfoLog(fragShader));
        return;
    }

    let program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);


    gl.linkProgram(program);
    if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
        console.error("ERROR link program!", gl.getProgramInfoLog(program));
        return;
    }
    // validate the program
    gl.validateProgram(program);
    if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
        console.error("ERROR validating program!", gl.getProgramInfoLog(program));
        return;
    }
    /**
     * Create shape/buffer
     */
    let triangle = [
        // X, Y, R, G, B,
        0.0, 0.0, 1.0, 0.0, 0.0,
        0.0, 0.5, 0.0, 1.0, 0.0,
        0.5, 0.0, 0.0, 0.0, 1.0,
    ];

    let triangleVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangle), gl.STATIC_DRAW);

    let positionAttribLocation = gl.getAttribLocation(program, "vertPosition");
    let colorAttribLocation = gl.getAttribLocation(program, "vertColor");

    gl.vertexAttribPointer(
        positionAttribLocation,
        2,
        gl.FLOAT,
        false, // or 0 or gl.GL_FALSE
        5 * Float32Array.BYTES_PER_ELEMENT,
        0,
    );

    gl.vertexAttribPointer(
        colorAttribLocation,
        2,
        gl.FLOAT,
        false, // or 0 or gl.GL_FALSE
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT,
    );

    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

    /**
     * Render
     */
    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3)
}

InitDemo();