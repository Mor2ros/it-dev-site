import React, { useState } from "react";
import {
  Code, CheckCircle, Star, Handshake, Laptop, Smartphone, Cloud, Menu, X, Zap, Palette, Rocket, MessageSquare, ChevronRight, Brain, GitFork, Lightbulb, Settings, UserPlus, Award, Users, BookOpen
} from "lucide-react";

const testimonials = [
  {
    quote:
      "AstrikS превзошли все наши ожидания! Их команда разработала для нас невероятно функциональное и интуитивно понятное веб-приложение, которое значительно оптимизировало наши бизнес-процессы.",
    author: "Анна Смирнова",
    company: "Генеральный директор, TechInnovate",
  },
  {
    quote:
      "Мы искали надежного партнера для мобильной разработки, и AstrikS оказались идеальным выбором. Приложение для iOS и Android было создано в срок, с высоким качеством и безупречным UX.",
    author: "Дмитрий Козлов",
    company: "Директор по развитию, MobileFuture",
  },
  {
    quote:
      "Благодаря AstrikS мы успешно мигрировали нашу инфраструктуру в облако. Процесс был гладким, а результаты превзошли ожидания.",
    author: "Елена Иванова",
    company: "Руководитель IT-отдела, CloudSolutions",
  },
];

const navLinks = [
  { href: "#hero", label: "Главная" },
  { href: "#services", label: "Услуги" },
  { href: "#process", label: "Процесс" },
  { href: "#blog", label: "Блог" },
  { href: "#testimonials", label: "Отзывы" },
  { href: "#contact", label: "Контакты" },
];

const services = [
  {
    icon: <Laptop className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 mb-3" />,
    title: 'Веб-разработка',
    description: 'Создание адаптивных, высокопроизводительных и безопасных веб-приложений любой сложности, от корпоративных сайтов и порталов до сложных SaaS-платформ и CRM-систем.',
    details: [
      'Frontend: React, Angular, Vue.js, Next.js',
      'Backend: Node.js, Python, Java, .NET, Go',
      'API и микросервисы',
      'CMS и e-commerce',
      'Интеграция сторонних сервисов'
    ]
  },
  {
    icon: <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 mb-3" />,
    title: 'Мобильная разработка',
    description: 'Разработка интуитивно понятных и функциональных мобильных приложений для iOS и Android, обеспечивающих отличный UX и высокую производительность.',
    details: [
      'iOS (Swift, Objective-C)',
      'Android (Kotlin, Java)',
      'Кроссплатформенно: React Native, Flutter',
      'Интеграция с IoT и Bluetooth'
    ]
  },
  {
    icon: <Cloud className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 mb-3" />,
    title: 'Облачные решения',
    description: 'Миграция, развертывание и оптимизация инфраструктуры в AWS, Azure, GCP. Безопасность, масштабируемость и снижение затрат.',
    details: [
      'AWS, Azure, GCP',
      'Архитектура и стратегия',
      'FinOps и оптимизация',
      'Безопасность и соответствие'
    ]
  },
  {
    icon: <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-pink-500 mb-3" />,
    title: 'AI и машинное обучение',
    description: 'Внедрение ИИ и ML для автоматизации, аналитики, прогнозирования и персонализации.',
    details: [
      'ML-модели и алгоритмы',
      'NLP, чат-боты',
      'Компьютерное зрение',
      'Рекомендательные системы'
    ]
  },
  {
    icon: <GitFork className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500 mb-3" />,
    title: 'DevOps и автоматизация',
    description: 'Внедрение DevOps, CI/CD, контейнеризация, мониторинг и автоматизация инфраструктуры.',
    details: [
      'CI/CD пайплайны',
      'Docker, Kubernetes',
      'Terraform, Ansible',
      'Мониторинг и логирование'
    ]
  },
  {
    icon: <Lightbulb className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 mb-3" />,
    title: 'IT-консалтинг и аудит',
    description: 'Стратегический аудит, оптимизация IT-инфраструктуры, безопасность и цифровая трансформация.',
    details: [
      'Анализ и ТЗ',
      'Аудит безопасности',
      'Оптимизация и масштабирование',
      'Управление проектами'
    ]
  },
  {
    icon: <Settings className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 mb-3" />,
    title: 'Поддержка и обслуживание',
    description: 'Техническая поддержка, мониторинг, обновления и масштабирование ваших решений 24/7.',
    details: [
      'Техподдержка 24/7',
      'Мониторинг и обновления',
      'Инциденты и восстановление',
      'Масштабирование'
    ]
  },
];

