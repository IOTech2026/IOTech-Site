/**
 * IOTECH Club - Core Script, Router & Persistence Module
 */

// ==========================================
// 1. Data Registries (Members & Events)
// ==========================================
const teamMembers = [
    { name: "Charan R. Shetty", role: "President", department: "core", photo: "", imageSlot: "assets/images/members/charan.jpg" },
    { name: "Kedar Guruv", role: "Vice President", department: "core", photo: "", imageSlot: "assets/images/members/kedar.jpg" },
    { name: "Komal Shrike", role: "Design Lead", department: "design", photo: "", imageSlot: "assets/images/members/komal.jpg" },
    { name: "Parth M. Narse", role: "Technical Lead", department: "technical", photo: "", imageSlot: "assets/images/members/parth.jpg" },
    { name: "Nidhee S. Jadhav", role: "Management Lead", department: "management", photo: "", imageSlot: "assets/images/members/nidhee.jpg" },
    { name: "Bhagyesh Joshi", role: "Management Co-Lead", department: "management", photo: "", imageSlot: "assets/images/members/bhagyesh.jpg" },
    { name: "Kshitija Khilari", role: "Technical Lead", department: "technical", photo: "", imageSlot: "assets/images/members/kshitija.jpg" },
    { name: "Purva Atigre", role: "Design Co-Lead", department: "design", photo: "", imageSlot: "assets/images/members/purva.jpg" },
    { name: "Aditya Shrike", role: "Documentation Lead", department: "documentation", photo: "", imageSlot: "assets/images/members/aditya.jpg" },
    { name: "Anushka Sonavane", role: "Documentation Co-Lead", department: "documentation", photo: "", imageSlot: "assets/images/members/anushka.jpg" },
    { name: "Chinmay Chiplunkar", role: "Media Lead", department: "media", photo: "", imageSlot: "assets/images/members/chinmay.jpg" },
    { name: "Payal Hasbe", role: "Media Lead", department: "media", photo: "", imageSlot: "assets/images/members/payal.jpg" }
];

const eventsRegistry = {
    'debate-2026': {
        title: "Tech Clash: The Tech Debate 2026",
        badge: "UPCOMING FLAGSHIP EVENT",
        tagline: "Clash of ideas, tech ethics, and future innovations. Voice your arguments!",
        description: "IOTECH Club presents Tech Clash 2026 — an inter-departmental debate competition designed to test your critical thinking, technical knowledge, and persuasion skills.",
        date: "To Be Announced",
        venue: "Seminar Hall, SIGCE Campus",
        format: "10 vs 10",
        managementLead: "Nidhee S. Jadhav",
        mediaCoverage: "Chinmay & Payal",
        isUpcoming: true
    },
    'hackathon-2025': {
        title: "Smart India Hackathon Internal Round",
        badge: "PAST EVENT",
        tagline: "Internal screening round for SIH team submissions.",
        description: "Student teams demonstrated software and hardware prototypes for national hackathon selection.",
        date: "September 2025",
        venue: "Computer Labs, SIGCE Campus",
        format: "Teams of 6",
        managementLead: "Management Team",
        mediaCoverage: "Media Team",
        isUpcoming: false
    },
    'orientation-2025': {
        title: "IOTECH Student Orientation Drive",
        badge: "PAST EVENT",
        tagline: "Annual orientation for incoming batches.",
        description: "An introductory session exploring IoT engineering, club projects, design teams, and media roles.",
        date: "August 2025",
        venue: "Auditorium, SIGCE Campus",
        format: "Individual Entry",
        managementLead: "Executive Committee",
        mediaCoverage: "Media Team",
        isUpcoming: false
    }
};

// ==========================================
// 2. Initialization & Master Event Listener
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // A. Handle Intro Splash Video
    initIntroSplash();

    // B. Initialize Page Router & History Hash
    const currentHash = window.location.hash.replace('#', '') || 'home';
    switchPage(currentHash);

    // C. Load Saved Edits from LocalStorage
    loadSavedPageContent();
});

