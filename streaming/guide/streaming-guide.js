document.addEventListener("DOMContentLoaded", () => {
  // 클릭 후 모든 하위 메뉴 닫기
  function closeAllSubMenus(){
  document.querySelectorAll(".dropdown-panel")
    .forEach(panel => panel.classList.remove("active"));
  document.querySelectorAll(".menu-bar .main-item")
    .forEach(btn => btn.classList.remove("active"));
}

  const menuBtn = document.querySelector('.menu-btn');
  const sidebar = document.querySelector('.sidebar');
  const submenuButtons = document.querySelectorAll('.submenu-btn');
  const submenus = document.querySelectorAll('.submenu');
  const area = document.querySelector('.content-area');
  const buttons = document.querySelectorAll('.sub-list button');

  // 초기 서브메뉴 숨김
  submenus.forEach(sm => sm.classList.remove("show"));
  submenuButtons.forEach(btn => btn.setAttribute("aria-expanded", false));

  // 햄버거 버튼
  menuBtn.addEventListener("click", (e) => {
    sidebar.classList.toggle("active");
    e.stopPropagation(); // 클릭 이벤트 전파 방지
  });

  // 서브메뉴 버튼 토글
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

  // 하위목록 클릭 → 이미지 변경
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      area.innerHTML = '';
      const wrapper = document.createElement('div');
      wrapper.className = 'image-wrapper';

      if (btn.dataset.images) {
        btn.dataset.images.split(',').forEach(file => {
          const img = document.createElement('img');
          img.src = file.trim();
          img.alt = '가이드 이미지';
          wrapper.appendChild(img);
        });
      }

      if (btn.dataset.image) {
        const img = document.createElement('img');
        img.src = btn.dataset.image;
        img.alt = '가이드 이미지';
        wrapper.appendChild(img);
      }

      area.appendChild(wrapper);

      closeAllSubMenus(); // 클릭 후 모든 메뉴 닫기
    });
  });

  // 메인 메뉴 버튼 클릭 → 강조선 & 서브메뉴 토글
  const mainItems = document.querySelectorAll('.menu-bar .main-item');
 mainItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();

    const targetId = item.dataset.target;
    const panel = document.getElementById(targetId);
    const isOpen = panel.classList.contains('active');

    closeAllSubMenus();

    if (!isOpen) {
      panel.classList.add('active');
      item.classList.add('active');
    }
  });
});

  // 외부 클릭 → 사이드바, 메뉴 모두 닫기
  document.addEventListener("click", (e) => {
    // 메뉴 영역 또는 햄버거 버튼 클릭 시 무시
    if (
  e.target.closest(".menu-bar") ||
  e.target.closest(".dropdown-panel") ||
  e.target.closest(".menu-btn") ||
  e.target.closest(".submenu-btn")
) return;

    // 사이드바 닫기
    if (sidebar) sidebar.classList.remove("active");

    // 모든 서브메뉴 닫기
    closeAllSubMenus();
  });

  // 스크롤 시 메뉴바 고정
  const header = document.querySelector('header');
  const menuBar = document.querySelector('.menu-bar');
  const headerHeight = header.offsetHeight;
  const menuStartY = menuBar.offsetTop;

  window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (scrollY >= menuStartY - headerHeight) {
    menuBar.style.position = 'fixed';
    menuBar.style.top = `${headerHeight}px`;
    menuBar.style.left = '0';
    menuBar.style.width = '100%';
    menuBar.style.zIndex = '900';

    document.querySelectorAll('.dropdown-panel.active').forEach(panel => {
      panel.style.position = 'fixed';
      panel.style.top = `${headerHeight + menuBar.offsetHeight}px`;
      panel.style.left = '0';
      panel.style.width = '100%';
      panel.style.zIndex = '850';
    });

  } else {
    menuBar.style.position = 'relative';
    menuBar.style.top = '0';

    document.querySelectorAll('.dropdown-panel').forEach(panel => {
      panel.style.position = 'relative';
      panel.style.top = '0';
    });
  }
});



  /* ===========================
   맨 위로 버튼
=========================== */
const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
  window.addEventListener("scroll", () => {
  const scrollTop =
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;

  if (scrollTop > 200) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
}

});
