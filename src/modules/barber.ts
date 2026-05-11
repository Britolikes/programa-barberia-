import type { Barber, User } from '../types'

export function renderBarberDashboard(app: HTMLElement, selectedBarber: Barber | null, barbers: Barber[], homeCallback: () => void) {
  if (!selectedBarber) {
    app.innerHTML = `
        <a href="#" class="nav-logo" id="home-link">
          <img src="/logo.png" alt="Barberia Logo" style="height: 45px; width: auto; filter: invert(1);">
        </a>
      
      <div style="position: relative; min-height: calc(100vh - 70px); padding: 6rem 2rem 5rem; display: flex; flex-direction: column; align-items: center; overflow: hidden;">
        <!-- Fondo con Imagen y Overlay -->
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; background: url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1600') center/cover no-repeat;"></div>
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; background: linear-gradient(to bottom, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.85));"></div>

        <div style="text-align: center; margin-bottom: 4rem; position: relative;">
          <h1 style="color: white; font-size: 3.5rem; margin-bottom: 1rem; letter-spacing: -1px; text-shadow: 0 4px 10px rgba(0,0,0,0.5);">Panel de Maestros</h1>
          <p style="color: var(--primary); font-weight: 700; text-transform: uppercase; letter-spacing: 4px; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">Gestión Profesional de Agenda</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem; max-width: 1100px; width: 100%; position: relative;">
          ${barbers.map(barber => `
            <div class="dash-card barber-select-card" style="background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); padding: 3rem 2rem; text-align: center; cursor: pointer; transition: all 0.4s ease; position: relative; border-radius: 24px;" data-id="${barber.id}">
              <div style="width: 140px; height: 140px; border-radius: 50%; margin: 0 auto 2rem; overflow: hidden; border: 4px solid var(--primary); box-shadow: 0 15px 35px rgba(0,0,0,0.3);">
                <img src="${barber.image}" style="width: 100%; height: 100%; object-fit: cover;">
              </div>
              
              <h3 style="color: white; font-size: 1.7rem; margin-bottom: 0.5rem;">${barber.name}</h3>
              <p style="color: #cbd5e1; font-size: 1rem; margin-bottom: 2.5rem; font-style: italic;">${barber.specialty}</p>
              
              <button class="btn btn-primary" style="width: 100%; padding: 1.2rem; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; border-radius: 12px; pointer-events: none; box-shadow: 0 10px 20px rgba(59, 130, 246, 0.2);">
                Acceder al Panel
              </button>
            </div>
          `).join('')}
        </div>
        
        <a href="#" id="back-to-home-link" style="margin-top: 5rem; color: rgba(255,255,255,0.6); text-decoration: none; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease; font-weight: 500; background: rgba(255,255,255,0.05); padding: 0.8rem 1.5rem; border-radius: 50px;">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
           Regresar a la página principal
        </a>
      </div>
    `;

    document.querySelectorAll('.barber-select-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const barber = barbers.find(b => b.id === id);
        renderBarberDashboard(app, barber || null, barbers, homeCallback);
      });
    });

    document.querySelector('#back-to-home-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      homeCallback();
    });
    return;
  }

  app.innerHTML = `
    <nav class="navbar" style="background: #0f172a; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 1rem 4rem;">
      <a href="#" class="nav-logo" id="home-link">
          <img src="/logo.png" alt="Barberia Logo" style="height: 60px; width: auto; filter: invert(1); opacity: 0.8;">
      </a>
      <div class="nav-links">
        <button id="exit-dash" style="background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; color: #ef4444; padding: 0.6rem 1.5rem; border-radius: 50px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 0.5rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
          Salir del Panel
        </button>
      </div>
    </nav>

    <div style="position: relative; min-height: calc(100vh - 70px); padding: 6rem 2rem 5rem; display: flex; flex-direction: column; align-items: center; overflow: hidden;">
      <!-- Fondo con Imagen y Overlay -->
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; background: url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1600') center/cover no-repeat;"></div>
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; background: linear-gradient(to bottom, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.9));"></div>

      <div style="max-width: 900px; width: 100%; position: relative;">
        <!-- Cabecera de Perfil -->
        <div style="display: flex; align-items: center; gap: 2.5rem; margin-bottom: 4rem; background: rgba(255,255,255,0.03); padding: 2rem; border-radius: 30px; backdrop-filter: blur(5px); border: 1px solid rgba(255,255,255,0.05);">
          <div style="width: 120px; height: 120px; border-radius: 50%; overflow: hidden; border: 4px solid var(--primary); box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <img src="${selectedBarber.image}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div>
            <h1 style="color: white; font-size: 2.5rem; margin-bottom: 0.5rem;">Panel de ${selectedBarber.name}</h1>
            <p style="color: var(--primary); font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">${selectedBarber.specialty}</p>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 2.5rem;">
          <!-- Tarjeta de Configuración -->
          <div class="dash-card" style="background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.1); padding: 3rem; border-radius: 24px;">
            <h3 style="color: white; font-size: 1.5rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 1rem;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--primary);"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              Configuración de Calendly
            </h3>
            <p style="color: #94a3b8; margin-bottom: 2rem;">Copia y pega tu link de evento de Calendly aquí para que tus clientes puedan agendar.</p>
            
            <div style="margin-bottom: 2rem;">
              <label style="display: block; color: white; margin-bottom: 0.8rem; font-weight: 600; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">Tu Link Personal</label>
              <input type="text" id="calendly-url-input" value="${selectedBarber.calendlyUrl || ''}" placeholder="https://calendly.com/tu-usuario/cita" 
                     style="width: 100%; padding: 1.2rem; background: rgba(15, 23, 42, 0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: white; font-size: 1rem; outline: none; transition: border-color 0.3s;">
            </div>
            
            <button class="btn btn-primary" id="save-calendly" style="width: 100%; padding: 1.2rem; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; border-radius: 12px; box-shadow: 0 10px 20px rgba(59, 130, 246, 0.2);">
              Guardar y Activar Agenda
            </button>
          </div>

          <!-- Tarjeta de Estado -->
          <div class="dash-card" style="background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.1); padding: 2.5rem; border-radius: 24px;">
            <h3 style="color: white; font-size: 1.3rem; margin-bottom: 1.5rem;">Estado de tu Agenda</h3>
            <div style="padding: 1.2rem; border-radius: 12px; background: ${selectedBarber.calendlyUrl && selectedBarber.calendlyUrl !== '#' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'}; border: 1px solid ${selectedBarber.calendlyUrl && selectedBarber.calendlyUrl !== '#' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}; display: flex; align-items: center; gap: 1rem;">
              <div style="width: 12px; height: 12px; background: ${selectedBarber.calendlyUrl && selectedBarber.calendlyUrl !== '#' ? '#22c55e' : '#ef4444'}; border-radius: 50%; box-shadow: 0 0 10px ${selectedBarber.calendlyUrl && selectedBarber.calendlyUrl !== '#' ? '#22c55e' : '#ef4444'};"></div>
              <span style="color: ${selectedBarber.calendlyUrl && selectedBarber.calendlyUrl !== '#' ? '#4ade80' : '#f87171'}; font-weight: 600;">
                ${selectedBarber.calendlyUrl && selectedBarber.calendlyUrl !== '#' ? 'Agenda Activa y Visible' : 'Agenda Desactivada'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.querySelector('#exit-dash')?.addEventListener('click', homeCallback);
  document.querySelector('#home-link')?.addEventListener('click', homeCallback);
  
  document.querySelector('#save-calendly')?.addEventListener('click', () => {
    const url = (document.querySelector('#calendly-url-input') as HTMLInputElement).value;
    selectedBarber.calendlyUrl = url;
    
    // Persistir en LocalStorage
    localStorage.setItem('barberia_barberos', JSON.stringify(barbers));
    
    alert('¡Configuración guardada! Tu agenda ha sido actualizada permanentemente.');
    renderBarberDashboard(app, selectedBarber, barbers, homeCallback);
  });
}
