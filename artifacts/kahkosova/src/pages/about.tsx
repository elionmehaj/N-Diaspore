import { MainLayout } from "@/components/layout/MainLayout";

export default function About() {
  return (
    <MainLayout>
      <div className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h1 className="text-5xl font-display font-bold text-white mb-6">Misioni Ynë</h1>
          <p className="text-xl text-white/70 leading-relaxed">
            KahKosova u themelua nga anëtarët e diasporës, për diasporën. Besojmë se distanca nuk duhet të shkëpusë lidhjet me atdheun, familjen apo trashëgiminë tonë.
          </p>
        </div>

        {/* Story Section with image */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1546738981-d13c7fa602a8?w=800&q=80" 
                alt="Kosovo Heritage" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-6">Mbyllja e Hendekut</h2>
              <div className="space-y-4 text-white/60 text-lg leading-relaxed">
                <p>
                  Çdo vit, mijëra kosovarë jashtë vendit përballen me pengesa të mëdha burokratike kur përpiqen të menaxhojnë pronat e tyre, të mbështesin të afërmit e tyre, ose thjesht të rregullojnë dokumentacionin e nevojshëm.
                </p>
                <p>
                  Ne ndërtuam këtë platformë për të digjitalizuar linjat fizike dhe për të hequr fërkimet. Duke bashkëpunuar me komunat lokale dhe shitësit e verifikuar, ne ofrojmë një përvojë të sigurt, transparente dhe pa probleme.
                </p>
                <p>
                  Pavarësisht nëse është pagimi i tatimit në pronë, lënia me qira e tokës bujqësore, apo dërgimi i një torte surprizë për ditëlindjen e nënës—ne jemi ura juaj digjitale për në Kosovë.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="bg-card border-t border-b border-white/5 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Siguria në Rend të Parë</h3>
                <p className="text-white/60">Dokumentet dhe transaksionet tuaja janë të enkriptuara dhe të mbrojtura me siguri të nivelit të ndërmarrjes.</p>
              </div>
              <div>
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Rrjet i Besuar</h3>
                <p className="text-white/60">Ne bashkëpunojmë vetëm me shitës lokalë të verifikuar dhe punojmë direkt me udhëzimet komunale.</p>
              </div>
              <div>
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Efikasitet</h3>
                <p className="text-white/60">S'ka më pritje në radhë. Gjeneroni dokumente dhe përfundoni detyrat në pak minuta, jo ditë.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}