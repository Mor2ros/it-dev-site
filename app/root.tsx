import React from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>AstrikS — IT-аутсорсинг, разработка, поддержка, консалтинг</title>
        <meta name="description" content="AstrikS — полный цикл IT-услуг: разработка, поддержка, консалтинг, аутсорсинг. Воплощаем идеи в цифровые решения для бизнеса." />
        {/* Open Graph */}
        <meta property="og:title" content="AstrikS — IT-аутсорсинг, разработка, поддержка, консалтинг" />
        <meta property="og:description" content="AstrikS — полный цикл IT-услуг: разработка, поддержка, консалтинг, аутсорсинг. Воплощаем идеи в цифровые решения для бизнеса." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://astriks.ru/" />
        <meta property="og:image" content="/favicon.ico" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="AstrikS — IT-аутсорсинг, разработка, поддержка, консалтинг" />
        <meta name="twitter:description" content="AstrikS — полный цикл IT-услуг: разработка, поддержка, консалтинг, аутсорсинг. Воплощаем идеи в цифровые решения для бизнеса." />
        <meta name="twitter:image" content="/favicon.ico" />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
