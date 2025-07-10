import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import {
  Code, Cloud, Smartphone, Laptop, Settings, Rocket, Palette, Brain, ShieldCheck, UserPlus,
  Zap, Target, Briefcase, Award, TrendingUp, DollarSign
} from "lucide-react";

const API_URL = "/api";

const sectionFields = {
  services: ["title", "description", "icon"],
  testimonials: ["author", "company", "quote", "photo"],
  team: ["name", "role", "photo"],
  contacts: ["name", "email", "phone", "company", "message", "timestamp"],
};

const ADMIN_LOGIN = "admin";
const ADMIN_PASS = "admin123";

// Доступные иконки для услуг
const availableIcons = [
  { name: "Code", label: "Код" },
  { name: "Cloud", label: "Облако" },
  { name: "Smartphone", label: "Смартфон" },
  { name: "Laptop", label: "Ноутбук" },
  { name: "Settings", label: "Настройки" },
  { name: "Rocket", label: "Ракета" },
  { name: "Palette", label: "Палитра" },
  { name: "Brain", label: "Мозг" },
  { name: "ShieldCheck", label: "Щит" },
  { name: "UserPlus", label: "Пользователь" },
  { name: "Zap", label: "Молния" },
  { name: "Target", label: "Цель" },
  { name: "Briefcase", label: "Портфель" },
  { name: "Award", label: "Награда" },
  { name: "TrendingUp", label: "График" },
  { name: "DollarSign", label: "Доллар" },
];

// Функция для получения иконки по имени
function getIconComponent(iconName: string) {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    Code, Cloud, Smartphone, Laptop, Settings, Rocket, Palette, Brain, ShieldCheck, UserPlus,
    Zap, Target, Briefcase, Award, TrendingUp, DollarSign
  };
  return iconMap[iconName] || Code;
}

