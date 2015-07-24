$(document).ready(function(){

	mascara();
	changeOnScroll();
	ancora_menu();
	institucional();
	solicitante();
	parceiro();
	login();
});






//ancora menu
function ancora_menu(){
	$('#menu a, #escolha .box a').click(function(){
      var alvo = $(this).attr('href').split('#').pop();
      $('html, body').animate({scrollTop: $('#'+alvo).offset().top - 58 }, 1700);
      return false;
   });
}







function login(){
	$("#menu .login").click(function(e){
		e.preventDefault();

		if($("#login").data("estado") == "fechado"){
	      $("#login").fadeIn(300);
	      $("#login").data("estado", "aberto");

	    }else{
	      $("#login").fadeOut(300);
	      $("#login").data("estado", "fechado");
	    }

  });
}








function changeOnScroll(){
	
	$(window).scroll(function(){
		var topTopo       = $("#home").offset().top;
		var quemsomos  	  = $("#quemsomos").offset().top;
		var servicos      = $("#servicos").offset().top;
		var localizacao     = $("#localizacao").offset().top;
		var contato       = $("#contato").offset().top;
		var scrollAtual   = $(window).scrollTop() + 111;


		$("#menu li").removeClass("menu-li-ativo");	

		if(scrollAtual >= (quemsomos - 700) && scrollAtual < servicos){
			$("#menu li").removeClass("menu-li-ativo");
			$("#menu li:eq(0)").addClass("menu-li-ativo");
		}

		if(scrollAtual >= (servicos - 850) && scrollAtual < localizacao){
			$("#menu li").removeClass("menu-li-ativo");
			$("#menu li:eq(1)").addClass("menu-li-ativo");
		}

		if(scrollAtual >= (localizacao - 850) && scrollAtual < contato){
			$("#menu li").removeClass("menu-li-ativo");
			$("#menu li:eq(2)").addClass("menu-li-ativo");
		}

		if(scrollAtual >= (contato - 1050) && scrollAtual < contato){
			$("#menu li").removeClass("menu-li-ativo");
			$("#menu li:eq(3)").addClass("menu-li-ativo");
		}

		if(scrollAtual >= contato){
			$("#menu li").removeClass("menu-li-ativo");
			$("#menu li:eq(4)").addClass("menu-li-ativo");
		}


	});
}










/*modal
function modal(){
	$(".btn-solicitante").click(function(){
		$(".sobra-modal, #modal-solicitante").fadeIn(300);
	});



	$(".btn-parceiro").click(function(){
		$(".sobra-modal, #modal-parceiro").fadeIn(300);
	});

	$(".sobra-modal").click(function(){
		$(".sobra-modal, #modal-solicitante ,#modal-parceiro").fadeOut(300);
	});
}
*/





function solicitante(){

	$(".btn-solicitante").click(function(){
		$("#sol-1").fadeOut(300);
		$("#sol-2").fadeIn(900);
		$(".sombra").fadeIn(300);
	});

	$("#fechar-solicitante").click(function(){
		$("#sol-2").fadeOut(300);
		$("#sol-1").fadeIn(500);
		$(".sombra").fadeOut(300);
	});
}







function parceiro(){

	$(".btn-parceiro").click(function(){
		$("#par-1").fadeOut(300);
		$("#cadastro-parceiros").fadeIn(900);
		$(".sombra").fadeIn(300);
	});

	$("#fechar-parceiro").click(function(){
		$("#cadastro-parceiros").fadeOut(300);
		$("#par-1").fadeIn(500);
		$(".sombra").fadeOut(300);
	});
}







function institucional(){
	$("#institucional #content-0").show(300);

	$("#institucional ul li").click(function(){
		var index = $(this).index();

		$("#institucional .content").fadeOut(500);
		$("#institucional #content-"+index).fadeIn(500);

		$("#institucional ul li").removeClass("menu-institucional-ativo");
		$("#institucional ul li:eq("+index+")").addClass("menu-institucional-ativo");

	});
}








function mascara(){
	$(".mask-data").mask("99/99/9999"); //data
	$(".mask-fone").mask("(99) 9999-9999"); //telefone
}














//preview imagem
function preview(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
  $('#preview_image').attr('src', e.target.result)};
  	reader.readAsDataURL(input.files[0]);
  }
}




//preview imagem
function preview_2(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
  $('#preview_image2').attr('src', e.target.result)};
  	reader.readAsDataURL(input.files[0]);
  }
}