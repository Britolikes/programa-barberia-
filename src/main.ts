import './style.css'
import type { Barber, Service, User } from './types'
import { renderAuthPage } from './modules/auth'
import { renderBarberDashboard } from './modules/barber'
import { renderCustomerDashboard } from './modules/customer'

const Icons = {
  scissors: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`,
  razor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v10"/><path d="M12 12l4 4"/><path d="M12 12l-4 4"/><path d="M8 20h8"/><path d="M10 16h4"/></svg>`,
  comb: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6h12v12H6z"/><path d="M9 18v-4"/><path d="M12 18v-4"/><path d="M15 18v-4"/></svg>`,
  pole: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="20" rx="3"/><path d="M9 6h6"/><path d="M9 10h6"/><path d="M9 14h6"/><path d="M9 18h6"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor" style="color: #fbbf24;"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  map: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`
}

let currentUser: User | null = null
const registeredUsers: User[] = [{ id: 'b1', name: 'Marco "The Blade"', email: 'admin@barber.com', role: 'barber' }]
const barbers: Barber[] = [
  { id: 'b1', name: 'Marco "The Blade"', specialty: 'Cortes Clásicos', available: true, email: 'admin@barber.com', calendlyUrl: 'https://calendly.com/marco-barber', image: '/barber_marco_profile_1778199315804.png' },
  { id: 'b2', name: 'Elena Silver', specialty: 'Estilo Moderno', available: true, calendlyUrl: '#', image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=400' }
]
const services: Service[] = [
  { id: 's1', name: 'Corte Imperial', description: 'Corte a tijera o máquina con acabado premium.', price: 30, durationMinutes: 45 },
  { id: 's2', name: 'Ritual de Barba', description: 'Toalla caliente, aceites y perfilado artesanal.', price: 25, durationMinutes: 30 }
]

const app = document.querySelector<HTMLDivElement>('#app')!

function renderHome() {
  app.innerHTML = `
    <nav class="navbar">
      <a href="#" class="nav-logo logo-with-icon">${Icons.pole} <span>BARBERÍA PREMIUM</span></a>
      <div class="nav-links">
        <a href="#servicios">Servicios</a>
        <a href="#barberos">Barberos</a>
        <a href="#info">Horarios</a>
        ${currentUser ? `<button id="goto-dash-nav" class="btn btn-outline" style="border-color: white;">Mi Panel</button>` : `<button id="open-auth" class="btn btn-primary">Acceso</button>`}
      </div>
    </nav>
    <main>
      <section class="hero"><div class="hero-content"><h1>Eleva tu Presencia</h1><p>Maestría en cada corte, distinción en cada detalle.</p><button id="${currentUser ? 'hero-dash' : 'hero-auth'}" class="btn btn-primary">${currentUser ? 'Ver mi Agenda' : 'Reserva tu Lugar'}</button></div></section>
      
      <section id="servicios" class="reveal" style="padding: 10rem 2rem; background: #f8fafc;">
        <div style="max-width: 1200px; margin: 0 auto;">
          <h2 style="text-align: center; margin-bottom: 5rem; font-size: 3rem;">Nuestros Servicios</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 3rem;">
            ${services.map((s, i) => `
              <div class="service-card" style="background: white; padding: 4rem 3rem; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.05); border-top: 6px solid var(--primary);">
                <div class="icon-container" style="margin-bottom: 2rem;">${i === 0 ? Icons.scissors : Icons.razor}</div>
                <h3 style="font-size: 1.8rem; margin-bottom: 1rem;">${s.name}</h3>
                <p style="color: var(--text-muted); line-height: 1.8; margin-bottom: 2rem;">${s.description}</p>
                <div style="font-weight: 800; font-size: 1.5rem; color: var(--primary);">$${s.price}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <section id="barberos" class="reveal barber-pole-border" style="padding: 10rem 2rem; background: white;">
        <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
          <h2 style="font-size: 3rem; margin-bottom: 5rem;">Los Maestros</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 4rem;">
            ${barbers.map(b => `
              <div class="barber-card" style="border-radius: 20px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
                <div style="height: 400px; overflow: hidden;"><img src="${b.image}" style="width: 100%; height: 100%; object-fit: cover; transition: scale 0.5s ease;"></div>
                <div style="padding: 2.5rem; background: #0f172a; color: white;">
                  <h3 style="font-size: 1.6rem; margin-bottom: 0.5rem;">${b.name}</h3>
                  <p style="color: #94a3b8; font-weight: 500;">${b.specialty}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="reveal" style="padding: 10rem 2rem; background: #0f172a; color: white;">
        <div style="max-width: 1200px; margin: 0 auto;">
          <h2 style="text-align: center; margin-bottom: 5rem; font-size: 2.5rem;">Lo que dicen nuestros clientes</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2.5rem;">
            ${[1,2,3].map(() => `
              <div style="background: rgba(255,255,255,0.05); padding: 3rem; border-radius: 15px; border: 1px solid rgba(255,255,255,0.1);">
                <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem;">${Icons.star}${Icons.star}${Icons.star}${Icons.star}${Icons.star}</div>
                <p style="font-style: italic; opacity: 0.8; line-height: 1.8; margin-bottom: 2rem;">"La mejor experiencia que he tenido. La atención al detalle y el ambiente premium son inigualables."</p>
                <div style="display: flex; align-items: center; gap: 1rem;">
                  <div style="width: 50px; height: 50px; border-radius: 50%; background: #334155;"></div>
                  <strong>Juan Pérez</strong>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <section id="info" class="reveal barber-pole-border" style="padding: 10rem 2rem; background: #f8fafc;">
        <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 4rem;">
          <div>
            <h2 style="font-size: 2.5rem; margin-bottom: 2rem;">Visítanos</h2>
            <p style="color: var(--text-muted); line-height: 2; margin-bottom: 3rem;">Estamos ubicados en el corazón de la ciudad, listos para brindarte la mejor experiencia en cuidado personal masculino.</p>
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">${Icons.map} <span>Calle de la Elegancia #123, Distrito Central</span></div>
            <div style="display: flex; align-items: center; gap: 1rem;">${Icons.clock} <span>Lun - Sáb: 09:00 - 20:00</span></div>
          </div>
          <div style="border-radius: 20px; overflow: hidden; height: 350px; background: #cbd5e1;">
            <!-- Mapa simulado -->
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #e2e8f0; color: #64748b; font-weight: 700;">MAPA INTERACTIVO</div>
          </div>
        </div>
      </section>

      <footer style="padding: 6rem 2rem; background: #020617; color: white; text-align: center; border-top: 1px solid rgba(255,255,255,0.05);">
        <div style="margin-bottom: 3rem;">${Icons.pole} <h2 style="display: inline; margin-left: 1rem; letter-spacing: 2px;">BARBERÍA PREMIUM</h2></div>
        <div style="display: flex; justify-content: center; gap: 3rem; margin-bottom: 3rem; opacity: 0.6;">
          <a href="#" style="color: white;">Instagram</a><a href="#" style="color: white;">Facebook</a><a href="#" style="color: white;">Twitter</a>
        </div>
        <p style="opacity: 0.4;">&copy; 2024 Barbería Premium S.A. | Estilo con Herencia.</p>
      </footer>
    </main>
  `;

  document.querySelector('#open-auth')?.addEventListener('click', () => renderAuthPage(app, registeredUsers, onLoginSuccess, renderHome));
  document.querySelector('#hero-auth')?.addEventListener('click', () => renderAuthPage(app, registeredUsers, onLoginSuccess, renderHome));
  document.querySelector('#hero-dash')?.addEventListener('click', renderDashboard);
  document.querySelector('#goto-dash-nav')?.addEventListener('click', renderDashboard);

  const observer = new IntersectionObserver(ents => ents.forEach(e => { if (e.isIntersecting) e.target.classList.add('active') }));
  document.querySelectorAll('.reveal').forEach(r => observer.observe(r));
}

function onLoginSuccess(user: User) { currentUser = user; renderDashboard(); }
function logout() { currentUser = null; renderHome(); }
function renderDashboard() {
  if (!currentUser) return renderHome();
  currentUser.role === 'barber' ? renderBarberDashboard(app, currentUser, barbers, logout, renderHome) : renderCustomerDashboard(app, currentUser, barbers, logout, renderHome);
}

renderHome();