export default function AdminPanel() {
  const [auth, setAuth] = useState(false);
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [data, setData] = useState({ services: [], testimonials: [], team: [], contacts: [] });
  const [section, setSection] = useState<"services" | "testimonials" | "team" | "contacts">("services");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{login?: string; pass?: string; common?: string}>({});

  useEffect(() => {
    if (auth) {
      setLoading(true);
      Promise.all([
        fetch(`${API_URL}/services`).then(r => r.json()),
        fetch(`${API_URL}/testimonials`).then(r => r.json()),
        fetch(`${API_URL}/team`).then(r => r.json()),
        fetch(`${API_URL}/contacts`).then(r => r.json()),
      ]).then(([services, testimonials, team, contacts]) => {
        setData({ services, testimonials, team, contacts });
        setLoading(false);
      });
    }
  }, [auth]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!login.trim()) errs.login = "Введите логин";
    if (!pass.trim()) errs.pass = "Введите пароль";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    if (login === ADMIN_LOGIN && pass === ADMIN_PASS) {
      setAuth(true);
      setErrors({});
    } else {
      setErrors({ common: "Неверный логин или пароль" });
    }
  }

  function handleChange(section: "services" | "testimonials" | "team" | "contacts", id: number, field: string, value: string) {
    setData((prev: any) => ({
      ...prev,
      [section]: prev[section].map((item: any) => item.id === id ? { ...item, [field]: value } : item),
    }));
  }

  function handleAdd(section: "services" | "testimonials" | "team" | "contacts") {
    setData((prev: any) => ({
      ...prev,
      [section]: [
        ...prev[section],
        { id: Date.now(), ...Object.fromEntries(sectionFields[section].map(f => [f, ""])) },
      ],
    }));
  }

  function handleDelete(section: "services" | "testimonials" | "team" | "contacts", id: number) {
    if (confirm("Вы уверены, что хотите удалить этот элемент?")) {
      setData((prev: any) => ({
        ...prev,
        [section]: prev[section].filter((item: any) => item.id !== id),
      }));
      toast.success("Элемент удален");
    }
  }

  function handleSave() {
    // Валидация данных перед сохранением
    const itemsToSave = data[section];
    const requiredFields = sectionFields[section];
    
    for (let i = 0; i < itemsToSave.length; i++) {
      const item = itemsToSave[i];
      for (const field of requiredFields) {
        if (field !== 'photo' && field !== 'timestamp' && !String(item[field] || '').trim()) {
          toast.error(`Пожалуйста, заполните поле "${field}" в элементе ${i + 1}`);
          return;
        }
      }
    }
    
    setSaving(true);
    fetch(`${API_URL}/${section}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemsToSave),
    })
      .then(r => {
        if (!r.ok) {
          throw new Error(`HTTP error! status: ${r.status}`);
        }
        return r.json();
      })
      .then(() => {
        setSaving(false);
        // Показываем уведомление об успешном сохранении
        toast.success("Данные успешно сохранены!");
      })
      .catch(error => {
        console.error('Ошибка сохранения:', error);
        setSaving(false);
        toast.error(`Ошибка сохранения: ${error.message}`);
      });
  }

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded shadow-md w-full max-w-xs border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Вход в админ-панель</h2>
          <input type="text" placeholder="Логин" value={login} onChange={e => setLogin(e.target.value)} className={`mb-2 w-full px-3 py-2 border ${errors.login ? 'border-red-500' : 'border-gray-700'} rounded bg-gray-900 text-white`} />
          {errors.login && <div className="text-red-400 text-xs mb-2">{errors.login}</div>}
          <input type="password" placeholder="Пароль" value={pass} onChange={e => setPass(e.target.value)} className={`mb-2 w-full px-3 py-2 border ${errors.pass ? 'border-red-500' : 'border-gray-700'} rounded bg-gray-900 text-white`} />
          {errors.pass && <div className="text-red-400 text-xs mb-2">{errors.pass}</div>}
          {errors.common && <div className="text-red-400 text-xs mb-2 text-center">{errors.common}</div>}
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-bold transition">Войти</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Toaster position="top-right" />
      <header className="bg-gray-950 text-blue-400 py-4 px-8 flex items-center justify-between shadow-lg">
        <h1 className="text-2xl font-bold">Админ-панель</h1>
        <button onClick={() => setAuth(false)} className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded font-bold transition">Выйти</button>
      </header>
      <nav className="flex gap-4 px-8 py-4 bg-gray-800 border-b border-gray-700">
        <button onClick={() => setSection("services")} className={section === "services" ? "font-bold text-blue-400 underline" : "text-gray-300"}>Услуги</button>
        <button onClick={() => setSection("testimonials")} className={section === "testimonials" ? "font-bold text-blue-400 underline" : "text-gray-300"}>Отзывы</button>
        <button onClick={() => setSection("team")} className={section === "team" ? "font-bold text-blue-400 underline" : "text-gray-300"}>Команда</button>
        <button onClick={() => setSection("contacts")} className={section === "contacts" ? "font-bold text-blue-400 underline" : "text-gray-300"}>Контакты</button>
      </nav>
      <main className="p-8">
        <h2 className="text-xl font-bold mb-4 text-blue-300">
          {section === "services" ? "Услуги" : 
           section === "testimonials" ? "Отзывы" : 
           section === "team" ? "Команда" : 
           "Контакты"}
        </h2>
        <button onClick={() => handleAdd(section)} className="mb-4 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded transition">Добавить</button>
        <button 
          onClick={handleSave} 
          disabled={saving} 
          className="mb-4 ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition disabled:opacity-50 flex items-center gap-2"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Сохраняю...
            </>
          ) : (
            "Сохранить"
          )}
        </button>
        {loading ? (
          <div className="text-gray-400">Загрузка...</div>
        ) : (
          <div className="space-y-4">
            {data[section].map((item: any) => (
              <div key={item.id} className="bg-gray-800 p-4 rounded shadow flex flex-col gap-2 border border-gray-700">
                {sectionFields[section].map(field => (
                  field === "description" || field === "quote" ? (
                    <textarea
                      key={field}
                      value={item[field]}
                      onChange={e => handleChange(section, item.id, field, e.target.value)}
                      placeholder={field === "description" ? "Описание" : "Отзыв"}
                      className="border border-gray-700 bg-gray-900 text-white px-2 py-1 rounded mb-2"
                    />
                  ) : field === "photo" ? (
                    <input
                      key={field}
                      value={item[field]}
                      onChange={e => handleChange(section, item.id, field, e.target.value)}
                      placeholder="URL фото (необязательно)"
                      className="border border-gray-700 bg-gray-900 text-white px-2 py-1 rounded mb-2"
                      type="url"
                    />
                  ) : field === "icon" && section === "services" ? (
                    <div key={field} className="mb-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Иконка:</label>
                      <div className="grid grid-cols-4 gap-2">
                        {availableIcons.map(icon => {
                          const IconComponent = getIconComponent(icon.name);
                          const isSelected = item[field] === icon.name;
                          return (
                            <button
                              key={icon.name}
                              type="button"
                              onClick={() => handleChange(section, item.id, field, icon.name)}
                              className={`p-2 rounded border-2 transition-all ${
                                isSelected 
                                  ? 'border-blue-400 bg-blue-900 bg-opacity-30' 
                                  : 'border-gray-600 hover:border-gray-500 bg-gray-700'
                              }`}
                              title={icon.label}
                            >
                              <IconComponent className="w-6 h-6 text-blue-400" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <input
                      key={field}
                      value={item[field]}
                      onChange={e => handleChange(section, item.id, field, e.target.value)}
                      placeholder={field === "title" ? "Название услуги" : field === "author" ? "Автор" : field === "company" ? "Компания" : field === "name" ? "Имя" : field === "role" ? "Роль" : field}
                      className="border border-gray-700 bg-gray-900 text-white px-2 py-1 rounded mb-2"
                    />
                  )
                ))}
                <button onClick={() => handleDelete(section, item.id)} className="mt-2 bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded self-end transition">Удалить</button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 