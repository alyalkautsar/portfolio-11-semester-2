import { useState, useEffect } from 'react';
import { profile } from '../../data/profile';
import styles from './Contact.module.css';

const STORAGE_KEY = 'portfolio_guestbook';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [guestbook, setGuestbook] = useState([]);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const savedForm = localStorage.getItem('portfolio_contact_form');
    if (savedForm) {
      setFormData(JSON.parse(savedForm));
    }

    const savedGuestbook = localStorage.getItem(STORAGE_KEY);
    if (savedGuestbook) {
      setGuestbook(JSON.parse(savedGuestbook));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    localStorage.setItem('portfolio_contact_form', JSON.stringify(newFormData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      return;
    }

    const newEntry = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      date: new Date().toISOString()
    };

    const newGuestbook = [newEntry, ...guestbook];
    setGuestbook(newGuestbook);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newGuestbook));

    setFormData({ name: '', email: '', message: '' });
    localStorage.removeItem('portfolio_contact_form');
    setSubmitStatus('success');

    setTimeout(() => setSubmitStatus(null), 3000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Contact Me</h1>
          <div className={styles.titleUnderline}></div>
          <p className={styles.subtitle}>
            Punya pertanyaan atau ingin bekerja sama? Silakan hubungi saya!
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.formSection}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Nama</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Masukkan nama Anda"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Masukkan email Anda"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Pesan</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  rows="5"
                  placeholder="Tulis pesan Anda di sini..."
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                <span>Kirim Pesan</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.btnIcon}>
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>

              {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                  Pesan berhasil dikirim! Terima kasih.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className={styles.errorMessage}>
                  Mohon isi semua field dengan lengkap.
                </div>
              )}
            </form>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Informasi Kontak</h3>
              
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <span className={styles.infoLabel}>Email</span>
                  <a href={`mailto:${profile.email}`} className={styles.infoValue}>
                    {profile.email}
                  </a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <span className={styles.infoLabel}>GitHub</span>
                  <a 
                    href={`https://github.com/${profile.github}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.infoValue}
                  >
                    @{profile.github}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.guestbookSection}>
          <h2 className={styles.guestbookTitle}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.guestbookIcon}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Guestbook
          </h2>

          {guestbook.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Belum ada pesan. Jadilah yang pertama meninggalkan pesan!</p>
            </div>
          ) : (
            <div className={styles.guestbookGrid}>
              {guestbook.map((entry) => (
                <div key={entry.id} className={styles.guestbookCard}>
                  <div className={styles.guestbookHeader}>
                    <div className={styles.guestbookAvatar}>
                      {entry.name.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.guestbookInfo}>
                      <span className={styles.guestbookName}>{entry.name}</span>
                      <span className={styles.guestbookDate}>{formatDate(entry.date)}</span>
                    </div>
                  </div>
                  <p className={styles.guestbookMessage}>{entry.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
