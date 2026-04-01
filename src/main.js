// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Sticky Navbar Logic
  const header = document.querySelector('header');
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Simple parallax effect for floating badges
  const badges = document.querySelectorAll('.floating-badge');
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    badges.forEach((badge, index) => {
      const factor = (index + 1) * 0.5;
      badge.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });

  // Scroll Reveal Observer
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Trigger terminal animations if this is the terminal section
        if (entry.target.querySelector('.terminal-container')) {
          startTerminalAnimation(entry.target);
        }
      }
    });
  }, { threshold: 0.1 });

  function startTerminalAnimation(container) {
    if (container.dataset.animating === 'true') return;
    container.dataset.animating = 'true';

    const lines = container.querySelectorAll('.terminal-line');
    const progress = container.querySelector('.terminal-progress');
    
    function runSequence() {
      // Reset state
      lines.forEach(line => {
        line.classList.add('opacity-0');
        line.classList.remove('animate-typewriter');
      });
      if (progress) {
        progress.style.transition = 'none';
        progress.style.width = '0%';
      }

      // Force reflow
      void (progress ? progress.offsetWidth : 0);

      // Start sequence
      lines.forEach((line, index) => {
        const delay = parseInt(line.getAttribute('data-delay')) || 0;
        setTimeout(() => {
          line.classList.remove('opacity-0');
          line.classList.add('animate-typewriter');
          
          // If it's the last line, animate the progress bar
          if (line.querySelector('.terminal-progress')) {
            setTimeout(() => {
              if (progress) {
                progress.style.transition = 'width 2s cubic-bezier(0.65, 0, 0.35, 1)';
                progress.style.width = '100%';
              }
              
              // Wait for 3 seconds after completion, then repeat
              setTimeout(runSequence, 3000);
            }, 500);
          }
        }, delay);
      });
    }

    runSequence();
  }

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Dropdown Toggle Logic
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.nav-item.has-dropdown');
    
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        // Toggle dropdown on click for all devices if it's a touch interaction
        // or on smaller screens where hover isn't reliable
        if (window.innerWidth < 1024 || ('ontouchstart' in window)) {
          e.preventDefault();
          e.stopPropagation();
          
          const isOpen = dropdown.classList.contains('dropdown-open');
          
          // Close other dropdowns
          dropdowns.forEach(other => {
            other.classList.remove('dropdown-open');
          });
          
          if (!isOpen) {
            dropdown.classList.add('dropdown-open');
          }
        }
      });
    }
  });

  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-full');
    });
  }

  if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.add('translate-x-full');
    });
  }

  // Close mobile menu on link click
  const mobileLinks = mobileMenu?.querySelectorAll('a');
  mobileLinks?.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('translate-x-full');
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('dropdown-open');
      }
    });
  });

  // Theme Toggle Logic
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const darkIcon = themeToggle.querySelector('.dark-icon');
  const lightIcon = themeToggle.querySelector('.light-icon');

  // Check for saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    darkIcon.classList.add('hidden');
    darkIcon.classList.remove('block');
    lightIcon.classList.add('block');
    lightIcon.classList.remove('hidden');
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    // Toggle icons
    if (isLight) {
      darkIcon.classList.add('hidden');
      darkIcon.classList.remove('block');
      lightIcon.classList.add('block');
      lightIcon.classList.remove('hidden');
    } else {
      darkIcon.classList.add('block');
      darkIcon.classList.remove('hidden');
      lightIcon.classList.add('hidden');
      lightIcon.classList.remove('block');
    }
  });
});
