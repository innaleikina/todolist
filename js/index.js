var todoList = [];
var addedTodo;


// _________________ADD ITEMS TO LIST
$("#add").on("click", function() {
    var todoItem = $("#todoInput")
    .val()
    .replace(/(<([^>]+)>)/gi, "");
  if (!todoItem.trim()) {
    alert("Please enter a to do");
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
          '</p><div class="button-sm-container"><button class="sm-btn" id="deleteBtn"> <i class="fa fa-2x  fa-trash" aria-hidden="true"></i> </button> <button class="sm-btn"  id="completeBtn"> <i class="fa fa-2x  fa-check" aria-hidden="true"></i> </button><button id="editBtn" class="sm-btn"> <i class="fa  fa-2x fa-pencil" aria-hidden="true"></i> </button></div></li>'
      )
      .addClass("todoStyle");
    $("ul").css("border", "1px rgb(91, 140, 90) solid");
    $("body").css("height", "130%")
  }
   console.log(todoList);
 });


//______________GLOBAL BUTTONS THAT AFFECT ALL TO DOS
//check all (but not the ones that were already individually checked)
$("#completeAll").on("click", function() {
  if($(".todoItemStyle").attr("contenteditable") ==  "true" ){
    alert ("You have edited to dos that are unsaved. Please save them first.");
  }else {
  $(".todoItemStyle").toggleClass("completed");
  if(todoList == ""){
    alert("Please add some to dos to your list");
}
}
});

//uncheck all
$("#uncompleteAll").on("click", function() {
  $(".todoItemStyle").removeClass("completed completed-ind");
  if(todoList == ""){
    alert("Please add some to dos to your list");
  }
});

//genrate a new list
$("#newList").on("click", function() {
  if(todoList == ""){
    alert("Your list is ready for some to dos");
    $("body").css("height" , "100vh");
  } else {
  todoList = [];
  $(".todoContainer").html("");
  $("ul").css("border","none");
   $("body").css("height" , "120vh");
 }
});


//__________________INDIVIDUAL TO DO BUTTONS
//button to remove a todo
$("body").on("click", "#deleteBtn", function() {
  var todoText = $(this).parent().siblings(".todoItemStyle").text();
  $(this).parent().parent().remove();
//Loop compares todo's position in the array to the text of the specifically pressed delete button
  for (var i = 0 ; i < todoList.length; i++){
      if(todoList[i] === todoText){
      console.log(todoList[i] + " is equal to " + todoText );
      todoList = jQuery.grep(todoList, function(value) {
  return value != todoList[i];
      })
    }
  }
 console.log(todoList);
    if (todoList == ""){
   console.log("list is empty");
   $("ul").css("border", "none");
   $("body").css("height" , "100vh");
 }
});

//edit button
$("body").on("click", "#editBtn", function() {
  // makes the text editable for a specofoc todo and adds styling
  $(this).parent().siblings(".todoItemStyle").attr("contenteditable","true").css({
    "background-color": "rgba(255,255,255,.8)",
    "border-radius": "15px",
    "outline" : "none",
    "padding" : "5px",
    "height" : "100%"
     });
  console.log("edit clicked");
  //changes the edit button to be a save changes button
  $(this).text("save changes");
  if($(this).text() === "save changes"){
  $(this).addClass("saveBtn");
  }
});

// save an edited to do button
$("body").on("click", ".saveBtn", function() {
  console.log("saved clicked");
  //chnages the save button back to the edit button
  $(this).html('<i class="fa  fa-2x fa-pencil" aria-hidden="true"></i>');
  $(this).removeClass("saveBtn");
  $(this).parent().siblings(".todoItemStyle").attr("contenteditable","false").css({
    "background-color": "transparent",
    "border-radius": "15px",
    "outline" : "none",
     });
});

//button to complete a todo
$("body").on("click", "#completeBtn", function() {
  if($(this).parent().siblings(".todoItemStyle").attr("contenteditable") ==  "true" ){
    alert ("You have edited to dos that are unsaved. Please save them first.");
  } else  {
  $(this).parent().siblings(".todoItemStyle").toggleClass("completed-ind");
  console.log("completed clicked");
}
});

//__________________________DROP DOWN MENU SECTION
$(".buttons").hide();
$(".drop-down-menu").on("click", function(){
  console.log("drop down pressed");
$(".buttons").toggle();
});

$(".buttons").on("click", function(){
  $(".buttons").hide();
})
