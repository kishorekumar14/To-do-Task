console.log("Welcome to to-do list app. This is file.js");
showTasks();
var n = taskObj.length;
var comp = []
// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addDes = document.getElementById("addDes");
    let addDead = document.getElementById("addDead");
    let tasks = localStorage.getItem("tasks");
    let des = localStorage.getItem("des");
    let dead = localStorage.getItem("dead");
    if (tasks == null) {
        taskObj = [];
        des = []
        dead = []
    } else {
        taskObj = JSON.parse(tasks);
        des = JSON.parse(des);
        dead = JSON.parse(dead);
    }
    window.n += 1;
    updated(window.n);
    taskObj.push(addTxt.value);
    des.push(addDes.value);
    dead.push(addDead.value);

    localStorage.setItem("tasks", JSON.stringify(taskObj));
    localStorage.setItem("des", JSON.stringify(des));
    localStorage.setItem("dead", JSON.stringify(dead));
    addTxt.value = "";
    addDes.value = "";
    addDead.value = "";
    showTasks();
    //console.log(taskObj);
    //console.log(des);
    //console.log(dead);

});

// Function to show elements from localStorage
function showTasks() {
    let tasks = localStorage.getItem("tasks");
    if (tasks == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(tasks);
    }
    let html = "";
    taskObj.forEach(function (element, index) {
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Task ${index + 1}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}"onclick="description(this.id)" class="btn btn-primary">Details</button>
                        <button id="${index}"onclick="completed(this.id)" class="btn btn-primary">Done</button>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete </button>
                    </div>
                </div>`;
    });

    let tasksElm = document.getElementById("tasks");
    if (taskObj.length != 0) {
        tasksElm.innerHTML = html;
    } else {
        tasksElm.innerHTML = `<p>Nothing to show! Use "Add a task" section above to add tasks.</P`;
    }
}

function updated(count) {
    document.getElementById("counter").innerHTML = count;
}
function dec(count) {
    document.getElementById("counter").innerHTML = count;
}

function description(index) {
    let des = localStorage.getItem("des");
    let dead = localStorage.getItem("dead");
    if (des == null) {
        des = [];
        alert("no description provided");
        if (dead == null) {
            dead = [];
            alert("no deadline provided");
        }
    } else {
        des = JSON.parse(des);
        dead = JSON.parse(dead);
        localStorage.setItem("des", JSON.stringify(des));
        localStorage.setItem("dead", JSON.stringify(dead));
        var st = ("Description : " + des[index] + " \n\n" + "Deadline : " + dead[index]);
        alert(st)
    }
}

function completed(index) {
    let tasks = localStorage.getItem("tasks");
    if (tasks == null) {
        taskObj = [];
    }
    else {
        taskObj = JSON.parse(tasks);
    }
    if (n == 0) {
        window.n = 0;
    }
    else {
        window.n -= 1;
    }
    dec(window.n);
    let st = taskObj[index].strike();
    window.comp.push(st);
    taskObj.splice(index, 1, st);
    localStorage.setItem("tasks", JSON.stringify(taskObj));
    showTasks();
}
// Function to delete a note
function deleteNote(index) {
    //console.log("I am deleting", index);

    let tasks = localStorage.getItem("tasks");
    let des = localStorage.getItem("des");
    let dead = localStorage.getItem("dead");
    if (tasks == null) {
        taskObj = [];
        des = [];
        dead = [];
    } else {
        taskObj = JSON.parse(tasks);
        des = JSON.parse(des);
        dead = JSON.parse(dead);
    }
    if (n == 0) {
        window.n = 0;
    }
    else {
        window.n -= 1;
    }
    dec(window.n);
    taskObj.splice(index, 1);
    des.splice(index, 1);
    dead.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(taskObj));
    localStorage.setItem("des", JSON.stringify(des));
    localStorage.setItem("dead", JSON.stringify(dead));
    showTasks();
}

let delRem = document.getElementById("delRem");
delRem.addEventListener("click", function (e) {
    let tasks = localStorage.getItem("tasks");
    if (tasks == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(tasks);
    }
    for (i = 0; i < taskObj.length; i++) {
        if (window.comp.includes(taskObj[i])) {
            window.n += 1;
            deleteNote(i);
        }
    }
    localStorage.setItem("tasks", JSON.stringify(taskObj));
    showTasks();
});

let dltBtn = document.getElementById("dltBtn");
dltBtn.addEventListener("click", function (e) {
    let tasks = localStorage.getItem("tasks");
    if (tasks == null) {
        dltBtn.innerHTML = `Add tasks before you try to delete!`;
    } else {
        localStorage.clear();
    }
    window.n = 0;
    dec(window.n);
    showTasks();
})

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})
