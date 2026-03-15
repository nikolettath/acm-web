// Compact Git Log Timeline Events Data
const timelineEvents = [
  {
    date: '2024-10-15',
    commitMessage: 'Chapter Re-Chartered',
    title: 'ACM Chapter Renewal',
    description: 'Following a successful audit, our ACM chapter was renewed. We grew to 50 active members and hosted our first Linux Installfest.'
  },
  {
    date: '2024-11-22',
    commitMessage: 'Cybersecurity Workshop Series',
    title: 'Security Fundamentals',
    description: 'Launched a comprehensive 4-week workshop series covering web security, cryptography, and ethical hacking principles.'
  },
  {
    date: '2024-12-10',
    commitMessage: 'Annual Hackathon 2024',
    title: 'Winter Hackathon',
    description: '48-hour coding marathon with 20 teams competing. Winners built an AI-powered study assistant using machine learning.'
  },
  {
    date: '2025-01-30',
    commitMessage: 'Industry Networking Event',
    title: 'Tech Careers Night',
    description: 'Connected 80+ students with engineers and recruiters from Google, Microsoft, and local Greek tech startups.'
  }
];

// Render Compact Timeline
function renderTimeline() {
  const timelineEventsContainer = document.getElementById('timeline-events');
  
  timelineEvents.forEach((event, index) => {
    const isActive = index === 0; // First event is active
    
    const eventElement = document.createElement('div');
    eventElement.className = `timeline-event ${isActive ? 'active' : ''}`;
    
    eventElement.innerHTML = `
      <div class="timeline-node"></div>
      <div class="event-content">
        <div class="event-date">${event.date}</div>
        <div class="command-line">
          <code>git commit -m "${event.commitMessage}"</code>
          <span class="checkmark">✓</span>
          <span class="tag">[PUSH OK]</span>
        </div>
        <div class="event-info">
          <span class="label">Header:</span> ${event.title}
        </div>
        <div class="event-desc">
          <span class="label">Description:</span> ${event.description}
        </div>
      </div>
    `;
    
    timelineEventsContainer.appendChild(eventElement);
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', renderTimeline);