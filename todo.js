// 다크모드 지원 기능 추가 
// 로컬 스토지 활ㅛ 할ㅣ 목ㅗ 저ㅇ
// 사용ㅏ가 추, 삭ㅔ 할 수 있ㅡ 인ㅓㅔ이스
// 반ㅡ형 디자ㄴ 적ㅛ

document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle'); // 토글 버튼 선택
    const moonIcon = document.querySelector('.fa-moon'); // 달 아이콘 선택
    const sunIcon = document.querySelector('.fa-sun'); // 해 아이콘 선택

    // 로컬 스토리지에서 다크 모드 설정을 불러와 적용하는 함수
    function applyInitialTheme() {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        document.body.classList.toggle('dark-mode', isDarkMode);
        darkModeToggle.checked = isDarkMode;
        // 다크 모드 상태에 따라 아이콘의 opacity 조정
        moonIcon.style.opacity = isDarkMode ? "1" : "0";
        sunIcon.style.opacity = isDarkMode ? "0" : "1";
    }

    // 다크 모드 상태를 토글하고 로컬 스토리지에 저장하는 함수
    function toggleDarkMode() {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        // 다크 모드가 활성화되면 달 아이콘을 보이게, 해 아이콘을 숨김
        moonIcon.style.opacity = isDarkMode ? "1" : "0";
        sunIcon.style.opacity = isDarkMode ? "0" : "1";
    }

    // 페이지 로드 시 초기 다크 모드 설정 적용
    applyInitialTheme();

    // 토글 버튼에 클릭 이벤트 리스너 추가
    darkModeToggle.addEventListener('change', toggleDarkMode);
});