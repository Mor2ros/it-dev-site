import React, { useState, useEffect } from 'react';
import {
  Code, Laptop, Smartphone, Cloud, Brain, GitFork, Lightbulb, Users, Briefcase, Mail, Phone, MapPin,
  CheckCircle, Star, Award, TrendingUp, Handshake, ShieldCheck, Clock, Layers, MessageSquare, ChevronRight,
  Database, Server, Settings, Palette, BookOpen, UserPlus, DollarSign, Zap, Rocket, PenTool, TrendingUp as TrendingUpIcon, Target
} from 'lucide-react';

// --- Shared Components ---

type SetCurrentPage = (page: string) => void;

const Header = ({ setCurrentPage }: { setCurrentPage: SetCurrentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Code className="text-blue-500 mr-3 w-8 h-8" />
          <span className="text-3xl font-extrabold text-white tracking-tight">AstrikS</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <button onClick={() => handleNavClick('home')} className="text-gray-300 hover:text-blue-500 transition duration-300 text-lg font-semibold">Главная</button>
          <button onClick={() => handleNavClick('services')} className="text-gray-300 hover:text-blue-500 transition duration-300 text-lg font-semibold">Услуги</button>
          <button onClick={() => handleNavClick('portfolio')} className="text-gray-300 hover:text-blue-500 transition duration-300 text-lg font-semibold">Портфолио</button>
          <button onClick={() => handleNavClick('investors')} className="text-gray-300 hover:text-blue-500 transition duration-300 text-lg font-semibold">Для инвесторов</button>
          <button onClick={() => handleNavClick('about')} className="text-gray-300 hover:text-blue-500 transition duration-300 text-lg font-semibold">О нас</button>
          <button onClick={() => handleNavClick('blog')} className="text-gray-300 hover:text-blue-500 transition duration-300 text-lg font-semibold">Блог</button>
          <button onClick={() => handleNavClick('careers')} className="text-gray-300 hover:text-blue-500 transition duration-300 text-lg font-semibold">Карьера</button>
          <button onClick={() => handleNavClick('contact')} className="text-gray-300 hover:text-blue-500 transition duration-300 text-lg font-semibold">Контакты</button>
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 shadow-xl py-2 mt-2">
          <button onClick={() => handleNavClick('home')} className="block px-6 py-3 text-gray-300 hover:bg-gray-700 text-lg w-full text-left">Главная</button>
          <button onClick={() => handleNavClick('services')} className="block px-6 py-3 text-gray-300 hover:bg-gray-700 text-lg w-full text-left">Услуги</button>
          <button onClick={() => handleNavClick('portfolio')} className="block px-6 py-3 text-gray-300 hover:bg-gray-700 text-lg w-full text-left">Портфолио</button>
          <button onClick={() => handleNavClick('investors')} className="block px-6 py-3 text-gray-300 hover:bg-gray-700 text-lg w-full text-left">Для инвесторов</button>
          <button onClick={() => handleNavClick('about')} className="block px-6 py-3 text-gray-300 hover:bg-gray-700 text-lg w-full text-left">О нас</button>
          <button onClick={() => handleNavClick('blog')} className="block px-6 py-3 text-gray-300 hover:bg-gray-700 text-lg w-full text-left">Блог</button>
          <button onClick={() => handleNavClick('careers')} className="block px-6 py-3 text-gray-300 hover:bg-gray-700 text-lg w-full text-left">Карьера</button>
          <button onClick={() => handleNavClick('contact')} className="block px-6 py-3 text-gray-300 hover:bg-gray-700 text-lg w-full text-left">Контакты</button>
        </div>
      )}
    </header>
  );
};

