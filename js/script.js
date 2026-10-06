// ===== SHARED JAVASCRIPT =====

// ===== PASSWORD TOGGLE =====
function togglePasswordVisibility() {
  const passwordInput = document.getElementById('password');
  const eyeOff = document.getElementById('eyeOff');
  const eyeOn = document.getElementById('eyeOn');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    eyeOff.style.display = 'none';
    eyeOn.style.display = 'block';
  } else {
    passwordInput.type = 'password';
    eyeOff.style.display = 'block';
    eyeOn.style.display = 'none';
  }
}

// ===== LOGIN HANDLER =====
function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const btn = document.getElementById('signInBtn');

  // Basic validation
  if (!email || !password) {
    showToast('Error', 'Please fill in all fields.', 'error');
    return false;
  }

  // Show loading state
  btn.classList.add('loading');
  btn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    btn.classList.remove('loading');
    btn.disabled = false;

    // Accept any email/password for demo
    showToast('Welcome back!', 'Redirecting to dashboard...', 'success');

    // Redirect after toast
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1500);
  }, 1800);

  return false;
}

// ===== TOAST NOTIFICATION =====
function showToast(title, message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastIcon = document.getElementById('toastIcon');
  const toastTitle = document.getElementById('toastTitle');
  const toastMessage = document.getElementById('toastMessage');

  if (!toast) return;

  toastTitle.textContent = title;
  toastMessage.textContent = message;

  // Update icon class
  toastIcon.className = 'toast-icon ' + type;

  // Update icon SVG
  if (type === 'success') {
    toastIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
  } else {
    toastIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
  }

  toast.classList.add('show');

  // Auto hide
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// ===== SIDEBAR TOGGLE (Mobile) =====
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.toggle('open');
  }
}

// ===== LOGOUT =====
function handleLogout() {
  window.location.href = 'index.html';
}

// ===== INPUT FOCUS EFFECTS =====
document.addEventListener('DOMContentLoaded', () => {
  // Add focus glow to input wrappers
  document.querySelectorAll('.input-wrapper input').forEach(input => {
    input.addEventListener('focus', () => {
      input.closest('.input-wrapper').classList.add('focused');
    });
    input.addEventListener('blur', () => {
      input.closest('.input-wrapper').classList.remove('focused');
    });
  });

  // Close sidebar on outside click (mobile)
  document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('menuToggle');
    if (sidebar && sidebar.classList.contains('open') && 
        !sidebar.contains(e.target) && 
        (!menuBtn || !menuBtn.contains(e.target))) {
      sidebar.classList.remove('open');
    }
  });

  // Add subtle parallax to login orbs on mouse move
  const loginPage = document.querySelector('.login-page');
  if (loginPage) {
    loginPage.addEventListener('mousemove', (e) => {
      const orbs = document.querySelectorAll('.orb');
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      orbs.forEach((orb, i) => {
        const speed = (i + 1) * 8;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    });
  }

  // Keyboard shortcut: Enter on social buttons
  document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => { btn.style.transform = ''; }, 150);
    });
  });
});
