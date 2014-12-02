<?php
include ('database.php');
header("Content-Type: application/json");
function read($mysqli,$id){
  if(isset($id)){
	   //echo $id;die();
	   $query = "SELECT * FROM `table` WHERE `id`= $id ;";
	   $result = $mysqli->query($query) or die($mysqli->error.__LINE__); 	
  }
  else{
	  $query = "SELECT * FROM `table` ORDER BY dc DESC LIMIT 15;";
	  $result = $mysqli->query($query) or die($mysqli->error.__LINE__);  	
  }

  $jsonData = "{";
  while($row = $result->fetch_assoc()){
  	$jsonData .='"'.$row['id'].'":{"task":"'.$row['task'].'","completed":"'.$row['completed'].'"},'; 
} 
  $jsonData = chop($jsonData,",");
  $jsonData .="}";
  echo $jsonData;	
}
function delete($id,$mysqli){
	$delete_query = "DELETE FROM `table` WHERE `id` =  $id";
	$result = $mysqli->query($delete_query) or die($mysqli->error.__LINE__);	
}
function insert($input,$mysqli){
	$string = mysqli_real_escape_string($mysqli,$input);
	$insert_query = "INSERT INTO `table` (task,dc) VALUES('$string',NOW());";
	$mysqli->query($insert_query) or die($mysqli->error.__LINE__);	
	$last_id = mysqli_insert_id($mysqli);
	return $last_id;
	
}
function update($input,$id,$mysqli){
	$update_query = "UPDATE `table` SET `task` = '$input' , `dc` = NOW() WHERE `id` = $id ";
	$result = $mysqli->query($update_query) or die($mysqli->error.__LINE__);	
}
function complete($id,$mysqli){
	$complete_query = "UPDATE `table` SET `completed` = 1 WHERE `id` = $id ";
	$result = $mysqli->query($complete_query) or die($mysqli->error.__LINE__);	
}
function incomplete($id,$mysqli){
	$incomplete_query = "UPDATE `table` SET `completed` = 0 WHERE `id` = $id ";
	$result = $mysqli->query($incomplete_query) or die($mysqli->error.__LINE__);	
}

if ($_POST) {
	switch ($_POST['operation']) {
	    case "insert":
	        read($mysqli,insert($_POST['input'],$mysqli));
	        break;
	    case "complete":
	        complete($_POST['id'],$mysqli);
	        echo '{"0":"COMLETED"}';
	        break;	 
	    case "incomplete":
	        incomplete($_POST['id'],$mysqli);
	        echo '{"0":"INCOMPLETE"}';
	        break;	               
	    case "update":
	        //echo '{"INPUT":"'.$_POST['input'].'","ID":"'.$_POST['id'].'"}';die();
	        update($_POST['input'],$_POST['id'],$mysqli);
	        echo '{"0":"UPDATED"}';

	        break;
	    case "delete":
	        delete($_POST['id'],$mysqli);
	        echo '{"0":"DELETED"}';
	        break; 
	    default:
	    	read($mysqli,null);
	    	break;      
	}	
}
?>