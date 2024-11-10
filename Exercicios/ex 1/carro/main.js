function main(){
  const canvas = document.querySelector("#c");
const gl = canvas.getContext('webgl');

if (!gl) {
    throw new Error('WebGL not supported');
}

canvas.addEventListener("mousedown",mouseDown,false);

function mouseDown(event){
  console.log(event.screenX);
  console.log(event.screenY);
}

var vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
var fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;

var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

var program = createProgram(gl, vertexShader, fragmentShader);

gl.useProgram(program);

const positionBuffer = gl.createBuffer();
const colorBuffer = gl.createBuffer();

const positionLocation = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

const colorLocation = gl.getAttribLocation(program, `color`);
gl.enableVertexAttribArray(colorLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

gl.clearColor(1.0, 1.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

n=100;


// semi circulo (parte de cima)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setSemiCircleVertices3(gl, n,0.5, 0.0, -0.1); 
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl, n, [0.17, 0.356, 0.530]); 
gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1);


// semi circulo (janelas)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setSemiCircleVertices3(gl, n,0.4, 0.0, -0.1); 
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl, n, [0.57, 0.56, 0.830]); 
gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1); 

// retangulo (divisão da janela)
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setRectangleVertices(gl,-0.05,-0.55,0.06,0.85);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setRectangleColor(gl,[0.17, 0.356, 0.530]);
gl.drawArrays(gl.TRIANGLES, 0, 6);


// retangulo (corpo)
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setRectangleVertices(gl,-0.5,-0.55,1.0,0.5);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setRectangleColor(gl,[0.17, 0.356, 0.530]);
gl.drawArrays(gl.TRIANGLES, 0, 6);

// retangulo (maçaneta)
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setRectangleVertices(gl,-0.15,-0.2,0.1,0.04);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setRectangleColor(gl,[0.75, 0.75, 0.75]);
gl.drawArrays(gl.TRIANGLES, 0, 6);




// semi circulo (frente do carro)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setSemiCircleVertices1(gl, n,0.25, -0.48, -0.30); // 30 segmentos para o semicírculo
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl, n, [0.17, 0.356, 0.530]); // Cor aleatória
gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1); // 31 vértices (1 centro + 30 vértices)


// semi circulo (frente do carro embaixo)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setSemiCircleVertices1(gl, n,0.05, -0.69, -0.50); // 30 segmentos para o semicírculo
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl, n, [0.7, 0.556, 0.530]); // Cor aleatória
gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1); // 31 vértices (1 centro + 30 vértices)


// semi circulo (atras do carro embaixo)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setSemiCircleVertices2(gl, n,0.05, 0.69, -0.50); // 30 segmentos para o semicírculo
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl, n, [0.7, 0.556, 0.530]); // Cor aleatória
gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1); // 31 vértices (1 centro + 30 vértices)

// semi circulo (atras do carro)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setSemiCircleVertices2(gl, n,0.25, 0.48, -0.30); // 30 segmentos para o semicírculo
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl, n, [0.17, 0.356, 0.530]); // Cor aleatória
gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1); // 31 vértices (1 centro + 30 vértices)

// retangulo (maçaneta)
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setRectangleVertices(gl,-0.7,-0.55,1.4,0.1);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setRectangleColor(gl, [0.7, 0.556, 0.530]);
gl.drawArrays(gl.TRIANGLES, 0, 6);



// circulo (farol dianteiro)
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setCircleVertices(gl,n,0.07, -0.65, -0.3);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl,n,[0.9,0.9,0.9]);
gl.drawArrays(gl.TRIANGLES, 0, 3*n);


// semi circulo (farol traseiro)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setSemiCircleVertices2(gl, n,0.07, 0.65, -0.3); // 30 segmentos para o semicírculo
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl, n, [0.9, 0.2, 0.2]); // Cor aleatória
gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1); // 31 vértices (1 centro + 30 vértices)



//------ rodas

gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setCircleVertices(gl,n,0.2, -0.35, -0.5);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl,n,[0.1, 0.1, 0.1]);
gl.drawArrays(gl.TRIANGLES, 0, 3*n);

gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setCircleVertices(gl,n,0.2, 0.35, -0.5);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl,n,[0.1, 0.1, 0.1]);
gl.drawArrays(gl.TRIANGLES, 0, 3*n);

gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setCircleVertices(gl,n,0.1, -0.35, -0.5);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl,n,[0.5, 0.5, 0.5]);
gl.drawArrays(gl.TRIANGLES, 0, 3*n);

gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setCircleVertices(gl,n,0.1, 0.35, -0.5);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl,n,[0.5, 0.5, 0.5]);
gl.drawArrays(gl.TRIANGLES, 0, 3*n);

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

function setRectangleVertices(gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
     x1, y1,
     x2, y1,
     x1, y2,
     x1, y2,
     x2, y1,
     x2, y2,
  ]), gl.STATIC_DRAW);
}

function setRectangleColor(gl,color) {
  colorData = [];
  for (let triangle = 0; triangle < 2; triangle++) {
    for(let vertex=0; vertex<3; vertex++)
      colorData.push(...color);
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
}

function setCircleVertices(gl,n,radius, centerX, centerY){
  let center = [centerX, centerY];
  let vertexData = [];
  for(let i=0;i<n;i++){
    vertexData.push(...center);
    vertexData.push(centerX + radius*Math.cos(i*(2*Math.PI)/n), centerY + radius*Math.sin(i*(2*Math.PI)/n));
    vertexData.push(centerX + radius*Math.cos((i+1)*(2*Math.PI)/n), centerY + radius*Math.sin((i+1)*(2*Math.PI)/n));
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
}

function setCircleColor(gl,n,color){
  colorData = [];
  for (let triangle = 0; triangle < n; triangle++) {
    for(let vertex=0; vertex<3; vertex++)
      colorData.push(...color);
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
}

// Função para definir vértices do semicírculo (90 a 270)
function setSemiCircleVertices1(gl, n, radius, centerX, centerY) {
  let center = [centerX, centerY]; // Centro do semicírculo
  let vertexData = [];

  // Adiciona o centro do semicírculo
  vertexData.push(...center);


  for (let i = n/2 ; i <= (3*n)/2; i++) {
    let angle = (i * Math.PI) / n; 
    let x = centerX + radius * Math.cos(angle);
    let y = centerY + radius * Math.sin(angle);
    vertexData.push(x, y);
  }

  // Envia os dados dos vértices para o buffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
}

// Função para definir vértices do semicírculo (270 a 450)
function setSemiCircleVertices2(gl, n, radius, centerX, centerY) {
  let center = [centerX, centerY]; // Centro do semicírculo
  let vertexData = [];

  // Adiciona o centro do semicírculo
  vertexData.push(...center);


  for (let i = (3*n)/2 ; i <= (5*n)/2; i++) {
    let angle = (i * Math.PI) / n; 
    let x = centerX + radius * Math.cos(angle);
    let y = centerY + radius * Math.sin(angle);
    vertexData.push(x, y);
  }

  // Envia os dados dos vértices para o buffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
}

// Função para definir vértices do semicírculo (0 a 180)
function setSemiCircleVertices3(gl, n, radius, centerX, centerY) {
  let center = [centerX, centerY]; // Centro do semicírculo
  let vertexData = [];

  // Adiciona o centro do semicírculo
  vertexData.push(...center);


  for (let i = 0 ; i <= n; i++) {
    let angle = (i * Math.PI) / n; 
    let x = centerX + radius * Math.cos(angle);
    let y = centerY + radius * Math.sin(angle);
    vertexData.push(x, y);
  }

  // Envia os dados dos vértices para o buffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
}


main();