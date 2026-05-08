import type { User } from '../types'

const Icons = {
  pole: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="20" rx="3"/><path d="M9 6h6"/><path d="M9 10h6"/><path d="M9 14h6"/><path d="M9 18h6"/></svg>`,
  arrowLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`
}

export function renderAuthPage(app: HTMLElement, registeredUsers: User[], onLogin: (user: User) => void, onBack: () => void) {
  app.innerHTML = `
    <div class="auth-page">
      <a href="#" class="back-home" id="back-home">${Icons.arrowLeft} Volver al inicio</a>
      <div class="auth-visual">
        <div class="auth-visual-content">
          <div class="icon-container" style="margin: 0 auto 2rem; background: rgba(255,255,255,0.2); color: white;">${Icons.pole}</div>
          <h1 style="font-size: 3rem; margin-bottom: 1rem; font-family: var(--font-heading);">Tu Estilo, Tu Espacio</h1>
          <p style="font-size: 1.2rem; opacity: 0.9;">Inicia sesión para gestionar tus citas.</p>
        </div>
      </div>
      <div class="auth-form-container">
        <div class="auth-card">
          <div id="login-tabs" style="display: flex; gap: 1rem; margin-bottom: 3rem; justify-content: center;">
            <button class="tab-btn active" data-tab="login">Entrar</button>
            <button class="tab-btn" data-tab="register">Registrarse</button>
          </div>
          <div id="login-view" class="tab-content active">
            <form id="login-form">
              <div class="form-group"><label>Email</label><input type="email" class="form-control" id="login-email" placeholder="ejemplo@correo.com" required></div>
              <div class="form-group"><label>Contraseña</label><input type="password" class="form-control" value="123456" required></div>
              <button type="submit" class="btn-submit">Entrar Ahora</button>
            </form>
          </div>
          <div id="register-view" class="tab-content">
            <form id="register-form">
              <div class="form-group"><label>Nombre</label><input type="text" class="form-control" id="reg-name" required></div>
              <div class="form-group"><label>Email</label><input type="email" class="form-control" id="reg-email" required></div>
              <div class="form-group"><label>Contraseña</label><input type="password" class="form-control" id="reg-pass" required></div>
              <button type="submit" class="btn-submit">Crear Cuenta Cliente</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  document.querySelector('#back-home')?.addEventListener('click', (e) => { e.preventDefault(); onBack(); });
  
  document.querySelectorAll('.tab-btn').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn, .tab-content').forEach(el => el.classList.remove('active'));
    btn.classList.add('active');
    document.querySelector(`#${btn.getAttribute('data-tab')}-view`)?.classList.add('active');
  }));

  document.querySelector('#login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = (document.querySelector('#login-email') as HTMLInputElement).value;
    const user = registeredUsers.find(u => u.email === email);
    if (user) onLogin(user);
    else alert('Usuario no encontrado');
  });

  document.querySelector('#register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const newUser: User = {
      id: 'u' + Date.now(),
      name: (document.querySelector('#reg-name') as HTMLInputElement).value,
      email: (document.querySelector('#reg-email') as HTMLInputElement).value,
      role: 'customer'
    };
    registeredUsers.push(newUser);
    onLogin(newUser);
  });
}
