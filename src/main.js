import confetti from 'canvas-confetti';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Theme Toggle (Dark Cyber / Light Cyber)
  initThemeToggle();

  // 3. Cyber Canvas Background Animation
  initCyberCanvas();

  // 4. Custom Cursor Physics
  initCustomCursor();

  // 5. Interactive CLI Terminal
  initInteractiveTerminal();

  // 6. Project Filter System & Counter
  initProjectFilters();

  // 7. Project Modal Drawer
  initProjectModal();

  // 8. Copy to Clipboard & Toast System
  initClipboardAndToasts();

  // 9. Scroll Reveals & Animated Metric Counters
  initScrollEffects();

  // 10. Mobile Menu Navigation
  initMobileNav();
});

/* ==========================================
   THEME TOGGLE SYSTEM
   ========================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Check saved preference or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    html.classList.remove('dark');
    html.classList.add('light');
  } else {
    html.classList.remove('light');
    html.classList.add('dark');
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        html.classList.add('light');
        localStorage.setItem('theme', 'light');
        showToast('Switched to Light Cyber Theme', 'sun');
      } else {
        html.classList.remove('light');
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        showToast('Switched to Dark Cyber Theme', 'moon');
      }
    });
  }

  // Keyboard shortcut 'T' to toggle theme
  window.addEventListener('keydown', (e) => {
    if (e.key === 't' || e.key === 'T') {
      const activeTag = document.activeElement ? document.activeElement.tagName : '';
      if (activeTag !== 'INPUT' && activeTag !== 'TEXTAREA') {
        themeBtn?.click();
      }
    }
  });
}

/* ==========================================
   CYBER CANVAS ANIMATION
   ========================================== */
function initCyberCanvas() {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 25), 45);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 1,
      alpha: Math.random() * 0.5 + 0.2,
    });
  }

  let mouseX = width / 2;
  let mouseY = height / 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.classList.contains('dark');
    const colorRGB = isDark ? '0, 240, 255' : '2, 132, 199';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${colorRGB}, ${p.alpha})`;
      ctx.fill();

      // Connect lines to nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${colorRGB}, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      // Interaction with mouse cursor
      const mdx = p.x - mouseX;
      const mdy = p.y - mouseY;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

      if (mdist < 140) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = `rgba(${colorRGB}, ${0.25 * (1 - mdist / 140)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
}

/* ==========================================
   CUSTOM CURSOR LOGIC
   ========================================== */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  let mouseX = -100, mouseY = -100;
  let followerX = -100, followerY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  function renderFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    requestAnimationFrame(renderFollower);
  }
  renderFollower();

  // Hover scale on interactive elements
  const interactives = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-pill');
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      follower.style.width = '54px';
      follower.style.height = '54px';
      follower.style.borderColor = 'var(--accent-emerald)';
    });
    el.addEventListener('mouseleave', () => {
      follower.style.width = '36px';
      follower.style.height = '36px';
      follower.style.borderColor = 'var(--accent-cyan)';
    });
  });
}

/* ==========================================
   INTERACTIVE TERMINAL SYSTEM
   ========================================== */
function initInteractiveTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  const clearBtn = document.getElementById('terminal-clear-btn');
  const pills = document.querySelectorAll('.term-pill');
  const triggerBtn = document.getElementById('terminal-trigger-btn');

  if (!input || !output) return;

  if (triggerBtn) {
    triggerBtn.addEventListener('click', () => {
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  const commands = {
    help: () => `Available Commands:
  - whoami     : About [NAME]
  - projects   : View featured projects list
  - skills     : List core technologies & tools
  - contact    : Direct email & social links
  - matrix     : Trigger cyber matrix animation
  - theme      : Toggle Dark/Light mode
  - clear      : Clear terminal screen`,

    whoami: () => `Durgesh Sharma — Software & Systems Engineer
Location: India / Remote
Bio: Software engineer specializing in systems architecture, compilers, high-performance web applications, and developer tools.`,

    projects: () => `Featured Projects:
1. RCC             (Self-Hosting C11 Compiler in C)
2. Todophi         (Terminal Task Manager in Rust)
3. RV32I Emulator  (Two-Pass RISC-V Simulator in C++)
4. Dark Cyber Port (Modern Developer Portfolio in Vite/JS)`,

    skills: () => `Core Skills:
Languages : C/C++, Rust, Go, Python, TypeScript, JavaScript, Assembly
Web       : React, Next.js, HTML5/CSS3, TailwindCSS, Vite, WebSockets
Backend   : Node.js, Express, PostgreSQL, Redis, RESTful/GraphQL APIs
DevOps    : Git, Docker, Linux, Bash, GitHub Actions`,

    contact: () => `Contact Info:
Email    : durgeshsharma51000@gmail.com
GitHub   : https://github.com/durgesh-k-sharma
LinkedIn : https://linkedin.com/in/durgesh-k-sharma
Twitter  : https://twitter.com/durgesh_k_sharma`,

    matrix: () => {
      triggerMatrixEffect();
      return 'Initializing Cyber Matrix Stream... (type "clear" to stop)';
    },

    theme: () => {
      document.getElementById('theme-toggle')?.click();
      return 'Theme toggled successfully.';
    },

    clear: () => {
      output.innerHTML = '';
      return null;
    }
  };

  function executeCommand(cmdStr) {
    const cleanCmd = cmdStr.trim().toLowerCase();
    if (!cleanCmd) return;

    // Append Command Line
    const cmdLine = document.createElement('div');
    cmdLine.className = 'terminal-line';
    cmdLine.innerHTML = `<span class="term-prompt">$</span> <span class="term-cmd">${escapeHTML(cleanCmd)}</span>`;
    output.appendChild(cmdLine);

    // Process Response
    if (commands[cleanCmd]) {
      const response = commands[cleanCmd]();
      if (response) {
        const respLine = document.createElement('div');
        respLine.className = 'terminal-line text-muted';
        respLine.style.whiteSpace = 'pre-wrap';
        respLine.textContent = response;
        output.appendChild(respLine);
      }
    } else {
      const errLine = document.createElement('div');
      errLine.className = 'terminal-line text-cyan';
      errLine.textContent = `Command not recognized: '${cleanCmd}'. Type 'help' for options.`;
      output.appendChild(errLine);
    }

    output.scrollTop = output.scrollHeight;
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value;
      input.value = '';
      executeCommand(val);
    }
  });

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const cmd = pill.getAttribute('data-cmd');
      if (cmd) executeCommand(cmd);
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => commands.clear());
  }
}

