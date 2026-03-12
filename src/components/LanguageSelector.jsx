import React, { useState, useEffect, useRef, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import esFlag from "../img/es.png";
import enFlag from "../img/en.png";
import frFlag from "../img/fr.png";
import deFlag from "../img/de.png";
import itFlag from "../img/it.png";
import "./LanguageSelector.css";


const languages = [
  { code: "es-ES", flag: esFlag, name: "Español" },
  { code: "en-US", flag: enFlag, name: "English" },
  { code: "fr-FR", flag: frFlag, name: "Français" },
  { code: "de-DE", flag: deFlag, name: "Deutsch" },
  { code: "it-IT", flag: itFlag, name: "Italiano" }
];

export function LanguageSelector() {
  const { language, setLanguage } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const currentLanguage = languages.find((lang) => lang.code === language);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="language-selector">
      <button
        className="language-selector-button"
        onClick={() => setOpen(!open)}
      >
        <img src={currentLanguage.flag} alt={currentLanguage.name} />
        {currentLanguage.name} ▼
      </button>

      <ul className={`language-selector-menu ${open ? "open" : ""}`}>
        {languages.map((lang) => (
          <li key={lang.code}>
            <button
              onClick={() => {
                setLanguage(lang.code);
                setOpen(false);
              }}
            >
              <img src={lang.flag} alt={lang.name} />
              {lang.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}