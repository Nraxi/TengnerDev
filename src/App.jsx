import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import image from "./PICS/image.png";
import s3 from "./PICS/s3.png";
import s5 from "./PICS/s5.png";
import s6 from "./PICS/s6.png";
import s8zin from "./PICS/s8zin.png";
import s10 from "./PICS/s10.png";
import s11 from "./PICS/s11.png";
import tomtenissar from "./PICS/tomtenissar.png";
import FooterNew from "./components/FooterNew";
import ContactForm from "./components/ContactForm";

// Dummy Footer
// const Footer = () => (
//   <footer className="text-center py-6 text-gray-400 text-sm">
//     © 2026 Olle Tengnér. All rights reserved.
//   </footer>
// );

const SocialMedia = ({ t }) => (
  <div className="flex justify-center space-x-6 text-white">
    <a
      href="https://github.com/nraxi"
      target="_blank"
      rel="noopener noreferrer"
    >
      GitHub
    </a>
    <a
      href="https://www.linkedin.com/in/olle-t-331835175/"
      target="_blank"
      rel="noopener noreferrer"
    >
      LinkedIn
    </a>
    {/* <a href="mailto:olle.code@hotmail.com">{t.email}</a> */}
  </div>
);

// Education Modal
const EducationModal = ({ isOpen, onClose, content, t }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gray-900 rounded-2xl p-6 max-w-3xl w-full text-white"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <div className="space-y-4">
            {content.map((line, i) => {
              const urlRegex = /(https?:\/\/[^\s]+)/g;
              if (urlRegex.test(line)) {
                const parts = line.split(urlRegex);
                return (
                  <p key={i}>
                    {parts.map((part, index) =>
                      urlRegex.test(part) ? (
                        <a
                          key={index}
                          href={part}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-400 underline hover:text-indigo-300"
                        >
                          {t.clickHere}
                        </a>
                      ) : (
                        part
                      ),
                    )}
                  </p>
                );
              }
              return <p key={i}>{line}</p>;
            })}
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={onClose}
              className="bg-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-500 transition"
            >
              {t.close}
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Project Modal
const ProjectModal = ({ isOpen, onClose, project, t }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const iframeWrapperRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleScrollAttempt = (e) => {
      e.preventDefault();
      setShowOverlay(true);
    };
    const wrapper = iframeWrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener("wheel", handleScrollAttempt, {
        passive: false,
      });
      wrapper.addEventListener("touchmove", handleScrollAttempt, {
        passive: false,
      });
    }
    return () => {
      if (wrapper) {
        wrapper.removeEventListener("wheel", handleScrollAttempt);
        wrapper.removeEventListener("touchmove", handleScrollAttempt);
      }
      setShowOverlay(false);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-900 rounded-2xl p-6 max-w-4xl w-full text-white relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h3 className="text-2xl font-bold mb-4">{project.name}</h3>
            <div
              ref={iframeWrapperRef}
              className="relative border border-white/20 rounded-lg overflow-hidden mb-4"
              style={{ height: "400px", pointerEvents: "auto" }}
            >
              <iframe
                src={project.link}
                className="w-full h-full pointer-events-none"
                title={project.name}
                frameBorder="0"
              />
              {showOverlay && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center text-white p-4 cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-lg font-semibold underline mb-2">
                    {t.clickHereProject}
                  </p>
                  <span className="text-sm">{t.opensNewTab}</span>
                </motion.a>
              )}
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={onClose}
                className="bg-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-500 transition"
              >
                {t.close}
              </button>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 px-6 py-3 rounded-xl hover:bg-green-500 transition"
              >
                {t.openPage}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const App = () => {
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [lang, setLang] = useState("sv"); // default: Swedish

  const t = {
    sv: {
      start: "start",
      about: "Om mig",
      education: "Utbildning",
      stack: "Tech Stack",
      projects: "Projekt",
      contact: "Kontakt",
      viewWork: "Se mitt arbete",
      clickHere: "Klicka här",
      close: "Stäng",
      clickHereProject: "Klicka här för att komma till hemsidan",
      opensNewTab: "(Öppnas i ny flik)",
      openPage: "Öppna sidan",
      email: "Email",
    },
    en: {
      start: "start",
      about: "About Me",
      education: "Education",
      stack: "Tech Stack",
      projects: "Projects",
      contact: "Contact",
      viewWork: "View My Work",
      clickHere: "Click here",
      close: "Close",
      clickHereProject: "Click here to go to the website",
      opensNewTab: "(Opens in new tab)",
      openPage: "Open Page",
      email: "Email",
    },
  }[lang];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // const education = [
  //   {
  //     title: "Fullstack .NET Developer",
  //     period: "Aug 2024 – Oct 2024",
  //     school: "ZoCom",
  //     content: [
  //       "CMS project in .NET/EF/Blazor",
  //       "CI/CD pipeline in Azure",
  //       "Docker-based development environment",
  //       "Authentication and Authorization",
  //       "Scrum coaching and facilitation",
  //       "GitHub: https://github.com/Zocom-LIA/CmsCodeMonkeys",
  //     ],
  //   },
  //   {
  //     title: "Fullstack Developer (LIA)",
  //     period: "Nov 2022 – May 2023",
  //     school: "Sudo Sweden AB",
  //     content: [
  //       "Backend in Golang with JWT, REST APIs",
  //       "Containerized DevOps workflow (Docker/Kubernetes, Rancher, Argo CD)",
  //       "Frontend leadership, Scrum Master",
  //     ],
  //   },
  //   {
  //     title: "Frontend Developer (Vocational Training)",
  //     period: "Aug 2021 – Jun 2023",
  //     school: "Jensen Vocational College",
  //     content: [
  //       "HTML/CSS/JS, Node/Express",
  //       "Team & solo projects, GitHub portfolio",
  //       "Class representative",
  //     ],
  //   },
  // ];
// const education = [
//   {
//     title: "Fullstack .NET Developer",
//     period: "23 Feb 2024 - 5 Aug 2024",
//     school: "Lexicon IT Proffs, Stockholm",
//     content: [
//       "Kurs innehåll:",
//       "- C# .NET",
//       "- Frontend (HTML, CSS, JavaScript, Bootstrap 5, Blazor)",
//       "- Databases (SQL, database modeling, Entity Framework Core, NoSQL)",
//       "- Testing (TDD, XUnit, Moq)",
//       "- ASP.NET Core, Entity Framework",
//       "- Fullstack project work (Blazor WASM, ASP.NET Core Web API, Scrum methodology, REST Api etc.)",
//       "- Microsoft Azure (Web App, CI/CD with Azure DevOps, Cosmos DB, Azure SQL Database)",
//       "Certifikat: https://verify.trueoriginal.com/4759E151-F557-4A31-15C5-8109778FF46F/?ref=direct-copy",
//     ],
//   },
//   {
//     title: "Frontend Development (Web Security)",
//     period: "23 Aug 2021 - 9 Jun 2023",
//     school: "Jensen YH, Kista",
//     content: [
//       "Kurs innehåll:",
//       "Fått kunskap inom projektledning till kunskaper i mindre egna projekt.",
//       "Klassrepresentant HT2021.",
//       "Betyg tillgängliga mot förfrågan.",
//       "Projekt finns på Github.",
//       "Kunskaper inom HTML/CSS, JS, MERN, Rest-api, och mer.",
//       "Se kursplan: https://allastudier.se/skola/jensen-yrkeshogskola/frontendutvecklare-inriktning-webbsakerhet-1668833",
//     ],
//   },
//   {
//     title: "Gymnasium – Marin Teknik",
//     period: "Aug 2007 – Jun 2010",
//     school: "Marina Läroverket, Stocksund",
//     content: [
//       "Båtlicens för fritidsbåt, loggbok och sjöcertifikat finns.",
//       "Seglat och framfört olika motorbåtar, Stocksund → Portsmouth, England.",
//       "Erfarenhet inom båthantering, reparationer, motorservice och svetsning.",
//       "Kunskaper inom utombords samt inombords motorer service och vanliga reparationer.",
//       "Se https://www.marinalaroverket.se/utbildning/marinteknik/",
//     ],
//   },
  // ];
  
  const education = [
    {
      title: { sv: "Fullstack .NET Developer", en: "Fullstack .NET Developer" },
      period: "23 Feb 2024 - 5 Aug 2024",
      school: "Lexicon IT Proffs, Stockholm",
      content: {
        sv: [
          "Kurs innehåll:",
          "- C# .NET",
          "- Frontend (HTML, CSS, JavaScript, Bootstrap 5, Blazor)",
          "- Databaser (SQL, databaser modellering, Entity Framework Core, NoSQL)",
          "- Testning (TDD, XUnit, Moq)",
          "- ASP.NET Core, Entity Framework",
          "- Fullstack projektarbete (Blazor WASM, ASP.NET Core Web API, Scrum metodologi, REST API etc.)",
          "- Microsoft Azure (Web App, CI/CD med Azure DevOps, Cosmos DB, Azure SQL Database)",
          "Certifikat: https://verify.trueoriginal.com/4759E151-F557-4A31-15C5-8109778FF46F/?ref=direct-copy",
        ],
        en: [
          "Course content:",
          "- C# .NET",
          "- Frontend (HTML, CSS, JavaScript, Bootstrap 5, Blazor)",
          "- Databases (SQL, database modeling, Entity Framework Core, NoSQL)",
          "- Testing (TDD, XUnit, Moq)",
          "- ASP.NET Core, Entity Framework",
          "- Fullstack project work (Blazor WASM, ASP.NET Core Web API, Scrum methodology, REST API etc.)",
          "- Microsoft Azure (Web App, CI/CD with Azure DevOps, Cosmos DB, Azure SQL Database)",
          "Certificate: https://verify.trueoriginal.com/4759E151-F557-4A31-15C5-8109778FF46F/?ref=direct-copy",
        ],
      },
    },
    {
      title: {
        sv: "Frontend utveckling med inriktning Webbsäkerhet",
        en: "Frontend Development (Web Security)",
      },
      period: "23 Aug 2021 - 9 Jun 2023",
      school: {
        sv: "Jensen YH, Kista",
        en: "Jensen Vocational College, Kista",
      },
      content: {
        sv: [
          "Kurs innehåll:",
          "- Fått kunskap inom projektledning till kunskaper i mindre egna projekt.",
          "- Klassrepresentant HT2021.",
          "- Betyg tillgängliga mot förfrågan.",
          "- Projekt finns på Github.",
          "- Kunskaper inom HTML/CSS, JS, MERN, Rest-api, och mer.",
          "Se kursplan: https://allastudier.se/skola/jensen-yrkeshogskola/frontendutvecklare-inriktning-webbsakerhet-1668833",
        ],
        en: [
          "Course content:",
          "- Gained knowledge from project management to smaller personal projects.",
          "- Class representative Fall 2021.",
          "- Grades available upon request.",
          "- Projects available on Github.",
          "- Skills in HTML/CSS, JS, MERN, REST API, and more.",
          "See syllabus: https://allastudier.se/skola/jensen-yrkeshogskola/frontendutvecklare-inriktning-webbsakerhet-1668833",
        ],
      },
    },
    {
      title: {
        sv: "Gymnasium – Marin Teknik",
        en: "High School – Marine Technology",
      },
      period: "Aug 2007 – Jun 2010",
      school: "Marina Läroverket, Stocksund",
      content: {
        sv: [
          "- Båtlicens för fritidsbåt, loggbok och sjöcertifikat finns.",
          "- Seglat och framfört olika motorbåtar, Stocksund → Portsmouth, England.",
          "- Erfarenhet inom båthantering, reparationer, motorservice och svetsning.",
          "- Kunskaper inom utombords samt inombords motorer service och vanliga reparationer.",
          "Se https://www.marinalaroverket.se/utbildning/marinteknik/",
        ],
        en: [
          "- Boat license for leisure boats, logbook and marine certificate available.",
          "- Sailed and operated various motorboats, Stocksund → Portsmouth, England.",
          "- Experience in boat handling, repairs, engine service, and welding.",
          "Skills in outboard and inboard engine service and common repairs.",
          "See syllabus: https://www.marinalaroverket.se/utbildning/marinteknik/",
        ],
      },
    },
  ];

  const projects = [
    {
      name: "Tomtenissarnas Julkalender",
      link: "https://nraxi.github.io/tomtenissarnasjulkalender/",
      image: tomtenissar,
    },
    {
      name: "Zinzeria",
      link: "https://nraxi.github.io/zinzeria/",
      image: s8zin,
    },
    {
      name: "Public CMS",
      link: "https://codemonkeyspubliccms.azurewebsites.net/",
      image: s6,
    },
    {
      name: "Chart App",
      link: "https://nraxi.github.io/chartsapp/",
      image: s5,
    },
    {
      name: "SnowMedia",
      link: "https://nraxi.github.io/snowmedia/",
      image: s3,
    },
    {
      name: "OTengner Web v.0",
      link: "https://nraxi.github.io/nraxi-home/",
      image: s11,
    },
    {
      name: "OTengner Web v.1",
      link: "https://nraxi.github.io/OTengnerWeb/",
      image: s10,
    },
  ];

  return (
    <Router>
      <div className="bg-gradient-to-br from-slate-900 via-black to-slate-950 text-white min-h-screen font-sans">
        {/* NAVBAR */}
        <nav className="fixed top-0 w-full backdrop-blur-lg bg-white/5 border-b border-white/10 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-wide">
              Tengnér<span className="text-indigo-500">Dev</span>
            </h1>
            <div className="flex items-center space-x-4">
              <div className="space-x-6 hidden md:flex text-sm">
                {[
                  t.start,
                  t.about,
                  t.education,
                  t.stack,
                  t.projects,
                  t.contact,
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      scrollTo(
                        [
                          "start",
                          "about",
                          "education",
                          "stack",
                          "projects",
                          "contact",
                        ][index],
                      )
                    }
                    className="hover:text-indigo-400 transition"
                  >
                    {item.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setLang(lang === "sv" ? "en" : "sv")}
                className="ml-4 bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-500 transition text-sm"
              >
                {lang.toUpperCase()}
              </button>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <motion.section
          id="start"
          className="h-screen flex items-center justify-center text-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Olle Tengnér
            </h2>
            <div className="dreaming">
               "Let's Bring your ideas to life, together!"
            </div><br />
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg text-gray-400 max-w-xl mx-auto mb-8"
            >
              {lang === "sv"
                ? "Fullstack utvecklare med erfarenhet av C++, Unreal Engine, Linux/Docker, AI/LLMs, Web Security, Cloud & moderna webappar"
                : "Fullstack Developer with experience in C++, Unreal Engine, Linux/Docker, AI/LLMs, Web Security, Cloud & Modern Web Apps"}
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("projects")}
              className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl transition shadow-lg"
            >
              {t.viewWork}
            </motion.button>
          </motion.div>
        </motion.section>

        {/* ABOUT */}
        <motion.section
          id="about"
          className="py-24 max-w-6xl mx-auto px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img
              src={image}
              alt="profile"
              className="rounded-2xl shadow-2xl border border-white/10"
            />
            <div>
              <h2 className="text-3xl font-bold mb-6">{t.about}</h2>
              <p className="text-gray-400 leading-relaxed">
                {lang === "sv"
                  ? "Svensk fullstackutvecklare med passion för C++, Unreal Engine, Linux/Docker-containrar, AI/LLMs, React, .NET, Node.js, molnplattformar som Azure, och bygga säkra, skalbara webbapplikationer."
                  : "Swedish fullstack developer passionate about C++, Unreal Engine, Linux/Docker containers, AI/LLMs, React, .NET, Node.js, cloud platforms like Azure, and building secure, scalable web systems."}
              </p>
            </div>
          </div>
        </motion.section>

        {/* EDUCATION */}
        <motion.section
          id="education"
          className="py-24 bg-white/5"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">
              {t.education}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {education.map((edu) => (
                <motion.div
                  key={edu.title[lang]}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-indigo-500 cursor-pointer transition"
                  onClick={() => setSelectedEducation(edu.content[lang])}
                >
                  <h3 className="text-xl font-semibold mb-3">
                    {edu.title[lang]}
                  </h3>
                  <p className="text-gray-400">{edu.period}</p>
                  <p className="text-gray-400">
                    {edu.school[lang] || edu.school}
                  </p>
                  <p className="text-indigo-400 mt-2">{t.clickHere}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {selectedEducation && (
            <EducationModal
              isOpen={!!selectedEducation}
              onClose={() => setSelectedEducation(null)}
              content={selectedEducation}
              t={t}
            />
          )}
        </motion.section>

        {/* STACK */}
        <motion.section
          id="stack"
          className="py-24 max-w-6xl mx-auto px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">{t.stack}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Frontend",
                items:
                  "React, Next.js, Vite, TypeScript, HTML/CSS, Tailwind, Bootstrap, Blazor, Shadcn",
              },
              {
                title: "Backend",
                items:
                  ".NET (C#), Node.js, Express, Golang, Java, C++, REST APIs, JWT",
              },
              {
                title: "DevOps & Cloud",
                items:
                  "Docker (Linux & others), Kubernetes (Rancher), Argo CD, Azure Web Apps, CI/CD, LLM/AI Tools, Prompt Engineering",
              },
              {
                title: "Databases",
                items: "PostgreSQL, MongoDB, SQLite, CosmosDB, SQL Server",
              },
              {
                title: "Tools & Platforms",
                items:
                  "Git, GitHub, Jira, Trello, Postman, VS Code, JetBrains IDEs, Bash, Linux",
              },
              {
                title: "Methods & Workflow",
                items:
                  "Scrum, Agile, TDD, CI/CD, Project Management, Authentication/Authorization",
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-indigo-500 transition transform duration-300"
              >
                <h3 className="text-xl font-semibold mb-4 text-indigo-400">
                  {card.title}
                </h3>
                <p className="text-gray-400">{card.items}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* PROJECTS */}
        <section id="projects" className="py-24 bg-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t.projects}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project.name}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
                  }}
                  onClick={() => setSelectedProject(project)}
                  className="bg-black/40 p-6 rounded-2xl border border-white/10 hover:border-indigo-500 cursor-pointer flex flex-col items-center transition"
                >
                  <h3 className="text-xl font-semibold mb-3">{project.name}</h3>
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  <p className="text-gray-400 text-sm">{t.clickHere}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {selectedProject && (
            <ProjectModal
              isOpen={!!selectedProject}
              onClose={() => setSelectedProject(null)}
              project={selectedProject}
              t={t}
            />
          )}
        </section>

        {/* CONTACT */}
        <motion.section
          id="contact"
          className="py-24 max-w-4xl mx-auto px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">{t.contact}</h2>
          <div className="bg-white/5 p-10 rounded-2xl border border-white/10">
            <ContactForm lang={lang} />
            <div className="mt-12">
              <SocialMedia t={t} />
            </div>
          </div>
        </motion.section>

        <FooterNew />
      </div>
    </Router>
  );
};

export default App;
