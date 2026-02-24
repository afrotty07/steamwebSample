document.addEventListener('DOMContentLoaded', () => {
  // View Switcher Logic
  const switcherBtns = document.querySelectorAll('.switcher-btn');
  const viewContents = document.querySelectorAll('.view-content');

  switcherBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');

      // Update buttons
      switcherBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update views
      viewContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `${view}-view`) {
          content.classList.add('active');
        }
      });

      // Re-trigger animations for the active view
      triggerAnimations();
    });
  });

  // Entry animations logic
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 50);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  function triggerAnimations() {
    const animElements = document.querySelectorAll('.active .steam-section, .active .steam-card, .active .timeline-step, .active .section-title');
    animElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });
  }

  // Initial trigger
  triggerAnimations();

  // Smooth scroll for grade navigation
  const gradeNavItems = document.querySelectorAll('.grade-nav-item');
  gradeNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Calculate position relative to document
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 140; // Adjusted offset for sticky nav

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Sidebar navigation interactivity
  const sidebarItems = document.querySelectorAll('.sidebar-nav-item');
  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      sidebarItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      // Scroll to top when switching main sidebar categories
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
});
