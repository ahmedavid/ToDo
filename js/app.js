var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTaskHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");
//---------------------FUNCTIONS-------------------------\\
var createNewTaskElement = function(taskString,id,completed){
	var listItem = document.createElement("li");
	listItem.setAttribute("id",id);
	var checkBox = document.createElement("input");
	var label = document.createElement("label");
	var editInput = document.createElement("input");
	var editButton = document.createElement("button");
	var saveButton = document.createElement("button");
	var deleteButton = document.createElement("button");

	checkBox.type = "checkbox";
	
	if (completed == 1) {
		checkBox.setAttribute("checked","checked");
	};
	editInput.type = "text";
	editButton.textContent = "Edit";
	editButton.className = "edit";
	saveButton.textContent = "Save";
	saveButton.className = "save";
	deleteButton.textContent = "Delete";
	deleteButton.className = "delete";
	label.textContent = taskString;
	label.setAttribute("draggable","true");

	
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(saveButton);
	listItem.appendChild(deleteButton);
	return listItem;
}
function set_status(param){
	var status = document.getElementById("status");
	status.innerHTML=param;
}
function ajax_get_json(input,operation,id){
	var hr = new XMLHttpRequest();
    hr.open("POST", "process.php", true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	switch (operation) {
	    case "delete":
	        hr.send("operation=delete&id="+id); 
	        break;
	    case "update":
	        hr.send("operation=update&input="+input+"&id="+id); 
	        break;
	    case "complete":
	        hr.send("operation=complete&id="+id); 
	        break;	 
	    case "incomplete":
	        hr.send("operation=incomplete&id="+id); 
	        break;	               
	    case "insert":
	        document.getElementById("status").innerHTML=  'Loading <img src="images/loader2.gif" alt="">';
	        hr.send("operation=insert&input="+input+"&id="+id);

	        break;
	    default:
	 		document.getElementById("status").innerHTML=  '<div id="loader"><img src="images/loader2.gif" alt=""></div>';
	    	hr.send("operation=read"); 
    	  
	}    
    hr.onreadystatechange = function() {
	    if(hr.readyState == 4 && hr.status == 200) {
		    console.log(hr.responseText);
		    var data = JSON.parse(hr.responseText);
		    

			for(var obj in data){
				switch (operation) {
				    case "delete":
						set_status(data[obj]);
				        break;
				    case "update":
				    	set_status(data[obj]);
						 break;
				    case "complete":
				        set_status(data[obj]); 
				        break;	 
				    case "incomplete":
				        set_status(data[obj]); 
				        break;	               
				    case "insert":
				    		
				    		var listItem = createNewTaskElement(data[obj].task,obj,data[obj].completed); 
							incompleteTaskHolder.appendChild(listItem);
							bindTaskEvents(listItem,taskCompleted,obj);
							set_status("Added"); 				         
				        break;
				    default:
				    	
				    	var listItem = createNewTaskElement(data[obj].task,obj,data[obj].completed); 
						if(data[obj].completed == "0"){
							
							incompleteTaskHolder.appendChild(listItem);
							bindTaskEvents(listItem,taskCompleted,obj);
						}
						else if(data[obj].completed == "1"){
							
							completedTasksHolder.appendChild(listItem);
							bindTaskEvents(listItem,taskIncomplete,obj);
						}
						set_status("Ready"); 				    	 
				}				
				// var listItem = createNewTaskElement(data[obj].task,obj,data[obj].completed);
				// if(data[obj].completed == "0"){
					
				// 	incompleteTaskHolder.appendChild(listItem);
				// 	bindTaskEvents(listItem,taskCompleted,obj);
				// }
				// else if(data[obj].completed == "1"){
					
				// 	completedTasksHolder.appendChild(listItem);
				// 	bindTaskEvents(listItem,taskIncomplete,obj);
				// }
			}
	    }
    }
}
var addTask = function(){
	if(taskInput.value !='' && taskInput.value.length >2){
		//var addTaskString = escape(taskInput.value);
		//console.log(addTaskString);
		ajax_get_json(escape(taskInput.value),"insert",null);
		//console.log(taskInput.value);		
		taskInput.value = "";		
	}
	else{
		$( "#new-task" ).css("border","1px solid red");
		$( "#abc" ).effect( "bounce", {distance:3,times:3}, 100 );
		setTimeout(function() {$( "#new-task" ).css("border","1px solid #ddd");}, 800);
		
	}

}
var editTask = function(){
	console.log("Edit Task ...");

	var listItem = this.parentNode;
	var editInput = listItem.querySelector("input[type='text']");

	var label = listItem.querySelector("label");
	var containsClass = listItem.classList.contains("editMode");


	if(containsClass){
		label.textContent = editInput.value;

	}
	else{
		editInput.value = label.textContent;
	}
	listItem.classList.toggle("editMode");
	editInput.focus();
}
var saveTask = function(){
	console.log("Save triggered")
	var listItem = this.parentNode;
	var editInput = listItem.querySelector("input[type='text']");
	var label = listItem.querySelector("label");	
	var update_id = listItem.id;
	var updated = listItem.querySelector("input[type='text']").value;	
	if(editInput.value !='' && editInput.value.length >2){
		console.log("save Task ...");

			if (updated !== "" && updated !== label.textContent) {
				ajax_get_json(updated,"update",update_id);
			};
			var containsClass = listItem.classList.contains("editMode");


			if(containsClass){
				label.textContent = editInput.value;

			}
			else{
				editInput.value = label.textContent;
			}	
			listItem.classList.toggle("editMode");	
	}
	else{
		$( editInput ).css("border","1px solid red");
		//$( "#abc" ).effect( "bounce", {distance:3,times:3}, 100 );
		setTimeout(function() {$( editInput ).css("border","1px solid #ddd");}, 800);
		
	}	
	
	
}
var deleteTask = function(){
	ajax_get_json(null,"delete",this.parentNode.id);
	console.log(this.id);
	 var listItem = this.parentNode;
	 var ul = listItem.parentNode;
	 ul.removeChild(listItem);
	console.log("Delete Task ...");
}
var taskCompleted = function(){
	console.log("Task Completed ...");
	console.log(this.id);
	ajax_get_json(null,"complete",this.parentNode.id);
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);	
}
var taskIncomplete = function(){
	console.log("Task Incomplete ...");
	ajax_get_json(null,"incomplete",this.parentNode.id);
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);	
}
var test = function(){
	console.log("onblur triggered");
}

//---------------------EVENT HANDLERS-------------------------\\
addButton.onclick = addTask;

var bindTaskEvents =function(taskListItem,checkBoxEventHandler,id){
	//console.log(taskListItem.querySelector("input[type='text']"));
	var checkBox =taskListItem.querySelector("input[type='checkbox']");
	var editButton=taskListItem.querySelector("button.edit");
	var saveButton=taskListItem.querySelector("button.save");
	var deleteButton=taskListItem.querySelector("button.delete");
	var label = taskListItem.querySelector("label");
	var item_input =taskListItem.querySelector("input[type='text']");
	label.ondblclick = editTask;
	item_input.onblur = saveTask;


	saveButton.onclick=saveTask;
	editButton.onclick=editTask;
	deleteButton.onclick=deleteTask;
	checkBox.onchange = checkBoxEventHandler;
}

for(var i=0;i<incompleteTaskHolder.children.length;i++){
	bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}
for(var i=0;i<completedTasksHolder.children.length;i++){
	bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
$("#new-task").focusout(function(){
	$( "#new-task" ).css("border","1px solid #ddd");
});
