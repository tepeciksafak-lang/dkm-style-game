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
              <h2 className="font-bold text-2xl mb-4">1. Datenschutz auf einen Blick</h2>
              
              <h3 className="font-bold text-xl mb-2 mt-6">Allgemeine Hinweise</h3>
              <p className="leading-relaxed mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
              </p>

              <h3 className="font-bold text-xl mb-2 mt-6">Datenerfassung auf dieser Website</h3>
              <p className="leading-relaxed mb-4">
                <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
              </p>

              <p className="leading-relaxed mb-4">
                <strong>Wie erfassen wir Ihre Daten?</strong><br />
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben oder bei der Challenge-Teilnahme angeben.
              </p>

              <p className="leading-relaxed">
                Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">2. Hosting</h2>
              <p className="leading-relaxed mb-4">
                Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
              </p>
              
              <h3 className="font-bold text-xl mb-2">Externes Hosting</h3>
              <p className="leading-relaxed mb-4">
                Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters / der Hoster gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
              </p>

              <p className="leading-relaxed">
                Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
              
              <h3 className="font-bold text-xl mb-2 mt-6">Datenschutz</h3>
              <p className="leading-relaxed mb-4">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzbestimmungen sowie dieser Datenschutzerklärung.
              </p>

              <h3 className="font-bold text-xl mb-2 mt-6">Hinweis zur verantwortlichen Stelle</h3>
              <p className="leading-relaxed mb-4">
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
                DKM Deutsche Kraftfahrzeug-Messe GmbH<br />
                Musterstraße 123<br />
                44137 Dortmund<br />
                Deutschland<br /><br />
                Telefon: +49 (0) 231 1234567<br />
                E-Mail: datenschutz@dkm-messe.de
              </p>

              <h3 className="font-bold text-xl mb-2 mt-6">Speicherdauer</h3>
              <p className="leading-relaxed mb-4">
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben.
              </p>

              <h3 className="font-bold text-xl mb-2 mt-6">Ihre Rechte</h3>
              <p className="leading-relaxed">
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">4. Datenerfassung auf dieser Website</h2>
              
              <h3 className="font-bold text-xl mb-2 mt-6">Server-Log-Dateien</h3>
              <p className="leading-relaxed mb-4">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>

              <h3 className="font-bold text-xl mb-2 mt-6">Kontaktformulare und Challenge-Teilnahme</h3>
              <p className="leading-relaxed mb-4">
                Wenn Sie an unserer Challenge teilnehmen oder uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
              </p>
              <p className="leading-relaxed">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl mb-4">5. Kontakt</h2>
              <p className="leading-relaxed">
                Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail oder wenden Sie sich direkt an die für den Datenschutz verantwortliche Person in unserer Organisation:<br /><br />
                E-Mail: datenschutz@dkm-messe.de
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