function main(){
    const canvas = document.querySelector("#canvas");
    const gl = canvas.getContext('webgl', { preserveDrawingBuffer: true });
  
    if (!gl) {
        throw new Error('WebGL not supported');
    }
  
    var vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
    var fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;
  
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  
    var program = createProgram(gl, vertexShader, fragmentShader);
  
    gl.useProgram(program);
  
    const positionBuffer = gl.createBuffer();
  
    const positionLocation = gl.getAttribLocation(program, `position`);
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  
    const uniformLocations = {
        matrix: gl.getUniformLocation(program, `matrix`),
        color: gl.getUniformLocation(program, `color`),
    };
    let matrix = mat4.fromValues(
        2/canvas.width, 0, 0, 0,
        0, -2/canvas.height, 0, 0,
        0, 0, 0, 0,
        -1, 1, 0, 1
    );

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    gl.viewport(0, 0, canvas.width, canvas.height);
    
    let pontosClique = [];

    canvas.addEventListener("mousedown",mouseClick,false);
  
    let positionVector = [canvas.width/2,canvas.height/2];
    function mouseClick(event){
        positionVector = [event.clientX,event.clientY];
        console.log(positionVector);
        drawPoint();
    }
  
    const bodyElement = document.querySelector("body");
    bodyElement.addEventListener("keydown",keyDown,false);
  
    let colorVector = [0.0,0.0,0.0];
    function keyDown(event){
      switch(event.key){
        case "0":
          colorVector = [0.0,0.0,0.0];
          break;
        case "1":
          colorVector = [1.0,0.0,0.0];
          break;
        case "2":
          colorVector = [0.0,1.0,0.0];
          break;
        case "3":
          colorVector = [0.0,0.0,1.0];
          break;
        case "4":
          colorVector = [1.0,1.0,0.0];
          break;
        case "5":
          colorVector = [0.0,1.0,1.0];
          break;
        case "6":
          colorVector = [1.0,0.0,1.0];
          break;
        case "7":
          colorVector = [1.0,0.5,0.5];
          break;
        case "8":
          colorVector = [0.5,1.0,0.5];
          break;
        case "9":
          colorVector = [0.5,0.5,1.0];
          break;
      }
      drawPoint();
    }
  
    function drawPoint(){
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionVector), gl.STATIC_DRAW);
      gl.uniformMatrix4fv(uniformLocations.matrix, false, matrix);
      gl.uniform3fv(uniformLocations.color,colorVector);
      gl.drawArrays(gl.POINTS, 0, 1);
    }
  
    function drawLine([x1, y1], [x2, y2]) {
        const pontos = Bresenham(x1, y1, x2, y2);
        pontos.forEach(([x, y]) => {
            const xWebGL = (x / canvas.width) * 2 - 1;
            const yWebGL = (y / canvas.height) * -2 + 1;
            drawPoint(xWebGL, yWebGL);
        })
    }



    drawPoint();
    
    

  }
  
  function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
  
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }
  
  function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }
  
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }

  function Bresenham(x1, y1, x2, y2) {
    let pontos = [];
    let dx = Math.abs(x2 - x1); 
    let dy = Math.abs(y2 - y1);

    let sx = x1 < x2 ? 1 : -1;
    let sy = y1 < y2 ? 1 : -1;

    let err = dx - dy;

    while (true) {
        pontos.push([x1, y1]);

        if (x1 === x2 && y1 === y2) break; 
        let e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x1 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y1 += sy;
        }
    }
    return pontos;
  }

  
  main();