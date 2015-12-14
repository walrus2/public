var todos = [];

$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: '/todos',
    contentType: 'application/json',
    dataType: 'json',
    success: function(data) {
      data.forEach(function(todo, i) {
        todos.push(todo.item);
        $('#todo-list').append('<li><a href="#" data-index="' + i + '">' + todo.item + '</a></li>');
      });
    },
    error: function(error) {
      alert(JSON.stringify(error));
    }
  });
});

// Event handler for form submit
$('form').submit(function(e) {
  e.preventDefault();

  // Get value of input box
  var newTodo = $('input[name="item"]').val();

  // Add new todo to array of todos
  todos.push(newTodo);

  $('#todo-list').empty();

  // Loop over each item in the list and
  // add it to the HTML <ul> list
  todos.forEach(function(todo, i) {
    $('#todo-list').append('<li><a href="#" data-index="' + i + '">' + todo + '</a></li>');
  });

  $('input[name="item"]').val('');

  $.ajax({
    type: 'POST',
    url: '/todos',
    data: JSON.stringify({item: newTodo, status: 'incomplete'}),
    contentType: 'application/json',
    dataType: 'json',
    success: function(data) {
      alert(JSON.stringify(data));
    },
    error: function(error) {
      alert(JSON.stringify(error));
    }
  });
});


// Event handler for todo item click
$('#todo-list').on('click', 'a', function(e) {
  e.preventDefault();

var itemText = $(this).text();

   $.ajax({
    type: 'DELETE',
    url: '/todos',
    data: JSON.stringify({item: itemText}),
    contentType: 'application/json',
    dataType: 'json',
    success: function(data) {
      alert(JSON.stringify(data));
    },
    error: function(error) {
      alert(JSON.stringify(error));
    }
  });
});

  // identify the item that was clicked
  var index = $(this).data('index');

  // remove item from array
  todos.splice(index, 1);

  // empty the list of all items
  $('#todo-list').empty();

  // render all list items from array
  todos.forEach(function(todo, i) {
    $('#todo-list').append('<li><a href="#" data-index="' + i + '">' + todo + '</a></li>');
  });


