var todo = {
  data: [], 
  load: function () {
    if (localStorage.list == undefined) {
      localStorage.list = "[]";
    }
    // Parse JSON
    // [0] = Task
    // [1] = Status : 0 not done, 1 completed, 2 cancelled
    todo.data = JSON.parse(localStorage.list);
    todo.list();
  },



  save: function () {
  //  save the current data to local storage
    localStorage.list = JSON.stringify(todo.data);
    todo.list();
  },



  list: function () {

    var container = document.getElementById("todo-list");
    container.innerHTML = "";

   
    if (todo.data.length > 0) {
      var row = "", el = "";
      for (var key in todo.data) {
    
        row = document.createElement("div");
        row.classList.add("clearfix");
        row.dataset.id = key;


        el = document.createElement("div");
        el.classList.add("item");
        if (todo.data[key][1] == 1) {
          el.classList.add("done");
        }
        if (todo.data[key][1] == 2) {
          el.classList.add("cx");
        }
        el.innerHTML = todo.data[key][0];
        row.appendChild(el);


       // Add edit button
       el = document.createElement("input");
       el.setAttribute("type", "button");
       el.value = "edit";
       el.classList.add("bedit");
       el.addEventListener("click", function () {
         todo.status(this, 3);
       });
       row.appendChild(el);



        // Add cancel button
        el = document.createElement("input");
        el.setAttribute("type", "button");
        el.value = "\u2716";
        el.classList.add("bdel");
        el.addEventListener("click", function () {
          todo.status(this, 2);
        });
        row.appendChild(el);

        // Add done button
        el = document.createElement("input");
        el.setAttribute("type", "button");
        el.value = "\u2714";
        el.classList.add("bdone");
        el.addEventListener("click", function () {
          todo.status(this, 1);
        });
        row.appendChild(el);

        // Add row to list
        container.appendChild(row);
      }
    }
  },

  add: function () {
  // todo.add() : add a new item

    todo.data.push([
      document.getElementById("todo-add").value, 0
    ]);
    document.getElementById("todo-add").value = "";
    todo.save();
  },

  status: function (el, stat) {
  // todo.status() : update item status

    var parent = el.parentElement;
    todo.data[parent.dataset.id][1] = stat;
    todo.save();
  },

  del: function (type) {

 
    if (confirm("Delete tasks?")) {
      // Delete all
      if (type == 0) {
        todo.data = [];
        todo.save();
      }
    
      else {
        todo.data = todo.data.filter(row => row[1]==0);
        todo.save();
      }
    }
  },
  show: function (type) {
    if (type == 0) {
      todo.data=todo.data
     
    }

    else {
      
    }
  }


};


window.addEventListener("load", function () {
  document.getElementById("todo-da").addEventListener("click", function () {
    todo.del(0);
  });
  document.getElementById("todo-dc").addEventListener("click", function () {
    todo.del(1);
  });

  document.getElementById("show_all").addEventListener("click", function () {
    todo.load();
  });
  document.getElementById("show_done").addEventListener("click", function () {
    todo.show(0);
  });
  document.getElementById("show_done").addEventListener("click", function () {
    todo.show(1);
  });
  

  document.getElementById("todo-form").addEventListener("submit", function (evt) {
    evt.preventDefault();
    todo.add();
  });
  todo.load();
});