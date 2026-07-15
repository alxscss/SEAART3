import { useMemo, useState } from 'react';
import {
  FiBell, FiCalendar, FiCheck, FiChevronRight, FiDownload, FiMail,
  FiMapPin, FiMenu, FiPhone, FiShield, FiUsers, FiX
} from 'react-icons/fi';

const grades = ['1° Primaria','2° Primaria','3° Primaria','4° Primaria','5° Primaria','6° Primaria','1° Secundaria','2° Secundaria','3° Secundaria'];

const notices = [
  { id: 1, type: 'Importante', title: 'Inscripciones ciclo escolar 2026–2027', text: 'Ya puedes iniciar el proceso de inscripción. Agenda tu cita y asegura el lugar de tu hija o hijo.', date: '14 de julio de 2026', audience: 'Todos', image: './images/school-sign.avif' },
  { id: 2, type: 'Evento', title: 'Reunión de padres de familia', text: 'Jueves 24 de julio a las 17:00 h en el auditorio escolar. ¡Te esperamos!', date: '14 de julio de 2026', audience: '3° Primaria', image: './images/school-1.avif' },
  { id: 3, type: 'Aviso', title: 'Entrega de boletas de evaluación', text: 'La entrega de boletas será el 22 y 23 de julio en el horario habitual.', date: '13 de julio de 2026', audience: 'Primaria', image: './images/school-2.avif' },
  { id: 4, type: 'Logro', title: 'Reconocimiento a estudiantes', text: 'Celebramos la participación destacada de nuestra comunidad escolar.', date: '12 de julio de 2026', audience: 'Secundaria', image: './images/school-3.avif' },
];

