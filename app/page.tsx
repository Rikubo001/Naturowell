import { getProducts, getCheckoutUrl } from "@/lib/shopify";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await getProducts();

  // Find individual products based on their handle / title keywords
  const sleepProduct = products.find(p => p.handle.includes("sleep")) || products[0];
  const beautyProduct = products.find(p => p.handle.includes("beauty")) || products[1];
  const duoProduct = products.find(p => p.handle.includes("duo")) || products[2];

  // Helper function to resolve localized image paths for mockups
  const getImageSrc = (handle: string, defaultUrl: string) => {
    if (handle.includes("sleep")) return "/naturowell_sleep_label_center.png";
    if (handle.includes("beauty")) return "/naturowell_beauty_label_center.png";
    if (handle.includes("duo")) return "/naturowell_duo_pack_mockup.png";
    return defaultUrl;
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO BANNER */}
      <section className="bg-brand-cream py-20 px-6 border-b-3 border-brand-navy">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="badge-pop">🌿 Premium Pop Wellness</span>
          <h1 className="text-4xl md:text-6xl tracking-tight leading-tight" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            Natürliches Wohlbefinden, das du schmecken kannst.
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Hochkonzentrierte Wirkstoffgummis für einen erholsamen Schlaf und deinen täglichen Beauty-Glow. 100% vegan, zuckerfrei und wissenschaftlich fundiert hergestellt in Deutschland.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#duo-pack" className="btn-retro-pop text-sm py-4 px-8 w-full sm:w-auto">
              Duo Pack Entdecken
            </a>
            <a href="#produkte" className="btn-retro-secondary text-sm py-4 px-8 w-full sm:w-auto">
              Sortiment ansehen
            </a>
          </div>
        </div>
      </section>

      {/* 2. FLAGSHIP BUNDLE SPOTLIGHT (Beauty Sleep Duo) */}
      <section id="duo-pack" className="max-w-6xl mx-auto px-6 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-brand-cream border-navy-pop rounded-3xl p-8 md:p-12 shadow-card-retro">
          
          {/* Mockup Column */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative group max-w-md w-full">
              <img 
                src={getImageSrc(duoProduct.handle, duoProduct.featuredImage?.url || "/naturowell_duo_pack_mockup.png")} 
                alt="Naturowell Beauty Sleep Duo Pack Mockup"
                className="w-full h-auto object-contain rounded-2xl border-navy-pop p-4 bg-brand-cream bg-opacity-50"
              />
              <div className="absolute top-4 left-4 bg-brand-yellow border-navy-pop text-xs font-extrabold px-3 py-1.5 rounded-full shadow-retro">
                🔥 BESTSELLER (PARES IDEAL)
              </div>
            </div>
          </div>

          {/* Marketing Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="badge-pop">Duo Pack (Zwei botes)</span>
            <h2 className="text-3xl md:text-4xl tracking-tight leading-tight" style={{ fontFamily: "'Fredoka', sans-serif" }}>
              Naturowell Beauty Sleep Duo Pack
            </h2>
            <p className="text-sm opacity-90 leading-relaxed">
              Cuidarse por dentro al dormir y brillar por fuera de día: el pack definitivo de bienestar Pop. Combina tu rutina diurna y nocturna al mejor precio posible.
            </p>

            <ul className="space-y-3 text-sm font-semibold">
              <li className="flex items-center space-x-2">
                <span className="text-lg">🌞</span>
                <span>Tag: 2 Beauty & Glow Gummies (Biotin & Zink)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-lg">🌙</span>
                <span>Nacht: 2 Deep Sleep Gummies (Melatonin & Melisse)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-lg">✨</span>
                <span>¡Ahorro exclusivo de 10,00 € incluido!</span>
              </li>
            </ul>

            <div className="border-t border-brand-navy border-opacity-20 pt-4 flex items-center justify-between">
              <div>
                <span className="text-sm opacity-70 line-through">49,80 €</span>
                <div className="text-3xl font-extrabold text-brand-navy">39,90 €</div>
                <span className="text-[10px] opacity-75">inkl. MwSt., zzgl. <a href="#" className="underline">Versandkosten</a></span>
              </div>
              <div>
                <a 
                  href={await getCheckoutUrl(duoProduct.variants.edges[0]?.node.id || "3")}
                  className="btn-retro-pop py-3.5 px-8 text-sm"
                >
                  Duo Kaufen
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INDIVIDUAL PRODUCTS GRID */}
      <section id="produkte" className="max-w-6xl mx-auto px-6 space-y-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            Nuestra Gama de Gomitas
          </h2>
          <p className="text-sm opacity-85">
            Cada producto formulado meticulosamente con la cantidad justa de ingredientes activos y un sabor delicioso para que nunca olvides tu ritual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Card 1: Sleep Gummies */}
          <div className="card-retro-pop flex flex-col justify-between p-6">
            <div className="space-y-4">
              <div className="relative rounded-xl border-navy-pop overflow-hidden bg-brand-cream">
                <img 
                  src={getImageSrc(sleepProduct.handle, sleepProduct.featuredImage?.url || "/naturowell_sleep_label_center.png")} 
                  alt="Deep Sleep Gummies" 
                  className="w-full h-auto object-contain p-4"
                />
                <span className="absolute top-2 right-2 bg-brand-lavender border-navy-pop text-[10px] font-bold px-2 py-0.5 rounded-full">
                  💜 SUEÑO
                </span>
              </div>
              <h3 className="text-2xl" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                {sleepProduct.title}
              </h3>
              <p className="text-xs opacity-85 leading-relaxed">
                {sleepProduct.description} Combina Ashwagandha, Melisse, Kamille y Lavendel para una relajación muscular y mental óptima antes de la cama.
              </p>
            </div>
            
            <div className="border-t border-brand-navy border-opacity-10 mt-6 pt-4 flex items-center justify-between">
              <div>
                <div className="text-2xl font-extrabold">24,90 €</div>
                <span className="text-[9px] opacity-75">150g (60 Gummis) | inkl. MwSt.</span>
              </div>
              <a 
                href={`/product/${sleepProduct.handle}`}
                className="btn-retro-pop py-2.5 px-6 text-xs"
              >
                In den Korb
              </a>
            </div>
          </div>

          {/* Card 2: Beauty Gummies */}
          <div className="card-retro-pop flex flex-col justify-between p-6">
            <div className="space-y-4">
              <div className="relative rounded-xl border-navy-pop overflow-hidden bg-brand-cream">
                <img 
                  src={getImageSrc(beautyProduct.handle, beautyProduct.featuredImage?.url || "/naturowell_beauty_label_center.png")} 
                  alt="Beauty & Glow Gummies" 
                  className="w-full h-auto object-contain p-4"
                />
                <span className="absolute top-2 right-2 bg-brand-coral border-navy-pop text-[10px] font-bold px-2 py-0.5 rounded-full">
                  💗 GLOW
                </span>
              </div>
              <h3 className="text-2xl" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                {beautyProduct.title}
              </h3>
              <p className="text-xs opacity-85 leading-relaxed">
                {beautyProduct.description} Aporte masivo de Biotina (300%) y Zinc para nutrir y fortalecer tu cabello, dotar de brillo a tu piel y proteger las células corporales.
              </p>
            </div>

            <div className="border-t border-brand-navy border-opacity-10 mt-6 pt-4 flex items-center justify-between">
              <div>
                <div className="text-2xl font-extrabold">24,90 €</div>
                <span className="text-[9px] opacity-75">180g (60 Gummis) | inkl. MwSt.</span>
              </div>
              <a 
                href={`/product/${beautyProduct.handle}`}
                className="btn-retro-pop py-2.5 px-6 text-xs"
              >
                In den Korb
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 4. TRUST CREDENTIALS SECTION */}
      <section className="bg-brand-navy text-brand-cream py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl md:text-4xl text-brand-cream" style={{ fontFamily: "'Fredoka', sans-serif" }}>
              Nuestras Certificaciones & Garantías
            </h2>
            <p className="text-sm opacity-75">
              Máxima seriedad y calidad alemana para tu consumo de bienestar diario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-cream text-brand-navy rounded-2xl p-6 border-navy-pop shadow-retro space-y-3">
              <span className="text-3xl">🇩🇪</span>
              <h4 className="font-bold text-lg">Hergestellt in DE</h4>
              <p className="text-xs opacity-85 leading-relaxed">
                Toda la cadena de producción se realiza en instalaciones alemanas homologadas bajo las estrictas directivas de seguridad HACCP e ISO 22000.
              </p>
            </div>
            
            <div className="bg-brand-cream text-brand-navy rounded-2xl p-6 border-navy-pop shadow-retro space-y-3">
              <span className="text-3xl">🌿</span>
              <h4 className="font-bold text-lg">100% Vegano & Pectina</h4>
              <p className="text-xs opacity-85 leading-relaxed">
                Nuestras gomitas no contienen gelatina animal de ningún tipo. Están basadas enteramente en pectina vegetal para una textura suave e ideal.
              </p>
            </div>

            <div className="bg-brand-cream text-brand-navy rounded-2xl p-6 border-navy-pop shadow-retro space-y-3">
              <span className="text-3xl">🚫</span>
              <h4 className="font-bold text-lg">Zuckerfrei genießen</h4>
              <p className="text-xs opacity-85 leading-relaxed">
                Endulzado de forma inteligente con sustitutos dentales seguros que evitan el azúcar y el riesgo de caries, perfecto para tu rutina nocturna.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PHILOSOPHY SECTION */}
      <section id="philosophy" className="max-w-4xl mx-auto px-6 text-center space-y-6 scroll-mt-24">
        <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Fredoka', sans-serif" }}>
          Nuestra Filosofía: El Bienestar no tiene que ser aburrido
        </h2>
        <p className="text-sm leading-relaxed max-w-2xl mx-auto opacity-90">
          En **Naturowell**, nos cansamos de las píldoras polvorientas y las cápsulas de farmacia aburridas. Diseñamos suplementos activos que son deliciosos, estéticos y visualmente atractivos para que cuidar de tu cuerpo sea el mejor momento del día. 
        </p>
        <div className="inline-block border-navy-pop rounded-2xl p-4 bg-brand-yellow font-extrabold text-sm shadow-retro">
          ☀️ Estética, sabor y ciencia en cada mordisco.
        </div>
      </section>

    </div>
  );
}
