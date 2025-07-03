import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:4000/api";

const sectionFields = {
  services: ["title", "description"],
  testimonials: ["author", "company", "quote", "photo"],
  team: ["name", "role", "photo"],
};

const ADMIN_LOGIN = "admin";
const ADMIN_PASS = "admin123";

export default function AdminPanel() {
  const [auth, setAuth] = useState(false);
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [data, setData] = useState({ services: [], testimonials: [], team: [] });
  const [section, setSection] = useState<"services" | "testimonials" | "team">("services");
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
      ]).then(([services, testimonials, team]) => {
        setData({ services, testimonials, team });
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

  function handleChange(section: "services" | "testimonials" | "team", id: number, field: string, value: string) {
    setData((prev: any) => ({
      ...prev,
      [section]: prev[section].map((item: any) => item.id === id ? { ...item, [field]: value } : item),
    }));
  }

  function handleAdd(section: "services" | "testimonials" | "team") {
    setData((prev: any) => ({
      ...prev,
      [section]: [
        ...prev[section],
        { id: Date.now(), ...Object.fromEntries(sectionFields[section].map(f => [f, ""])) },
      ],
    }));
  }

  function handleDelete(section: "services" | "testimonials" | "team", id: number) {
    setData((prev: any) => ({
      ...prev,
      [section]: prev[section].filter((item: any) => item.id !== id),
    }));
  }

  function handleSave() {
    setSaving(true);
    fetch(`${API_URL}/${section}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data[section]),
    })
      .then(r => r.json())
      .then(() => setSaving(false));
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
      <header className="bg-gray-950 text-blue-400 py-4 px-8 flex items-center justify-between shadow-lg">
        <h1 className="text-2xl font-bold">Админ-панель</h1>
        <button onClick={() => setAuth(false)} className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded font-bold transition">Выйти</button>
      </header>
      <nav className="flex gap-4 px-8 py-4 bg-gray-800 border-b border-gray-700">
        <button onClick={() => setSection("services")} className={section === "services" ? "font-bold text-blue-400 underline" : "text-gray-300"}>Услуги</button>
        <button onClick={() => setSection("testimonials")} className={section === "testimonials" ? "font-bold text-blue-400 underline" : "text-gray-300"}>Отзывы</button>
        <button onClick={() => setSection("team")} className={section === "team" ? "font-bold text-blue-400 underline" : "text-gray-300"}>Команда</button>
      </nav>
      <main className="p-8">
        <h2 className="text-xl font-bold mb-4 text-blue-300">{section === "services" ? "Услуги" : section === "testimonials" ? "Отзывы" : "Команда"}</h2>
        <button onClick={() => handleAdd(section)} className="mb-4 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded transition">Добавить</button>
        <button onClick={handleSave} disabled={saving} className="mb-4 ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition disabled:opacity-50">{saving ? "Сохраняю..." : "Сохранить"}</button>
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