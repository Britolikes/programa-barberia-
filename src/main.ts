import './style.css'
import type { Barber, User } from './types'

// SVG Icons
const Icons = {
  scissors: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`,
  razor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v10"/><path d="M12 12l4 4"/><path d="M12 12l-4 4"/><path d="M8 20h8"/><path d="M10 16h4"/></svg>`,
  comb: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6h12v12H6z"/><path d="M9 18v-4"/><path d="M12 18v-4"/><path d="M15 18v-4"/></svg>`,
  chair: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21v-8"/><path d="M7 13h10"/><path d="M7 13l-2 5h14l-2-5"/><path d="M12 7V3"/><path d="M8 7h8"/><path d="M9 13V7h6v6"/></svg>`,
  pole: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="20" rx="3"/><path d="M9 6h6"/><path d="M9 10h6"/><path d="M9 14h6"/><path d="M9 18h6"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  calendly: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.6c-5.302 0-9.6-4.298-9.6-9.6S6.698 2.4 12 2.4s9.6 4.298 9.6 9.6-4.298 9.6-9.6 9.6zm4.8-10.8c0 2.651-2.149 4.8-4.8 4.8S7.2 13.451 7.2 10.8s2.149-4.8 4.8-4.8 4.8 2.149 4.8 4.8z"/></svg>`,
  arrowLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`
}

// Global State
let currentUser: User | null = null

const registeredUsers: User[] = [
  { id: 'b1', name: 'Marco "The Blade"', email: 'admin@barber.com', role: 'barber' }
]

const barbers: Barber[] = [
  { id: 'b1', name: 'Marco "The Blade"', specialty: 'Cortes Clásicos', available: true, email: 'admin@barber.com', calendlyUrl: 'https://calendly.com/marco-barber' }
]

const app = document.querySelector<HTMLDivElement>('#app')!

function renderHome() {
  app.innerHTML = `
    <nav class="navbar"><a href="#" class="nav-logo logo-with-icon">${Icons.pole} <span>BARBERÍA PREMIUM</span></a><div class="nav-links"><button id="open-auth" class="btn btn-primary">Acceso</button></div></nav>
    <main><section class="hero"><div class="hero-content"><h1>Arte en tu Cabello</h1><p>Reservas rápidas con Calendly.</p><button id="hero-auth" class="btn btn-primary">Entrar para Reservar</button></div></section></main>
  `
  document.querySelector('#open-auth')?.addEventListener('click', renderAuth)
  document.querySelector('#hero-auth')?.addEventListener('click', renderAuth)
}

function renderAuth() {
  app.innerHTML = `
    <div class="auth-page">
      <a href="#" class="back-home" id="back-home">${Icons.arrowLeft} Volver</a>
      <div class="auth-visual"><div class="auth-visual-content"><h1>Eleva tu Estilo</h1><p>Conecta con tu barbero favorito.</p></div></div>
      <div class="auth-form-container">
        <div class="auth-card">
          <div id="login-tabs" style="display: flex; gap: 1rem; margin-bottom: 2.5rem; justify-content: center;">
            <button class="tab-btn active" data-tab="login">Entrar</button>
            <button class="tab-btn" data-tab="register">Registrarse</button>
          </div>
          <div id="login-view" class="tab-content active">
            <form id="login-form"><div class="form-group"><label>Email</label><input type="email" class="form-control" id="login-email" required></div><div class="form-group"><label>Pass</label><input type="password" class="form-control" value="123456" required></div><button type="submit" class="btn-submit">Entrar Ahora</button></form>
          </div>
          <div id="register-view" class="tab-content">
            <form id="register-form"><div class="form-group"><label>Nombre</label><input type="text" class="form-control" id="reg-name" required></div><div class="form-group"><label>Email</label><input type="email" class="form-control" id="reg-email" required></div><div class="form-group"><label>Pass</label><input type="password" class="form-control" id="reg-pass" required></div><button type="submit" class="btn-submit">Crear Cuenta</button></form>
          </div>
        </div>
      </div>
    </div>
  `
  document.querySelector('#back-home')?.addEventListener('click', renderHome)
  document.querySelectorAll('.tab-btn').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn, .tab-content').forEach(el => el.classList.remove('active'));
    btn.classList.add('active');
    document.querySelector(`#${btn.getAttribute('data-tab')}-view`)?.classList.add('active');
  }));

  document.querySelector('#login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = (document.querySelector('#login-email') as HTMLInputElement).value;
    const user = registeredUsers.find(u => u.email === email);
    if (user) { currentUser = user; renderDashboard(); } else alert('No encontrado');
  });
}