function Logo() {
  return <a className="brand" href="#inicio" aria-label="Ir al inicio"><img src="./images/school-shield.avif" alt="Escudo escolar"/><span><strong>Colegio Artículo Tercero Constitucional</strong><small>Derecho a la educación</small></span></a>;
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('Todos');
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [subscribed, setSubscribed] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(null);
  const visibleNotices = useMemo(() => filter === 'Todos' ? notices : notices.filter(n => n.audience === filter || n.audience === 'Todos' || (filter.includes('Primaria') && n.audience === 'Primaria') || (filter.includes('Secundaria') && n.audience === 'Secundaria')), [filter]);

  const toggleGrade = (grade) => setSelectedGrades(current => current.includes(grade) ? current.filter(g => g !== grade) : [...current, grade]);
  const subscribe = (e) => { e.preventDefault(); setSubscribed(true); };

  return <div className="site-shell">
    <header className="header">
      <div className="header-inner">
        <Logo/>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir navegación">{menuOpen ? <FiX/> : <FiMenu/>}</button>
        <nav className={menuOpen ? 'nav open' : 'nav'} onClick={() => setMenuOpen(false)}>
          <a href="#inicio">Inicio</a><a href="#escuela">Nuestra escuela</a><a href="#avisos">Avisos</a><a href="#inscripciones">Inscripciones</a><a href="#utiles">Listas de útiles</a><a href="#contacto">Contacto</a>
        </nav>
        <a className="button compact desktop-cta" href="#notificaciones"><FiBell/> Recibir avisos</a>
      </div>
    </header>

    <main>
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <h1>Una escuela cercana a cada familia</h1>
          <p>Formamos estudiantes íntegros con valores, pensamiento crítico y compromiso social para transformar su comunidad.</p>
          <div className="hero-actions"><a className="button" href="#inscripciones">Inscripciones abiertas <FiChevronRight/></a><a className="text-link" href="#escuela">Conoce más sobre nuestra escuela</a></div>
        </div>
        <div className="hero-media"><img src="./images/hero-school.png" alt="Docentes conversando con estudiantes en el patio escolar"/></div>
      </section>

      <section className="section notices" id="avisos">
        <div className="section-heading"><div><h2>Avisos destacados</h2><p>Información reciente para nuestra comunidad.</p></div><span className="date"><FiCalendar/> 15 de julio de 2026</span></div>
        <div className="filter-row" aria-label="Filtrar avisos">
          {['Todos','Primaria','Secundaria'].map(item => <button key={item} className={filter === item ? 'filter active' : 'filter'} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <div className="notice-grid">
          {visibleNotices.map(n => <article className="notice-card" key={n.id}>
            <img src={n.image} alt=""/><div className="notice-body"><span className="notice-type">{n.type}</span><h3>{n.title}</h3><p>{n.text}</p><footer><span>{n.date}</span><button onClick={() => setNoticeOpen(n)}>Leer aviso</button></footer></div>
          </article>)}
        </div>
      </section>

      <section className="grade-explorer section" id="escuela">
        <div className="section-heading"><div><h2>Explora por grado</h2><p>Selecciona el grado para conocer avisos, actividades y documentos.</p></div></div>
        <div className="grade-groups"><div><h3>Primaria</h3><div className="grade-row">{grades.slice(0,6).map(g => <button key={g} onClick={() => setFilter(g)}><strong>{g.split(' ')[0]}</strong><span>Primaria</span></button>)}</div></div><div><h3>Secundaria</h3><div className="grade-row">{grades.slice(6).map(g => <button key={g} onClick={() => setFilter(g)}><strong>{g.split(' ')[0]}</strong><span>Secundaria</span></button>)}</div></div></div>
      </section>

      <section className="notification section" id="notificaciones">
        <div className="notification-photo"><img src="./images/notification-family.png" alt="Madre e hija consultando información escolar"/></div>
        <div className="notification-panel">
          {!subscribed ? <><span className="bell"><FiBell/></span><h2>Recibe avisos importantes en tu correo</h2><p>Elige uno o varios grados y mantente al día con comunicados, eventos y recordatorios relevantes para tu familia.</p>
            <form onSubmit={subscribe}><div className="form-grid"><label>Nombre del tutor<input required placeholder="Escribe el nombre completo"/></label><label>Correo electrónico<input required type="email" placeholder="ejemplo@correo.com"/></label></div>
              <fieldset><legend>Grados de tus hijos</legend><div className="checkbox-grid">{grades.map(g => <label key={g} className={selectedGrades.includes(g) ? 'check selected' : 'check'}><input type="checkbox" checked={selectedGrades.includes(g)} onChange={() => toggleGrade(g)}/><span>{g}</span></label>)}</div></fieldset>
              <button className="button wide" type="submit" disabled={!selectedGrades.length}>Activar notificaciones <FiBell/></button>
            </form><small className="privacy"><FiShield/> Demo visual: no se enviará ni almacenará información.</small></> : <div className="success"><span><FiCheck/></span><h2>¡Listo para recibir avisos!</h2><p>En el sitio final, aquí confirmaríamos la suscripción para {selectedGrades.join(', ')}.</p><button onClick={() => setSubscribed(false)}>Editar selección</button></div>}
        </div>
      </section>

      <section className="levels section">
        <article><img src="./images/school-4.avif" alt="Instalaciones de primaria"/><div><h2>Primaria</h2><p>Fortalecemos el aprendizaje significativo, la curiosidad y los valores que acompañan sus primeros grandes pasos.</p><a href="#contacto">Conoce más <FiChevronRight/></a></div></article>
        <article><img src="./images/school-5.avif" alt="Instalaciones de secundaria"/><div><h2>Secundaria</h2><p>Impulsamos el pensamiento crítico, la autonomía y la preparación de jóvenes comprometidos con su futuro.</p><a href="#contacto">Conoce más <FiChevronRight/></a></div></article>
      </section>

      <section className="admissions section" id="inscripciones">
        <div><h2>Inscripciones abiertas<br/>ciclo escolar 2026–2027</h2><p>Agenda una cita y conoce nuestro proyecto educativo. Estamos listos para recibirte.</p></div><a className="button" href="#contacto">Agendar cita <FiCalendar/></a><a className="text-link" href="#contacto">Ver requisitos de inscripción</a>
      </section>

      <section className="supplies section" id="utiles">
        <div className="section-heading"><div><h2>Listas de útiles escolares</h2><p>Descarga la lista correspondiente a cada grado para el ciclo 2026–2027.</p></div></div>
        <div className="download-grid">{grades.map(g => <button key={g} onClick={() => alert(`Demo: descarga de ${g}`)}><span><strong>{g.split(' ')[0]}</strong>{g.split(' ')[1]}</span><FiDownload/></button>)}</div>
      </section>

      <section className="community section"><div className="section-heading"><div><h2>Nuestra comunidad</h2><p>Juntos construimos una escuela donde aprender, convivir y servir.</p></div></div><div className="gallery">{['school-1.avif','school-2.avif','school-3.avif','school-4.avif','school-5.avif'].map((img,i) => <img key={img} src={`./images/${img}`} alt={`Momento de la comunidad escolar ${i+1}`}/>)}</div></section>

      <section className="contact section" id="contacto"><div><h2>¿Dónde nos encontramos?</h2><p><FiMapPin/> Francisco Villa s/n, Unidad Deportiva<br/>Nicolás Romero, Estado de México</p><p><FiPhone/> (55) 1234 5678</p><p><FiMail/> contacto@colegioarticulo3.edu.mx</p><a className="button light" href="https://maps.google.com" target="_blank" rel="noreferrer">Cómo llegar</a></div><div className="map"><span><FiMapPin/></span><strong>Colegio Artículo Tercero Constitucional</strong><small>Nicolás Romero, Estado de México</small></div></section>
    </main>

    <footer className="footer"><div><Logo/><p>Formamos con valores, educamos para la vida.</p></div><div><strong>Enlaces rápidos</strong><a href="#avisos">Avisos</a><a href="#inscripciones">Inscripciones</a><a href="#utiles">Listas de útiles</a></div><div><strong>Contacto</strong><span>(55) 1234 5678</span><span>Lunes a viernes · 7:00 a 15:00 h</span></div><div className="footer-bottom">© 2026 Colegio Artículo Tercero Constitucional · Demo conceptual</div></footer>

    {noticeOpen && <div className="modal-backdrop" onClick={() => setNoticeOpen(null)}><div className="modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setNoticeOpen(null)} aria-label="Cerrar"><FiX/></button><span className="notice-type">{noticeOpen.type}</span><h2>{noticeOpen.title}</h2><p>{noticeOpen.text}</p><p><strong>Dirigido a:</strong> {noticeOpen.audience}</p><small>{noticeOpen.date}</small></div></div>}
  </div>;
}
