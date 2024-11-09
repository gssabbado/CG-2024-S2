function main() {
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

  // Posições iniciais de translação
  let tx = 0.0;
  let ty = 0.0;

  let matrix = [
      1, 0, 0, tx,
      0, 1, 0, ty,
      0, 0, 1, 0,
      0, 0, 0, 1
  ];
  gl.uniformMatrix4fv(matrixUniformLocation, false, matrix);

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  let positionVector = [
      -0.5, -0.5,
      -0.5, 0.5,
      0.5, -0.5,
      -0.5, 0.5,
      0.5, -0.5,
      0.5, 0.5,
  ];
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionVector), gl.STATIC_DRAW);

  let colorVector = [0.0, 0.0, 0.0];
  gl.uniform3fv(colorUniformLocation, colorVector);

  // Adicionando a movimentação contínua
  let speed = 0.01; // Velocidade de movimento
  let directionX = 1; // Direção do movimento em X
  let directionY = 1; // Direção do movimento em Y

  function animate() {
      // Atualiza a posição (move o quadrado)
      tx += speed * directionX;
      ty += speed * directionY;

      // Verifica se o quadrado chegou à borda da tela e inverte a direção
      if (tx > 1 || tx < -1) {
          directionX *= -1;
      }
      if (ty > 1 || ty < -1) {
          directionY *= -1;
      }

      // Atualiza a matriz de translação
      matrix = [
          1, 0, 0, tx,
          0, 1, 0, ty,
          0, 0, 1, 0,
          0, 0, 0, 1
      ];
      gl.uniformMatrix4fv(matrixUniformLocation, false, matrix);

      // Desenha o quadrado
      drawSquare();

      // Solicita o próximo quadro da animação
      requestAnimationFrame(animate);
  }

  // Começa a animação
  animate();

  function drawSquare() {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  // Para animar o quadrado com as setas (opcional)
  const bodyElement = document.querySelector("body");
  bodyElement.addEventListener("keydown", keyDown, false);

  function keyDown(event) {
      switch (event.key) {
          case "ArrowLeft":
              directionX = -1; // Move para a esquerda
              break;
          case "ArrowRight":
              directionX = 1;  // Move para a direita
              break;
          case "ArrowUp":
              directionY = 1;  // Move para cima
              break;
          case "ArrowDown":
              directionY = -1; // Move para baixo
              break;
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
