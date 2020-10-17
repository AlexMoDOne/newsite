// fetch('https://jsonplaceholder.typicode.com/posts', {
//   method: 'POST',
//   body: JSON.stringify({
//     title: 'foo',
//     body: 'bar',
//     userId: 1,
//   }),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
// })
//   .then((response) => response.json())
//   .then((json) => {
//     console.log(json);
//     fetch('https://jsonplaceholder.typicode.com/todos/1')
//       .then(response => response.json())
//       .then(json => console.log(json))
//   })

// google.charts.load('current', { 'packages': ['gantt'] });
// google.charts.setOnLoadCallback(drawChart);

// function daysToMilliseconds(days) {
//   return days * 24 * 60 * 60 * 1000;
// }

// function drawChart() {

//   var data = new google.visualization.DataTable();
//   data.addColumn('string', 'Task ID');
//   data.addColumn('string', 'Task Name');
//   data.addColumn('date', 'Start Date');
//   data.addColumn('date', 'End Date');
//   data.addColumn('number', 'Duration');
//   data.addColumn('number', 'Percent Complete');
//   data.addColumn('string', 'Dependencies');

//   data.addRows([
//     ['Research', 'Find sources',
//       new Date(2015, 0, 1), new Date(2015, 0, 5), null, 100, null],
//     ['Write', 'Write paper', new Date(2015, 0, 3), new Date(2015, 0, 4), daysToMilliseconds(1), 10, 'Research'],
//   ]);

//   var options = {

//   };

//   var chart = new google.visualization.Gantt(document.getElementById('gantt-diagramm'));

//   chart.draw(data, options);
// }

// drawChart()


let tasks = [
    {
        id: 'Task 1',
        name: 'Redesign website 1',
        start: '2016-12-8',
        end: '2016-12-31',
        progress: 40,
        dependencies: ''
    },
    {
        id: 'Task 2',
        name: 'Redesign website 2',
        start: '2016-12-20',
        end: '2016-12-25',
        progress: 20,
        dependencies: 'Task 1,'
    },
    {
        id: 'Task 3',
        name: 'Redesign website 3',
        start: '2016-12-29',
        end: '2016-12-31',
        progress: 20,
        dependencies: 'Task 1,Task 2'
    },
    {
        id: 'Task 4',
        name: 'Redesign website 4',
        start: '2016-12-27',
        end: '2016-12-30',
        progress: 90,
        dependencies: 'Task 2'
    },
    {
        id: 'Task 5',
        name: 'Redesign website 4',
        start: '2016-12-20',
        end: '2016-12-25',
        progress: 50,
        dependencies: 'Task 4'
    }
]

var gantt = new Gantt('#gantt', tasks, {
    on_click: function (task) {
    },
    on_date_change: function (task, start, end) {
    },
    on_progress_change: function (task, progress) {
    },
    on_view_change: function (mode) {
    }
});


gantt.change_view_mode('Day')


function initSelectTasks() {
    var select = document.querySelectorAll('select');
    for (index = 0; index < tasks.length; ++index) {
        var option = document.createElement("option");
        option.value = toString(index);
        var text = document.createTextNode(tasks[index].name);
        option.appendChild(text);
        select[0].appendChild(option);
    }

    return select
}

var select = initSelectTasks();
document.addEventListener('DOMContentLoaded', function () {
    var instances = M.FormSelect.init(select, {});
});

var task_edit_select = document.getElementById("task-edit-select");
var index_edit_select = task_edit_select.selectedIndex;
var name_edit = document.getElementById("name-edit");
name_edit.setAttribute("value", tasks[index_edit_select].name);
var end_date = document.getElementById("end-date");
end_date.setAttribute("value", tasks[index_edit_select].end);
var progress_edit = document.getElementById("progress-edit");
progress_edit.setAttribute("value", tasks[index_edit_select].progress);

function changeOption() {
    var selectedOption = task_edit_select.options[task_edit_select.selectedIndex];
    index_edit_select = task_edit_select.selectedIndex;
    name_edit.value = tasks[index_edit_select].name;
    end_date.value = tasks[index_edit_select].end;
    progress_edit.value = tasks[index_edit_select].progress;
}

task_edit_select.addEventListener("change", changeOption);

document.getElementById("closeModal").onclick = function () {
    
    tasks[index_edit_select].name = name_edit.value;
    tasks[index_edit_select].end = end_date.value;
    tasks[index_edit_select].progress = progress_edit.value;
    gantt.refresh(tasks);
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {
        autoClose: true,
        format: "dd.mm.yyyy",
        defaultDate: new Date(tasks[index_edit_select].end),
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
    // tasks[2].name = "Tes"
    // gantt.refresh(tasks);
});


function RandomTask(deps) {
    var start = new Date();
    start.setDate(start.getDate() + 11 + randomInt(2));

    var end = new Date();
    end.setDate(start.getDate() + randomInt(7));

    return {
        start: start,
        end: end,
        name: 'Party',
        id: 'Task ' + tasks.length,
        progress: randomInt(100),
        dependencies: deps
    };

}

function randomInt(limit) {
    return Math.floor(Math.random() * limit);
}


var el = document.querySelectorAll('.tabs')
var instance = M.Tabs.init(el);