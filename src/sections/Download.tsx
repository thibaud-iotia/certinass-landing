import { Button } from '../components/Button';
import { DOWNLOADS, RELEASES_URL, REPO_URL, VERSION, type Os } from '../site';

export function Download({ os }: { os: Os }) {
  return (
    <section id="telecharger" className="section download theme-dark">
      <div className="wrap">
        <h2 className="title-xl">
          <span className="only-desktop">Téléchargez CertiNass {VERSION}</span>
          <span className="only-mobile">Télécharger</span>
        </h2>
        <div className="download-grid">
          {DOWNLOADS.map((download) => (
            <div key={download.os} className="download-card">
              <b>{download.name}</b>
              <div className="formats">{download.formats}</div>
              <Button href={RELEASES_URL} variant={download.os === os ? 'primary' : 'secondary'} block>
                <span className="only-desktop">Télécharger</span>
                <span className="only-mobile">{download.name}</span>
              </Button>
            </div>
          ))}
        </div>
        <p className="requirements only-desktop">Prérequis : NAS Synology sous DSM 7 · rien à installer sur le NAS</p>
        <p className="fine-print only-desktop">
          Installeurs non signés : Windows ou macOS peut afficher un avertissement au premier lancement.
        </p>
        <p className="requirements only-mobile">DSM 7 requis · installeurs non signés</p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <b className="only-desktop">CertiNass</b>
        <span>v{VERSION}</span>
        <a href={REPO_URL}>GitHub</a>
        <span className="disclaimer">
          <span className="only-desktop">Projet indépendant, non affilié à Synology.</span>
          <span className="only-mobile">Non affilié à Synology</span>
        </span>
      </div>
    </footer>
  );
}
