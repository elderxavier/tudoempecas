<?php	
	$pAnexos = @ $_POST['pAnexos'] ? $_POST['pAnexos'] : array();
	$empresa = @ $_POST['empresa'];
	$email   = @ $_POST['email'];	

	if(!$empresa){die('Preencha corretamente o campo EMPRESA.');}
	if(!$email){die('Informe seu EMAIL.');}
	if(!filter_var($email, FILTER_VALIDATE_EMAIL)){die('Informe um EMAIL v&aacute;lido.');}

	$mensagem = "Solicitação de Peça \n";
	foreach ($_POST as $key => $pValue) {
		if($key != 'pAnexos'){
			$mensagem .= "\n ".ucwords(str_replace('_',' ',$key))." = ".$pValue;
		}
	}
	

	require_once('../libs/PHPMailer/class.phpmailer.php');
	require_once('../libs/PHPMailer/class.smtp.php');

	$email_from = $email;
	$name       = $empresa;	
	$assunto    = 'Cadastro de Parceiro';
	$email_to   = 'parceiro@tudoempecas.com.br';		
	$anexos     = $pAnexos;


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
