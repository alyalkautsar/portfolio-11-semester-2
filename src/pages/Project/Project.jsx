import { useEffect, useState } from 'react';
import projects from '../../data/projects';
import styles from './Project.module.css';

const categories = ["Semua", "IT", "Bahasa Inggris", "Tahfidz"];

const Project = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Semua");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredProjects = activeCategory === "Semua"
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section className={styles.projects}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Projects</h1>
          <div className={styles.titleUnderline}></div>
          <p className={styles.subtitle}>
            Kumpulan project yang telah saya buat dalam perjalanan belajar programming
          </p>
        </div>

        <div className={styles.filterContainer}>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.filterBtn} ${activeCategory === category ? styles.active : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className={`${styles.card} ${isVisible ? styles.visible : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.cardEmoji}>{project.emoji}</div>
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardDescription}>{project.description}</p>
              <span className={styles.categoryBadge}>{project.category}</span>
              <div className={styles.cardTech}>
                {project.tech.map((tech) => (
                  <span key={tech} className={styles.techTag}>{tech}</span>
                ))}
              </div>
              <div className={styles.cardActions}>
                {project.github && (
                  <a
                    href={project.github}
                    className={styles.btnLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    className={styles.btnLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;
