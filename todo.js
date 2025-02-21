// 현재 날짜를 가져와서 표시
function displayCurrentDate() {
    const dateElement = document.getElementById("current-date");
    if (!dateElement) return; // 요소가 없으면 실행하지 않음

    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = today.toLocaleDateString("ko-KR", options);
}

// HTML이 로드된 후 실행 using DOMContentLoaded 
document.addEventListener("DOMContentLoaded", function () {
    displayCurrentDate();

    // 요소 가져오기
    const todoInput = document.getElementById("todo-input");
    const addButton = document.getElementById("add-button");
    const todoList = document.getElementById("todo-list");
    const darkModeToggle = document.getElementById("dark-mode-toggle"); 
    // 필터 버튼 이벤트 리스너 추가
    document.getElementById("filter-all").addEventListener("click", () => filterTodos("all"));
    document.getElementById("filter-active").addEventListener("click", () => filterTodos("active"));
    document.getElementById("filter-completed").addEventListener("click", () => filterTodos("completed"));

    // 필터링 전체-완료-미완료
    function filterTodos(filterType) {
        const todos = document.querySelectorAll("#todo-list li");

        todos.forEach(todo => {
            const isCompleted = todo.querySelector(".todo-checkbox").checked;

            if (filterType === "all") {
                todo.style.display = "flex";
            } else if (filterType === "active" && isCompleted) {
                todo.style.display = "none";
            } else if (filterType === "completed" && !isCompleted) {
                todo.style.display = "none";
            } else {
                todo.style.display = "flex";
            }
        });

        // 버튼 활성화 스타일 변경
        document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
        document.getElementById(`filter-${filterType}`).classList.add("active");
    }

    // 로컬 스토리지에 데이터 저장하기
    function saveTodos() {
        const todos = [];
        document.querySelectorAll("#todo-list li").forEach(li => {
            todos.push({
                text: li.querySelector("span").textContent,
                completed: li.querySelector(".todo-checkbox").checked
            });
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    // 순서 변경 함수 
    function addDragAndDrop() {
        const items = document.querySelectorAll("#todo-list li");
    
        items.forEach(item => {
            item.draggable = true;
    
            item.addEventListener("dragstart", function (event) {
                event.dataTransfer.setData("text/plain", itemsIndex(item));
                item.classList.add("dragging");
            });
    
            item.addEventListener("dragover", function (event) {
                event.preventDefault();
                const draggingItem = document.querySelector(".dragging");
                const afterElement = getDragAfterElement(event.clientY);
    
                if (afterElement == null) {
                    todoList.appendChild(draggingItem);
                } else {
                    todoList.insertBefore(draggingItem, afterElement);
                }
            });
    
            item.addEventListener("drop", function () {
                document.querySelector(".dragging").classList.remove("dragging");
                saveTodos(); // 변경된 순서 저장
            });
    
            item.addEventListener("dragend", function () {
                item.classList.remove("dragging");
            });
        });
    }

    // 요소를 드래그 가능하도록 설정하는 함수
    function makeDraggable(item) {
        item.draggable = true;

        item.addEventListener("dragstart", function (event) {
            event.dataTransfer.setData("text/plain", itemsIndex(item));
            item.classList.add("dragging");
        });

        item.addEventListener("dragover", function (event) {
            event.preventDefault();
            const draggingItem = document.querySelector(".dragging");
            const afterElement = getDragAfterElement(event.clientY);

            if (afterElement == null) {
                todoList.appendChild(draggingItem);
            } else {
                todoList.insertBefore(draggingItem, afterElement);
            }
        });

        item.addEventListener("drop", function () {
            document.querySelector(".dragging").classList.remove("dragging");
            saveTodos(); // 변경된 순서 저장
        });

        item.addEventListener("dragend", function () {
            item.classList.remove("dragging");
        });
    }

    
    // 현재 항목이 리스트에서 몇 번째인지 찾는 함수
    function itemsIndex(item) {
        return Array.from(todoList.children).indexOf(item);
    }
    
    // 드래그 중 마우스 위치를 기준으로 삽입할 위치 찾기
    function getDragAfterElement(y) {
        const draggableElements = [...document.querySelectorAll("#todo-list li:not(.dragging)")];
    
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
    
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
    
    // 기존 loadTodos() 함수 안에서 드래그 기능 추가
    function loadTodos() {
        const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        savedTodos.forEach(todo => renderTodo(todo.text, todo.completed));
        addDragAndDrop();
    }
    
    // 기존 renderTodo() 함수의 마지막에 드래그 기능 추가
    function renderTodo(todoText, completed = false) {
        const li = document.createElement("li");
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("todo-checkbox");
        checkbox.checked = completed;
    
        const textSpan = document.createElement("span");
        textSpan.textContent = todoText;
        textSpan.classList.add("todo-text");
    
        checkbox.addEventListener("change", function () {
            textSpan.style.textDecoration = checkbox.checked ? "line-through" : "none";
            saveTodos();
        });
    
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "삭제";
        deleteButton.classList.add("delete-btn");
        deleteButton.onclick = function () {
            li.remove();
            saveTodos();
        };
    
        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    
        if (completed) {
            textSpan.style.textDecoration = "line-through";
        }
    
        addDragAndDrop(); // 추가된 항목도 드래그 가능하도록 설정
    }    
    // 완료된 할 일 스타일을 적용하는 함수
    function toggleComplete(event) {
        const listItem = event.target.closest("li"); // 해당 체크박스가 속한 <li> 찾기
        listItem.classList.toggle("completed"); // 'completed' 클래스 추가/제거
    }

    // 할 일 추가 함수에서 이벤트 리스너 연결
    function addTodo(text) {
        const todoList = document.getElementById("todo-list");

        const listItem = document.createElement("li");

        // 체크박스 생성
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("todo-checkbox");
        checkbox.addEventListener("change", toggleComplete); // 체크 이벤트 추가

        // 텍스트 추가
        const span = document.createElement("span");
        span.textContent = text;

        // 삭제 버튼 추가
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "삭제";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", function () {
            listItem.classList.add("fade-out");
            setTimeout(() => listItem.remove(), 300);
        });

        // 리스트 아이템에 요소 추가
        listItem.appendChild(checkbox);
        listItem.appendChild(span);
        listItem.appendChild(deleteButton);
        listItem.classList.add("fade-in");

        todoList.appendChild(listItem);
    }

    // 할 일 추가 이벤트 리스너
    addButton.addEventListener("click", function () {
        const text = todoInput.value.trim();  // 입력 필드에서 텍스트 가져오기
        if (text !== "") {
            addTodo(text);  // 올바르게 text를 전달
            todoInput.value = ""; // 입력 필드 초기화
        }
    });
    todoInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const text = todoInput.value.trim();
            if (text !== "") {
                addTodo(text);  // 올바르게 text를 전달
                todoInput.value = "";
            }
        }
    });    

    // 페이지 로드 시 기존 할 일 불러오기
    loadTodos();

    // 다크 모드 토글 기능
    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    }

    // 다크 모드 유지
    function loadDarkMode() {
        const isDarkMode = localStorage.getItem("darkMode") === "true";
        if (isDarkMode) {
            document.body.classList.add("dark-mode");
        }
    }

    darkModeToggle.addEventListener("click", toggleDarkMode);
    loadDarkMode();
});