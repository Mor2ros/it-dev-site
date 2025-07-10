import React from 'react';

export type Language = 'ru' | 'en';

export const translations = {
  ru: {
    nav: [
      { href: "#hero", label: "Главная" },
      { href: "#services", label: "Услуги" },
      { href: "#process", label: "Процесс" },
      { href: "#portfolio", label: "Портфолио" },
      { href: "#investors", label: "Инвестиции" },
      { href: "#team", label: "Команда" },
      { href: "#blog", label: "Блог" },
      { href: "#testimonials", label: "Отзывы" },
      { href: "#faq", label: "FAQ" },
      { href: "#contact", label: "Контакты" },
    ],
    hero: {
      title: 'Ваш Надежный Партнер в Мире IT-Аутсорсинга',
      titleHighlight: 'IT-Аутсорсинга',
      subtitle: 'Превращаем идеи в инновационные цифровые решения. Разработка, консалтинг, поддержка — полный цикл услуг для вашего бизнеса.',
      discuss: 'Обсудить проект',
      services: 'Наши услуги',
    },
    whyus: {
      title: 'Почему выбирают AstrikS?',
      expertise: 'Глубокая Экспертиза',
      expertiseDesc: 'Сертифицированные специалисты с опытом в различных областях IT, готовые решать самые сложные задачи.',
      quality: 'Безупречное Качество',
      qualityDesc: 'Международные стандарты, лучшие практики (Agile, Scrum), надежность и производительность каждого решения.',
      partnership: 'Долгосрочное Партнерство',
      partnershipDesc: 'Строим отношения на доверии, прозрачности и открытой коммуникации для вашего успеха.'
    },
    services: {
      title: 'Наши Ключевые Услуги',
    },
    process: {
      title: 'Наш процесс работы',
      steps: [
        { icon: 'Zap', title: '1. Консультация и Анализ', desc: 'Погружаемся в ваши идеи, цели и требования, проводим глубокий анализ.' },
        { icon: 'Palette', title: '2. Дизайн и Прототипирование', desc: 'Создаем концепции, макеты и интерактивные прототипы для визуализации будущего продукта.' },
        { icon: 'Code', title: '3. Разработка и Тестирование', desc: 'Пишем чистый код, проводим тщательное тестирование, обеспечивая качество и надежность.' },
        { icon: 'Rocket', title: '4. Запуск и Поддержка', desc: 'Внедряем решение, оказываем поддержку и обеспечиваем дальнейшее развитие.' },
      ]
    },
    portfolio: {
      title: 'Портфолио',
    },
    investors: {
      title: 'Инвестиции',
    },
    team: {
      title: 'Наша команда',
    },
    blog: {
      title: 'Последние статьи и инсайты',
      more: 'Перейти в блог',
      read: 'Читать далее',
    },
    cta: {
      title: 'Готовы начать свой проект?',
      subtitle: 'Свяжитесь с нами сегодня, чтобы обсудить ваши идеи и получить бесплатную консультацию.',
      contact: 'Связаться с нами',
    },
    testimonials: {
      title: 'Отзывы клиентов',
    },
    faq: {
      title: 'FAQ',
      list: [
        { q: 'Сколько времени занимает запуск проекта?', a: 'В среднем от 2 до 8 недель в зависимости от сложности и объёма работ. Мы всегда согласуем сроки на старте.' },
        { q: 'Можно ли заказать только дизайн или только разработку?', a: 'Да, мы гибко подходим к задачам и можем подключиться на любом этапе.' },
        { q: 'Как происходит поддержка после запуска?', a: 'Мы предлагаем разные пакеты поддержки: от разовых консультаций до круглосуточного SLA.' },
        { q: 'Работаете ли вы с зарубежными клиентами?', a: 'Да, у нас есть опыт работы с компаниями из Европы, США и Азии.' },
      ]
    },
    contact: {
      title: 'Связаться с нами',
      subtitle: 'Оставьте заявку или напишите нам напрямую — мы ответим в ближайшее время!',
      name: 'Ваше имя (Иван)',
      email: 'Email (ivan@email.ru)',
      message: 'Сообщение (например: Хочу обсудить проект)',
      send: 'Отправить',
      thanks: 'Спасибо, ваша заявка отправлена! Мы свяжемся с вами в ближайшее время.',
      phone: 'Телефон',
      emailLabel: 'Email',
      address: 'Адрес',
      phoneValue: '+7 (495) 123-45-67',
      emailValue: 'Teamastriks@gmail.com',
      addressValue: 'г. Москва, ул. Инновационная, д. 42',
    }
  },
  en: {
    nav: [
      { href: "#hero", label: "Home" },
      { href: "#services", label: "Services" },
      { href: "#process", label: "Process" },
      { href: "#portfolio", label: "Portfolio" },
      { href: "#investors", label: "Investors" },
      { href: "#team", label: "Team" },
      { href: "#blog", label: "Blog" },
      { href: "#testimonials", label: "Testimonials" },
      { href: "#faq", label: "FAQ" },
      { href: "#contact", label: "Contact" },
    ],
    hero: {
      title: 'Your Reliable Partner in IT Outsourcing',
      titleHighlight: 'IT Outsourcing',
      subtitle: 'We transform ideas into innovative digital solutions. Development, consulting, support — a full cycle of services for your business.',
      discuss: 'Discuss Project',
      services: 'Our Services',
    },
    whyus: {
      title: 'Why Choose AstrikS?',
      expertise: 'Deep Expertise',
      expertiseDesc: 'Certified specialists with experience in various IT fields, ready to solve the most complex tasks.',
      quality: 'Impeccable Quality',
      qualityDesc: 'International standards, best practices (Agile, Scrum), reliability and performance of every solution.',
      partnership: 'Long-term Partnership',
      partnershipDesc: 'We build relationships on trust, transparency and open communication for your success.'
    },
    services: {
      title: 'Our Key Services',
    },
    process: {
      title: 'Our Work Process',
      steps: [
        { icon: 'Zap', title: '1. Consultation & Analysis', desc: 'We dive into your ideas, goals and requirements, conduct deep analysis.' },
        { icon: 'Palette', title: '2. Design & Prototyping', desc: 'We create concepts, layouts and interactive prototypes to visualize the future product.' },
        { icon: 'Code', title: '3. Development & Testing', desc: 'We write clean code, conduct thorough testing, ensuring quality and reliability.' },
        { icon: 'Rocket', title: '4. Launch & Support', desc: 'We implement the solution, provide support and ensure further development.' },
      ]
    },
    portfolio: {
      title: 'Portfolio',
    },
    investors: {
      title: 'Investors',
    },
    team: {
      title: 'Our Team',
    },
    blog: {
      title: 'Latest Articles & Insights',
      more: 'Go to Blog',
      read: 'Read More',
    },
    cta: {
      title: 'Ready to Start Your Project?',
      subtitle: 'Contact us today to discuss your ideas and get a free consultation.',
      contact: 'Contact Us',
    },
    testimonials: {
      title: 'Client Testimonials',
    },
    faq: {
      title: 'FAQ',
      list: [
        { q: 'How long does it take to launch a project?', a: 'On average from 2 to 8 weeks depending on complexity and scope. We always agree on deadlines at the start.' },
        { q: 'Can I order only design or only development?', a: 'Yes, we are flexible in our approach and can join at any stage.' },
        { q: 'How does support work after launch?', a: 'We offer different support packages: from one-time consultations to 24/7 SLA.' },
        { q: 'Do you work with foreign clients?', a: 'Yes, we have experience working with companies from Europe, USA and Asia.' },
      ]
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Leave a request or write to us directly — we will respond soon!',
      name: 'Your Name (John)',
      email: 'Email (john@email.com)',
      message: 'Message (e.g.: I want to discuss a project)',
      send: 'Send',
      thanks: 'Thank you, your request has been sent! We will contact you soon.',
      phone: 'Phone',
      emailLabel: 'Email',
      address: 'Address',
      phoneValue: '+1 (555) 123-4567',
      emailValue: 'Teamastriks@gmail.com',
      addressValue: '123 Innovation St, New York, NY 10001',
    }
  }
}; 