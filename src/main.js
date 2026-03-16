import './style.css';

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initTimeline();     
  initStackedCards(); 
  initScrollReveal(); 
});

//NAVIGATION & ACCESSIBILITY //
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

//SCROLL REVEAL//
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

//TIMELINE //
function initTimeline() {
  const events = [
    { 
      date: 'Νοέμβριος 2025', 
      cmd: 'Chapter Re-Chartered', 
      title: 'ACM Chapter Renewal', 
      desc: 'H επανίδρυση του ACM AUEB Student Chapter, μετα απο 10 χρόνια που ήταν ανενεργό.' 
    },
    { 
      date: 'Απρίλιος 2025', 
      cmd: 'Our First Event', 
      title: 'Coming Soon...', 
      desc: 'Περισσότερες πληροφορίες σύντομα!!' 
    },
    { 
      date: 'Σεπτέμβριος 2025', 
      cmd: 'Panhellenic ACM Chapters Joint Event', 
      title: 'Coming Soon...', 
      desc: 'Περισσότερες πληροφορίες σύντομα!!' 
    }
  ];

  const container = document.getElementById('timeline-events');
  
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
        <h1 class="event-title">${event.title}</h1>
        <p class="event-description">${event.desc}</p>
      </div>
    `;
    container.appendChild(el);
  });
}

//STACKED CARDS //
function initStackedCards() {
  const cards = document.querySelectorAll('.stacked-card');
  if (cards.length === 0) return;

  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const indicators = document.querySelectorAll('.indicator');
  let activeIndex = 0;

  function updateCards() {
    cards.forEach((card, index) => {

      card.classList.remove('card-active', 'card-left', 'card-right');
      let position = index - activeIndex;
      if (position < -1) position += cards.length;
      if (position > 1) position -= cards.length;
      if (position === 0) {
        card.classList.add('card-active');
      } else if (position === -1) {
        card.classList.add('card-left');
      } else if (position === 1) {
        card.classList.add('card-right');
      }
    });

    indicators.forEach((ind, index) => {
      ind.classList.toggle('active', index === activeIndex);
    });
  }

  function nextCard() {
    activeIndex = (activeIndex + 1) % cards.length;
    updateCards();
  }

  function prevCard() {
    activeIndex = (activeIndex - 1 + cards.length) % cards.length;
    updateCards();
  }

  if (nextBtn) nextBtn.addEventListener('click', nextCard);
  if (prevBtn) prevBtn.addEventListener('click', prevCard);

  indicators.forEach((ind, index) => {
    ind.addEventListener('click', () => {
      activeIndex = index;
      updateCards();
    });
  });

  let touchStartX = 0;
  let touchEndX = 0;
  const slider = document.querySelector('.stacked-cards-container');
  
  if (slider) {
    slider.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slider.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) nextCard(); 
      if (touchEndX - touchStartX > 50) prevCard(); 
    }, { passive: true });
  }

  updateCards(); 
}