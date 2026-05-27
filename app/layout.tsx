import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Naturowell | Premium Pop Wellness Gummis",
  description: "Erlebe natürlichen Schlaf & täglichen Beauty-Glow mit unseren leckeren zuckerfreien Wirkstoffgummis aus Deutschland.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        {/* Load Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        
        {/* 1. Announcement Bar */}
        <div className="bg-brand-navy text-brand-cream text-center py-2 px-4 text-xs font-bold tracking-wider select-none border-b-3 border-brand-navy">
          🚚 KOSTENLOSER DHL-VERSAND AB 40€ | 🌿 100% VEGAN & ZUCKERFREI
        </div>

        {/* 2. Navigation Header */}
        <header className="border-b-3 border-brand-navy py-4 px-6 sticky top-0 bg-brand-cream bg-opacity-95 z-50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <nav className="hidden md:flex space-x-6 text-sm font-bold uppercase tracking-wider text-brand-navy">
              <a href="/" className="hover:underline">Home</a>
              <a href="#produkte" className="hover:underline">Shop</a>
              <a href="#philosophy" className="hover:underline">Philosophie</a>
            </nav>

            {/* Logo */}
            <div className="flex-1 md:flex-none text-center md:text-left">
              <a href="/" className="inline-flex items-center space-x-2">
                <img 
                  src="/logo_final.png" 
                  alt="Naturowell Logo" 
                  className="h-10 w-auto border-2 border-brand-navy rounded-full shadow-retro p-0.5 bg-brand-yellow" 
                />
                <span className="font-bold text-xl tracking-tight uppercase" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                  Naturowell
                </span>
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <a href="#produkte" className="btn-retro-pop text-xs py-2 px-4">
                Jetzt Kaufen
              </a>
            </div>
          </div>
        </header>

        {/* 3. Page Content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* 4. Footer */}
        <footer className="bg-brand-navy text-brand-cream border-t-3 border-brand-navy py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <span className="font-bold text-xl tracking-tight uppercase" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                Naturowell
              </span>
              <p className="text-xs opacity-75 leading-relaxed">
                Premium-Wirkstoffgummis für einen erholsamen Schlaf und deinen täglichen Beauty-Glow. Hergestellt in Deutschland.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm uppercase tracking-wider">Navigation</h4>
              <ul className="space-y-2 text-xs opacity-75">
                <li><a href="/" className="hover:underline">Startseite</a></li>
                <li><a href="#produkte" className="hover:underline">Alle Produkte</a></li>
                <li><a href="#philosophy" className="hover:underline">Unsere Philosophie</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm uppercase tracking-wider">Rechtliches</h4>
              <ul className="space-y-2 text-xs opacity-75">
                <li><a href="#" className="hover:underline">Impressum</a></li>
                <li><a href="#" className="hover:underline">Datenschutzerklärung</a></li>
                <li><a href="#" className="hover:underline">AGB</a></li>
                <li><a href="#" className="hover:underline">Widerrufsbelehrung</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm uppercase tracking-wider">Kundenservice</h4>
              <p className="text-xs opacity-75">
                Fragen? Wir helfen dir gerne weiter!<br />
                📧 E-Mail: <a href="mailto:hallo@naturowell.de" className="underline">hallo@naturowell.de</a>
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto border-t border-brand-cream border-opacity-20 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-xs opacity-60">
            <p>© {new Date().getFullYear()} Naturowell. Alle Rechte vorbehalten.</p>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <span>Klarna</span>
              <span>PayPal</span>
              <span>Sofort</span>
              <span>Visa</span>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
