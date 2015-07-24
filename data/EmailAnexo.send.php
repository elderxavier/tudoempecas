<?php
	
	//$anexos01 = @ $_POST['anexos01'] ? $_POST['anexos01'] : array();
	$anexos02 = @ $_POST['anexos02'] ? $_POST['anexos02'] : array();	
	$nome     = @ $_POST['nome'];
	$email    = @ $_POST['email'];	

	if(!$nome){die('Preencha corretamente o campo NOME.');}
	if(!$email){die('Informe seu EMAIL.');}
	if(!filter_var($email, FILTER_VALIDATE_EMAIL)){die('Informe um EMAIL v&aacute;lido.');}

	$mensagem = "Solicitação de Peça \n";
	foreach ($_POST as $key => $pValue) {
		if($key != 'anexos02'){
			$mensagem .= "\n ".ucwords(str_replace('_',' ',$key))." = ".$pValue;
		}
	}
	

	require_once('../libs/PHPMailer/class.phpmailer.php');
	require_once('../libs/PHPMailer/class.smtp.php');

	$email_from = $email;
	$name       = $nome;	
	$assunto    = 'Solicitação de Peça';
	$email_to   = 'pedidos@tudoempecas.com.br'; //'tudo@tudoempecas.com.br';	
	//$email_to = 'rudineictba@hotmail.com';	
	$anexos     = $anexos02;


	$Email = new PHPMailer();
	$Email->IsSMTP();
	$Email->Host = "localhost";
	$Email->SMTPAuth = false;
	$Email->From = $email_from;
	$Email->FromName = utf8_decode($name);
	$Email->AddAddress($email_to);
	$Email->AddReplyTo($email_from);
	$Email->WordWrap = 50;

	  //anexando todos os arquivos para envio
	foreach($anexos as $arquivo){
		$Email->AddAttachment('../_temp/'.$arquivo);
	}

	$Email->Body = utf8_decode($mensagem);
	$Email->IsHTML(false); //envio como HTML (falso)
	$Email->Subject = utf8_decode($assunto);

	if(!$Email->Send()){
	  	echo "Esse e-mail não pode ser enviado";
	  	echo "<br/>Motivo: " . $Email->ErrorInfo;
	  	die();
	}

	echo true;




	 //apagar anexos
	 $dir = '../_temp/';
	 foreach($anexos as $arquivo){
		@ unlink($dir.$arquivo);
	}
	// limpa arquivos antigos		
	$iterator = new DirectoryIterator($dir);  	
	foreach($iterator as $entry) {	   	
	   	$filename = $entry->getFilename();
	   	$filetime = filemtime($dir.$filename);	   	
	   	$dif = time() - $filetime;  	
	   	if($dif > 3600){
	   		@ unlink($dir.$filename);
	   	}
	}


?>
