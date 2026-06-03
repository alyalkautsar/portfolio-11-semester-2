import { useEffect, useState } from 'react';
import { profile } from '../../data/profile';
import profilePhoto from '../../assets/profile.jpg';
import styles from './About.module.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>About Me</h1>
          <div className={styles.titleUnderline}></div>
        </div>

        <div className={styles.content}>
          <div className={styles.photoSection}>
            <div className={`${styles.photoWrapper} ${isVisible ? styles.visible : ''}`}>
              <img 
                src={profilePhoto} 
                alt="Foto Profil Aly Al Kautsar" 
                className={styles.photo}
              />
              <div className={styles.photoBorder}></div>
            </div>
          </div>

          <div className={styles.infoSection}>
            <div className={`${styles.bio} ${isVisible ? styles.visible : ''}`}>
              <h2 className={styles.subTitle}>Halo!</h2>
              <p className={styles.description}>{profile.description}</p>
            </div>

            <div className={`${styles.education} ${isVisible ? styles.visible : ''}`}>
              <h3 className={styles.sectionTitle}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.sectionIcon}>
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
                Pendidikan
              </h3>
              {profile.education.map((edu, index) => (
                <div key={index} className={styles.educationCard}>
                  <span className={styles.educationYear}>{edu.year}</span>
                  <h4 className={styles.educationInstitution}>{edu.institution}</h4>
                  <p className={styles.educationLevel}>{edu.level}</p>
                  <p className={styles.educationDesc}>{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${styles.skillsSection} ${isVisible ? styles.visible : ''}`}>
          <h3 className={styles.sectionTitle}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.sectionIcon}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            Skills
          </h3>
          <div className={styles.skillsGrid}>
            {profile.skills.map((skill, index) => (
              <div 
                key={skill.name} 
                className={styles.skillItem}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.skillHeader}>
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillPercent}>{skill.level}%</span>
                </div>
                <div className={styles.skillBar}>
                  <div 
                    className={styles.skillProgress}
                    style={{ 
                      '--progress': `${skill.level}%`,
                      animationDelay: `${0.5 + index * 0.1}s`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.badges}>
            {profile.skills.map((skill) => (
              <span key={skill.name} className={styles.badge}>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