function Header({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div>
      <header className="fixed top-0 left-0 w-full bg-gray-950 bg-opacity-95 shadow-lg z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Code className="text-blue-400 w-8 h-8 mr-2" />
            <span className="text-2xl font-extrabold tracking-tight text-white">AstrikS</span>
          </div>
          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-blue-400 font-medium transition"
              >
                {link.label}
              </a>
            ))}
          </nav>
          {/* Mobile burger */}
          <button
            className="md:hidden text-gray-300 hover:text-blue-400 focus:outline-none"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Открыть меню"
          >
            {mobileOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="md:hidden bg-gray-900 border-t border-gray-800 shadow-xl animate-fade-in-down">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-6 py-4 text-gray-200 hover:bg-gray-800 text-lg border-b border-gray-800"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </header>
      <div className="pt-20 md:pt-24">{children}</div>
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" className="bg-gradient-to-r from-blue-900 to-gray-900 text-white py-12 sm:py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-2 sm:px-4 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <div className="flex items-center justify-center md:justify-start mb-4">
            <Code className="text-blue-400 w-8 h-8 sm:w-10 sm:h-10 mr-2 sm:mr-3" />
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">AstrikS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 sm:mb-6">
            Ваш Надежный Партнер в Мире <span className="text-blue-400">IT-Аутсорсинга</span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-300">
            Превращаем идеи в инновационные цифровые решения. Разработка, консалтинг, поддержка — полный цикл услуг для вашего бизнеса.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4 w-full max-w-xs mx-auto md:max-w-none md:mx-0">
            <a href="#contact" className="bg-blue-600 text-white font-bold py-3 px-6 sm:px-8 rounded-full hover:bg-blue-700 transition shadow-lg text-center">Обсудить проект</a>
            <a href="#services" className="bg-transparent border border-blue-600 text-blue-400 font-bold py-3 px-6 sm:px-8 rounded-full hover:bg-blue-900 hover:bg-opacity-30 transition text-center">Наши услуги</a>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img src="https://placehold.co/400x240/1E3A8A/FFFFFF?text=AstrikS+Team" alt="AstrikS Team" className="rounded-lg shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl h-auto object-cover" />
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="whyus" className="py-10 sm:py-16 bg-gray-900">
      <div className="container mx-auto px-2 sm:px-4 text-center">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-12 text-blue-400">Почему выбирают AstrikS?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
          <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl hover:shadow-2xl transition-transform hover:scale-105">
            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-green-400" />
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-white">Глубокая Экспертиза</h3>
            <p className="text-gray-300 text-sm sm:text-base">Сертифицированные специалисты с опытом в различных областях IT, готовые решать самые сложные задачи.</p>
          </div>
          <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl hover:shadow-2xl transition-transform hover:scale-105">
            <Star className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-yellow-400" />
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-white">Безупречное Качество</h3>
            <p className="text-gray-300 text-sm sm:text-base">Международные стандарты, лучшие практики (Agile, Scrum), надежность и производительность каждого решения.</p>
          </div>
          <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl hover:shadow-2xl transition-transform hover:scale-105">
            <Handshake className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-purple-400" />
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-white">Долгосрочное Партнерство</h3>
            <p className="text-gray-300 text-sm sm:text-base">Строим отношения на доверии, прозрачности и открытой коммуникации для вашего успеха.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-10 sm:py-16 bg-gray-800">
      <div className="container mx-auto px-2 sm:px-4 text-center">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-12 text-blue-400">Наши Ключевые Услуги</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {services.map((s, i) => (
            <div key={i} className="bg-gray-900 p-5 sm:p-6 rounded-lg shadow-lg hover:shadow-xl flex flex-col items-center">
              {s.icon}
              <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-white">{s.title}</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-2">{s.description}</p>
              <ul className="text-gray-400 text-xs sm:text-sm text-left list-disc pl-5 mb-2">
                {s.details.map((d, j) => <li key={j}>{d}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="py-10 sm:py-16 bg-gray-900">
      <div className="container mx-auto px-2 sm:px-4 text-center">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-12 text-blue-400">Наш процесс работы</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex flex-col items-center">
            <Zap className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 mb-3" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">1. Консультация и Анализ</h3>
            <p className="text-gray-400 text-xs sm:text-sm">Погружаемся в ваши идеи, цели и требования, проводим глубокий анализ.</p>
          </div>
          <div className="flex flex-col items-center">
            <Palette className="w-12 h-12 sm:w-16 sm:h-16 text-pink-400 mb-3" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">2. Дизайн и Прототипирование</h3>
            <p className="text-gray-400 text-xs sm:text-sm">Создаем концепции, макеты и интерактивные прототипы для визуализации будущего продукта.</p>
          </div>
          <div className="flex flex-col items-center">
            <Code className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400 mb-3" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">3. Разработка и Тестирование</h3>
            <p className="text-gray-400 text-xs sm:text-sm">Пишем чистый код, проводим тщательное тестирование, обеспечивая качество и надежность.</p>
          </div>
          <div className="flex flex-col items-center">
            <Rocket className="w-12 h-12 sm:w-16 sm:h-16 text-green-400 mb-3" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">4. Запуск и Поддержка</h3>
            <p className="text-gray-400 text-xs sm:text-sm">Внедряем решение, оказываем поддержку и обеспечиваем дальнейшее развитие.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
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
  return (
    <section id="portfolio" className="py-10 sm:py-16 bg-gray-900">
      <div className="container mx-auto px-2 sm:px-4 text-center">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-12 text-blue-400 flex items-center justify-center gap-2"><Award className="w-7 h-7 text-yellow-400" />Портфолио</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((p, i) => (
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
      </div>
    </section>
  );
}

function Team() {
  const members = [
    {
      name: 'Алексей Иванов',
      role: 'CEO & Tech Lead',
      photo: 'https://placehold.co/160x160/1E3A8A/FFFFFF?text=AI',
      bio: '15+ лет в IT, эксперт по архитектуре и развитию команд.'
    },
    {
      name: 'Мария Смирнова',
      role: 'UX/UI Designer',
      photo: 'https://placehold.co/160x160/1E3A8A/FFFFFF?text=MS',
      bio: 'Создаёт удобные интерфейсы и визуальные концепции.'
    },
    {
      name: 'Игорь Козлов',
      role: 'Fullstack Developer',
      photo: 'https://placehold.co/160x160/1E3A8A/FFFFFF?text=IK',
      bio: 'Специалист по современным веб-технологиям и DevOps.'
    },
    {
      name: 'Елена Петрова',
      role: 'Project Manager',
      photo: 'https://placehold.co/160x160/1E3A8A/FFFFFF?text=EP',
      bio: 'Организует процессы и коммуникацию с клиентами.'
    },
  ];
  return (
    <section id="team" className="py-10 sm:py-16 bg-gray-800">
      <div className="container mx-auto px-2 sm:px-4 text-center">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-12 text-blue-400 flex items-center justify-center gap-2"><Users className="w-7 h-7 text-blue-300" />Наша команда</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {members.map((m, i) => (
            <div key={i} className="bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col items-center">
              <img src={m.photo} alt={m.name} className="rounded-full w-24 h-24 mb-4 object-cover border-4 border-blue-700" />
              <h3 className="text-lg font-semibold text-white mb-1">{m.name}</h3>
              <div className="text-blue-400 text-sm mb-1">{m.role}</div>
              <p className="text-gray-400 text-xs mb-2">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: 'Сколько времени занимает запуск проекта?',
      a: 'В среднем от 2 до 8 недель в зависимости от сложности и объёма работ. Мы всегда согласуем сроки на старте.'
    },
    {
      q: 'Можно ли заказать только дизайн или только разработку?',
      a: 'Да, мы гибко подходим к задачам и можем подключиться на любом этапе.'
    },
    {
      q: 'Как происходит поддержка после запуска?',
      a: 'Мы предлагаем разные пакеты поддержки: от разовых консультаций до круглосуточного SLA.'
    },
    {
      q: 'Работаете ли вы с зарубежными клиентами?',
      a: 'Да, у нас есть опыт работы с компаниями из Европы, США и Азии.'
    },
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="py-10 sm:py-16 bg-gray-900">
      <div className="container mx-auto px-2 sm:px-4 max-w-2xl">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-12 text-blue-400 flex items-center gap-2"><BookOpen className="w-7 h-7 text-blue-200" />FAQ</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="bg-gray-800 rounded-lg shadow p-4">
              <button
                className="w-full text-left flex justify-between items-center text-white font-semibold text-base sm:text-lg focus:outline-none"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                {f.q}
                <span className="ml-2 text-blue-400">{open === i ? '-' : '+'}</span>
              </button>
              {open === i && <div className="mt-2 text-gray-300 text-sm sm:text-base">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section id="blog" className="py-10 sm:py-16 bg-gray-900">
      <div className="container mx-auto px-2 sm:px-4 text-center">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-12 text-blue-400">Последние статьи и инсайты</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-gray-800 p-5 sm:p-6 rounded-lg shadow-xl hover:shadow-2xl flex flex-col items-center">
            <img src="https://placehold.co/300x200/2C3E50/FFFFFF?text=AI+Trends" alt="AI Trends" className="rounded-md mb-4 w-full h-40 object-cover" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">Будущее AI в бизнесе: что нужно знать</h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-4">Как искусственный интеллект меняет бизнес и какие возможности он открывает.</p>
            <a href="#blog" className="text-blue-400 hover:underline text-sm flex items-center">Читать далее <ChevronRight className="inline-block w-4 h-4 ml-1" /></a>
          </div>
          <div className="bg-gray-800 p-5 sm:p-6 rounded-lg shadow-xl hover:shadow-2xl flex flex-col items-center">
            <img src="https://placehold.co/300x200/2C3E50/FFFFFF?text=Cloud+Security" alt="Cloud Security" className="rounded-md mb-4 w-full h-40 object-cover" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">Облачная безопасность: лучшие практики</h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-4">Обеспечение безопасности данных в облаке — критически важная задача. Мы делимся проверенными методами.</p>
            <a href="#blog" className="text-blue-400 hover:underline text-sm flex items-center">Читать далее <ChevronRight className="inline-block w-4 h-4 ml-1" /></a>
          </div>
          <div className="bg-gray-800 p-5 sm:p-6 rounded-lg shadow-xl hover:shadow-2xl flex flex-col items-center">
            <img src="https://placehold.co/300x200/2C3E50/FFFFFF?text=DevOps+Benefits" alt="DevOps Benefits" className="rounded-md mb-4 w-full h-40 object-cover" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">DevOps для стартапов: ускорение роста</h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-4">Как внедрение DevOps-практик помогает стартапам быстро масштабироваться и выпускать продукты.</p>
            <a href="#blog" className="text-blue-400 hover:underline text-sm flex items-center">Читать далее <ChevronRight className="inline-block w-4 h-4 ml-1" /></a>
          </div>
        </div>
        <a href="#blog" className="inline-block bg-transparent border border-gray-600 text-gray-300 font-bold py-3 px-8 rounded-full hover:bg-gray-700 hover:bg-opacity-30 transition duration-300 ease-in-out shadow-lg transform hover:scale-105 mt-8">Перейти в блог</a>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="bg-blue-700 text-white py-10 sm:py-16 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">Готовы начать свой проект?</h2>
        <p className="text-base sm:text-xl mb-6 sm:mb-8">Свяжитесь с нами сегодня, чтобы обсудить ваши идеи и получить бесплатную консультацию.</p>
        <a href="#contact" className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition shadow-lg inline-block">Связаться с нами</a>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-10 sm:py-16 bg-gray-900">
      <div className="container mx-auto px-2 sm:px-4">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-12 text-blue-400 text-center">Отзывы клиентов</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-800 p-5 sm:p-6 rounded-lg shadow-lg">
              <p className="text-base sm:text-lg text-gray-200 mb-3 sm:mb-4">“{t.quote}”</p>
              <div className="text-blue-400 font-semibold">{t.author}</div>
              <div className="text-gray-400 text-xs sm:text-sm">{t.company}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-10 sm:py-16 bg-gray-800">
      <div className="container mx-auto px-2 sm:px-4 max-w-lg sm:max-w-2xl text-center">
        <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-blue-400">Связаться с нами</h2>
        <p className="mb-6 sm:mb-8 text-gray-300 text-sm sm:text-base">Оставьте заявку или напишите нам напрямую — мы ответим в ближайшее время!</p>
        <form className="space-y-4 sm:space-y-6">
          <input type="text" placeholder="Ваше имя" className="w-full px-4 py-3 rounded bg-gray-900 text-white border border-gray-700 focus:border-blue-500 outline-none text-sm sm:text-base" />
          <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded bg-gray-900 text-white border border-gray-700 focus:border-blue-500 outline-none text-sm sm:text-base" />
          <textarea placeholder="Сообщение" className="w-full px-4 py-3 rounded bg-gray-900 text-white border border-gray-700 focus:border-blue-500 outline-none text-sm sm:text-base" rows={4}></textarea>
          <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition shadow-lg w-full sm:w-auto">Отправить</button>
        </form>
        <div className="mt-6 sm:mt-8 text-gray-400 text-xs sm:text-base">
          <div>Телефон: <a href="tel:+74951234567" className="text-blue-400 hover:underline">+7 (495) 123-45-67</a></div>
          <div>Email: <a href="mailto:info@astrikS.ru" className="text-blue-400 hover:underline">info@astrikS.ru</a></div>
          <div>Адрес: г. Москва, ул. Инновационная, д. 42</div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Header>
      <Hero />
      <WhyUs />
      <Services />
      <Process />
      <Portfolio />
      <Team />
      <Blog />
      <CallToAction />
      <Testimonials />
      <FAQ />
      <Contact />
    </Header>
  );
}
