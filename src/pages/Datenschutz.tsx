import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="font-encode font-black text-4xl md:text-5xl text-dkm-navy mb-8">
            Datenschutzerklärung
          </h1>
          
          <div className="font-encode text-dkm-navy space-y-8">
            <section>
              <h2 className="font-bold text-2xl mb-4">1. Verantwortlicher</h2>
              <p className="leading-relaxed">
                SALEVIUM UG (haftungsbeschränkt)<br />
                Further Straße 5a<br />
                52134 Herzogenrath<br />
                E-Mail: <a href="mailto:dkm@salevium.de" className="text-dkm-turquoise hover:text-dkm-yellow transition-colors">dkm@salevium.de</a>
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">2. Art der verarbeiteten Daten</h2>
              <ul className="leading-relaxed space-y-2 list-disc list-inside">
                <li>Vor- und Nachname</li>
                <li>E-Mail-Adresse</li>
                <li>Geschlecht</li>
                <li>Quiz-Ergebnisse und Punktestände</li>
                <li>Zeitstempel der Teilnahme</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">3. Zweck der Verarbeitung</h2>
              <ul className="leading-relaxed space-y-2 list-disc list-inside">
                <li>Teilnahme an der Challenge ermöglichen</li>
                <li>Ergebnisse berechnen und Rankings erstellen</li>
                <li>KI-generierte Inhalte (z. B. Social-Media-Bilder) erstellen</li>
                <li>Teilnehmer kontaktieren (z. B. Gewinnbenachrichtigung)</li>
                <li>Informationen zu weiteren Angeboten der Salevium UG (haftungsbeschränkt) senden (Werbezwecke)</li>
                <li>Sponsoren der Preise dürfen sich danach auch für Werbezwecke melden</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">4. Rechtsgrundlage</h2>
              <p className="leading-relaxed mb-4">
                Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) und Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
              </p>
              <p className="leading-relaxed">
                Für Werbe-E-Mails Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">5. Weitergabe der Daten</h2>
              <p className="leading-relaxed mb-2">Nur an:</p>
              <ul className="leading-relaxed space-y-2 list-disc list-inside">
                <li>Technische Dienstleister für den Plattformbetrieb</li>
                <li>bbg Betriebsberatungs GmbH als Veranstaltungspartner (eingeschränkt, ohne vollständige Lead-Daten)</li>
                <li>Sponsoren erhalten nur Daten der Gewinner</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">6. Speicherdauer</h2>
              <p className="leading-relaxed">
                Bis zu 24 Monate nach Challenge-Ende oder gemäß gesetzlichen Vorgaben.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">7. Rechte der Betroffenen</h2>
              <p className="leading-relaxed mb-4">
                Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch.
              </p>
              <p className="leading-relaxed">
                Widerruf jederzeit möglich.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">8. Kontakt Datenschutz</h2>
              <p className="leading-relaxed">
                E-Mail: <a href="mailto:dkm@salevium.de" className="text-dkm-turquoise hover:text-dkm-yellow transition-colors">dkm@salevium.de</a>
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">9. Analyse-Tools</h2>
              <p className="leading-relaxed">
                Anonyme Nutzungsstatistiken möglich, keine personenbezogene Auswertung ohne Einwilligung.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">10. Social-Media-Links</h2>
              <p className="leading-relaxed">
                Beim Anklicken externer Social-Media-Links werden Daten an den jeweiligen Anbieter übertragen.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">11. Hinweis zur geschlechtergerechten Sprache</h2>
              <p className="leading-relaxed">
                Aus Gründen der besseren Lesbarkeit wird auf der gesamten Website überwiegend die maskuline Sprachform verwendet. Diese bezieht ausdrücklich alle Geschlechter mit ein. Alle Personen sind gleichermaßen angesprochen, unabhängig vom Geschlecht.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Datenschutz;