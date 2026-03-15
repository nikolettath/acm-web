import './style.css';

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initTimeline();     
  initScrollReveal(); 
});

// ─── NAVIGATION & ACCESSIBILITY ─── //
function initNavigation() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");

  const toggleMenu = () => {
    if (!hamburger || !mobileMenu) return; // Safeguard if elements are missing
    
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !isExpanded);
    mobileMenu.setAttribute("aria-hidden", String(isExpanded));
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  };

  if (hamburger) hamburger.addEventListener("click", toggleMenu);
  
  mobileLinks.forEach(link => {
    link.addEventListener("click", toggleMenu);
  });

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      // Safely check navbar height
      const navHeight = navbar ? navbar.offsetHeight : 80;
      if (window.scrollY >= section.offsetTop - navHeight - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });
}

// ─── SCROLL REVEAL (Intersection Observer) ─── //
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  if (revealElements.length === 0) return; // Safeguard

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach((el) => revealObserver.observe(el));
}

// ─── TIMELINE GENERATION (Centered Git Terminal Style) ─── //
function initTimeline() {
  const events = [
    { 
      date: '2024-10-15', 
      cmd: 'Chapter Re-Chartered', 
      title: 'ACM Chapter Renewal', 
      desc: 'Following a successful audit, our ACM chapter was renewed. We grew to 50 active members and hosted our first Linux Installfest.' 
    },
    { 
      date: '2024-11-22', 
      cmd: 'Cybersecurity Workshop Series', 
      title: 'Security Fundamentals', 
      desc: 'Launched a comprehensive 4-week workshop series covering web security, cryptography, and ethical hacking principles.' 
    },
    { 
      date: '2024-12-10', 
      cmd: 'Annual Hackathon 2024', 
      title: 'Winter Hackathon', 
      desc: '48-hour coding marathon with 20 teams competing. Winners built an AI-powered study assistant using machine learning.' 
    }
  ];

  const container = document.getElementById('timeline-events');
  
  // NOTE: This return is now safely locked inside the initTimeline function!
  if (!container) return; 

  container.innerHTML = ''; 

  events.forEach((event, index) => {
    const el = document.createElement('article');
    el.className = `timeline-event reveal ${index === 0 ? 'active' : ''}`;
    
    el.innerHTML = `
      <div class="timeline-node"></div>
      <div class="event-content">
        <div class="event-date">${event.date}</div>
        <div class="command-box">
          <span class="command-text">git commit -m "${event.cmd}"</span>
          <div class="command-status">
            <span class="status-check">✓</span>
            <span class="status-tag">[PUSH OK]</span>
          </div>
        </div>
        <h3 class="event-title">${event.title}</h3>
        <p class="event-description">${event.desc}</p>
      </div>
    `;
    container.appendChild(el);
  });
}