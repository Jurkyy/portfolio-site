/**
 * Interactive elements and micro-interactions for the portfolio site
 * All effects respect prefers-reduced-motion
 */

// Check if user prefers reduced motion
const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Detect low-power devices for performance optimization
const isLowPowerDevice = (): boolean => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const hasLowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  return isMobile || hasLowCores;
};

// Throttle function for mousemove handlers
const throttle = <T extends (...args: any[]) => void>(fn: T, delay: number): T => {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return ((...args: Parameters<T>) => {
    const now = Date.now();
    const remaining = delay - (now - lastCall);
    if (remaining <= 0) {
      if (timeoutId) { clearTimeout(timeoutId); timeoutId = null; }
      lastCall = now;
      fn(...args);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        timeoutId = null;
        fn(...args);
      }, remaining);
    }
  }) as T;
};

// ============================================
// 1. Scroll-triggered animations
// ============================================

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
}

const initScrollAnimations = (options: ScrollAnimationOptions = {}): void => {
  if (prefersReducedMotion()) return;

  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px' } = options;

  const animatedElements = document.querySelectorAll<HTMLElement>(
    '.animate-on-scroll, .card, .skills > div, .mention-card, .section-header'
  );

  if (animatedElements.length === 0) return;

  // Add initial hidden state
  animatedElements.forEach((el, index) => {
    el.classList.add('scroll-hidden');
    // Stagger the animation delay for grid items
    const parent = el.parentElement;
    if (parent?.classList.contains('grid') || el.classList.contains('mention-card') || parent?.classList.contains('skills')) {
      el.style.setProperty('--stagger-delay', `${index * 0.1}s`);
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.add('scroll-visible');
          el.classList.remove('scroll-hidden');
          observer.unobserve(el);
        }
      });
    },
    { threshold, rootMargin }
  );

  animatedElements.forEach((el) => observer.observe(el));
};

// ============================================
// 2. Enhanced card hover effects - 3D tilt
// ============================================

interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
}

const initCardTilt = (options: TiltOptions = {}): void => {
  // Skip on reduced motion or low-power devices
  if (prefersReducedMotion() || isLowPowerDevice()) return;

  const { maxTilt = 10, perspective = 1000, scale = 1.02, speed = 400 } = options;

  const cards = document.querySelectorAll<HTMLElement>('.card, .tilt-card');

  cards.forEach((card) => {
    // Create glow element for cursor-following effect
    const glow = document.createElement('div');
    glow.className = 'card-glow';
    card.style.position = 'relative';
    card.appendChild(glow);

    let rafId: number | null = null;

    const handleMouseMove = throttle((e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        card.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;

        // Update glow position
        const glowX = (x / rect.width) * 100;
        const glowY = (y / rect.height) * 100;
        glow.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, var(--accent-overlay) 0%, transparent 50%)`;
        glow.style.opacity = '1';
      });
    }, 16); // Throttle to ~60fps

    const handleMouseLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      card.style.transform = '';
      card.style.transition = `transform ${speed}ms ease-out`;
      glow.style.opacity = '0';
      setTimeout(() => {
        card.style.transition = '';
      }, speed);
    };

    const handleMouseEnter = () => {
      card.style.transition = 'none';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);
  });
};

// ============================================
// 3. Mouse-following spotlight
// ============================================

const initMouseSpotlight = (): void => {
  // Skip on reduced motion or low-power devices
  if (prefersReducedMotion() || isLowPowerDevice()) return;

  const spotlight = document.createElement('div');
  spotlight.className = 'mouse-spotlight';
  document.body.appendChild(spotlight);

  let rafId: number | null = null;
  let mouseX = 0;
  let mouseY = 0;
  let spotlightX = 0;
  let spotlightY = 0;
  const ease = 0.15;

  const animate = () => {
    spotlightX += (mouseX - spotlightX) * ease;
    spotlightY += (mouseY - spotlightY) * ease;

    spotlight.style.transform = `translate(${spotlightX - 200}px, ${spotlightY - 200}px)`;
    rafId = requestAnimationFrame(animate);
  };

  const handleMouseMove = throttle((e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY + window.scrollY;
  }, 16); // Throttle to ~60fps

  document.addEventListener('mousemove', handleMouseMove);
  animate();

  // Show spotlight on mouse enter
  document.addEventListener('mouseenter', () => {
    spotlight.style.opacity = '1';
  });

  // Hide spotlight on mouse leave
  document.addEventListener('mouseleave', () => {
    spotlight.style.opacity = '0';
  });
};

// ============================================
// 4. Click ripple effects
// ============================================

const initRippleEffect = (): void => {
  if (prefersReducedMotion()) return;

  const buttons = document.querySelectorAll<HTMLElement>(
    'a[href]:not(.card), button, .ripple'
  );

  buttons.forEach((button) => {
    // Ensure position relative for ripple containment
    const computedStyle = window.getComputedStyle(button);
    if (computedStyle.position === 'static') {
      button.style.position = 'relative';
    }
    button.style.overflow = 'hidden';

    button.addEventListener('click', function (e: MouseEvent) {
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';

      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      button.appendChild(ripple);

      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    });
  });
};

// ============================================
// 5. Smooth scroll behavior
// ============================================

const initSmoothScroll = (): void => {
  // Add smooth scrolling to HTML element
  document.documentElement.style.scrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth';

  // Handle anchor links
  const anchorLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
          block: 'start',
        });

        // Update URL without scrolling
        history.pushState(null, '', href);
      }
    });
  });
};

// ============================================
// 6. Image zoom on hover (for cards)
// ============================================

const initImageZoom = (): void => {
  if (prefersReducedMotion()) return;

  const cardImages = document.querySelectorAll<HTMLImageElement>('.card img');

  cardImages.forEach((img) => {
    img.classList.add('zoom-image');
  });
};

// ============================================
// Initialize all interactions
// ============================================

const initInteractions = (): void => {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      runInitialization();
    });
  } else {
    runInitialization();
  }
};

const runInitialization = (): void => {
  initScrollAnimations();
  initCardTilt();
  initMouseSpotlight();
  initRippleEffect();
  initSmoothScroll();
  initImageZoom();
};

// Re-initialize on Astro page transitions
document.addEventListener('astro:page-load', () => {
  // Clean up previous spotlight if exists
  const existingSpotlight = document.querySelector('.mouse-spotlight');
  if (existingSpotlight) {
    existingSpotlight.remove();
  }
  runInitialization();
});

// Export for use in other modules
export {
  initInteractions,
  initScrollAnimations,
  initCardTilt,
  initMouseSpotlight,
  initRippleEffect,
  initSmoothScroll,
  initImageZoom,
};

// Auto-initialize
initInteractions();