const Footer = ({ setCurrentPage }: { setCurrentPage: SetCurrentPage }) => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-10">
      <div className="container mx-auto px-4 text-center md:flex md:justify-between md:items-center">
        <div className="mb-6 md:mb-0">
          <p>&copy; 2025 AstrikS. Все права защищены.</p>
          <p>Ваш надежный партнер в мире IT-аутсорсинга.</p>
        </div>
        <div className="mb-6 md:mb-0">
          <p className="font-semibold mb-2 text-white">Наши услуги:</p>
          <ul className="space-y-1">
            <li><button onClick={() => setCurrentPage('services')} className="hover:text-blue-400 transition duration-300">Веб-разработка</button></li>
            <li><button onClick={() => setCurrentPage('services')} className="hover:text-blue-400 transition duration-300">Мобильная разработка</button></li>
            <li><button onClick={() => setCurrentPage('services')} className="hover:text-blue-400 transition duration-300">Облачные решения</button></li>
            <li><button onClick={() => setCurrentPage('services')} className="hover:text-blue-400 transition duration-300">AI/ML</button></li>
            <li><button onClick={() => setCurrentPage('services')} className="hover:text-blue-400 transition duration-300">Контент-мейкинг</button></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2 text-white">Контакты:</p>
          <p>Телефон: <a href="tel:+74951234567" className="text-blue-400 hover:underline">+7 (495) 123-45-67</a></p>
          <p>Email: <a href="mailto:info@astrikS.ru" className="text-blue-400 hover:underline">info@astrikS.ru</a></p>
          <p>Адрес: г. Москва, ул. Инновационная, д. 42</p>
        </div>
      </div>
    </footer>
  );
};

const HomePage = ({ setCurrentPage }: { setCurrentPage: SetCurrentPage }) => {
  const testimonials = [
    {
      quote: "AstrikS превзошли все наши ожидания! Их команда разработала для нас невероятно функциональное и интуитивно понятное веб-приложение, которое значительно оптимизировало наши бизнес-процессы. Отличная коммуникация и глубокое понимание наших потребностей.",
      author: "Анна Смирнова",
      company: "Генеральный директор, TechInnovate"
    },
    {
      quote: "Мы искали надежного партнера для мобильной разработки, и AstrikS оказались идеальным выбором. Приложение для iOS и Android было создано в срок, с высоким качеством и безупречным UX. Настоящие профессионалы своего дела!",
      author: "Дмитрий Козлов",
      company: "Директор по развитию, MobileFuture"
    },
    {
      quote: "Благодаря AstrikS мы успешно мигрировали нашу инфраструктуру в облако. Процесс был гладким, а результаты превзошли ожидания. Теперь наша система работает стабильнее и эффективнее, а затраты на обслуживание снизились.",
      author: "Елена Иванова",
      company: "Руководитель IT-отдела, CloudSolutions"
    }
  ];

  return (
    <div className="bg-gray-800 text-gray-200">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-gray-900 text-white py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Ваш Надежный Партнер в Мире <span className="text-blue-400">IT-Аутсорсинга</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Превращаем идеи в инновационные цифровые решения. Разработка, консалтинг, поддержка — полный цикл услуг для вашего бизнеса. От стартапов до крупных предприятий, мы предлагаем индивидуальные подходы.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <button onClick={() => setCurrentPage('contact')} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg transform hover:scale-105">
                Обсудить проект
              </button>
              <button onClick={() => setCurrentPage('services')} className="bg-transparent border border-blue-600 text-blue-400 font-bold py-3 px-8 rounded-full hover:bg-blue-900 hover:bg-opacity-30 transition duration-300 ease-in-out transform hover:scale-105">
                Наши услуги
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <img src="https://placehold.co/600x400/1E3A8A/FFFFFF?text=AstrikS+Team+working" alt="AstrikS Team working" className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{ stopColor: 'rgb(30,58,138)', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'rgb(26,32,44)', stopOpacity: 0 }} />
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="100" height="100" fill="url(#grad1)" />
            <circle cx="20" cy="80" r="15" fill="#3B82F6" opacity="0.3" />
            <circle cx="80" cy="30" r="10" fill="#3B82F6" opacity="0.2" />
          </svg>
        </div>
      </section>
      {/* ... остальные секции ... */}
    </div>
  );
};

const ExamplePage = () => {
  const [currentPage, setCurrentPage] = useState('home');

  let PageComponent;
  switch (currentPage) {
    case 'home':
      PageComponent = <HomePage setCurrentPage={setCurrentPage} />;
      break;
    default:
      PageComponent = <HomePage setCurrentPage={setCurrentPage} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header setCurrentPage={setCurrentPage} />
      <main className="flex-1">
        {PageComponent}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default ExamplePage; 