function renderDashboard() {
  if (currentUser?.role === 'barber') renderBarberDashboard()
  else renderCustomerDashboard()
}

function renderBarberDashboard() {
  const barber = barbers.find(b => b.id === currentUser?.id)
  app.innerHTML = `
    <nav class="navbar scrolled"><a href="#" class="nav-logo logo-with-icon" id="home-link">${Icons.pole} <span>BARBERÍA PREMIUM</span></a><div class="nav-links"><button class="logout-btn" id="logout-dash">Salir</button></div></nav>
    <div class="dashboard active">
      <h1>Panel de Barbero</h1>
      <div class="dash-card">
        <h3>Tu Link de Calendly</h3>
        <p>Los clientes usarán este link para agendar contigo.</p>
        <div class="form-group" style="margin-top: 1rem;">
          <input type="url" id="calendly-url-input" class="form-control" value="${barber?.calendlyUrl || ''}" placeholder="https://calendly.com/tu-usuario">
          <button id="save-calendly" class="btn btn-primary" style="margin-top: 1rem;">Guardar Link</button>
        </div>
      </div>
    </div>
  `
  document.querySelector('#logout-dash')?.addEventListener('click', () => { currentUser = null; renderHome(); })
  document.querySelector('#save-calendly')?.addEventListener('click', () => {
    const url = (document.querySelector('#calendly-url-input') as HTMLInputElement).value
    if (barber) barber.calendlyUrl = url;
    alert('Link de Calendly guardado!');
  })
}

function renderCustomerDashboard() {
  app.innerHTML = `
    <nav class="navbar scrolled"><a href="#" class="nav-logo logo-with-icon" id="home-link">${Icons.pole} <span>BARBERÍA PREMIUM</span></a><div class="nav-links"><button class="logout-btn" id="logout-dash">Salir</button></div></nav>
    <div class="dashboard active">
      <div class="dash-header"><h1>¡Hola, ${currentUser?.name}!</h1><p>Selecciona un barbero para ver su agenda.</p></div>
      <div class="dash-grid" style="grid-template-columns: 300px 1fr; gap: 2rem;">
        <div class="dash-card">
          <h3>Elegir Barbero</h3>
          <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem;">
            ${barbers.map(b => `
              <button class="btn btn-outline barber-select-btn" data-url="${b.calendlyUrl}" style="text-align: left; padding: 1rem;">
                <strong>${b.name}</strong><br><small>${b.specialty}</small>
              </button>
            `).join('')}
          </div>
        </div>
        <div class="dash-card" style="padding: 0; min-height: 600px; background: white;">
          <div id="calendly-widget-container" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
            <div style="text-align: center;">${Icons.calendar}<br>Selecciona un barbero para cargar su calendario</div>
          </div>
        </div>
      </div>
    </div>
  `
  document.querySelector('#logout-dash')?.addEventListener('click', () => { currentUser = null; renderHome(); })
  document.querySelectorAll('.barber-select-btn').forEach(btn => btn.addEventListener('click', () => {
    const url = btn.getAttribute('data-url');
    const container = document.querySelector('#calendly-widget-container')!;
    if (url) {
      container.innerHTML = `<div class="calendly-inline-widget" data-url="${url}" style="min-width:320px;height:630px;"></div>`;
      // @ts-ignore
      Calendly.initInlineWidget({ url: url, parentElement: container });
    } else {
      container.innerHTML = '<p>Este barbero aún no ha configurado su Calendly.</p>';
    }
  }));
}

renderHome()
