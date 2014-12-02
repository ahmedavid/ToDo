<!DOCTYPE html>
<html>
  <head>
    <title>Todo App</title>
    <link href='http://fonts.googleapis.com/css?family=Lato:300,400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/style.css" type="text/css" media="screen" charset="utf-8">    
   <script src="//code.jquery.com/jquery-1.10.2.js"></script>
  <script src="//code.jquery.com/ui/1.11.2/jquery-ui.js"></script>   
  </head>
  <body>

    <div class="container">
      <h1>HTML5 , JavaScript , JSON , PHP&MySQL TODO List App</h1>
      <p>
        <label for="new-task">Add Item</label><div id="abc"><input id="new-task" type="text" placeholder="Add New Task"></div><button id="button">Add</button>
      </p>
      
      <div id="header"><h3><span id="left">Todo</span> <span id="status"></span></h3></div>
      <div id="todo">
        <ul id="incomplete-tasks">
        </ul>        
      </div>
      
      <h3>Completed</h3>
      <ul id="completed-tasks">
      </ul>
    </div>

    <script type="text/javascript" src="js/app.js"></script>
        <script>
           ajax_get_json(null,"read",null);
        </script>

  </body>
</html>