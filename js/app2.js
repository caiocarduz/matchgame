/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/*reiniciliza o jogo quando o botao é acionado.*/
function iniciar(){
	ii = 0;
	yourArray = [];
	shuf = [];
	vv = 1;
	count = 0;
	$('.open').removeClass('open').addClass('card');
    $('.show').removeClass('show').addClass('card');
    $('.wrong').removeClass('wrong').addClass('card');
    $(".right").addClass("enable");
    $('.right').removeClass('right').addClass('card');
    $(".card").addClass("enable");
    $(".card").removeAttr("id");
    $(".stars").find("i").addClass("fa fa-star");
    $(".moves").addClass("moves").text("3");
	$("li").each(function(){
		if($(this).hasClass("card")){
			yourArray.push($(this).children("i").prop("class"));
			
		}

	})
	shuf = shuffle(yourArray);
	$("li").each(function(){
		if($(this).hasClass("card")){
		 $(this).children("i").removeClass().addClass(shuf[ii]);
		 /*addClass(shuffle(yourArray)[uu % shuffle(yourArray).length]);*/
		 ii++;
		} 
	})
}
var desligar = function(x){
	if (x >= 2){
	 $(".right").off("click");
	 $(".wrong").off("click");
	}
}

var myFunc = function(event){
	event.stopPropagation();
}

function timer(){
        var start = new Date;
        timerptr =  setInterval(function(){
            $(".clock").text(Math.round((new Date - start) / 1000),0)
        }, 1000);

}

function reinicializar(){
     cc = 0;
     aa = 0;
     clearInterval(timerptr);
     timer();
     iniciar();
}

function fechaCartas(){
    setTimeout(function(){ 
                    $(".wrong").addClass("enable");
                    $(".wrong").removeAttr("id");
                    $('.wrong').removeClass('show').addClass('card');
                    $('.wrong').removeClass('wrong').addClass('card');
                    $('.open').removeClass('open').addClass('card');
                    $(".wrong").effect("shake");
                   
                    $(".card").css("cursor", "context-menu");
                    count= 0;
                    },500);

}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/*variaveis relacianadas ao funcionamento do código. count é contador de quantos vezes o usuario clica nas cartas
aa é contador que garante a msg de parabenizacao quando o usuario acerta todos os pares em sequencia. ii define o index do array
das figuras das cartas. ee adiciona um numero aos ids gerados para localizar as cartas clicadas e trocar seus estilo.
vv é um contador que permite que as estrelas sejam remvidas conforme os cliques do usuário. yourArray cria o array que contém
as figuras das cartas. Shuf gera um array embaralhado pela função shuffle. cc adiciona o numero de cliques do usuario no header.*/
var count = 0;
var aa = 0;
var ii = 0;
var ee = 1;
var vv = 1;
var	yourArray = [];
var	shuf = [];
var cc = 0;
var x = 1;
var atributo = {};
/*funcao que gera um alerta*/
var explode = function(){
    alert("Não desista, continue tentando!!!");
};
/*funcao que gera um alerta*/
 var congrat = function(){
    alert("Parabéns, você demonstrou que tem ótima memória!!!");
};
$(document).ready(function(){
        iniciar();
        timer();
        /*Quando o usuario finaliza o jogo, ao clicar o botao ok o site volta a pagina inicial e reinicializa o jogo.*/
        $("button").click(function(){
            $("body").load("text/pag3.html");
        })
    	$("li").addClass("enable");	
	    /*ao clicar na carta, uma série de eventos são acionados de acordo com o código abaixo*/
        $(".card").on("click",function(evt){
         if ($(evt.target).hasClass("enable") == true){	
         	count++
        	evt.stopPropagation();
        	cc++;
        	$(".moves").addClass("moves").text(cc);
            /*Faz com que as ações sejam feitas aos pares. Caso haja matching um determinada ocorrência do contrário, outra*/
            if(count < 3){ 
            	$(evt.target).attr("id", "link"+ee);
            	
                $(evt.target).addClass("card open show");
                $(evt.target).removeClass("enable");
                atri = $(evt.target).children("i").attr("class");
                atributo[ii]=atri;
                ii++;
                ee++;
                /*permite que usuario de continuidade no jogo caso as cartas sejam iguais*/
                if ( count == 2 && atributo[ii -1] == atributo[ii - 2]){
                    count = 0;
                    aa++;
                    $("#"+"link"+(ee-1)).removeClass("open").addClass("right");	
                    $("#"+"link"+(ee-2)).removeClass("open").addClass("right");                 
                    $("#"+"link"+(ee-1)).effect("shake");
                    $("#"+"link"+(ee-2)).effect("shake");

                    $(".right").removeAttr("id");                                     
                    if (aa === 8){
                       aa = 0;
                       $("body").load("text/pag2.html");
                       $(".contmov").addClass('contmov').text(cc);
                 
                    } 
                
                /*Caso não haja o matching, as cartas são fechadas e o usuário da continuidade no jogo.*/
                } else if (count == 2) {
                   $("#"+"link"+(ee-1)).removeClass("open").addClass("wrong");	
                   $("#"+"link"+(ee-2)).removeClass("open").addClass("wrong");
                   $(".wrong").effect("shake");
                   $(".card").css("cursor", "none");
                   /*Está função permite que usuário tem a capacidade de ver as cartas selecionadas por 0.5 segundos antes que seja fechada.*/ 
                   fechaCartas();                                                
                  }          
            }
            /*diminui os número de estrelas a medida que o usário clica nas cartas.*/
            if (cc % 10 == 0){
                if (vv < 3){
	                   $("#star"+vv).removeClass();
	                   vv++;
	                } 
                }  
	      }          
        });
        /*reinicializa o jogo quando o usuário clica no botão.*/
        $(".restart").click(function(){ 
            reinicializar();    
        })
       
		
});
           