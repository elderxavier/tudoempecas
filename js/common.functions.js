

	//-----------------------------------------------------------------------------------------------------------------------------------------------
	// NL2BR
	//-----------------------------------------------------------------------------------------------------------------------------------------------
	function js_nl2br(str, is_xhtml) {

	  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; 

	  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
	}


	//----------------------------------------------------------------------------------------------
	// MENU MOBILE
	//-----------------------------------------------------------------------------------------------
	
	$.fn.menuMobile = function(options){
	
		var settings = $.extend({
			'minWidth' : 751
		}, options);

		return this.each(function(){
			
			var target  = $(this);
			var navIcon = $('<div>', {class: 'mobile-nav-icon', style: 'display:none'});

			target.parent().prepend(navIcon);
			
			
			// click do nav icon - abre o menu
			//------------------------------------
			navIcon.click(function(){
				if(target.is(':visible')){				
					target.slideUp();
					$(this).removeClass('opened');
				}
				else {
					target.slideDown();
					$(this).addClass('opened');
				}
			});		

			// função de resize
			//--------------------------
			function onWindowResize(){
				
				var W = $(window).width();

				if(W < settings.minWidth){
					if(!navIcon.is(':visible')){
						navIcon.show();
						target.removeClass('navigation-menu').addClass('mobile-nav');
						if(navIcon.hasClass('opened')){
							target.show();
						}
						else {
							target.hide();
						}										
						// click do dropdown - abre o submenu
						target.find('.dropdown a').click(function(e){
							e.preventDefault();
							$(this).parent().find('ul:first').slideToggle();
						});
					}
				}
				else {
					navIcon.hide();
					target.removeClass('mobile-nav').addClass('navigation-menu').show();
					target.find('ul').css({'display':''});
					target.find('.dropdown a').off('click');
				}
			}
			onWindowResize();
			$(window).resize(onWindowResize);
		});
	}


	//-----------------------------------------------------------------------------------------------------------------------------------------------
	// HIDE LABEL
	//-----------------------------------------------------------------------------------------------------------------------------------------------
	$.fn.hideLabel = function(){	
		
		$(this).find('input[type="text"], input[type="password"], textarea, select').each(function(){				
		
			var $item  = $(this);			
			var itemid = $item.attr('id') ? $item.attr('id') : $item.attr('name'); 
			var $label = $item.parent().find('label[for="'+ itemid +'"]');
			
			var mTop  = $item.css('padding-top');
			var mLeft = $item.css('padding-left');
			//var posX  = $item.offset().left - $item.parent().offset().left;
			//var posY  = $item.offset().top - $item.parent().offset().top;	
			$label.css({
				'position'	: 'absolute', 
				'width'		: 'auto',
				'padding'	: 0,
				'margin'	: 0,
				'top'		: mTop, 
				'left'		: mLeft,							 
				'z-index'	: 2
			});			
			
			$item.focus(labelHide).focusout(labelToogle).change(labelToogle);
			
			function labelToogle(){
				if($(this).val() == ''){
					$label.show();
				}
				else {
					labelHide();
				}
			}
			
			function labelHide(){
				$label.hide();				
			}
			
			
			// já é padrão no label-for
			//$label.click(function(){
			//	$item.click(); 
			//});
			
			$item.focusout();
			
		});
		
	};
	
	
	
	//-----------------------------------------------------------------------------------------------------------------------------------------------
	// POP UPS
	//-----------------------------------------------------------------------------------------------------------------------------------------------	

	// pop up show

	$.fn.popUpShow = function(){
	
		return this.each(function(){
		
			var lastIndex = parseInt($('body div:last').css('z-index'));
			lastIndex = lastIndex > 1000 ? lastIndex : 1000; //hack para este template que possui o menu com index 1000
			//$(this).css({'margin-top': -($(this).outerHeight()/2)+'px', 'z-index': (lastIndex+2)}).fadeIn('fast');		
			$(this).css({'z-index': (lastIndex+2)}).fadeIn('fast');		
			$(this).parent().append('<div class="uiPopUpOverlay" style="z-index:'+(lastIndex+1)+'"></div>');
		
		});
	
	};	
	
	// pop up hide
	
	$.fn.popUpHide = function(){
		return this.each(function(){
			$(this).fadeOut('fast');
			$(this).parent().find(".uiPopUpOverlay:last").remove();
		});
	}
	
	
	
	//-----------------------------------------------------------------------------------------------------------------------------------------------
	// ALERTS RESULT (com timer)
	//-----------------------------------------------------------------------------------------------------------------------------------------------	
	var timeResultStatus = 0;
	$.fn.resultStatus = function(options){
		
		// atualizar: fazer uma função close caso não seja setada a variavel timer 

		var settings = $.extend({
			'value' : '',
			'timer' : 3000
		}, options);
		
		
		return this.each(function(){
		
			clearTimeout(timeResultStatus);		

			var Obj = $(this);
			Obj.html('');
			Obj.append(settings.value).css({'display':'none'}).fadeIn();
			
			timeResultStatus = setTimeout(function(){
				//Obj.children().slideUp(function(){$(this).remove()});
				Obj.children().animate({height:'0px', paddingTop: '0px', paddingBottom: '0px', opacity: '0'}, 500, function(){$(this).remove()});
			}, settings.timer);
		
		});
		
	}

	//-----------------------------------------------------------------------------------------------------------------------------------------------
	/* ALERTS BOOTSTRAP */
	//-----------------------------------------------------------------------------------------------------------------------------------------------
	/* Warning messages */

	$.fn.showBootstrapAlert = function(options){
		
		var settings = $.extend({
			'message' : '&nbsp;',
			'type' : 'alert-info' 	 // alert-success | alert-info | alert-warning | alert-danger
		}, options);

		return this.each(function(){

			var alertItem = '';

			alertItem  = '<div class="alert '+ settings.type +' alert-dismissable" >';
	        alertItem += '<button class="close" aria-hidden="true" data-dismiss="alert" type="button">×</button>';
	        alertItem +=  settings.message;
	        alertItem += '</div>';

			$(this).html(alertItem); 

		});

	};


	//-----------------------------------------------------------------------------------------------------------------------------------------------
	/* AJAX FORM SUBMIT */
	//-----------------------------------------------------------------------------------------------------------------------------------------------
	// requer plugin ajax.form 

	$.fn.ajaxFormSubmit = function(options){		

		return this.each(function(){

			var settings = $.extend({
				type		: $(this).attr('method'),
				url			: $(this).attr('action'),
				dataType	: '',
				divResult	: $(this).find('.result'),
				successMsg	: 'As Informações foram atualizadas com sucesso.',
				success 	: function(data){
					if(data == true){	                       
	                    settings.divResult.showBootstrapAlert({message: settings.successMsg, type : 'alert-success'});
	                }
	                else {
	                    settings.divResult.showBootstrapAlert({'message': data, type : 'alert-warning'});
	                }
				},
				error : function(data){
					settings.divResult.showBootstrapAlert({'message': 'Erro de resposta!', type : 'alert-danger'});
				}

			}, options);

			$(this).submit(function(e){         

				e.preventDefault();			
	           
	            $(this).ajaxSubmit({
	                type : settings.type,
	                url : settings.url,
	                dataType : settings.dataType,
	                success : settings.success,
	                error : settings.error
	            });

	        });

	    });

	}


	//------------------------------------------------------------------------------------------------------------------------------------------
	// AJAX FORM LOAD
	//------------------------------------------------------------------------------------------------------------------------------------------
	$.fn.ajaxFormLoad = function(options){

		return this.each(function(){

			var settings = $.extend({
				'type'	: $(this).attr('method'),
				'url'	: $(this).attr('action'),
				'act'	: ($(this).attr('id') ? $(this).attr('id') : $(this).attr('name'))+ ' Load',
	            'vars'  : ''
			}, options);	
			
			var _thisForm = $(this);
	       
	        $.ajax({
	            type: settings.type,
	            url: settings.url,
	            data: {
	                'act': settings.act,
	                'vars': settings.vars
	            },
	            dataType: 'json',
	             success: function(data){
	                $.each(data, function(index, value){
	                    _thisForm.find('#'+index).val(value);
	                });
	            }
	        });		

	    });

	}
	

	//-----------------------------------------------------------------------------------------------------------------------------------------------
	// CONTENT SCROLL TO - rola o conteúdo para determidada posição
	// Ideal para ser utilizado em chats
	//-----------------------------------------------------------------------------------------------------------------------------------------------	
	$.fn.contentScrollTo = function(options){			
		
		return this.each(function(){

			var settings = $.extend({
				'pos'    : 'bottom',
				'delay' : 1000
			}, options);


			var toNumb = settings.pos;
			var _holder = $(this);

			if(settings.pos == 'top'){				
				toNumb = 0;
			}
			else if(settings.pos == 'bottom'){	
				toNumb = _holder.children().outerHeight() - _holder.innerHeight();
			}

			_holder.animate({scrollTop: toNumb}, settings.delay); 

		});
	}


	//-----------------------------------------------------------------------------------------------------------------------------------------------
	// MY SCROLL - executa funções durante e ao final rolagem
	// Pode ser usado para carregar conteúdo on demand
	//-----------------------------------------------------------------------------------------------------------------------------------------------	
	$.fn.scrollAutoLoad = function(options){

		return this.each(function(){

			var settings = $.extend({
				onScroller : function(){},
				onScrollTop : function(){},
				onScrollBottom : function(){}
			}, options);

			//var tipo = $(this).get(0).nodeName;

			//alert(this);

			$(this).scroll(function() { 				

				var scrollTop	 = parseFloat($(this).scrollTop());
				var scrollBottom = eval(scrollTop + parseFloat($(this).outerHeight()));
				var scrollHeight = ( this == '[object Window]' ? $('body').prop('scrollHeight') : $(this).prop('scrollHeight') );

				settings.onScroller({
					'scrollTop'    : scrollTop,
					'scrollBottom' : scrollBottom,
					'scrollHeight' : scrollHeight
				});
				if(scrollTop === 0){
					settings.onScrollTop();
				}
				if(scrollBottom >= scrollHeight-100) {	
					settings.onScrollBottom();			
				}					
			});

		});
	}


	//-----------------------------------------------------------------------------------------------------------------------------------------------
	// EDIT INLINE - transforma uma div em campo editável
	//-----------------------------------------------------------------------------------------------------------------------------------------------	
	$.fn.editInline = function(options){

		return this.each(function(){

			var settings = $.extend({
				onFocusOut : function(){}
			}, options);

			var target    = $(this);
			var textInput = '';
			
			/* open input */
			target.dblclick(openInput);			
			function openInput() {

				target.off('dblclick');

				var valor    = target.html();	
				var targetId = target.attr('id');
				var dataId   = target.attr('data-id');
				var width    = target.width();

				dataId = dataId ? dataId : (targetId ? targetId : '');
				
				textInput = $('<input>', {
					'type'  : 'text',
					'value' : valor,
					'style' : 'width:'+width+'px',
					'class' : 'editInlineInput'
				});
				target.html(textInput);
				textInput.focus();

				textInput.focusout(closeInput);
			}
				

			/* close input */
			function closeInput(){

				textInput.off('focusout');

				valor = textInput.val();

				textInput.fadeOut(function(){
					target.html(valor);
				});

				target.dblclick(openInput);

				// função de retorno
				settings.onFocusOut({						
					'target'     : target,
					'dataId'     : dataId,
					'inputValue' : valor
				});				
			};

		});
	}
	
	//-----------------------------------------------------------------------------------------------------------------------------------------------
	// HACK IMG FLOAT - tira o espaço oposto da imagem de conteúdo
	//-----------------------------------------------------------------------------------------------------------------------------------------------	
	$.fn.hackImgFloat = function(){
			
		$(this).find('img').each(function(){
		
			$j(this).css('max-width', '100%');

			var thisFloat = $(this).css("float");			
			if(thisFloat == 'right'){
				$(this).css('margin-right','0');
			}
			if(thisFloat == 'left'){
				$(this).css('margin-left','0');
			}				
		});
	};
	
	
	