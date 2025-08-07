import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Impressum = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="font-encode font-black text-4xl md:text-5xl text-dkm-navy mb-8">
            Impressum
          </h1>
          
          <div className="font-encode text-dkm-navy space-y-8">
            <section>
              <h2 className="font-bold text-2xl mb-4">Angaben gemäß § 5 TMG</h2>
              <p className="leading-relaxed">
                DKM Deutsche Kraftfahrzeug-Messe GmbH<br />
                Musterstraße 123<br />
                44137 Dortmund<br />
                Deutschland
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">Kontakt</h2>
              <p className="leading-relaxed">
                Telefon: +49 (0) 231 1234567<br />
                Telefax: +49 (0) 231 1234568<br />
                E-Mail: info@dkm-messe.de
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="font-bold text-lg mb-2">DKM Challenge</h3>
                <p className="leading-relaxed">
                  E-Mail: <a href="mailto:dkm@salevium.de" className="text-dkm-turquoise hover:text-dkm-yellow transition-colors">dkm@salevium.de</a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">Handelsregister</h2>
              <p className="leading-relaxed">
                Registergericht: Amtsgericht Dortmund<br />
                Registernummer: HRB 12345
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">Umsatzsteuer-ID</h2>
              <p className="leading-relaxed">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                DE123456789
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <p className="leading-relaxed">
                Max Mustermann<br />
                Musterstraße 123<br />
                44137 Dortmund
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">Haftungsausschluss</h2>
              
              <h3 className="font-bold text-xl mb-2 mt-6">Haftung für Inhalte</h3>
              <p className="leading-relaxed mb-4">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p className="leading-relaxed">
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>

              <h3 className="font-bold text-xl mb-2 mt-6">Haftung für Links</h3>
              <p className="leading-relaxed mb-4">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
              <p className="leading-relaxed">
                Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>

              <h3 className="font-bold text-xl mb-2 mt-6">Urheberrecht</h3>
              <p className="leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Impressum;