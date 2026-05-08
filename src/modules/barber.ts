import type { Barber, User } from '../types'

export function renderBarberDashboard(app: HTMLElement, currentUser: User, barbers: Barber[], logoutCallback: () => void, homeCallback: () => void) {
  const barber = barbers.find(b => b.id === currentUser?.id)
  app.innerHTML = `
    <nav class="navbar scrolled">
      <a href="#" class="nav-logo logo-with-icon" id="home-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:24px;"><rect x="9" y="2" width="6" height="20" rx="3"/><path d="M9 6h6"/><path d="M9 10h6"/><path d="M9 14h6"/><path d="M9 18h6"/></svg>
        <span>BARBERÍA PREMIUM</span>
      </a>
      <div class="nav-links"><button class="logout-btn" id="logout-dash">Salir</button></div>
    </nav>
    <div class="dashboard active">
      <h1>Panel de Barbero</h1>
      <div class="dash-grid" style="grid-template-columns: 1fr; gap: 2rem;">
        <div class="dash-card">
          <h3>Configuración de Calendly</h3>
          <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Copia y pega tu link de evento de Calendly aquí para que tus clientes puedan agendar.</p>
          <div class="form-group">
            <label>Tu Link de Calendly</label>
            <input type="url" id="calendly-url-input" class="form-control" value="${barber?.calendlyUrl || ''}" placeholder="https://calendly.com/tu-perfil/cita">
            <button id="save-calendly" class="btn btn-primary" style="margin-top: 1.5rem; width: 100%;">Guardar y Activar Agenda</button>
          </div>
        </div>
        
        <div class="dash-card">
          <h3>Estado de la Agenda</h3>
          <div style="padding: 1.5rem; border-radius: 8px; background: ${barber?.calendlyUrl ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'}; color: ${barber?.calendlyUrl ? '#166534' : '#991b1b'}; border: 1px solid currentColor;">
            <strong>${barber?.calendlyUrl ? '● Agenda Activa' : '○ Agenda Desactivada'}</strong>
            <p style="font-size: 0.9rem; margin-top: 0.5rem;">${barber?.calendlyUrl ? 'Tus clientes ya pueden reservar citas contigo desde la web.' : 'Debes configurar tu link de Calendly para aparecer en la lista de barberos.'}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  document.querySelector('#logout-dash')?.addEventListener('click', logoutCallback);
  document.querySelector('#home-link')?.addEventListener('click', homeCallback);
  
  document.querySelector('#save-calendly')?.addEventListener('click', () => {
    const url = (document.querySelector('#calendly-url-input') as HTMLInputElement).value;
    if (barber) {
      barber.calendlyUrl = url;
      alert('¡Configuración guardada! Tu agenda ha sido actualizada.');
      renderBarberDashboard(app, currentUser, barbers, logoutCallback, homeCallback);
    }
  });
}
