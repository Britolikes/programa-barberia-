import type { Barber, User } from '../types'

const Icons = {
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`
}

export function renderCustomerDashboard(app: HTMLElement, currentUser: User, barbers: Barber[], logoutCallback: () => void, homeCallback: () => void) {
  app.innerHTML = `
    <nav class="navbar scrolled">
      <a href="#" class="nav-logo logo-with-icon" id="home-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:24px;"><rect x="9" y="2" width="6" height="20" rx="3"/><path d="M9 6h6"/><path d="M9 10h6"/><path d="M9 14h6"/><path d="M9 18h6"/></svg>
        <span>BARBERÍA PREMIUM</span>
      </a>
      <div class="nav-links"><button class="logout-btn" id="logout-dash">Salir</button></div>
    </nav>
    <div class="dashboard active">
      <div class="dash-header">
        <div style="display: flex; align-items: center; gap: 1.5rem;">
          <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; overflow: hidden;">
            ${currentUser?.avatar ? `<img src="${currentUser.avatar}" style="width: 100%; height: 100%; object-fit: cover;">` : currentUser?.name.charAt(0)}
          </div>
          <div><h1>¡Hola, ${currentUser?.name}!</h1><p style="color: var(--text-muted);">${currentUser?.email}</p></div>
        </div>
      </div>
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
  `;

  document.querySelector('#logout-dash')?.addEventListener('click', logoutCallback);
  document.querySelector('#home-link')?.addEventListener('click', homeCallback);
  
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
