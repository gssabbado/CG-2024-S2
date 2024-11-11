const scoreboard = document.querySelector("#scoreboard");
const ctx = scoreboard.getContext("2d");

let player1Score = 0;
let player2Score = 0;

function atualizarPlacar() {
    ctx.clearRect(0, 0, scoreboard.width, scoreboard.height); // Limpa o placar anterior

    // Definindo o estilo do placar
    ctx.fillStyle = "black";
    ctx.font = "48px Arial";
    ctx.textAlign = "center";
    
    ctx.fillText(player1Score, scoreboard.width / 4, scoreboard.height / 2);
    ctx.fillText(player2Score, 3 * scoreboard.width / 4, scoreboard.height / 2);
}


function marcarPonto(jogador) {
    if (jogador === 1) {
        player1Score++;
    } else if (jogador === 2) {
        player2Score++;
    }
    atualizarPlacar();
}


atualizarPlacar();
