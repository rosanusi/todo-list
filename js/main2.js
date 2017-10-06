// Add tasks to the list

var todoForm = document.getElementById("#addTodo");
var taskInput = document.querySelector("#taskInput");
var taskCard = document.querySelector(".card");
var savedList;

function main() {
	if (load()) {
		renderSavedList();
	}
	else {
		savedList = [];
	}
}


main();



function save() {
	console.log("save");
	// save array in local storage
	localStorage["inputArray"] = JSON.stringify(savedList);
}




function load() {
	if(!localStorage["inputArray"])
		return false;
// retrive Array
	savedList = JSON.parse(localStorage["inputArray"]);
	return true;


}






// Add item to the list

taskInput.addEventListener('keydown', function onEvent(event) {

	var errorMsg = document.querySelector(".inputError");


	// if error message on input field, remove it as user presses.
	errorMsg.classList.remove("show");

	//check if enter key was pressed
	
	if (event.key === "Enter") {

		// prevent defualt behaviour
		event.preventDefault(); 
		
		// check if task input has value, if it does, add it to the tasklist

		if (taskInput && taskInput.value) {
			// Add the input value in the inputArray
			savedList.unshift({
				task: taskInput.value,
				status: "uncomplete",
				list: "todo"
			});
			
			//location.reload();
			renderSavedList();
			save();

			// clear input field once added to the list
			taskInput.value = "";
		} 

		// if task input has no value, show error notification
		else {
			errorMsg.classList.add("show");
		}
    }

});


// Render Saved tasks on the screen

function renderSavedList() {




	var cardBlock = document.querySelector(".todoList");
	var doneBlock = document.querySelector(".doneList");
	cardBlock.innerHTML = "";
	doneBlock.innerHTML = "";




	// loop i
	savedList.forEach(function(task, i) {

		// create li and the task and icons for done/delete
		var taskCard = document.createElement("li");
		var taskTitle = document.createElement("div");
		var actionBlock = document.createElement("div");
		var doneSVG = '<svg width="16px" height="12px" viewBox="0 0 16 12"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="ListBlock" transform="translate(-259.000000, -268.000000)" fill-rule="nonzero" fill="#E6E8EC"><g id="Shape"><path d="M273.118543,268.000591 C274.778778,267.96056 275.629143,269.962129 274.45483,271.12304 L265.870197,279.609694 C265.343781,280.130102 264.452923,280.130102 263.926507,279.609694 L259.593697,275.246273 C257.811981,273.524923 260.444062,270.922883 262.185284,272.684264 L264.614897,275.086147 C264.776872,275.246273 265.10082,275.246273 265.262794,275.086147 L271.903736,268.520999 C272.187191,268.200748 272.63262,268.000591 273.118543,268.000591 L273.118543,268.000591 Z"></path></g></g></g></svg>';
		var deleteSVG = '<svg width="12px" height="12px" viewBox="0 0 12 12"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="ListBlock" transform="translate(-228.000000, -268.000000)" fill-rule="nonzero" fill="#E6E8EC"><g id="Shape"><path d="M237.442883,268.446752 L234.004985,271.881802 L230.567086,268.446752 C230.189208,268.063455 229.634614,267.912105 229.114196,268.050255 C228.593778,268.188406 228.187496,268.59483 228.049844,269.114979 C227.912193,269.635129 228.064322,270.189085 228.448382,270.566198 L231.88628,273.998752 L228.448382,277.433802 C228.064322,277.810915 227.912193,278.364871 228.049844,278.885021 C228.187496,279.40517 228.593778,279.811594 229.114196,279.949745 C229.634614,280.087895 230.189208,279.936545 230.567086,279.553248 L234.004985,276.115701 L237.442883,279.550752 C238.030001,280.12725 238.972531,280.12287 239.554257,279.540941 C240.135983,278.959012 240.139256,278.017257 239.561588,277.431306 L236.12369,273.998752 L239.561588,270.563701 C240.146137,269.978909 240.146137,269.031544 239.561588,268.446752 C238.976311,267.862687 238.02816,267.862687 237.442883,268.446752 Z"></path></g></g></g></svg>';
				
		// add tasks
		if (task.list == "todo") {
	 		cardBlock.appendChild(taskCard).classList.add("taskCard");
	 		taskCard.appendChild(taskTitle).classList.add("taskTitle");
			taskTitle.innerHTML = task.task;
		} 

		if (task.list == "archive") {
			document.querySelector(".archiveBlock").classList.add("display");
			doneBlock.appendChild(taskCard).classList.add("taskCard");
	 		taskCard.appendChild(taskTitle).classList.add("taskTitle");
			taskTitle.innerHTML = task.task;
		}

		// add Icons
		var deleteIcon = document.createElement("div", {"class": "deleteIcon",});
		var doneIcon = document.createElement("div", {"class": "doneIcon",});
		taskCard.appendChild(actionBlock).classList.add("actionBlock");
		actionBlock.appendChild(deleteIcon).classList.add("deleteIcon");
		actionBlock.appendChild(doneIcon).classList.add("doneIcon");
		deleteIcon.innerHTML = deleteSVG;
		doneIcon.innerHTML = doneSVG;

		// check if task has a complete status.

		if (task.status == "complete") {

			taskCard.classList.add("completed");
			var completeText = document.createElement("span");
			doneIcon.closest(".actionBlock").appendChild(completeText).classList.add("completedText");
			completeText.innerHTML = "Completed";
		}


		// Mark tasks as done
		doneIcon.addEventListener('click', function onEvent(event) {

			//update the status for completed tasks
			task.status = "complete";
			task.list = "archive";
			save();
			console.log(savedList);

			taskCard.classList.add("completed");
			var completeText = document.createElement("span");
			doneIcon.closest(".actionBlock").appendChild(completeText).classList.add("completedText");
			completeText.innerHTML = "Completed";
			console.log("done");

			
			// Show notification
			var notification = document.querySelector(".notification");
			notification.classList.add("success");
			notification.innerHTML = "Well done! the task is succssfully added to the archive.";
			notification.classList.add("display");
			setTimeout(function(){
		    	notification.classList.remove("display");
		   	}, 2000);


			//Reload to remove from the list
			renderSavedList();

		}); 


		// delete task from stuff
		deleteIcon.addEventListener('click', function onEvent(event) {
			var index = savedList.indexOf(task);
			if (index < 0)
				return;
			savedList.splice(index, 1);
			save();
			renderSavedList();
		});

	});

	// Mark tasks as done
	var clearBtn = document.querySelector(".clearArchive");
	clearBtn.addEventListener('click', function onEvent(event) {


		savedList.forEach(function(task, i) {
			if (task.list === "archive") savedList.splice(i, 1);
		});

		save();
		console.log(savedList);
		document.querySelector(".archiveBlock").classList.remove("display");
		renderSavedList();

	}); 	
}



