import React, { useState, useRef, useEffect } from "react";
import {
  Code, CheckCircle, Star, Handshake, Laptop, Smartphone, Cloud, Menu, X, Zap, Palette, Rocket, MessageSquare, ChevronRight, Brain, GitFork, Lightbulb, Settings, UserPlus, Award, Users, BookOpen, DollarSign, TrendingUp, Target, ShieldCheck, Briefcase
} from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

const API_URL = "/api";

function useFadeInOnView() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) setVisible(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);
  return [ref, visible] as const;
}

function FadeInSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [ref, visible] = useFadeInOnView();
  return (
    <div
      ref={ref}
      className={`transition-opacity duration-1000 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const sectionIds = t.nav.map(l => l.href.replace('#', ''));
  useEffect(() => {
    const handleScrollSpy = () => {
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);
  function scrollToSection(id: string) {
    const el = document.getElementById(id.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-gray-950 bg-opacity-95 shadow-lg z-50" role="banner">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Code className="text-blue-400 w-8 h-8 mr-2" />
            <span className="text-2xl font-extrabold tracking-tight text-white">AstrikS</span>
          </div>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-6" aria-label="Основная навигация">
            {t.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => {
                  e.preventDefault();
                  scrollToSection(link.href);
                  setMobileOpen(false);
                }}
                className={
                  (activeSection === link.href.replace('#', '')
                    ? "text-blue-400 font-bold underline underline-offset-8 decoration-2 transition-all duration-300 "
                    : "text-gray-300 ") +
                  "hover:text-blue-400 font-medium transition-colors duration-200 px-1 py-0.5 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                }
                aria-current={activeSection === link.href.replace('#', '') ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
            <LanguageSwitcher />
          </nav>
          {/* Mobile burger */}
          <button
            className="md:hidden text-gray-300 hover:text-blue-400 focus:outline-none"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
        {/* Mobile menu */}
        {mobileOpen && (
          <nav id="mobile-menu" className="md:hidden bg-gray-900 border-t border-gray-800 shadow-xl animate-fade-in-down" aria-label="Мобильное меню">
            {t.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => {
                  e.preventDefault();
                  scrollToSection(link.href);
                  setMobileOpen(false);
                }}
                className={
                  (activeSection === link.href.replace('#', '')
                    ? "text-blue-400 font-bold underline underline-offset-8 decoration-2 transition-all duration-300 "
                    : "text-gray-200 ") +
                  "block px-6 py-4 hover:bg-gray-800 text-lg border-b border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                }
                aria-current={activeSection === link.href.replace('#', '') ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
            <div className="px-6 py-4 border-t border-gray-800">
              <LanguageSwitcher />
            </div>
          </nav>
        )}
      </header>
      <div className="pt-20 md:pt-24">{children}</div>
    </>
  );
}

function Hero() {
  const { t } = useLanguage();
  return (
    <section id="hero" className="scroll-mt-20 relative bg-gradient-to-r from-blue-900 to-gray-900 text-white py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
      <div>
        <div className="container mx-auto px-2 sm:px-4 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
          <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <Code className="text-blue-400 w-8 h-8 sm:w-10 sm:h-10 mr-2 sm:mr-3" />
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">AstrikS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 sm:mb-6">
              {t.hero.title.replace(t.hero.titleHighlight, '')}
              <span className="text-blue-400">{t.hero.titleHighlight}</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-300">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4 w-full max-w-xs mx-auto md:max-w-none md:mx-0">
              <a href="#contact" className="bg-blue-600 text-white font-bold py-3 px-6 sm:px-8 rounded-full hover:bg-blue-700 transition shadow-lg text-center">{t.hero.discuss}</a>
              <a href="#services" className="bg-transparent border border-blue-600 text-blue-400 font-bold py-3 px-6 sm:px-8 rounded-full hover:bg-blue-900 hover:bg-opacity-30 transition text-center">{t.hero.services}</a>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img src="https://placehold.co/400x240/1E3A8A/FFFFFF?text=AstrikS+Team" alt="AstrikS Team" className="rounded-lg shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl h-auto object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const { t } = useLanguage();
  return (
    <section id="whyus" className="py-10 sm:py-16 bg-gray-900">
      <div className="container mx-auto px-2 sm:px-4 text-center">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-12 text-blue-400">{t.whyus.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
          <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl hover:shadow-2xl transition-transform hover:scale-105">
            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-green-400" />
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-white">{t.whyus.expertise}</h3>
            <p className="text-gray-300 text-sm sm:text-base">{t.whyus.expertiseDesc}</p>
          </div>
          <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl hover:shadow-2xl transition-transform hover:scale-105">
            <Star className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-yellow-400" />
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-white">{t.whyus.quality}</h3>
            <p className="text-gray-300 text-sm sm:text-base">{t.whyus.qualityDesc}</p>
          </div>
          <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl hover:shadow-2xl transition-transform hover:scale-105">
            <Handshake className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-purple-400" />
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-white">{t.whyus.partnership}</h3>
            <p className="text-gray-300 text-sm sm:text-base">{t.whyus.partnershipDesc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { t } = useLanguage();
  const [services, setServices] = useState<{title: string; description: string; details?: string[]; icon?: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(6);
  useEffect(() => {
    fetch(`${API_URL}/services`).then(r => r.json()).then(data => { setServices(data); setLoading(false); });
  }, []);
  const filtered = services.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    (s.description && s.description.toLowerCase().includes(search.toLowerCase()))
  );
  // Функция для получения иконки по имени
  function getServiceIcon(iconName: string) {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      Code, Cloud, Smartphone, Laptop, Settings, Rocket, Palette, Brain, ShieldCheck, UserPlus,
      Zap, Target, Briefcase, Award, TrendingUp, DollarSign
    };
    const IconComponent = iconMap[iconName] || Code;
    return <IconComponent className="w-10 h-10 text-blue-400 mb-2" />;
  }
  return (
    <section id="services" className="scroll-mt-20 py-10 sm:py-16 bg-gray-800">
      <div className="container mx-auto px-2 sm:px-4 text-center">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-12 text-blue-400">{t.services.title}</h2>
        <input
          type="text"
          value={search}
          onChange={e => { setSearch(e.target.value); setShowCount(6); }}
          placeholder="Поиск по услугам..."
          className="mb-6 px-4 py-2 rounded border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-md"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {loading
            ? Array.from({length: 6}).map((_, i) => (
                <div key={i} className="bg-gray-900 p-5 sm:p-6 rounded-lg shadow-lg animate-pulse flex flex-col items-center">
                  <div className="w-10 h-10 bg-gray-700 rounded-full mb-2" />
                  <div className="h-5 w-2/3 bg-gray-700 rounded mb-2" />
                  <div className="h-4 w-full bg-gray-700 rounded mb-2" />
                  <div className="h-3 w-1/2 bg-gray-700 rounded" />
                </div>
              ))
            : filtered.slice(0, showCount).map((s, i) => (
                <div key={i} className="bg-gray-900 p-5 sm:p-6 rounded-lg shadow-lg hover:shadow-xl flex flex-col items-center">
                  <div>{getServiceIcon(s.icon || 'Code')}</div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-white">{s.title}</h3>
                  <p className="text-gray-400 text-sm sm:text-base mb-2">{s.description}</p>
                  {s.details && Array.isArray(s.details) && (
                    <ul className="text-gray-400 text-xs sm:text-sm text-left list-disc pl-5 mb-2">
                      {s.details.map((d: string, j: number) => <li key={j}>{d}</li>)}
                    </ul>
                  )}
                </div>
              ))}
        </div>
        {filtered.length > showCount && (
          <button
            onClick={() => setShowCount(c => c + 6)}
            className="mt-6 bg-blue-600 text-white font-bold py-2 px-8 rounded-full hover:bg-blue-700 transition shadow-lg transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >Показать ещё</button>
        )}
      </div>
    </section>
  );
}

function Process() {
  const { t } = useLanguage();
  return (
    <section id="process" className="scroll-mt-20 py-10 sm:py-16 bg-gray-900">
      <div className="container mx-auto px-2 sm:px-4 text-center">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-12 text-blue-400">{t.process.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {t.process.steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 mb-3">
                <Zap className="w-12 h-12 sm:w-16 sm:h-16" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">{step.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const { t } = useLanguage();
  const projects = [
    {
      title: 'Корпоративный портал для FinTech',
      image: 'https://placehold.co/400x240/1E3A8A/FFFFFF?text=FinTech+Portal',
      description: 'Внедрение защищённого портала для финансовой компании с интеграцией CRM и BI-аналитикой.',
      tags: ['React', 'Node.js', 'AWS', 'BI']
    },
    {
      title: 'Мобильное приложение для доставки',
      image: 'https://placehold.co/400x240/1E3A8A/FFFFFF?text=Delivery+App',
      description: 'Кроссплатформенное приложение для заказа и отслеживания доставки еды и товаров.',
      tags: ['React Native', 'Firebase', 'UX/UI']
    },
    {
      title: 'AI-бот для поддержки клиентов',
      image: 'https://placehold.co/400x240/1E3A8A/FFFFFF?text=AI+Support+Bot',
      description: 'Чат-бот с NLP для автоматизации поддержки и обработки обращений.',
      tags: ['Python', 'NLP', 'AI', 'Chatbot']
    },
  ];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const allTags = Array.from(new Set(projects.flatMap(p => p.tags)));
  const filtered = selectedTags.length === 0
    ? projects
    : projects.filter(p => selectedTags.every(tag => p.tags.includes(tag)));
  function toggleTag(tag: string) {
    setSelectedTags(tags => tags.includes(tag)
      ? tags.filter(t => t !== tag)
      : [...tags, tag]);
  }
  return (
    <section id="portfolio" className="scroll-mt-20 py-10 sm:py-16 bg-gray-900">
      <div className="container mx-auto px-2 sm:px-4 text-center">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-12 text-blue-400 flex items-center justify-center gap-2"><Award className="w-7 h-7 text-yellow-400" />{t.portfolio.title}</h2>
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={
                (selectedTags.includes(tag)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-blue-200 hover:bg-blue-800') +
                ' px-3 py-1 rounded-full text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-400'
              }
              type="button"
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((p, i) => (
            <div key={i} className="bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl p-5 flex flex-col items-center">
              <img src={p.image} alt={p.title} className="rounded-md mb-4 w-full h-40 object-cover" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">{p.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-2">{p.description}</p>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {p.tags.map((tag, j) => <span key={j} className="bg-blue-800 text-blue-200 text-xs px-2 py-1 rounded-full">{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-gray-400 mt-8">Нет проектов с выбранными тегами.</div>
        )}
      </div>
    </section>
  );
}

function Investors() {
  const { t } = useLanguage();
  const investorProjects = [
    {
      title: 'AI-платформа для персонализированного обучения "EduMind"',
      description: 'Инновационная платформа на базе ИИ, адаптирующая учебные материалы под индивидуальные потребности каждого студента.',
      image: 'https://placehold.co/400x250/1E3A8A/FFFFFF?text=EduMind+AI',
      fundingGoal: '500 000 USD',
      roi: 'Прогнозируемый ROI: 300% за 3 года',
      status: 'Ищем инвестиции',
      tags: ['AI/ML', 'Образование', 'SaaS', 'Стартап']
    },
    {
      title: 'Платформа для удаленного мониторинга здоровья "HealthConnect"',
      description: 'Мобильное и веб-приложение для дистанционного контроля показателей здоровья пациентов с хроническими заболеваниями.',
      image: 'https://placehold.co/400x250/1E3A8A/FFFFFF?text=HealthConnect',
      fundingGoal: '750 000 USD',
      roi: 'Прогнозируемый ROI: 250% за 4 года',
      status: 'Ищем инвестиции',
      tags: ['Здравоохранение', 'Мобильная разработка', 'IoT', 'Облака']
    },
    {
      title: 'Экосистема для управления городской инфраструктурой "SmartCity OS"',
      description: 'Комплексная облачная платформа для оптимизации управления городскими ресурсами: транспортом, энергетикой, отходами.',
      image: 'https://placehold.co/400x250/1E3A8A/FFFFFF?text=SmartCity+OS',
      fundingGoal: '1 200 000 USD',
      roi: 'Прогнозируемый ROI: 400% за 5 лет',
      status: 'Ищем инвестиции',
      tags: ['Smart City', 'Облачные решения', 'Big Data', 'Правительство']
    },
    {
      title: 'VR-тренажер для хирургов "MediSim VR"',
      description: 'Виртуальная реальность для обучения и повышения квалификации хирургов. Реалистичные симуляции операций без риска для пациентов.',
      image: 'https://placehold.co/400x250/1E3A8A/FFFFFF?text=MediSim+VR',
      fundingGoal: '900 000 USD',
      roi: 'Прогнозируемый ROI: 350% за 3.5 года',
      status: 'Ищем инвестиции',
      tags: ['VR/AR', 'Здравоохранение', 'Образование', 'Симуляции']
    }
  ];
  return (
    <section id="investors" className="scroll-mt-20 py-10 sm:py-16 bg-gray-800">
      <div className="container mx-auto px-2 sm:px-4 text-center">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-12 text-blue-400 flex items-center justify-center gap-2"><Briefcase className="w-7 h-7 text-green-400" />{t.investors.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {investorProjects.map((project, index) => (
            <div key={index} className="bg-gray-900 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 flex flex-col">
              <img src={project.image} alt={project.title} className="w-full h-56 object-cover" />
              <div className="p-6 text-left flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                  <p className="text-gray-400 mb-3 leading-relaxed">{project.description}</p>
                  <div className="space-y-2 mt-4">
                    <p className="text-lg font-bold text-blue-400 flex items-center"><DollarSign className="w-5 h-5 mr-2" /> Цель финансирования: {project.fundingGoal}</p>
                    <p className="text-lg font-bold text-green-400 flex items-center"><TrendingUp className="w-5 h-5 mr-2" /> {project.roi}</p>
                    <p className="text-lg font-bold text-yellow-400 flex items-center"><Target className="w-5 h-5 mr-2" /> Статус: {project.status}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="bg-blue-800 text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
                <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg mt-8 w-full">Подробнее / Инвестировать</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  const { t } = useLanguage();
  const [team, setTeam] = useState<{name: string; role: string; bio?: string; photo?: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(8);
  useEffect(() => {
    fetch(`${API_URL}/team`).then(r => r.json()).then(data => { setTeam(data); setLoading(false); });
  }, []);
  function getInitials(name: string) {
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
  }
  const filtered = team.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    (m.role && m.role.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <section id="team" className="scroll-mt-20 py-10 sm:py-16 bg-gray-800">
      <div className="container mx-auto px-2 sm:px-4 text-center">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-12 text-blue-400 flex items-center justify-center gap-2"><Users className="w-7 h-7 text-blue-300" />{t.team.title}</h2>
        <input
          type="text"
          value={search}
          onChange={e => { setSearch(e.target.value); setShowCount(8); }}
          placeholder="Поиск по команде..."
          className="mb-6 px-4 py-2 rounded border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-md"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {loading
            ? Array.from({length: 4}).map((_, i) => (
                <div key={i} className="bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col items-center animate-pulse">
                  <div className="rounded-full w-24 h-24 mb-4 bg-gray-700" />
                  <div className="h-5 w-2/3 bg-gray-700 rounded mb-2" />
                  <div className="h-4 w-1/2 bg-gray-700 rounded mb-2" />
                  <div className="h-3 w-full bg-gray-700 rounded" />
                </div>
              ))
            : filtered.slice(0, showCount).map((m, i) => (
                <div key={i} className="bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col items-center">
                  {m.photo
                    ? <img src={m.photo} alt={m.name} className="rounded-full w-24 h-24 mb-4 object-cover border-4 border-blue-700" />
                    : <div className="rounded-full w-24 h-24 mb-4 flex items-center justify-center bg-blue-800 text-white text-3xl font-bold border-4 border-blue-700 select-none">{getInitials(m.name)}</div>
                  }
                  <h3 className="text-lg font-semibold text-white mb-1">{m.name}</h3>
                  <div className="text-blue-400 text-sm mb-1">{m.role}</div>
                  {m.bio && <p className="text-gray-400 text-xs mb-2">{m.bio}</p>}
                </div>
              ))}
        </div>
        {filtered.length > showCount && (
          <button
            onClick={() => setShowCount(c => c + 8)}
            className="mt-6 bg-blue-600 text-white font-bold py-2 px-8 rounded-full hover:bg-blue-700 transition shadow-lg transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >Показать ещё</button>
        )}
      </div>
    </section>
  );
}

function FAQ() {
  const { t } = useLanguage();
  const faqs = t.faq.list;
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="scroll-mt-20 py-10 sm:py-16 bg-gray-900">
      <div className="container mx-auto px-2 sm:px-4 max-w-2xl">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-12 text-blue-400 flex items-center gap-2"><BookOpen className="w-7 h-7 text-blue-200" />{t.faq.title}</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="bg-gray-800 rounded-lg shadow p-4">
              <button
                className="w-full text-left flex justify-between items-center text-white font-semibold text-base sm:text-lg focus:outline-none"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-panel-${i}`}
                id={`faq-button-${i}`}
              >
                {f.q}
                <span className="ml-2 text-blue-400">{open === i ? '-' : '+'}</span>
              </button>
              {open === i && <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-button-${i}`}
                className="mt-2 text-gray-300 text-sm sm:text-base">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blog() {
  const { t } = useLanguage();
  return (
    <section id="blog" className="scroll-mt-20 py-10 sm:py-16 bg-gray-900">
      <div className="container mx-auto px-2 sm:px-4 text-center">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-12 text-blue-400">{t.blog.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-gray-800 p-5 sm:p-6 rounded-lg shadow-xl hover:shadow-2xl flex flex-col items-center">
            <img src="https://placehold.co/300x200/2C3E50/FFFFFF?text=AI+Trends" alt="AI Trends" className="rounded-md mb-4 w-full h-40 object-cover" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">Будущее AI в бизнесе: что нужно знать</h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-4">Как искусственный интеллект меняет бизнес и какие возможности он открывает.</p>
            <a href="#blog" className="text-blue-400 hover:underline text-sm flex items-center">{t.blog.read} <ChevronRight className="inline-block w-4 h-4 ml-1" /></a>
          </div>
          <div className="bg-gray-800 p-5 sm:p-6 rounded-lg shadow-xl hover:shadow-2xl flex flex-col items-center">
            <img src="https://placehold.co/300x200/2C3E50/FFFFFF?text=Cloud+Security" alt="Cloud Security" className="rounded-md mb-4 w-full h-40 object-cover" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">Облачная безопасность: лучшие практики</h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-4">Обеспечение безопасности данных в облаке — критически важная задача. Мы делимся проверенными методами.</p>
            <a href="#blog" className="text-blue-400 hover:underline text-sm flex items-center">{t.blog.read} <ChevronRight className="inline-block w-4 h-4 ml-1" /></a>
          </div>
          <div className="bg-gray-800 p-5 sm:p-6 rounded-lg shadow-xl hover:shadow-2xl flex flex-col items-center">
            <img src="https://placehold.co/300x200/2C3E50/FFFFFF?text=DevOps+Benefits" alt="DevOps Benefits" className="rounded-md mb-4 w-full h-40 object-cover" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">DevOps для стартапов: ускорение роста</h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-4">Как внедрение DevOps-практик помогает стартапам быстро масштабироваться и выпускать продукты.</p>
            <a href="#blog" className="text-blue-400 hover:underline text-sm flex items-center">{t.blog.read} <ChevronRight className="inline-block w-4 h-4 ml-1" /></a>
          </div>
        </div>
        <a href="#blog" className="inline-block bg-transparent border border-gray-600 text-gray-300 font-bold py-3 px-8 rounded-full hover:bg-gray-700 hover:bg-opacity-30 transition duration-300 ease-in-out shadow-lg transform hover:scale-105 mt-8">{t.blog.more}</a>
      </div>
    </section>
  );
}

function CallToAction() {
  const { t } = useLanguage();
  return (
    <section className="bg-blue-700 text-white py-10 sm:py-16 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">{t.cta.title}</h2>
        <p className="text-base sm:text-xl mb-6 sm:mb-8">{t.cta.subtitle}</p>
        <a href="#contact" className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition shadow-lg inline-block">{t.cta.contact}</a>
      </div>
    </section>
  );
}

function Testimonials() {
  const { t } = useLanguage();
  const [testimonials, setTestimonials] = useState<{quote: string; author: string; company: string; photo?: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCount, setShowCount] = useState(6);
  useEffect(() => {
    fetch(`${API_URL}/testimonials`).then(r => r.json()).then(data => { setTestimonials(data); setLoading(false); });
  }, []);
  return (
    <section id="testimonials" className="scroll-mt-20 py-10 sm:py-16 bg-gray-900">
      <div className="container mx-auto px-2 sm:px-4">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-12 text-blue-400 text-center">{t.testimonials.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {loading
            ? Array.from({length: 3}).map((_, i) => (
                <div key={i} className="bg-gray-800 p-5 sm:p-6 rounded-lg shadow-lg animate-pulse">
                  <div className="rounded-full bg-gray-700 w-10 h-10 mb-3" />
                  <div className="h-5 w-2/3 bg-gray-700 rounded mb-2" />
                  <div className="h-4 w-1/2 bg-gray-700 rounded mb-2" />
                  <div className="h-3 w-full bg-gray-700 rounded" />
                </div>
              ))
            : testimonials.slice(0, showCount).map((t, i) => (
                <div key={i} className="bg-gray-800 p-5 sm:p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-3">
                    {t.photo
                      ? <img src={t.photo} alt={t.author} className="rounded-full w-10 h-10 mr-3 object-cover border-2 border-blue-700" />
                      : <div className="rounded-full bg-blue-800 text-white w-10 h-10 flex items-center justify-center font-bold mr-3 text-lg">{t.author ? t.author[0] : '?'}</div>
                    }
                    <div>
                      <div className="font-semibold text-blue-400">{t.author}</div>
                      <div className="text-xs text-gray-400">{t.company}</div>
                    </div>
                  </div>
                  <p className="text-base sm:text-lg text-gray-200 mb-3 sm:mb-4">"{t.quote}"</p>
                </div>
              ))}
        </div>
        {testimonials.length > showCount && (
          <button
            onClick={() => setShowCount(c => c + 6)}
            className="mt-6 bg-blue-600 text-white font-bold py-2 px-8 rounded-full hover:bg-blue-700 transition shadow-lg transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >Показать ещё</button>
        )}
      </div>
    </section>
  );
}

function Contact() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<{name?: string; email?: string; message?: string; phone?: string}>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  function validate() {
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "Введите имя";
    if (!email.trim()) errs.email = "Введите email";
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = "Некорректный email";
    if (!message.trim()) errs.message = "Введите сообщение";
    if (phone.trim() && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(phone)) errs.phone = "Некорректный номер телефона";
    return errs;
  }

  function focusFirstError(errs: typeof errors) {
    if (errs.name && nameRef.current) {
      nameRef.current.focus();
      nameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (errs.email && emailRef.current) {
      emailRef.current.focus();
      emailRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (errs.phone && phoneRef.current) {
      phoneRef.current.focus();
      phoneRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (errs.message && messageRef.current) {
      messageRef.current.focus();
      messageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    
    if (Object.keys(errs).length === 0) {
      setSending(true);
      
      try {
        const contactData = {
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          phone: phone.trim() || undefined,
          company: company.trim() || undefined,
          ip: await fetch('https://api.ipify.org?format=json').then(r => r.json()).then(data => data.ip).catch(() => 'unknown'),
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        };

        const response = await fetch(`${API_URL}/contacts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contactData),
        });

        if (response.ok) {
          setSent(true);
          setName(""); 
          setEmail(""); 
          setMessage("");
          setPhone("");
          setCompany("");
          toast.success(t.contact.thanks);
          setTimeout(() => setSent(false), 5000);
        } else {
          throw new Error('Ошибка отправки');
        }
      } catch (error) {
        console.error('Error sending contact form:', error);
        toast.error('Ошибка отправки. Попробуйте позже или свяжитесь с нами напрямую.');
      } finally {
        setSending(false);
      }
    } else {
      toast.error('Проверьте правильность заполнения формы');
      focusFirstError(errs);
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 py-10 sm:py-16 bg-gray-800">
      <div className="container mx-auto px-2 sm:px-4 max-w-lg sm:max-w-2xl text-center">
        <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-blue-400">{t.contact.title}</h2>
        <p className="mb-6 sm:mb-8 text-gray-300 text-sm sm:text-base">{t.contact.subtitle}</p>
        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit} noValidate aria-label="Форма обратной связи">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="text-left">
              <label htmlFor="contact-name" className="block text-sm font-medium text-gray-300 mb-1">{t.contact.name} *</label>
              <input 
                id="contact-name" 
                ref={nameRef} 
                type="text" 
                placeholder={t.contact.name} 
                value={name} 
                onChange={e => setName(e.target.value)} 
                className={`w-full px-4 py-3 rounded bg-gray-900 text-white border ${errors.name ? 'border-red-500' : 'border-gray-700'} focus:border-blue-500 outline-none text-sm sm:text-base transition-colors`} 
                aria-label={t.contact.name}
                disabled={sending}
              />
              {errors.name && <div className="text-red-500 text-xs mt-1" role="alert">{errors.name}</div>}
            </div>
            <div className="text-left">
              <label htmlFor="contact-email" className="block text-sm font-medium text-gray-300 mb-1">{t.contact.emailLabel} *</label>
              <input 
                id="contact-email" 
                ref={emailRef} 
                type="email" 
                placeholder={t.contact.email} 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className={`w-full px-4 py-3 rounded bg-gray-900 text-white border ${errors.email ? 'border-red-500' : 'border-gray-700'} focus:border-blue-500 outline-none text-sm sm:text-base transition-colors`} 
                aria-label={t.contact.emailLabel}
                disabled={sending}
              />
              {errors.email && <div className="text-red-500 text-xs mt-1" role="alert">{errors.email}</div>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="text-left">
              <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-300 mb-1">Телефон</label>
              <input 
                id="contact-phone" 
                ref={phoneRef} 
                type="tel" 
                placeholder="+7 (999) 123-45-67" 
                value={phone} 
                onChange={e => setPhone(e.target.value)} 
                className={`w-full px-4 py-3 rounded bg-gray-900 text-white border ${errors.phone ? 'border-red-500' : 'border-gray-700'} focus:border-blue-500 outline-none text-sm sm:text-base transition-colors`} 
                aria-label="Телефон"
                disabled={sending}
              />
              {errors.phone && <div className="text-red-500 text-xs mt-1" role="alert">{errors.phone}</div>}
            </div>
            <div className="text-left">
              <label htmlFor="contact-company" className="block text-sm font-medium text-gray-300 mb-1">Компания</label>
              <input 
                id="contact-company" 
                type="text" 
                placeholder="Название компании" 
                value={company} 
                onChange={e => setCompany(e.target.value)} 
                className="w-full px-4 py-3 rounded bg-gray-900 text-white border border-gray-700 focus:border-blue-500 outline-none text-sm sm:text-base transition-colors" 
                aria-label="Компания"
                disabled={sending}
              />
            </div>
          </div>
          
          <div className="text-left">
            <label htmlFor="contact-message" className="block text-sm font-medium text-gray-300 mb-1">{t.contact.message} *</label>
            <textarea 
              id="contact-message" 
              ref={messageRef} 
              placeholder={t.contact.message} 
              value={message} 
              onChange={e => setMessage(e.target.value)} 
              className={`w-full px-4 py-3 rounded bg-gray-900 text-white border ${errors.message ? 'border-red-500' : 'border-gray-700'} focus:border-blue-500 outline-none text-sm sm:text-base transition-colors`} 
              rows={4} 
              aria-label={t.contact.message}
              disabled={sending}
            ></textarea>
            {errors.message && <div className="text-red-500 text-xs mt-1" role="alert">{errors.message}</div>}
          </div>
          
          <button
            type="submit"
            disabled={sending}
            className={`bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition shadow-lg w-full sm:w-auto transform focus:outline-none focus:ring-4 focus:ring-blue-300 ${
              sending 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-blue-700 active:scale-95'
            }`}
            aria-label={t.contact.send}
          >
            {sending ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Отправка...
              </div>
            ) : (
              t.contact.send
            )}
          </button>
          
          {sent && (
            <div className="text-green-400 text-sm mt-2 p-3 bg-green-900 bg-opacity-30 rounded-lg border border-green-700" role="status">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                {t.contact.thanks}
              </div>
            </div>
          )}
        </form>
        <div className="mt-6 sm:mt-8 text-gray-400 text-xs sm:text-base">
          <div>{t.contact.phone}: <a href="tel:+74951234567" className="text-blue-400 hover:underline">{t.contact.phoneValue}</a></div>
          <div>{t.contact.emailLabel}: <a href="mailto:Teamastriks@gmail.com" className="text-blue-400 hover:underline">{t.contact.emailValue}</a></div>
          <div>{t.contact.address}: {t.contact.addressValue}</div>
        </div>
      </div>
    </section>
  );
}

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed z-50 bottom-6 right-6 bg-blue-600 text-white rounded-full shadow-lg p-3 transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'} animate-fade-in`}
      aria-label="Наверх"
      tabIndex={visible ? 0 : -1}
    >
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><polyline points="18 15 12 9 6 15"></polyline></svg>
    </button>
  );
}

export default function Home() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <Header>
        <FadeInSection><Hero /></FadeInSection>
        <FadeInSection><WhyUs /></FadeInSection>
        <FadeInSection><Services /></FadeInSection>
        <FadeInSection><Process /></FadeInSection>
        <FadeInSection><Portfolio /></FadeInSection>
        <FadeInSection><Investors /></FadeInSection>
        <FadeInSection><Team /></FadeInSection>
        <FadeInSection><Blog /></FadeInSection>
        <FadeInSection><CallToAction /></FadeInSection>
        <FadeInSection><Testimonials /></FadeInSection>
        <FadeInSection><FAQ /></FadeInSection>
        <FadeInSection><Contact /></FadeInSection>
      </Header>
      <ScrollToTopButton />
    </>
  );
}
