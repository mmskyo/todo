// HTML이 로드된 후 실행 using DOMContentLoaded 
document.addEventListener("DOMContentLoaded", function () {
    // 요소 가져오기
    const todoInput = document.getElementById("todo-input");
    const addButton = document.getElementById("add-button");
    const todoList = document.getElementById("todo-list");

    // 할 일 추가 함수
    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === "") return; // 빈 입력 방지

        // 새로운 리스트 아이템 생성
        const li = document.createElement("li");

        // 체크박스 생성
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("todo-checkbox");

        // 체크박스 이벤트 (체크하면 줄 긋기)
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                li.style.textDecoration = "line-through";
            } else {
                li.style.textDecoration = "none";
            }
        });

        // 삭제 버튼 추가
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "삭제";
        deleteButton.classList.add("delete-btn");
        deleteButton.onclick = () => li.remove();

        // 리스트 아이템 구성
        li.appendChild(checkbox);  // 체크박스 추가
        li.appendChild(document.createTextNode(todoText)); // 할 일 텍스트 추가
        li.appendChild(deleteButton); // 삭제 버튼 추가
        todoList.appendChild(li);

        // 입력 필드 비우기
        todoInput.value = "";
    }

    // 이벤트 리스너 추가
    addButton.addEventListener("click", addTodo);
    todoInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTodo();
        }
    });
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