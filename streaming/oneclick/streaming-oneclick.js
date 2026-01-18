document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector('.menu-btn');       
  const sidebar = document.querySelector('.sidebar');        
  const submenuButtons = document.querySelectorAll('.submenu-btn'); 
  const submenus = document.querySelectorAll('.submenu');    
  const area = document.querySelector('.content-area');      
  const buttons = document.querySelectorAll('.sub-list button'); 

  // 0️⃣ 페이지 로드 시 모든 서브메뉴 숨기기
  submenus.forEach(sm => sm.classList.remove("show"));
  submenuButtons.forEach(btn => btn.setAttribute("aria-expanded", false));

  // 1️⃣ 메뉴 버튼 클릭 → 사이드바 열기/닫기
  menuBtn.addEventListener("click", (e) => {
      sidebar.classList.toggle("active");
      e.stopPropagation();

      if (sidebar.classList.contains("active")) {
          submenus.forEach(sm => sm.classList.remove("show"));
          submenuButtons.forEach(btn => btn.setAttribute("aria-expanded", false));
      }
  });

  // 2️⃣ 사이드바 외부 클릭 → 닫기
  document.addEventListener("click", (e) => {
      if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
          sidebar.classList.remove("active");
      }
  });

  // 3️⃣ 서브메뉴 버튼 클릭 → 토글
  submenuButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const submenu = btn.nextElementSibling;

          submenus.forEach(sm => {
              if (sm !== submenu) {
                  sm.classList.remove("show");
                  sm.previousElementSibling.setAttribute("aria-expanded", false);
              }
          });

          const expanded = btn.getAttribute("aria-expanded") === "true";
          btn.setAttribute("aria-expanded", !expanded);
          submenu.classList.toggle("show");
      });
  });
});