// ==========================================
// 3. Navigation & Single Page Application Router
// ==========================================
function switchPage(pageId) {
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(p => p.classList.add('hidden'));

    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
        targetPage.classList.remove('hidden');
        targetPage.classList.add('animate-fade-in');
        window.location.hash = pageId;
    } else {
        console.warn(`Section with ID 'page-${pageId}' not found!`);
        return;
    }

    // Update active navigation state
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('text-cyan-400', 'text-neonCyan', 'bg-slate-800');
        btn.classList.add('text-slate-300');
    });

    // Map sub-pages back to primary navbar tabs
    const activeNavKey = pageId.startsWith('event') ? 'events' : pageId;
    const activeBtn = document.getElementById(`nav-${activeNavKey}`);
    if (activeBtn) {
        activeBtn.classList.add('text-neonCyan', 'bg-slate-800');
        activeBtn.classList.remove('text-slate-300');
    }

    // Close Mobile Menu if active
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) mobileMenu.classList.add('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 4. Detailed Event View Controller
// ==========================================
function viewEventDetails(eventId) {
    const data = eventsRegistry[eventId];
    if (!data) return;

    const elTitle = document.getElementById('detail-event-title');
    const elBadge = document.getElementById('detail-event-badge');
    const elStatus = document.getElementById('detail-event-status');
    const elTagline = document.getElementById('detail-event-tagline');
    const elDesc = document.getElementById('detail-event-description');
    const elDate = document.getElementById('detail-event-date');
    const elVenue = document.getElementById('detail-event-venue');
    const elFormat = document.getElementById('detail-event-format');
    const elCoords = document.getElementById('detail-event-coordinators');

    if (elTitle) elTitle.innerText = data.title;
    if (elBadge) elBadge.innerText = data.badge;
    if (elStatus) elStatus.innerText = data.badge;
    if (elTagline) elTagline.innerText = data.tagline;
    if (elDesc) elDesc.innerHTML = data.description;
    if (elDate) elDate.innerText = data.date;
    if (elVenue) elVenue.innerText = data.venue;
    if (elFormat) elFormat.innerText = data.format;

    if (elCoords) {
        elCoords.innerHTML = `
            <p><strong class="text-white">Management Lead:</strong> ${data.managementLead}</p>
            <p><strong class="text-white">Media Coverage:</strong> ${data.mediaCoverage}</p>
        `;
    }

    const sideBtn = document.getElementById('detail-register-side-btn');
    const mainBtn = document.getElementById('detail-register-main-btn');

    if (!data.isUpcoming) {
        if (sideBtn) {
            sideBtn.innerText = "Event Concluded";
            sideBtn.disabled = true;
            sideBtn.className = "w-full py-3 rounded-xl bg-slate-800 text-slate-500 font-bold text-xs cursor-not-allowed";
        }
        if (mainBtn) mainBtn.classList.add('hidden');
    } else {
        if (sideBtn) {
            sideBtn.innerText = "Register for Event";
            sideBtn.disabled = false;
            sideBtn.className = "w-full py-3 rounded-xl bg-gradient-to-r from-neonCyan to-neonBlue text-cyberDark font-bold text-xs hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all";
        }
        if (mainBtn) mainBtn.classList.remove('hidden');
    }

    switchPage('event-details');
}

// ==========================================
// 5. Dynamic Member Rendering
// ==========================================
function renderDepartmentMembers(dept, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const filtered = teamMembers.filter(m => m.department === dept);
    
    container.innerHTML = filtered.map(member => `
        <div class="bg-cyberCard border border-slate-800 rounded-2xl p-6 text-center hover:border-neonCyan/50 transition-all">
            <div data-image-src="${member.imageSlot}" aria-label="${member.name}" class="w-24 h-24 mx-auto mb-3 rounded-full object-cover border-2 border-slate-700 image-slot"></div>
            <h3 class="font-bold text-white">${member.name}</h3>
            <p class="text-xs text-neonCyan mt-1">${member.role}</p>
        </div>
    `).join('');
}

// ==========================================
// 6. Intro Video Splash Overlay Logic
// ==========================================
function initIntroSplash() {
    const splash = document.getElementById('intro-splash');
    const video = document.getElementById('intro-video');

    if (sessionStorage.getItem('iotech_intro_seen')) {
        if (splash) splash.style.display = 'none';
        return;
    }

    if (video && splash) {
        video.addEventListener('ended', hideIntro);
        video.addEventListener('error', hideIntro);

        setTimeout(() => {
            if (splash && splash.style.display !== 'none') {
                hideIntro();
            }
        }, 6000);
    }
}

function hideIntro() {
    const splash = document.getElementById('intro-splash');
    const video = document.getElementById('intro-video');

    if (splash) {
        if (video) video.pause();
        splash.style.opacity = '0';
        splash.style.pointerEvents = 'none';

        sessionStorage.setItem('iotech_intro_seen', 'true');

        setTimeout(() => {
            splash.style.display = 'none';
        }, 500);
    }
}

// ==========================================
// 7. LocalStorage Persistence & Toast System
// ==========================================
function savePageContent() {
    const mainContent = document.querySelector('main').innerHTML;
    localStorage.setItem('iotech_site_backup', mainContent);
    showToast('Changes saved to local storage!');
}

function loadSavedPageContent() {
    const savedContent = localStorage.getItem('iotech_site_backup');
    if (savedContent) {
        document.querySelector('main').innerHTML = savedContent;
    }
}

function resetSiteDefaults() {
    if (confirm('Are you sure you want to reset all edits to original defaults?')) {
        localStorage.removeItem('iotech_site_backup');
        location.reload();
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-5 right-5 z-50 bg-cyan-500 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs shadow-xl animate-fade-in flex items-center gap-2';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}
