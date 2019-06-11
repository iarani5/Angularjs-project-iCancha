<?php 

function cambiar_formato_fecha($fecha,$b){
	$datetime = new DateTime($fecha);
	if($b){
		return $datetime->format('d/m/Y');
	}
	else{
		return $datetime->format('H:i d/m/Y');
	}
}

function publicaciones_parsear_fecha($fecha){
	$secs=strtotime('now') - strtotime($fecha);
	$bit = array(
     ' año' => $secs / 31556926 % 12,
     ' semana' => $secs / 604800 % 52,
     ' día' => $secs / 86400 % 7,
     ' hora' => $secs / 3600 % 24,
     ' min' => $secs / 60 % 60,
     ' seg' => $secs % 60
     );
	$ret[]= "Hace ";
	foreach($bit as $k => $v){
			if($k==" año"){
				if($v>0){
					if($v > 1)$ret[] = $v . $k . 's';
					if($v == 1)$ret[] = $v . $k;
					break;
				}
			}
			else if($k==" semana"){
				if($v>0){
					if($v > 1)$ret[] = $v . $k . 's';
					if($v == 1)$ret[] = $v . $k;
					break;
				}
			}
			else if($k==" día"){
				if($v>0){
					if($v > 1)$ret[] = $v . $k . 's';
					if($v == 1)$ret[] = $v . $k;
					break;
				}
			}
			else if($k==" hora"){
				if($v>0){
					if($v > 1)$ret[] = $v . $k . 's';
					if($v == 1)$ret[] = $v . $k;
					break;
				}
			}
			else if($k==" min"){
				if($v>0){
					if($v > 1)$ret[] = $v . $k . 's';
					if($v == 1)$ret[] = $v . $k;
					break;
				}
			}
			else if($k==" seg"){
				if($v>0){
					if($v > 1)$ret[] = $v . $k . 's';
					if($v == 1)$ret[] = $v . $k;
					break;
				}
			}
	}
	array_splice($ret, count($ret)-1, 0);
	return join(' ', $ret);
}

function getDatetimeNow() {
	$tz_object = new DateTimeZone('America/Argentina/Buenos_Aires');
	$datetime = new DateTime();
	$datetime->setTimezone($tz_object);
	return $datetime->format('Y-m-d H:i:s');
}

?>
