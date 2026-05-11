import type { Barber, User } from '../types'

const Icons = {
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`
}

export function renderReservationView(app: HTMLElement, selectedBarber: Barber, barbers: Barber[], homeCallback: () => void) {
  app.innerHTML = `
    <nav class="navbar" style="background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(15px); border-bottom: 1px solid rgba(0,0,0,0.05); padding: 1rem 4rem;">
      <a href="#" class="nav-logo" id="home-link">
        <img src="/logo.png" alt="Barberia Logo" style="height: 45px; width: auto;">
      </a>
      <div class="nav-links">
        <button id="back-to-home" style="background: none; border: 1px solid #0f172a; color: #0f172a; padding: 0.6rem 1.5rem; border-radius: 50px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 0.5rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Volver al Inicio
        </button>
      </div>
    </nav>

    <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); min-height: 100vh; padding: 10rem 2rem 5rem;">
      <div style="max-width: 1400px; margin: 0 auto;">
        
        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 3rem; align-items: start;">
          
          <!-- Columna Izquierda: Info del Barbero -->
          <div style="display: flex; flex-direction: column; gap: 2rem;">
            <div class="dash-card" style="padding: 3rem; text-align: center; border-top: 5px solid var(--primary);">
              <div style="width: 120px; height: 120px; border-radius: 50%; margin: 0 auto 2rem; overflow: hidden; border: 4px solid #f1f5f9; box-shadow: 0 8px 20px rgba(0,0,0,0.1);">
                <img src="${selectedBarber.image}" style="width: 100%; height: 100%; object-fit: cover;">
              </div>
              <h1 style="font-size: 2rem; margin-bottom: 0.5rem; color: #0f172a;">${selectedBarber.name}</h1>
              <p style="color: var(--primary); font-weight: 700; text-transform: uppercase; letter-spacing: 2px; font-size: 0.85rem; margin-bottom: 2rem;">${selectedBarber.specialty}</p>
              
              <div style="display: flex; justify-content: center; gap: 0.5rem; margin-bottom: 2rem; opacity: 0.7;">
                ${[1,2,3,4,5].map(() => `<svg width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`).join('')}
              </div>
              
              <p style="color: var(--text-muted); line-height: 1.7; font-size: 0.95rem;">
                Maestro barbero con amplia trayectoria en cortes de alta precisión. Reserva tu espacio y disfruta de una atención exclusiva.
              </p>
            </div>

            <div class="dash-card" style="background: #0f172a; color: white; padding: 2.5rem;">
              <h3 style="margin-bottom: 1.5rem; font-size: 1.2rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem;">Experiencia Premium</h3>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 1rem;">
                <li style="display: flex; align-items: center; gap: 1rem; font-size: 0.9rem;">
                  <span style="color: var(--primary);">●</span> Asesoría de imagen personalizada
                </li>
                <li style="display: flex; align-items: center; gap: 1rem; font-size: 0.9rem;">
                  <span style="color: var(--primary);">●</span> Bebida de cortesía
                </li>
                <li style="display: flex; align-items: center; gap: 1rem; font-size: 0.9rem;">
                  <span style="color: var(--primary);">●</span> Toalla caliente y exfoliación
                </li>
              </ul>
            </div>
          </div>

          <!-- Columna Derecha: El Widget de Calendly -->
          <div class="dash-card" style="padding: 0; min-height: 950px; background: white; border-radius: 24px; box-shadow: 0 40px 80px rgba(0,0,0,0.15);">
            <div id="calendly-widget-container" style="width: 100%; height: 950px;"></div>
          </div>

        </div>
      </div>
    </div>
  `;

  document.querySelector('#home-link')?.addEventListener('click', homeCallback);
  document.querySelector('#back-to-home')?.addEventListener('click', homeCallback);
  
  const container = document.querySelector('#calendly-widget-container') as HTMLElement;

  if (selectedBarber.calendlyUrl && selectedBarber.calendlyUrl !== '#') {
    const initWidget = () => {
      // @ts-ignore
      if (window.Calendly) {
        // @ts-ignore
        window.Calendly.initInlineWidget({ 
          url: selectedBarber.calendlyUrl, 
          parentElement: container 
        });
      } else {
        setTimeout(initWidget, 100);
      }
    };
    initWidget();
  } else {
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 4rem; text-align: center;">
        <div style="font-size: 4rem; margin-bottom: 2rem;">📅</div>
        <h3>Agenda no disponible</h3>
        <p style="color: var(--text-muted); max-width: 400px; margin-top: 1rem;">Este barbero aún no ha configurado su agenda en línea. Por favor, elige a otro maestro o inténtalo más tarde.</p>
        <button class="btn btn-primary" id="error-back" style="margin-top: 2rem;">Elegir otro barbero</button>
      </div>
    `;
    document.querySelector('#error-back')?.addEventListener('click', homeCallback);
  }
}
