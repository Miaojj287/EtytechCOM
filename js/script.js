// ==========================================
// Mobile Navigation Toggle
// ==========================================
let isActive = false;
function toggle() {
  if (isActive) {
    document.querySelector('.right_nav').className = 'right_nav';
    document.querySelector('.shadow').className = 'shadow';
    document.querySelector('.mobile_nav').className = 'mobile_nav';
    isActive = false;
  } else {
    document.querySelector('.right_nav').className = 'right_nav active';
    document.querySelector('.shadow').className = 'shadow active';
    document.querySelector('.mobile_nav').className = 'mobile_nav active';
    isActive = true;
  }
}

// ==========================================
// Single Page Application Router
// ==========================================
let currentPage = 'home';
const pageTransitionDuration = 600; // ms

function navigateTo(pageName, event) {
  if (event) {
    event.preventDefault();
  }
  
  // 如果已经在当前页面，不做任何操作
  if (currentPage === pageName) {
    return;
  }

  // 开始页面切换动画
  const currentPageElement = document.getElementById(`${currentPage}-page`);
  const nextPageElement = document.getElementById(`${pageName}-page`);
  
  if (!nextPageElement) {
    console.error(`Page ${pageName} not found`);
    return;
  }

  // 更新导航状态
  updateNavigation(pageName);
  
  // 执行页面切换动画
  performPageTransition(currentPageElement, nextPageElement);
  
  // 更新当前页面
  currentPage = pageName;
  
  // 更新浏览器历史记录 - 使用真实路径而不是hash
  const path = pageName === 'home' ? '/' : `/${pageName}`;
  history.pushState({ page: pageName }, '', path);
  
  // 更新页面标题
  updatePageTitle(pageName);
  
  // 滚动到顶部
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 100);
}

function performPageTransition(currentPageElement, nextPageElement) {
  // 添加过渡效果类
  currentPageElement.classList.add('page-exit');
  
  setTimeout(() => {
    currentPageElement.classList.remove('active', 'page-exit');
    nextPageElement.classList.add('page-enter');
    
    setTimeout(() => {
      nextPageElement.classList.add('active');
      nextPageElement.classList.remove('page-enter');
      
      // 重新初始化页面的滚动观察器
      initializePageObservers();
    }, 50);
  }, pageTransitionDuration);
}

function updateNavigation(pageName) {
  // 更新桌面导航
  document.querySelectorAll('.center_nav a').forEach(link => {
    if (link.getAttribute('data-page') === pageName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  // 更新移动导航
  document.querySelectorAll('.mobile_nav a').forEach(link => {
    if (link.getAttribute('data-page') === pageName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function updatePageTitle(pageName) {
  const titles = {
    'home': 'Etytech Studio - Industry Intelligence Promoter',
    'product': 'Product - Etytech Studio',
    'service': 'Service - Etytech Studio',
    'about': 'About Us - Etytech Studio'
  };
  
  document.title = titles[pageName] || titles['home'];
}

// ==========================================
// Browser History Navigation
// ==========================================
window.addEventListener('popstate', (event) => {
  if (event.state && event.state.page) {
    const pageName = event.state.page;
    const currentPageElement = document.getElementById(`${currentPage}-page`);
    const nextPageElement = document.getElementById(`${pageName}-page`);
    
    updateNavigation(pageName);
    performPageTransition(currentPageElement, nextPageElement);
    currentPage = pageName;
    updatePageTitle(pageName);
  }
});

// ==========================================
// Intersection Observer for Scroll Effects
// ==========================================
function initializePageObservers() {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (section) {
      if (section.isIntersecting) {
        section.target.classList.add('active');
      }
    });
  }, { threshold: 0.3 });
  
  // 只观察当前激活页面的 sections
  const activePage = document.querySelector('.page-content.active');
  if (activePage) {
    activePage.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
  }
}

// ==========================================
// Header Hide/Show on Scroll
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
  let lastScrollTop = 0;
  const header = document.querySelector('header');
  const rightNavButton = document.querySelector('.right_nav');

  window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // 向下滚动
      header.classList.add('hidden');
      rightNavButton.classList.add('hidden');
    } else {
      // 向上滚动
      header.classList.remove('hidden');
      rightNavButton.classList.remove('hidden');
    }
    lastScrollTop = scrollTop;
  });
  
  // 初始化路由
  initializeRouter();
  
  // 初始化观察器
  initializePageObservers();
  
  // 初始化产品页面特效
  initializeProductPageEffects();
});

