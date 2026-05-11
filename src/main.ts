import './style.css'
import type { Barber, Service, User } from './types'
import { renderBarberDashboard } from './modules/barber'
import { renderReservationView } from './modules/customer'

const Icons = {
  scissors: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`,
  razor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v10"/><path d="M12 12l4 4"/><path d="M12 12l-4 4"/><path d="M8 20h8"/><path d="M10 16h4"/></svg>`,
  comb: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6h12v12H6z"/><path d="M9 18v-4"/><path d="M12 18v-4"/><path d="M15 18v-4"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor" style="color: #fbbf24;"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  map: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`
}

// Cargar barberos desde LocalStorage o usar los por defecto
const defaultBarbers: Barber[] = [
  { id: 'b1', name: 'Marco "The Blade"', specialty: 'Cortes Clásicos', available: true, email: 'admin@barber.com', calendlyUrl: 'https://calendly.com/acme-demo/30min', image: '/barber_marco_profile_1778199315804.png' },
  { id: 'b2', name: 'Elena Silver', specialty: 'Estilo Moderno', available: true, calendlyUrl: 'https://calendly.com/acme-demo/30min', image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=400' }
]

const savedBarbers = localStorage.getItem('barberia_barberos');
const barbers: Barber[] = savedBarbers ? JSON.parse(savedBarbers) : defaultBarbers;

const services: Service[] = [
  { id: 's1', name: 'Corte Imperial', description: 'Corte a tijera o máquina con acabado premium.', price: 30, durationMinutes: 45 },
  { id: 's2', name: 'Ritual de Barba', description: 'Toalla caliente, aceites y perfilado artesanal.', price: 25, durationMinutes: 30 }
]

const app = document.querySelector<HTMLDivElement>('#app')!

function renderHome() {
  app.innerHTML = `
    <nav class="navbar">
      <a href="#" class="nav-logo" id="home-link" style="display: flex; align-items: center; gap: 1rem;">
        <img src="/logo.png" id="navbar-logo" alt="Barberia Logo" style="height: 50px; width: auto; object-fit: contain; filter: invert(1); transition: filter 0.3s ease;">
        <span id="navbar-text" style="font-size: 1.2rem; letter-spacing: 2px; font-weight: 800; color: white; transition: color 0.3s ease;">BARBERÍA PREMIUM</span>
      </a>
      <div class="nav-links">
        <a href="#servicios">Servicios</a>
        <a href="#barberos">Barberos</a>
        <a href="#info">Horarios</a>
        <button id="barber-access" class="btn btn-outline" style="border-color: white; color: white;">Soy Barbero</button>
      </div>
    </nav>
    <main>
      <section class="hero"><div class="hero-content"><h1>Eleva tu Presencia</h1><p class="hero-slogan">Maestría en cada corte, <span>distinción en cada detalle.</span></p><button id="hero-reserve" class="btn btn-primary">Reserva tu Lugar</button></div></section>
      
      <section id="services" class="barber-pole-border" style="padding: 10rem 2rem; background: linear-gradient(to bottom, #f8fafc, #ffffff);">
        <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
          <h2 style="font-size: 3.5rem; margin-bottom: 1rem; color: #0f172a; font-weight: 900; letter-spacing: -2px;">Excelencia en cada detalle</h2>
          <p style="color: var(--primary); font-weight: 800; text-transform: uppercase; letter-spacing: 5px; margin-bottom: 6rem; font-size: 0.85rem; opacity: 0.8;">Nuestros Servicios Especializados</p>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 3rem;">
            ${services.map((service, index) => `
              <div class="dash-card service-premium-card" style="padding: 3rem 2.5rem; text-align: left; border-left: 5px solid var(--primary); transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); position: relative; overflow: hidden; background: white; border-radius: 0 20px 20px 0; box-shadow: 0 15px 40px rgba(0,0,0,0.03);">
                
                <!-- Número decorativo de fondo -->
                <div style="position: absolute; right: -10px; top: -10px; font-size: 8rem; font-weight: 900; color: rgba(15, 23, 42, 0.03); user-select: none; z-index: 0;">
                  0${index + 1}
                </div>

                <div style="position: relative; z-index: 1;">
                  <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 2rem;">
                    <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%); width: 60px; height: 60px; border-radius: 16px; display: flex; align-items: center; justify-content: center; color: var(--primary); box-shadow: inset 0 0 0 1px rgba(59, 130, 246, 0.1);">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12l1 9H5l1-9z"/><path d="M7 12v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-8"/><path d="M12 22V12"/></svg>
                    </div>
                    <span style="background: #f1f5f9; color: #64748b; font-size: 0.7rem; font-weight: 800; padding: 0.4rem 0.8rem; border-radius: 50px; text-transform: uppercase; letter-spacing: 1px;">Premium</span>
                  </div>

                  <h3 style="font-size: 1.6rem; margin-bottom: 1rem; color: #0f172a; font-weight: 800;">${service.name}</h3>
                  <p style="color: #64748b; font-size: 1rem; line-height: 1.7; margin-bottom: 2.5rem; max-width: 90%;">${service.description}</p>
                  
                  <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #f1f5f9; padding-top: 2rem;">
                    <div>
                      <span style="display: block; font-size: 0.75rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; margin-bottom: 0.3rem;">Inversión</span>
                      <span style="font-size: 1.8rem; font-weight: 900; color: #0f172a;">$${service.price}</span>
                    </div>
                    <div style="text-align: right;">
                      <span style="display: block; font-size: 0.75rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; margin-bottom: 0.3rem;">Duración</span>
                      <span style="font-size: 1rem; color: #0f172a; font-weight: 700;">${service.durationMinutes} min</span>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <section id="barberos" class="barber-pole-border" style="padding: 10rem 2rem; background: #ffffff; position: relative; overflow: hidden;">
        <!-- Decoración de fondo de la sección -->
        <div style="position: absolute; left: -50px; top: 10%; opacity: 0.03; transform: rotate(-15deg); color: #0f172a; pointer-events: none;">
          <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M6 3h12l1 9H5l1-9z"/><path d="M7 12v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-8"/><path d="M12 22V12"/></svg>
        </div>

        <div style="max-width: 1200px; margin: 0 auto; text-align: center; position: relative;">
          <h2 style="font-size: 3.5rem; margin-bottom: 1rem; color: #0f172a; font-weight: 900; letter-spacing: -2px;">Los Maestros</h2>
          <p style="color: var(--primary); font-weight: 800; text-transform: uppercase; letter-spacing: 5px; margin-bottom: 6rem; font-size: 0.85rem; opacity: 0.8;">Expertos en el arte de la distinción</p>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 4rem;">
            ${barbers.map((barber, index) => `
              <div class="dash-card service-premium-card" style="padding: 0; text-align: center; transition: all 0.4s ease; border-radius: 24px; background: #f8fafc; border: 1px solid rgba(0,0,0,0.03); overflow: hidden;">
                
                <!-- Cabecera de la tarjeta con la foto -->
                <div style="position: relative; height: 220px; background: #0f172a; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                   <img src="${barber.image}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.7; transition: scale 0.5s ease;">
                   <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, transparent, rgba(15,23,42,0.9));"></div>
                   
                   <!-- Foto pequeña flotante -->
                   <div style="position: absolute; bottom: -40px; width: 100px; height: 100px; border-radius: 50%; border: 4px solid #f8fafc; overflow: hidden; box-shadow: 0 10px 20px rgba(0,0,0,0.2); z-index: 2;">
                      <img src="${barber.image}" style="width: 100%; height: 100%; object-fit: cover;">
                   </div>
                   
                   <div style="position: absolute; top: 20px; right: 20px; font-size: 4rem; font-weight: 900; color: rgba(255,255,255,0.05); user-select: none;">
                    0${index + 1}
                   </div>
                </div>
                
                <div style="padding: 4rem 2.5rem 2.5rem;">
                  <h3 style="font-size: 1.6rem; margin-bottom: 0.5rem; color: #0f172a; font-weight: 800;">${barber.name}</h3>
                  <p style="color: var(--primary); font-weight: 800; text-transform: uppercase; letter-spacing: 2px; font-size: 0.75rem; margin-bottom: 1.5rem;">${barber.specialty}</p>
                  
                  <div style="display: flex; justify-content: center; gap: 0.4rem; margin-bottom: 2rem;">
                    ${[1,2,3,4,5].map(() => `<svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`).join('')}
                  </div>
                  
                  <p style="color: #64748b; font-size: 0.95rem; line-height: 1.6; margin-bottom: 2.5rem; font-style: italic;">
                    "Especialista en acabados de alta precisión y asesoría de imagen personalizada para el hombre moderno."
                  </p>
                  
                  <button class="btn btn-primary reserve-btn" data-id="${barber.id}" style="width: 100%; padding: 1.2rem; font-weight: 800; border-radius: 12px; letter-spacing: 2px; text-transform: uppercase; font-size: 0.85rem;">
                    Reservar Cita
                  </button>
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
        <div style="max-width: 1200px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 5rem;">
            <h2 style="font-size: 3rem; margin-bottom: 1.5rem;">Ubicación de Élite</h2>
            <p style="color: var(--text-muted); max-width: 600px; margin: 0 auto;">Encuéntranos en el distrito más exclusivo de la ciudad.</p>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 0; background: white; border-radius: 30px; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.1); border: 1px solid rgba(0,0,0,0.05);">
            <div style="padding: 5rem; display: flex; flex-direction: column; justify-content: center;">
              <div class="icon-container" style="background: var(--primary); color: white;">${Icons.map}</div>
              <h3 style="font-size: 2rem; margin-bottom: 1.5rem;">Nuestra Sede</h3>
              <p style="color: var(--text-muted); line-height: 2; margin-bottom: 2.5rem; font-size: 1.1rem;">Calle de la Elegancia #123, Edificio Royal, Piso 1.<br>Distrito Central, Ciudad Capital.</p>
              
              <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 3rem;">
                <div style="display: flex; align-items: center; gap: 1rem; color: var(--text-main); font-weight: 600;">
                  <div style="color: var(--primary);">${Icons.clock}</div> Lun - Sáb: 09:00 AM - 08:00 PM
                </div>
                <div style="display: flex; align-items: center; gap: 1rem; color: var(--text-main); font-weight: 600;">
                  <div style="color: var(--primary);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div> +1 800 BARBER
                </div>
              </div>

              <a href="https://maps.google.com" target="_blank" class="btn btn-primary" style="text-align: center; padding: 1.2rem;">Cómo llegar ahora</a>
            </div>
            
            <div style="height: 600px; min-height: 400px; position: relative;">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.01923456789!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050c58!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1634567890123!5m2!1sen!2sus" 
                style="width: 100%; height: 100%; border:0; filter: grayscale(0.2) contrast(1.1);" 
                allowfullscreen="" 
                loading="lazy">
              </iframe>
            </div>
          </div>
        </div>
      </section>

      <footer style="padding: 6rem 2rem; background: #020617; color: white; text-align: center; border-top: 1px solid rgba(255,255,255,0.05);">
        <div style="margin-bottom: 3rem;">
          <img src="/logo.png" alt="Barberia Logo" style="height: 60px; width: auto; filter: invert(1); opacity: 0.8;">
        </div>
        <div style="display: flex; justify-content: center; gap: 3rem; margin-bottom: 3rem; opacity: 0.6;">
          <a href="#" style="color: white;">Instagram</a><a href="#" style="color: white;">Facebook</a><a href="#" style="color: white;">Twitter</a>
        </div>
        <p style="opacity: 0.4;">&copy; 2024 Barbería Premium S.A. | Estilo con Herencia.</p>
      </footer>
    </main>
  `;

  document.querySelector('#barber-access')?.addEventListener('click', () => renderBarberDashboard(app, null, barbers, renderHome));
  document.querySelector('#hero-reserve')?.addEventListener('click', () => {
    document.querySelector('#barberos')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.querySelectorAll('.reserve-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const barber = barbers.find(b => b.id === id);
      if (barber) renderReservationView(app, barber, barbers, renderHome);
    });
  });

  const observer = new IntersectionObserver(ents => ents.forEach(e => { if (e.isIntersecting) e.target.classList.add('active') }));
  document.querySelectorAll('.reveal').forEach(r => observer.observe(r));
}

renderHome();

// Sensor de scroll para cambiar el color de la navbar
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  const logo = document.querySelector('#navbar-logo') as HTMLElement;
  const logoText = document.querySelector('#navbar-text') as HTMLElement;
  const barberBtn = document.querySelector('#barber-access') as HTMLElement;

  if (window.scrollY > 50) {
    nav?.classList.add('scrolled');
    if (logo) logo.style.filter = 'none';
    if (logoText) logoText.style.color = '#0f172a';
    if (barberBtn) {
      barberBtn.style.borderColor = '#0f172a';
      barberBtn.style.color = '#0f172a';
    }
  } else {
    nav?.classList.remove('scrolled');
    if (logo) logo.style.filter = 'invert(1)';
    if (logoText) logoText.style.color = 'white';
    if (barberBtn) {
      barberBtn.style.borderColor = 'white';
      barberBtn.style.color = 'white';
    }
  }
});
