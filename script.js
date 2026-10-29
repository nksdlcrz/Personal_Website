// ==============================================
// SLIDER — Auto-rotating Hero Slideshow
// ==============================================
let currentSlide = 0;
const totalSlides = 3;

function showSlide(index) {
  const slides = document.querySelector('.slides');
  if (!slides) return;
  if (index >= totalSlides) currentSlide = 0;
  else if (index < 0) currentSlide = totalSlides - 1;
  else currentSlide = index;
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Auto-play slider
window.addEventListener('load', () => {
  showSlide(0);
  setInterval(() => {
    showSlide(currentSlide + 1);
  }, 4000);
});

// ==============================================
// CONTACT FORM VALIDATION
// ==============================================
function validateForm() {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  let valid = true;

  // Reset styles
  [name, email, message].forEach(el => {
    if (el) el.style.borderColor = '#BFDBFE';
  });

  if (!name || name.value.trim().length < 2) {
    if (name) name.style.borderColor = '#EF4444';
    alert('⚠️ Please enter your name (at least 2 characters)!');
    valid = false;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    if (email) email.style.borderColor = '#EF4444';
    alert('⚠️ Please enter a valid email address!');
    valid = false;
  }
  if (!message || message.value.trim().length < 10) {
    if (message) message.style.borderColor = '#EF4444';
    alert('⚠️ Please write a message (at least 10 characters)!');
    valid = false;
  }

  if (valid) {
    alert('✅ Message Sent! Thank you for reaching out 💐');
    if (name) name.value = '';
    if (email) email.value = '';
    if (message) message.value = '';
  }
  return false; // Prevent actual submit
}

// ==============================================
// SKILLS TABS
// ==============================================
function openTab(evt, tabName) {
  const tabcontent = document.getElementsByClassName('tabcontent');
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }
  const tablinks = document.getElementsByClassName('tablinks');
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }
  document.getElementById(tabName).style.display = 'block';
  if (evt) evt.currentTarget.className += ' active';
}

// ==============================================
// GALLERY LIGHTBOX
// ==============================================
let currentImageIndex = 0;
const galleryImages = [];

// Collect all gallery images on page load
document.addEventListener('DOMContentLoaded', () => {
  const thumbs = document.querySelectorAll('.thumbnail');
  thumbs.forEach((img, idx) => {
    galleryImages.push(img.src);
    img.addEventListener('click', () => {
      currentImageIndex = idx;
      openLightbox(img.src);
    });
  });
});

function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImage');
  if (lb && lbImg) {
    lb.style.display = 'block';
    lbImg.src = src;
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) {
    lb.style.display = 'none';
    document.body.style.overflow = '';
  }
}

function changeImage(direction) {
  currentImageIndex += direction;
  if (currentImageIndex >= galleryImages.length) currentImageIndex = 0;
  else if (currentImageIndex < 0) currentImageIndex = galleryImages.length - 1;
  const lbImg = document.getElementById('lightboxImage');
  if (lbImg) lbImg.src = galleryImages[currentImageIndex];
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (!lb || lb.style.display !== 'block') return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') changeImage(-1);
  if (e.key === 'ArrowRight') changeImage(1);
});

// ==============================================
// GOALS MODAL
// ==============================================
const goalData = {
  1: {
    image: 'Images/flowershop.jpg',
    title: '💐 My Own Flower Shop',
    text: 'To have my own flowershop from making bouquets at home to a real store full of colors. A place where every flower tells a love story💐💕'
  },
  2: {
    image: 'Images/painting1.jpg',
    title: '🎨 Grow as an Artist',
    text: 'To keep creating, learning, and improving my crafts every day from simle handmade bouquets to beautiful art that comes from the heart. I want my hands to make things that make me happy and proud.💕'
  },
  3: {
    image: 'Images/code.jpg',
    title: 'Learn to Code!',
    text: 'To learn coding step by step, from zeo to building my own beautiful website. I want to build a happy online space for my space for my crafts, where people can see my art and feel inspired.'
  },
  4: {
    image: 'Images/home.png',
    title: '🏡 My Dream House',
    text: 'To have a modern, cozy house that feels like a warm hug, a happy place for me, my love, and our futur family. Our safe sanctuary.🏡'
  },
  5: {
    image: 'Images/montero-sport-exterior-2.jpg',
    title: '🚗 My Own Car',
    text: 'To have my own car white montero sport for road trips, sunset drives, and adventures together, and a car full of memories and love.'
  },
  6: {
    image: 'Images/financial.jpg',
    title: '💰 Financial Stability',
    text: 'To be financially stable no more worries, just savings, blessings, and the ability to help a family. A peaceful life that I worked hard for.'
  }
};

function openGoalModal(id) {
  const data = goalData[id];
  if (!data) return;
  document.getElementById('modalImage').src = data.image;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalText').textContent = data.text;
  document.getElementById('goalOverlay').style.display = 'block';
  document.getElementById('goalModal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeGoalModal() {
  document.getElementById('goalOverlay').style.display = 'none';
  document.getElementById('goalModal').style.display = 'none';
  document.body.style.overflow = '';
}

// ==============================================
// PAGE PROTECTION — Require Login
// ==============================================
const protectedPages = ['index.html', 'skills.html', 'goals.html', 'funfacts.html', 'gallery.html', 'contact.html'];
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

if (protectedPages.includes(currentPage)) {
  const isLoggedIn = localStorage.getItem('loggedIn');
  if (!isLoggedIn || isLoggedIn !== 'true') {
    window.location.href = 'login.html';
  }
}