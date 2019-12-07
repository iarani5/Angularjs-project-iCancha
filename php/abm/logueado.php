 <?php
   /****** Clases *****/	
    require_once('../config.php');
	
	
	if(isset($_SESSION['s_id'])){
		echo 1;
	}
	else{
		session_destroy();
		echo 0;
	}
