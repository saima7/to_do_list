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
    localStorage.list = JSON.stringify(todo.data);
    todo.list();
  },



  list: function () {
    var container = document.getElementById("todo-list");
    container.innerHTML = "";

   
    if (todo.data.length > 0) {
      var row = "", element = "";
      for (var key in todo.data) {
    
        row = document.createElement("div");
        row.classList.add("clearfix");
        row.dataset.id = key;


        element = document.createElement("div");
        element.classList.add("item");
        if (todo.data[key][1] == 1) {
          element.classList.add("done");
        }
        if (todo.data[key][1] == 2) {
          element.classList.add("cancel");
        }
        element.innerHTML = todo.data[key][0];
        row.appendChild(element);


       // Add edit button
       element = document.createElement("input");
       element.setAttribute("type", "button");
       element.value = "edit";
       element.classList.add("btnEdit");
       element.addEventListener("click", function () {
        element.setAttribute("contentEditable", "true");
         todo.status(this, 0);
       });
       row.appendChild(element);



        // Add cancel button
        element = document.createElement("input");
        element.setAttribute("type", "button");
        element.value = "\u2716";
        element.classList.add("bdel");
        element.addEventListener("click", function () {
          todo.status(this, 2);
        });
        row.appendChild(element);

        // Add done button
        element = document.createElement("input");
        element.setAttribute("type", "button");
        element.value = "\u2714";
        element.classList.add("bdone");
        element.addEventListener("click", function () {
          todo.status(this, 1);
        });
        row.appendChild(element);

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

  status: function (element, stat) {
  // todo.status() : update item status

    var parent = element.parentElement;
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

   if (type == 1) {
    
    var container = document.getElementById("todo-list");
    container.innerHTML = "";

   
    if (todo.data.length > 0) {
      var row = "", element = "";
      for (var key in todo.data) {
    
        row = document.createElement("div");
        row.classList.add("clearfix");
        row.dataset.id = key;

        if (todo.data[key][1] == 1) {
          element = document.createElement("div");
          element.classList.add("item");
          element.classList.add("done");
          element.innerHTML = todo.data[key][0];
          row.appendChild(element);
        }
       

        // Add row to list
        container.appendChild(row);
      }
    }
      
    }

    else {
      var container = document.getElementById("todo-list");
      container.innerHTML = "";
  
     
      if (todo.data.length > 0) {
        var row = "", element = "";
        for (var key in todo.data) {
      
          row = document.createElement("div");
          row.classList.add("clearfix");
          row.dataset.id = key;
  
          if (todo.data[key][1] == 0) {
            element = document.createElement("div");
            element.classList.add("item");
            element.innerHTML = todo.data[key][0];
            row.appendChild(element);


            // Add edit button
            element = document.createElement("input");
            element.setAttribute("type", "button");
            element.value = "edit";
            element.classList.add("btnEdit");
            element.addEventListener("click", function () {
            todo.status(this, 3);
            });
            row.appendChild(element);



           // Add cancel button
           element = document.createElement("input");
           element.setAttribute("type", "button");
           element.value = "\u2716";
           element.classList.add("bdel");
           element.addEventListener("click", function () {
           todo.status(this, 2);
           });
           row.appendChild(element);

           // Add done button
           element = document.createElement("input");
           element.setAttribute("type", "button");
           element.value = "\u2714";
           element.classList.add("bdone");
           element.addEventListener("click", function () {
           todo.status(this, 1);
           });
           row.appendChild(element);

            
          }
          // Add row to list
          container.appendChild(row);
        }
      }
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
  document.getElementById("show_todo").addEventListener("click", function () {
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