function triggerMatrixEffect() {
  const output = document.getElementById('terminal-output');
  if (!output) return;
  const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%&*';
  let count = 0;
  const interval = setInterval(() => {
    const line = document.createElement('div');
    line.className = 'terminal-line text-emerald';
    let str = '';
    for (let i = 0; i < 35; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    line.textContent = str;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
    count++;
    if (count > 20) clearInterval(interval);
  }, 100);
}

/* ==========================================
   PROJECT FILTERING SYSTEM
   ========================================== */
function initProjectFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');
  const countAll = document.getElementById('count-all');

  if (countAll) countAll.textContent = projectCards.length;

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================
   PROJECT MODAL DRAWER
   ========================================== */
const projectData = {
  1: {
    title: 'RCC — Self-Hosting C Compiler',
    badge: 'Systems Software',
    overview: 'RCC is a lightweight, self-hosting C11 compiler written in C. It performs lexical analysis, abstract syntax tree (AST) construction, type checking, and targets x86_64 assembly code generation.',
    features: [
      'Self-hosting capability: Compiles its own codebase into valid executable machine assembly.',
      'Supports core C11 language specifications, functions, pointers, arrays, and control structures.',
      'Generates clean, readable x86_64 assembly compatible with GNU Assembler (GAS).'
    ],
    tech: ['C11', 'x86_64 Assembly', 'Compilers', 'Make'],
    repo: 'https://github.com/durgesh-k-sharma/rcc',
    live: 'https://github.com/durgesh-k-sharma/rcc'
  },
  2: {
    title: 'Todophi — Terminal Task Manager',
    badge: 'CLI Productivity Tool',
    overview: 'Todophi is a fast, terminal-native task management application engineered in Rust. It offers sub-millisecond command responsiveness and persistent task storage.',
    features: [
      'Keyboard-driven interface designed for speed inside Linux/macOS terminals.',
      'Flexible filtering by priority, tags, status, and target due dates.',
      'Lightweight local SQLite storage engine with zero memory overhead.'
    ],
    tech: ['Rust', 'CLI Architecture', 'Terminal UI', 'SQLite'],
    repo: 'https://github.com/durgesh-k-sharma/todophi',
    live: 'https://github.com/durgesh-k-sharma/todophi'
  },
  3: {
    title: 'RV32I — Two-Pass RISC-V Simulator',
    badge: 'Computer Architecture',
    overview: 'RV32I is a two-pass RISC-V instruction set emulator written in C++. It parses assembly instructions, simulates CPU registers, and monitors memory state.',
    features: [
      'Simulates standard 32-bit RISC-V integer base instruction set architecture.',
      'Two-pass assembler resolution for labels, branches, and memory offsets.',
      'Interactive register inspection and step-by-step memory debugging.'
    ],
    tech: ['C++', 'RISC-V', 'Computer Architecture', 'Emulation'],
    repo: 'https://github.com/durgesh-k-sharma/rv32i',
    live: 'https://github.com/durgesh-k-sharma/rv32i'
  },
  4: {
    title: 'Dark Cyber Developer Portfolio',
    badge: 'Web Application',
    overview: 'A modern, high-performance personal developer portfolio built with HTML5, CSS3, Vanilla JS, and Vite. Designed specifically for deployment as a static site on GitHub Pages.',
    features: [
      'Dark Cyber-Minimalist aesthetic with obsidian background and cyan/emerald neon accents.',
      'Interactive CLI terminal supporting custom shell commands.',
      'Cyber particle canvas, glassmorphism, dark/light theme toggle, and GitHub Actions CI/CD deployment.'
    ],
    tech: ['HTML5', 'CSS3', 'Vanilla JS', 'Vite', 'GitHub Pages'],
    repo: 'https://github.com/durgesh-k-sharma/portfolio',
    live: 'https://durgesh-k-sharma.github.io/portfolio/'
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');
  const viewBtns = document.querySelectorAll('.view-details-btn');

  if (!modal) return;

  viewBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project');
      const data = projectData[id];
      if (!data) return;

      document.getElementById('modal-project-title').textContent = data.title;
      document.getElementById('modal-badge').textContent = data.badge;
      document.getElementById('modal-overview').textContent = data.overview;
      document.getElementById('modal-repo-link').href = data.repo;
      document.getElementById('modal-live-link').href = data.live;

      // Populate features
      const featList = document.getElementById('modal-features-list');
      featList.innerHTML = '';
      data.features.forEach((feat) => {
        const li = document.createElement('li');
        li.textContent = feat;
        featList.appendChild(li);
      });

      // Populate tech tags
      const techTags = document.getElementById('modal-tech-tags');
      techTags.innerHTML = '';
      data.tech.forEach((t) => {
        const span = document.createElement('span');
        span.className = 'tech-tag';
        span.textContent = t;
        techTags.appendChild(span);
      });

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================
   CLIPBOARD & TOAST NOTIFICATION SYSTEM
   ========================================== */
function initClipboardAndToasts() {
  const copyBtn = document.getElementById('copy-email-btn');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = copyBtn.getAttribute('data-email') || '[YOUR_EMAIL@EXAMPLE.COM]';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied email to clipboard: ${email}`, 'check');
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
      }).catch(() => {
        showToast('Failed to copy email', 'alert-circle');
      });
    });
  }
}

function showToast(message, iconName = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i data-lucide="${iconName}"></i> <span>${escapeHTML(message)}</span>`;

  container.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* ==========================================
   SCROLL REVEALS & METRICS COUNTERS
   ========================================== */
function initScrollEffects() {
  // Back to top button
  const topBtn = document.getElementById('back-to-top');
  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Counter animation observer
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseFloat(counter.getAttribute('data-target') || '0');
        animateCounter(counter, target);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((c) => observer.observe(c));
}

function animateCounter(el, target) {
  let start = 0;
  const duration = 1500;
  const stepTime = 20;
  const steps = duration / stepTime;
  const increment = target / steps;

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      el.textContent = target % 1 === 0 ? target : target.toFixed(1);
      clearInterval(timer);
    } else {
      el.textContent = start % 1 === 0 ? Math.floor(start) : start.toFixed(1);
    }
  }, stepTime);
}

/* ==========================================
   MOBILE MENU NAVIGATION
   ========================================== */
function initMobileNav() {
  const mobileBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('mobile-open');
      mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile nav when clicking any nav link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

// Helper: Escape HTML
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
