// 다크모드 지원 기능 추가 
// 로컬 스토지 활ㅛ 할ㅣ 목ㅗ 저ㅇ
// 사용ㅏ가 추, 삭ㅔ 할 수 있ㅡ 인ㅓㅔ이스
// 반ㅡ형 디자ㄴ 적ㅛ
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