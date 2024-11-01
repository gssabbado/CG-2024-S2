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
  
  const matrixUniformLocation = gl.getUniformLocation(program, `matrix`);
  const colorUniformLocation = gl.getUniformLocation(program, `color`);
  
  let matrix = [
      2/canvas.width, 0, 0, 0,
      0, -2/canvas.height, 0, 0,
      0, 0, 0, 0,
      -1, 1, 0, 1
  ];
  gl.uniformMatrix4fv(matrixUniformLocation, false, matrix);

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  let positionVector = [canvas.width/2,canvas.height/2];
  gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionVector), gl.STATIC_DRAW);
  let colorVector = [0.0,0.0,0.0];
  gl.uniform3fv(colorUniformLocation,colorVector);
  
  canvas.addEventListener("mousedown",mouseClick,false);

  let startPoint = [];
  let endPoint = [];
  

  function mouseClick(event){
    positionVector = [event.offsetX,event.offsetY];
    gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionVector), gl.STATIC_DRAW);
    drawPoint();
    if (clickCount === 1) startPoint.push(...positionVector);
    else if (clickCount === 2) {
      endPoint.push(...positionVector);
      Bresenham(gl, startPoint[0], startPoint[1], endPoint[0], endPoint[1]);
      startPoint = [];
      endPoint = [];
    }
    
    //console.log(startPoint);
  }
  
  
  const bodyElement = document.querySelector("body");
  bodyElement.addEventListener("keydown",keyDown,false);

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
    gl.uniform3fv(colorUniformLocation,colorVector);
    drawPoint();
  }

  let clickCount = 0;

  function drawPoint(){
    if (clickCount == 2) {
      gl.clear(gl.COLOR_BUFFER_BIT);
      clickCount = 0;
    }
    gl.drawArrays(gl.POINTS, 0, 1);
    clickCount++;
    //console.log(clickCount);
  }

  function paintPixel(gl, x, y) {
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([x, y]), gl.STATIC_DRAW);
      gl.drawArrays(gl.POINTS, 0, 1);
  }
  
  function Bresenham(gl, x1, y1, x2, y2) {
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    let sx = (x1 < x2) ? 1 : -1;
    let sy = (y1 < y2) ? 1 : -1;
    let err = dx - dy;
  
    console.log(x1, y1, x2, y2);
  
    while (true) {
      paintPixel(gl, x1, y1);
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
  }
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



main();