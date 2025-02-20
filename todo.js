// HTML이 로드된 후 실행 using DOMContentLoaded 
document.addEventListener("DOMContentLoaded", function () {
    // 요소 가져오기
    const todoInput = document.getElementById("todo-input");
    const addButton = document.getElementById("add-button");
    const todoList = document.getElementById("todo-list");

    // 로컬 스토리지에서 데이터 불러오기
    function loadTodos() {
        const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        savedTodos.forEach(todo => renderTodo(todo.text, todo.completed));
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

    // 할 일 화면에 추가
    function renderTodo(todoText, completed = false) {
        const li = document.createElement("li");

        // 체크박스 추가
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("todo-checkbox");
        checkbox.checked = completed;

        // 할 일 텍스트 추가 (span 사용)
        const textSpan = document.createElement("span");
        textSpan.textContent = todoText;
        textSpan.classList.add("todo-text"); // 줄 긋기 적용할 부분

        // 체크박스 이벤트 (줄 긋기)
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                textSpan.style.textDecoration = "line-through"; // 텍스트만 줄 긋기
            } else {
                textSpan.style.textDecoration = "none";
            }
            saveTodos();
        });

        // 삭제 버튼 추가
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "삭제";
        deleteButton.classList.add("delete-btn");
        deleteButton.onclick = function () {
            li.remove();
            saveTodos(); // 삭제 시 저장
        };

        // 리스트에 추가
        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(deleteButton);
        todoList.appendChild(li);

        // 완료된 항목은 줄 긋기
        if (completed) {
            li.style.textDecoration = "line-through";
        }
    }

    // 할 일 추가 함수
    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === "") return;

        renderTodo(todoText); // 화면에 추가
        saveTodos(); // 저장

        todoInput.value = ""; // 입력 필드 초기화
    }

    // 이벤트 리스너 추가
    addButton.addEventListener("click", addTodo);
    todoInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTodo();
        }
    });

    // 페이지 로드 시 기존 할 일 불러오기
    loadTodos();
});

// 다크모드 
document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // 로컬 스토리지에서 다크모드 상태 불러오기
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
    }

    darkModeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        // 현재 상태를 로컬 스토리지에 저장
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });
});