import { getProduct, getCheckoutUrl } from "@/lib/shopify";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: {
    handle: string;
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await getProduct(params.handle);

  if (!product) {
    return notFound();
  }

  const variantId = product.variants.edges[0]?.node.id || "";
  const isSleep = product.handle.includes("sleep");

  // Localized image mapping
  const imageSrc = isSleep 
    ? "/naturowell_sleep_label_center.png" 
    : "/naturowell_beauty_label_center.png";

  // Formulate add-to-cart action link
  const checkoutUrl = await getCheckoutUrl(variantId, 1);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      
      {/* 1. Main Showcase Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* Left Side: Mockup Image */}
        <div className="flex justify-center border-navy-pop rounded-3xl p-8 bg-brand-cream bg-opacity-40 shadow-card-retro">
          <img 
            src={imageSrc} 
            alt={product.title} 
            className="w-full h-auto max-w-sm object-contain"
          />
        </div>

        {/* Right Side: Product Custom Buy Box */}
        <div className="space-y-6">
          <span className="badge-pop">{isSleep ? "💜 N° 01 SLEEP" : "💗 N° 02 BEAUTY"}</span>
          <h1 className="text-3xl md:text-4xl" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            {product.title}
          </h1>
          <p className="text-sm opacity-90 leading-relaxed">
            {product.description}
          </p>

          <div className="border-t border-b border-brand-navy border-opacity-20 py-4 flex items-center justify-between">
            <div>
              <div className="text-3xl font-extrabold text-brand-navy">
                {product.priceRange.minVariantPrice.amount} €
              </div>
              <span className="text-[10px] opacity-75">
                {isSleep ? "150g (60 Gummis)" : "180g (60 Gummis)"} | inkl. MwSt., zzgl. Versand
              </span>
            </div>
            <div>
              <a href={checkoutUrl} className="btn-retro-pop py-4 px-8 text-sm">
                In den Warenkorb
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-brand-navy">Produktmerkmale:</h4>
            <ul className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <li>🇩🇪 Hergestellt in DE</li>
              <li>🌿 100% Gelatinefrei</li>
              <li>🚫 Ohne Zuckerzusatz</li>
              <li>🔬 Unabhängig Laborgeprüft</li>
            </ul>
          </div>
        </div>

      </div>

      {/* 2. Technical Details & Legal Compliancy (German LMIV & NemV) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-brand-navy border-opacity-20 pt-12">
        
        {/* Left column: Ingredients & Table */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-2xl" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            Nährwerte & Inhaltsstoffe
          </h3>
          
          {/* Custom German Nutritional Table */}
          <div className="border-navy-pop rounded-2xl overflow-hidden bg-brand-cream shadow-retro">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-brand-navy text-brand-cream border-b-2 border-brand-navy font-bold">
                  <th className="p-3">Inhaltsstoff</th>
                  <th className="p-3">pro Tagesdosis (2 Gummis)</th>
                  <th className="p-3">% NRV*</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-navy divide-opacity-20 font-medium">
                {isSleep ? (
                  <>
                    <tr className="p-3">
                      <td className="p-3">Ashwagandha-Wurzelextrakt</td>
                      <td className="p-3">30 mg</td>
                      <td className="p-3">**</td>
                    </tr>
                    <tr className="p-3">
                      <td className="p-3">Melissenextrakt</td>
                      <td className="p-3">62 mg</td>
                      <td className="p-3">**</td>
                    </tr>
                    <tr className="p-3">
                      <td className="p-3">Kamillenextrakt</td>
                      <td className="p-3">33 mg</td>
                      <td className="p-3">**</td>
                    </tr>
                    <tr className="p-3">
                      <td className="p-3">Lavendelextrakt</td>
                      <td className="p-3">4 mg</td>
                      <td className="p-3">**</td>
                    </tr>
                    <tr className="p-3">
                      <td className="p-3">Vitamin B6</td>
                      <td className="p-3">2,8 mg</td>
                      <td className="p-3">200 %</td>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr className="p-3">
                      <td className="p-3">Biotin (Vitamin B7)</td>
                      <td className="p-3">150 µg</td>
                      <td className="p-3">300 %</td>
                    </tr>
                    <tr className="p-3">
                      <td className="p-3">Zink</td>
                      <td className="p-3">2,2 mg</td>
                      <td className="p-3">22 %</td>
                    </tr>
                    <tr className="p-3">
                      <td className="p-3">Vitamin C</td>
                      <td className="p-3">30 mg</td>
                      <td className="p-3">37,5 %</td>
                    </tr>
                    <tr className="p-3">
                      <td className="p-3">Vitamin E</td>
                      <td className="p-3">18,8 mg</td>
                      <td className="p-3">157 %</td>
                    </tr>
                    <tr className="p-3">
                      <td className="p-3">Folsäure (Vitamin B9)</td>
                      <td className="p-3">400 µg</td>
                      <td className="p-3">200 %</td>
                    </tr>
                    <tr className="p-3">
                      <td className="p-3">Vitamin B12</td>
                      <td className="p-3">17,2 µg</td>
                      <td className="p-3">688 %</td>
                    </tr>
                    <tr className="p-3">
                      <td className="p-3">Vitamin D3</td>
                      <td className="p-3">25 µg</td>
                      <td className="p-3">500 %</td>
                    </tr>
                    <tr className="p-3">
                      <td className="p-3">Calcium</td>
                      <td className="p-3">200 mg</td>
                      <td className="p-3">25 %</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] opacity-75">
            * % NRV = Referenzmenge für die tägliche Zufuhr gemäß Lebensmittelinformationsverordnung (LMIV).<br />
            ** Keine Referenzmenge vorhanden.
          </p>

          <div className="space-y-2">
            <h4 className="font-bold text-sm uppercase tracking-wider text-brand-navy">Zutaten:</h4>
            <p className="text-xs opacity-85 leading-relaxed">
              {isSleep ? (
                "Süßungsmittel Maltit, Wasser, Süßungsmittel Erythrit, Feuchthaltemittel Sorbit, Geliermittel Pektin, Melissenextrakt (Melissa officinalis), Säuerungsmittel Citronensäure, Kamillenextrakt (Matricaria chamomilla), Ashwagandha-Wurzelextrakt (0,5%, Withania somnifera), Säureregulator Natriumcitrat, natürliches Mango-Aroma, Farbstoff Beta-Carotin, Sonnenblumenöl, Lavendelextrakt (Lavandula angewiesen), Süßungsmittel Steviolglycoside, Überzugsmittel Carnaubawachs."
              ) : (
                "Süßungsmittel Maltit, Wasser, Süßungsmittel Erythrit, Tricalciumphosphat, Feuchthaltemittel Sorbit, Geliermittel Pektin, Feuchthaltemittel Glycerin, DL-alpha-Tocopherylacetat (Vitamin E), Vitamin K2 (MK-7), Säuerungsmittel Citronensäure, L-Ascorbinsäure (Vitamin C), Inositol, Säureregulator Natriumcitrat, Säureregulator Natriumascorbat, natürliches Mango-Aroma, Cholecalciferol (Vitamin D3), Nicotinamid (Vitamin B3), Farbstoff Beta-Carotin, Zinkcitrat, Calcium-D-pantothenat (Vitamin B5), Pyridoxinhydrochlorid (Vitamin B6), Chrom(III)-chlorid, Süßungsmittel Steviolglycoside, Cyanocobalamin (Vitamin B12), Kaliumiodid, Pteroylmonoglutaminsäure (Folsäure/Vitamin B9), D-Biotin (Vitamin B7), Überzugsmittel Carnaubawachs. Allergenhinweis: Enthält Soja."
              )}
            </p>
          </div>
        </div>

        {/* Right column: Usage & Mandatory warnings */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-2xl" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            Einnahme & Hinweise
          </h3>

          <div className="space-y-4 text-xs leading-relaxed">
            <div className="space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-brand-navy">Verzehrempfehlung:</h4>
              <p className="opacity-90">
                Täglich 2 Gummis gründlich kauen und herunterschlucken. {isSleep ? "Vorzugsweise ca. 30 Minuten vor dem Schlafengehen einnehmen." : ""}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-brand-navy">Wichtige Warnhinweise:</h4>
              <p className="opacity-90">
                Die angegebene empfohlene tägliche Verzehrmenge darf nicht überschritten werden. Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene, abwechslungsreiche Ernährung und eine gesunde Lebensweise. Außerhalb der Reichweite von kleinen Kindern lagern. Nicht geeignet für schwangere und stillende Frauen, Kinder und Jugendliche. Kann bei übermäßigem Verzehr abführend wirken. {isSleep ? "" : "Enthält Soja."}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-brand-navy">Lagerung:</h4>
              <p className="opacity-90">
                Kühl (unter 25°C), trocken und vor Licht geschützt lagern. Nach dem Öffnen innerhalb von 3 Monaten verbrauchen.
              </p>
            </div>

            <div className="space-y-2 border-t border-brand-navy border-opacity-10 pt-4">
              <h4 className="font-bold uppercase tracking-wider text-brand-navy">Inverkehrbringer:</h4>
              <p className="opacity-80">
                Hergestellt in Deutschland für: Naturowell, [Tu Nombre/Dirección en Alemania], E-Mail: hallo@naturowell.de
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
