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
                SALEVIUM UG (haftungsbeschränkt)<br />
                Further Straße 5a<br />
                52134 Herzogenrath<br />
                Deutschland
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">Vertreten durch:</h2>
              <p className="leading-relaxed">
                Bilgehan Karatas<br />
                Diplom Kaufmann und geschäftsführender Gesellschafter
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">Kontakt:</h2>
              <p className="leading-relaxed">
                Telefon: +49 2406 9630883<br />
                E-Mail: <a href="mailto:Supermakler-challenge@salevium.de" className="text-dkm-turquoise hover:text-dkm-yellow transition-colors">Supermakler-challenge@salevium.de</a><br />
                Web: <a href="https://www.salevium.de" target="_blank" rel="noopener noreferrer" className="text-dkm-turquoise hover:text-dkm-yellow transition-colors">https://www.salevium.de</a>
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">Registereintrag:</h2>
              <p className="leading-relaxed">
                Eintragung im Handelsregister.<br />
                Registergericht: Amtsgericht Düren<br />
                Registernummer: HRB 9481
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">Umsatzsteuer-ID:</h2>
              <p className="leading-relaxed">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE332225356
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</h2>
              <p className="leading-relaxed">
                Bilgehan Karatas, Anschrift wie oben
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">Kooperationshinweis:</h2>
              <p className="leading-relaxed">
                Die „DKM-Supermakler-Challenge" ist eine Kooperation zwischen der Salevium UG (haftungsbeschränkt) und der BBG GmbH (Veranstalterin der DKM). Verantwortlich für die technische Umsetzung, Datenerhebung und -verarbeitung im Rahmen der Challenge ist die Salevium UG (haftungsbeschränkt).
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