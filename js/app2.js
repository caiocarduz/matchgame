/*
 * Create a list that holds all of your cards
 */


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
var explode = function(){
    alert("Não desista, continue tentando!!!");
};
 var congrat = function(){
    alert("Parabéns, você demonstrou que tem ótima memória!!!");
};


$(document).ready(function(){
		
		$("button").click(function(){
			$("body").load("text/pag3.html");
			$("body").one("mousemove",function(){
				iniciar();		
			})	 
	})

});

$(document).ready(function(){
    	$("li").addClass("enable");	
	
        $(".card").on("click",function(evt){
         if ($(evt.target).hasClass("enable") == true){	
         	count++
        	evt.stopPropagation();
        	cc++;
        	$(".moves").addClass("moves").text(cc);
            if(count < 3){ 
            	$(evt.target).attr("id", "link"+ee);
            	
                $(evt.target).addClass("card open show");
                $(evt.target).removeClass("enable");
                atri = $(evt.target).children("i").attr("class");
                atributo[ii]=atri;
                ii++;
                ee++;
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
                 
                    } 
                

                } else if (count == 2) {
                   $("#"+"link"+(ee-1)).removeClass("open").addClass("wrong");	
                   $("#"+"link"+(ee-2)).removeClass("open").addClass("wrong");
                   $(".wrong").effect("shake");
                   $(".card").css("cursor", "none");
                   aa = 0;
                                                                    
                   setTimeout(function(){ 
                   	$(".wrong").addClass("enable");
                    $(".right").addClass("enable");
                    $(".wrong").removeAttr("id");
                    $('.wrong').removeClass('wrong').addClass('card');
                    $('.show').removeClass('show').addClass('card');
                    $('.open').removeClass('open').addClass('card');
                    $('.right').removeClass('right').addClass('card');
                    $(".wrong").effect("shake");
                   
                    $(".card").css("cursor", "context-menu");
                    count= 0;
                    },500);
                  }          
            }
            if (cc % 10 == 0){
	                   $("#star"+vv).removeClass();
	                   vv++;
	                   if (vv == 4){
	                   	$(".stars").find("i").addClass("fa fa-star");
	                   	vv = 1;
	                   	cc = 0;
	                   	iniciar();                   	
	                   	aa = 0;
	                   	$(".moves").addClass("moves").text(cc);
	                    
	                   }
	                }   
	      }          
        });
    
       
		
});
           
$(document).ready(function(){

	$(".restart").click(function(){	
		cc = 0;
		aa = 0;
		iniciar();
	})

});
 