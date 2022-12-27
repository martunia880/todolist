let todoInput,
	errorInfo,
	addBtn,
	uList,
	newTodo,
	popUp,
	popUpInfo,
	toDoToEdit,
	popUpInput,
	popUpAddBtn,
	popUpCloseBtn;

const main = () => {
	prepareDoElements();
	prepareDoEvenets();
};

const prepareDoElements = () => {
	todoInput = document.querySelector(".todo-input");
	errorInfo = document.querySelector(".error-info");
	addBtn = document.querySelector(".btn-add");
	uList = document.querySelector(".todolist ul");

	popUp = document.querySelector(".popup");
	popUpInfo = document.querySelector(".popup-info");
	popUpInput = document.querySelector(".popup-input");
	popUpAddBtn = document.querySelector(".accept");
	popUpCloseBtn = document.querySelector(".cancel");
};

const prepareDoEvenets = () => {
	addBtn.addEventListener("click", addNewTask);
	uList.addEventListener("click", checkClick);
	popUpCloseBtn.addEventListener("click", closePopup);
	popUpAddBtn.addEventListener("click", changeTodoText);
	todoInput.addEventListener('keyup', enterKeyCheck)
};

const addNewTask = () => {
	if (todoInput.value !== "") {
		newTodo = document.createElement("li");
		newTodo.textContent = todoInput.value;
		uList.append(newTodo);
		createToolsArea();

		todoInput.value = "";
		errorInfo.textContent = "";
	} else {
		errorInfo.style.color = "tomato";
		errorInfo.textContent = "Wpisz treść zadania!";
	}
};

const createToolsArea = () => {
	const toolsPanel = document.createElement("div");
	toolsPanel.classList.add("tools");
	newTodo.append(toolsPanel);
	const completeBtn = document.createElement("button");
	const editBtn = document.createElement("button");
	const deleteBtn = document.createElement("button");
	completeBtn.classList.add("complete");
	editBtn.classList.add("edit");
	deleteBtn.classList.add("delete");
	completeBtn.innerHTML = '<i class="fas fa-check"></i>';
	editBtn.textContent = "EDIT";
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
	toolsPanel.append(completeBtn, editBtn, deleteBtn);
};
const checkClick = (e) => {
	if (e.target.matches(".complete")) {
		e.target.closest("li").classList.toggle("completed");
		e.target.classList.toggle("completed");
	} else if (e.target.matches(".edit")) {
		editTodo(e);
	} else if (e.target.matches(".delete")) {
		deleteToDo(e);
	}
};
const editTodo = (e) => {
	toDoToEdit = e.target.closest("li");
	popUpInput.value = toDoToEdit.firstChild.textContent;
	popUp.style.display = "flex";
};
const closePopup = () => {
	popUp.style.display = "none";
};
const changeTodoText = () => {
	if (popUpInput.value !== "") {
		toDoToEdit.firstChild.textContent = popUpInput.value;
		popUp.style.display = "none";
		popUpInfo.textContent = "";
	} else {
		popUpInfo.textContent = "Podaj jakąś treść";
		popUpInfo.style.color = "tomato";
	}
};
const deleteToDo = (e) => {
	toDoToDelete = e.target.closest("li");
	toDoToDelete.remove();
	const allTodos =uList.querySelectorAll('li')
	if (allTodos.length ===0) {
		errorInfo.textContent = "Brak zadań na liście"
		errorInfo.style.color = 'grey'
	}
};
const enterKeyCheck = e => {
	if (e.key === 'Enter') {
		addNewTask()
	}
}

document.addEventListener("DOMContentLoaded", main);
