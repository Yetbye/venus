// 浮世绘风格网站 - 优雅自然的交互效果
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initNavbarScroll();
  initMobileMenu();
  initScrollAnimations();
  initFAQ();
  initSakuraFall();
  initWaveAnimation();
  initActiveNav();
  initStaggerAnimations();
  initParallaxEffect();
  initHoverEffects();
  initCounterAnimation();
});

// 平滑滚动导航
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.offsetTop - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// 导航栏滚动效果
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // 隐藏/显示导航栏
    if (currentScroll > lastScroll && currentScroll > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
  });
}

// 移动端菜单
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  
  if (!toggle || !menu) return;
  
  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
  
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      toggle.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
}

// 滚动入场动画 - 增强版
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // 添加延迟，创造stagger效果
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * 100);
      }
    });
  }, observerOptions);
  
  const animatedElements = document.querySelectorAll(
    '.feature-card, .gallery-item, .scenario-card, .testimonial-card, .pricing-card, .data-card, .faq-item, .service-item'
  );
  
  animatedElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
}

// Stagger动画 - 为网格元素添加顺序动画
function initStaggerAnimations() {
  const grids = document.querySelectorAll('.features-grid, .gallery-grid, .scenarios-grid, .pricing-grid, .testimonials-grid');
  
  grids.forEach(grid => {
    const items = grid.children;
    Array.from(items).forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.1}s`;
    });
  });
}

// FAQ手风琴 - 增强版
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');
      const answer = item.querySelector('.faq-answer');
      
      // 关闭所有
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        const ans = i.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
      });
      
      // 打开当前
      if (!isActive) {
        item.classList.add('active');
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      }
    });
  });
}

// 樱花飘落动画 - 增强版
function initSakuraFall() {
  const container = document.querySelector('.sakura-container');
  if (!container) return;
  
  const petals = container.querySelectorAll('.sakura-petal');
  petals.forEach((petal, index) => {
    // 随机化动画参数
    const delay = Math.random() * 5;
    const duration = 8 + Math.random() * 4;
    const left = Math.random() * 100;
    
    petal.style.animationDelay = `${delay}s`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.left = `${left}%`;
  });
}

// 波浪流动动画
function initWaveAnimation() {
  const waves = document.querySelectorAll('.wave-image');
  waves.forEach((wave, index) => {
    wave.style.animationDelay = `${index * 0.3}s`;
  });
}

// 导航激活状态
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// 视差滚动效果
function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll('.hero-wave, .ukiyo-bg');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    parallaxElements.forEach(el => {
      const speed = 0.5;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// 悬停效果增强
function initHoverEffects() {
  // 卡片悬停效果
  const cards = document.querySelectorAll('.feature-card, .gallery-item, .scenario-card, .pricing-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
      card.style.boxShadow = '0 12px 40px rgba(44, 62, 80, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });
  
  // 图片悬停缩放
  const images = document.querySelectorAll('.feature-icon, .gallery-visual img, .scenario-visual img');
  
  images.forEach(img => {
    const parent = img.closest('.feature-visual, .gallery-visual, .scenario-visual');
    if (parent) {
      parent.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.08)';
      });
      
      parent.addEventListener('mouseleave', () => {
        img.style.transform = '';
      });
    }
  });
  
  // 按钮磁吸效果
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// 数字计数动画
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number, .data-number');
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const text = counter.textContent;
        
        // 检查是否包含数字
        if (/\d/.test(text)) {
          animateCounter(counter, text);
        }
        
        observer.unobserve(counter);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, finalText) {
  // 提取数字部分
  const numMatch = finalText.match(/[\d.]+/);
  if (!numMatch) return;
  
  const finalNum = parseFloat(numMatch[0]);
  const isDecimal = finalText.includes('.');
  const duration = 2000;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // 使用easeOutQuart缓动
    const easeProgress = 1 - Math.pow(1 - progress, 4);
    const currentNum = finalNum * easeProgress;
    
    let displayNum;
    if (isDecimal) {
      displayNum = currentNum.toFixed(2);
    } else {
      displayNum = Math.floor(currentNum);
    }
    
    element.textContent = finalText.replace(numMatch[0], displayNum);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = finalText;
    }
  }
  
  requestAnimationFrame(update);
}

// 页面加载完成后的初始动画
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Hero区域元素依次入场
  const heroElements = document.querySelectorAll('.hero-tag, .hero-title, .hero-description, .hero-actions');
  heroElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 300 + index * 150);
  });
});
