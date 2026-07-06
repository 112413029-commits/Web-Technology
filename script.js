document.addEventListener('DOMContentLoaded', function () {

  // =====================================================
  // 1. ANIMATE SKILL BARS WHEN THEY SCROLL INTO VIEW
  // =====================================================
  // Each <li class="skill"> has a data-level="70" attribute (set in the HTML)
  // saying how full its bar should get. We don't want the bars to fill up
  // immediately on page load if they're off-screen — we wait until the user
  // actually scrolls down to them, using an IntersectionObserver.

  const skillBars = document.querySelectorAll('.skill');

  // IntersectionObserver watches elements and tells us when they enter/leave
  // the visible part of the screen ("the viewport").
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      // entry.isIntersecting is true once the element becomes visible on screen.
      if (entry.isIntersecting) {
        const skill = entry.target;
        const level = skill.dataset.level;          // reads the data-level="70" attribute as text
        const fill = skill.querySelector('.skill__fill');
        fill.style.width = level + '%';              // grows the bar to that percentage

        observer.unobserve(skill);   // stop watching this one, it only needs to animate once
      }
    });
  }, {
    threshold: 0.4   // "visible" means at least 40% of the element is on screen
  });

  skillBars.forEach(function (skill) {
    observer.observe(skill);
  });

  // =====================================================
  // 2. CONTACT FORM — SHOW A CONFIRMATION MESSAGE ON SUBMIT
  // =====================================================
  // This portfolio page has no backend server to actually send an email, so
  // we simply confirm the details look filled in and show a friendly message.
  // (If you later add a real backend or a service like Formspree, replace
  // this handler with an actual fetch() request to that service.)

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', function (event) {
    event.preventDefault();   // stop the page from reloading

    if (!form.checkValidity()) {
      form.reportValidity();   // shows the browser's built-in "please fill this in" bubble
      return;
    }

    status.hidden = false;     // reveal the "Message received" confirmation text
    form.reset();               // clear the fields back to empty for a fresh entry
  });

  // =====================================================
  // 3. TAB BAR — HIGHLIGHT THE SECTION CURRENTLY IN VIEW
  // =====================================================
  // As the user scrolls, this keeps the matching tab (about/skills/projects/contact)
  // marked as "active" instead of it only ever showing "about.html" as active.

  const tabs = document.querySelectorAll('.tab');
  const sections = document.querySelectorAll('.section');

  const tabObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        tabs.forEach(function (tab) {
          // tab--active is added only to the tab whose href matches the section
          // currently on screen, and removed from every other tab.
          tab.classList.toggle('tab--active', tab.getAttribute('href') === '#' + id);
        });
      }
    });
  }, {
    threshold: 0.5   // a section counts as "current" once half of it is visible
  });

  sections.forEach(function (section) {
    tabObserver.observe(section);
  });

});
