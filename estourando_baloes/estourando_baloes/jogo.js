var timeId = null; //variavel que armazena a chamada da funcao timeout3

function iniciaJogo(){
	var url = window.location.search;

	var nivel_jogo = url.replace("?", " ");
	//alert(nivel_jogo);

	var tempo_segundos = 0;
	if(nivel_jogo == 1){
	 //1 fácil -> 120segundos
	tempo_segundos= 120;
}
	if(nivel_jogo == 2){
	 //2 medio -> 60segundos
	tempo_segundos=60;
}
	if(nivel_jogo == 3){
	 //3 dificil -> 30segundos
	tempo_segundos=30;
}

	document.getElementById('cronometro').innerHTML= tempo_segundos;

	var qtd_baloes = 80;

	cria_baloes(qtd_baloes);

	//imprimir qtd de baloes inteiros

	document.getElementById('baloes_inteiros').innerHTML = qtd_baloes;
	document.getElementById('baloes_estourados').innerHTML = 0;

	contagem_tempo(tempo_segundos +1);
}

function contagem_tempo(segundos){
	segundos = segundos - 1;
	if (segundos == -1){
		clearTimeout(timerId);//para a execução da função do setTimeout
		game_over();
		return false;

	}
	document.getElementById('cronometro').innerHTML = segundos;
	timerId = setTimeout("contagem_tempo("+segundos+")",1000);


}
function game_over(){
	alert('Fim de jogo, voce nao conseguiu estourar todos os balões a tempo');
}

function cria_baloes(qtd_baloes){
	for( var i = 1; i <= qtd_baloes; i++){

		var balao = document.createElement("img");
		balao.src ='imagens/balao_azul_pequeno.png';

		balao.style.margin ='12px';
		balao.id = 'b'+i;
		balao.onclick = function(){
			estourar(this); };
		document.getElementById('cenario').appendChild(balao);
	}
}

function estourar(e){

	var id_balao = e.id;

	document.getElementById(id_balao).src ='imagens/balao_azul_pequeno_estourado.png';
	pontuacao(-1);
}

function pontuacao(acao){
	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros, baloes_estourados);
}

function situacao_jogo(baloes_inteiros, baloes_estourados){
	if(baloes_inteiros == 0){
		alert('Parabéns! Voce consegiu');
		parar_jogo();
	}
}

function parar_jogo(){
	clearTimeout(timerId);
}