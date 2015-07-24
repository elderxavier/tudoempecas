<?php

	require_once('../libs/NWD/NwdGD.2.class.php');
	
	$file     = $_FILES['foto_field'];
	$imgName  = $file['name'];
	$extensao = strtolower(strrchr($imgName,'.'));
	$anexoNb  = $_POST['anexoNb'];

	if(strstr('*.jpg;*.jpeg;*.gif;*.png', $extensao)){

		//if($anexoNb == '01'){ $imgName = 'PRINCIPAL_'.$imgName; }
		
		$nImageName = preg_replace('/[^a-z0-9.]/i', '_', utf8_decode($imgName));

		if(move_uploaded_file($file['tmp_name'], '../_temp/'.$nImageName)){			
		
			NwdGD::imgResize('../_temp/'.$nImageName, '../_temp/'.$nImageName, 800, 600, 'proporc', 'ffffff', 100, true);

			echo '<script>window.top.window.finishUploadImages02(\''.$nImageName.'\')</script>';		
		}

	}	

	