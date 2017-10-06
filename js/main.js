// Add tasks to the list

var todoForm = document.getElementById("#addTodo");
var taskInput = document.querySelector("#taskInput");
var taskCard = document.querySelector(".card");
var savedList;

function main() {
	if (load())
		renderSavedList();
	else
		savedList = [];
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



function renderSavedList() {
	var cardBlock = document.querySelector(".todoList");
	cardBlock.innerHTML = "";
	// loop i
	for (i=0;i<savedList.length;i++) { 

		// create li and the task and icons for done/delete
		var taskCard = document.createElement("li");
		var taskTitle = document.createElement("div");
		var actionBlock = document.createElement("div");
		var doneSVG = '<svg width="24px" height="24px" viewBox="0 0 24 24"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="ListBlock" transform="translate(-252.000000, -260.000000)" fill-rule="nonzero" fill="#E4E0D5"><g id="Shape"><path d="M264,260 C257.369863,260 252,265.369863 252,272 C252,278.630137 257.369863,284 264,284 C270.630137,284 276,278.630137 276,272 C276,265.369863 270.630137,260 264,260 Z M268.383562,268.136986 C269.506849,268.109589 270.082192,269.479452 269.287671,270.273973 L263.479452,276.082192 C263.123288,276.438356 262.520548,276.438356 262.164384,276.082192 L259.232877,273.09589 C258.027397,271.917808 259.808219,270.136986 260.986301,271.342466 L262.630137,272.986301 C262.739726,273.09589 262.958904,273.09589 263.068493,272.986301 L267.561644,268.493151 C267.753425,268.273973 268.054795,268.136986 268.383562,268.136986 L268.383562,268.136986 Z"></path></g></g></g></svg>';
		var deleteSVG = '<svg width="24px" height="24px" viewBox="0 0 24 24"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="ListBlock" transform="translate(-220.000000, -260.000000)" fill-rule="nonzero" fill="#E6E1D5"><g id="Shape"><path d="M232,260 C238.607792,260 244,265.392208 244,272 C244,278.607792 238.607792,284 232,284 C225.392208,284 220,278.607792 220,272 C220,265.392208 225.392208,260 232,260 Z M234.295255,268.297834 L232.003323,270.587868 L229.711391,268.297834 C229.459472,268.042303 229.089743,267.941403 228.742797,268.033504 C228.395852,268.125604 228.124997,268.396553 228.03323,268.743319 C227.941462,269.090086 228.042881,269.45939 228.298921,269.710799 L230.590853,271.999168 L228.298921,274.289201 C228.042881,274.54061 227.941462,274.909914 228.03323,275.256681 C228.124997,275.603447 228.395852,275.874396 228.742797,275.966496 C229.089743,276.058597 229.459472,275.957697 229.711391,275.702166 L232.003323,273.410468 L234.295255,275.700501 C234.686667,276.084833 235.315021,276.081914 235.702838,275.693961 C236.090655,275.306008 236.092837,274.678172 235.707725,274.287537 L233.415793,271.999168 L235.707725,269.709134 C236.097425,269.319273 236.097425,268.687696 235.707725,268.297834 C235.31754,267.908458 234.68544,267.908458 234.295255,268.297834 Z"></path></g></g></g></svg>';
				
		// add tasks
 		cardBlock.appendChild(taskCard).classList.add("taskCard");
 		taskCard.appendChild(taskTitle).classList.add("taskTitle");
		taskTitle.innerHTML = savedList[i];

		// add Icons
		var doneIcon = document.createElement("div", {"class": "doneIcon",});
		var deleteIcon = document.createElement("div", {"class": "deleteIcon",});

		taskCard.appendChild(actionBlock).classList.add("actionBlock");
		actionBlock.appendChild(doneIcon).classList.add("doneIcon");
		actionBlock.appendChild(deleteIcon).classList.add("deleteIcon");
		
		doneIcon.innerHTML = doneSVG;
		deleteIcon.innerHTML = deleteSVG;


		// Mark tasks as done
		doneIcon.addEventListener('click', function onEvent(event) {
			this.closest(".taskCard").classList.add("completed");
			var completeText = document.createElement("span");
			this.closest(".actionBlock").appendChild(completeText).classList.add("completed");
			completeText.innerHTML = "Completed";
			console.log("done");

		}); 


		// delete tasks
		deleteIcon.addEventListener('click', function onEvent(event) {
			this.closest(".taskCard").classList.add("completed");
			
			console.log("deleted");

		}); 
	}
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

		// Add the input value in the inputArray
		savedList.push(taskInput.value);
		save();
		
		// check if task input has value, if it does, add it to the tasklist

			if (taskInput && taskInput.value) {
				renderSavedList();
	
				// clear input field once added to the list
				taskInput.value = "";
			} 

			// if task input has no value, show error notification
			else {
				errorMsg.classList.add("show");
			}
    }

});
