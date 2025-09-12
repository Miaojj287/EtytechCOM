let isActive = false;
function toggle() {
  if (isActive) {
    //disable active
    document.querySelector('.right_nav').className = 'right_nav';
    document.querySelector('.shadow').className = 'shadow';
    document.querySelector('.mobile_nav').className = 'mobile_nav';
    isActive = false;
  } else {
    //activate
    document.querySelector('.right_nav').className = 'right_nav active';
    document.querySelector('.shadow').className = 'shadow active';
    document.querySelector('.mobile_nav').className = 'mobile_nav active';
    isActive = true;
  }
}

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (section) {
      if (section.isIntersecting) {
        // 修复：使用 classList.add 而不是直接覆盖 className
        section.target.classList.add('active');
      }
    });
  }, {threshold: .8});
  
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  document.addEventListener('DOMContentLoaded', function () {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    const rightNavButton = document.querySelector('.right_nav');

    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
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
});

// Product Page Scroll Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Title fade effect
    const titleSection = document.querySelector('.module-title-section');
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
    
    if (titleSection) {
        titleObserver.observe(titleSection);
    }
    
    // Intersection Observer for content sections
    const contentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger feature animations when section is visible
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
    
    // Parallax effect for product numbers
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const productNumbers = document.querySelectorAll('.product-number');
        
        productNumbers.forEach(number => {
            const rate = scrolled * -0.3;
            number.style.transform = `translateY(${rate}px)`;
        });
    });
    
    // Smooth scroll for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const firstContent = document.querySelector('.content-section');
            if (firstContent) {
                firstContent.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});