// ==========================================
// Router Initialization
// ==========================================
function initializeRouter() {
  // 检查是否从 404.html 重定向过来（GitHub Pages SPA 支持）
  const redirectPath = sessionStorage.getItem('redirect');
  if (redirectPath) {
    sessionStorage.removeItem('redirect');
    // 使用重定向的路径
    const cleanPath = redirectPath.replace(/^\//, '').replace(/\.html$/, '').split('?')[0].split('#')[0];
    const validPages = ['home', 'product', 'service', 'about'];
    if (validPages.includes(cleanPath)) {
      // 先隐藏home页面
      document.getElementById('home-page').classList.remove('active');
      // 显示目标页面
      const targetPage = document.getElementById(`${cleanPath}-page`);
      if (targetPage) {
        targetPage.classList.add('active');
        currentPage = cleanPath;
        updateNavigation(cleanPath);
        updatePageTitle(cleanPath);
        
        // 更新历史记录
        const newPath = cleanPath === 'home' ? '/' : `/${cleanPath}`;
        history.replaceState({ page: cleanPath }, '', newPath);
      }
      return;
    }
  }
  
  // 正常的路由初始化逻辑
  const path = window.location.pathname;
  let initialPage = 'home';
  
  // 解析路径来确定页面
  if (path === '/' || path === '/index.html' || path === '') {
    initialPage = 'home';
  } else {
    // 移除开头的斜杠和可能的 .html 扩展名
    const cleanPath = path.replace(/^\//, '').replace(/\.html$/, '');
    
    // 检查页面是否存在
    const validPages = ['home', 'product', 'service', 'about'];
    if (validPages.includes(cleanPath)) {
      initialPage = cleanPath;
    }
  }
  
  // 如果不是home页面，导航到指定页面
  if (initialPage !== 'home') {
    // 先隐藏home页面
    document.getElementById('home-page').classList.remove('active');
    // 显示目标页面
    const targetPage = document.getElementById(`${initialPage}-page`);
    if (targetPage) {
      targetPage.classList.add('active');
      currentPage = initialPage;
      updateNavigation(initialPage);
      updatePageTitle(initialPage);
      
      // 更新历史记录
      const newPath = initialPage === 'home' ? '/' : `/${initialPage}`;
      history.replaceState({ page: initialPage }, '', newPath);
    }
  } else {
    // 设置初始历史状态
    history.replaceState({ page: 'home' }, '', '/');
  }
}

// ==========================================
// Product Page Special Effects
// ==========================================
function initializeProductPageEffects() {
  // Title fade effect
  const titleSections = document.querySelectorAll('.module-title-section');
  const contentSections = document.querySelectorAll('.content-section');
  
  // Intersection Observer for title fade
  const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio < 0.2) {
        entry.target.classList.add('fade-out');
      } else {
        entry.target.classList.remove('fade-out');
      }
    });
  }, {
    threshold: [0, 0.2, 0.5, 1]
  });
  
  titleSections.forEach(section => {
    titleObserver.observe(section);
  });
  
  // Intersection Observer for content sections
  const contentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Trigger feature animations
        const features = entry.target.querySelectorAll('.feature-item');
        features.forEach((feature, index) => {
          setTimeout(() => {
            feature.style.animationPlayState = 'running';
          }, index * 100);
        });
      }
    });
  }, {
    threshold: 0.3
  });
  
  contentSections.forEach(section => {
    contentObserver.observe(section);
  });
  
  // Image carousel interaction for Cherry Studio
  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImage = document.querySelector('.main-image img');
  
  if (mainImage) {
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', function() {
        const tempSrc = mainImage.src;
        mainImage.src = this.src;
        this.src = tempSrc;
        
        // Add transition effect
        mainImage.style.opacity = '0';
        setTimeout(() => {
          mainImage.style.opacity = '1';
        }, 100);
      });
    });
  }
  
  // Parallax effect for product numbers
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const productNumbers = document.querySelectorAll('.product-number');
    
    productNumbers.forEach(number => {
      const rate = scrolled * -0.3;
      number.style.transform = `translateY(${rate}px)`;
    });
  });
  
  // Smooth scroll for scroll indicators
  const scrollIndicators = document.querySelectorAll('.scroll-indicator');
  scrollIndicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      const parentSection = indicator.closest('section');
      const nextSection = parentSection.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ==========================================
// Page Loading Animation
// ==========================================
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
  
  // 为首页的sections添加stagger动画
  const homeSections = document.querySelectorAll('#home-page section');
  homeSections.forEach((section, index) => {
    setTimeout(() => {
      section.classList.add('active');
    }, index * 200);
  });
});

// ==========================================
// Smooth Scroll for Internal Links
// ==========================================
document.addEventListener('click', function(e) {
  // 处理页面导航链接
  const target = e.target.closest('a');
  if (target) {
    const href = target.getAttribute('href');
    
    // 检查是否是内部页面导航链接
    if (href && (href.startsWith('#') || href.startsWith('/'))) {
      const validPages = ['home', 'product', 'service', 'about'];
      let pageName = '';
      
      if (href.startsWith('#')) {
        pageName = href.substring(1);
      } else if (href.startsWith('/')) {
        pageName = href.substring(1) || 'home';
      }
      
      if (validPages.includes(pageName)) {
        e.preventDefault();
        navigateTo(pageName, e);
      }
    }
  }
});

// ==========================================
// Utility Functions
// ==========================================

// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 节流函数
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 平滑滚动到元素
function smoothScrollTo(element, duration = 800) {
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// 导出到全局作用域供HTML使用
window.navigateTo = navigateTo;
window.toggle = toggle;
