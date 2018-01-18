var todoList = [];
var addedTodo;



$("#add").on("click", function() {
    var todoItem = $("#todoInput")
    .val()
    .replace(/(<([^>]+)>)/gi, "");
  if (!todoItem.trim()) {
    alert("please enter a to do");
  } else {
    todoList.push(todoItem);
    //empty the input field on click
    $("#todoInput").val("");
    //publish array
    addedTodo = todoList[todoList.length - 1];
    //console.log(addedTodo);
    $(".todoContainer")
      .append(
        '<li class="eachItem">' +
          '<p class="todoItemStyle">' +
          addedTodo +
          '</p><button class="sm-btn" id="deleteBtn"> delete </button> <button class="sm-btn"  id="completeBtn"> complete </button><button id="editBtn" class="sm-btn"> edit </button></li>'
      )
      .addClass("todoStyle");
    $("ul").css("border", "1px rgb(91, 140, 90) solid");
    $("body").css("height", "130%")
  }
   console.log(todoList);
 });

//add button to complete all items
$("#completeAll").on("click", function() {
  $(".todoItemStyle").toggleClass("completed");
});

//add button to restart list
$("#newList").on("click", function() {
  todoList = [];
  $(".todoContainer").html("");
  $("ul").css("border","none");
});


//button to remove a todo
$("body").on("click", "#deleteBtn", function() {
  var todoText = $(this).parent().children(':first-child').text();
  $(this).parent().remove();
//Loop compares todo's position in the array to the text of the specifically pressed delete button
  for (var i = 0 ; i < todoList.length; i++){
      if(todoList[i] === todoText){
      //console.log(todoList[i] + " is equal to " + todoText );
      todoList = jQuery.grep(todoList, function(value) {
  return value != todoList[i];
      })
    }
  }
 console.log(todoList);
    if (todoList == ""){
   console.log("list is empty");
   $("ul").css("border", "none");
 }
});

//button to complete a todo
$("body").on("click", "#completeBtn", function() {
  $(this)
    .siblings(".todoItemStyle")
    .toggleClass("completed-ind");
  console.log("completed clicked");
});

//edit button
$("body").on("click", "#editBtn", function() {
  $(this).siblings(".todoItemStyle").attr("contenteditable","true").css({
    "background-color": "rgba(255,255,255,.8)", 
    "border-radius": "5px",
    "height" : "25px",
     "outline" : "none",
     });
  console.log("edit clicked");
  $(this).text("save changes");
  
  if($(this).text() === "save changes"){
    $(this).addClass("saveBtn");
  }
});

$("body").on("click", ".saveBtn", function() {
  console.log("saved clicked");
});