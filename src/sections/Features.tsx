import { captures } from '../captures';
import { Capture } from '../components/Capture';

const ALT = {
  importLien: 'Fenêtre « Importer depuis un lien » avec la vignette de la vidéo',
  partages: 'Onglet Partagés : les fichiers reçus des autres comptes du NAS',
  editeur: 'Éditeur de texte intégré, ouvert sur un fichier du NAS',
  terminal: 'Terminal SSH intégré, avec le garde-fou sur les suppressions',
};

export function LinkImport() {
  return (
    <section id="import" className="section only-desktop">
      <div className="wrap split">
        <Capture src={captures.importLien} alt={ALT.importLien} />
        <div className="stack">
          <div className="eyebrow">Import depuis un lien</div>
          <h2 className="title">Un lien. Votre NAS fait le reste.</h2>
          <p className="lead">
            Audio ou vidéo directement sur le NAS, vignette et pochette carrée intégrées. File de lecture incluse.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Sharing() {
  return (
    <section id="partages" className="section sharing theme-dark only-desktop">
      <div className="wrap split">
        <div className="stack">
          <div className="eyebrow">Partages privés</div>
          <h2 className="title">Partagez sans rien sortir du NAS.</h2>
          <p className="lead">Aucun lien public, aucune copie. Les droits sont appliqués par DSM.</p>
          <div className="chips">
            <span className="chip">Lecture seule</span>
            <span className="chip">Peut modifier</span>
          </div>
        </div>
        <Capture src={captures.partagesRecus} alt={ALT.partages} />
      </div>
    </section>
  );
}

export function PowerUsers() {
  return (
    <section className="section power only-desktop">
      <div className="wrap">
        <h2 className="title">Il y a du fond.</h2>
        <div className="power-grid">
          <figure>
            <Capture src={captures.editeur} alt={ALT.editeur} />
            <figcaption>Éditeur — 40+ langages, versions, conflits</figcaption>
          </figure>
          <figure>
            <Capture src={captures.terminal} alt={ALT.terminal} />
            <figcaption>Terminal SSH — garde-fou suppression</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/** Mobile (1b) : import, partages, éditeur et terminal tiennent en une section, captures à faire défiler. */
export function MobileModules() {
  return (
    <section id="modules" className="section modules only-mobile">
      <div className="wrap">
        <h2 className="title">Import, partages, éditeur, terminal</h2>
        <div className="capture-strip">
          <Capture src={captures.importLien} alt={ALT.importLien} small />
          <Capture src={captures.partagesRecus} alt={ALT.partages} small />
          <Capture src={captures.editeur} alt={ALT.editeur} small />
          <Capture src={captures.terminal} alt={ALT.terminal} small />
        </div>
      </div>
    </section>
  );
}

const EVERYDAY = [
  { label: 'Grille / liste', mobile: true },
  { label: 'Aperçus image, vidéo, PDF', mobileLabel: 'Aperçus', mobile: true },
  { label: 'Transferts suivis' },
  { label: 'Glisser-déposer' },
  { label: 'Tags et favoris', mobileLabel: 'Tags', mobile: true },
  { label: 'Corbeille' },
  { label: 'Clair / sombre' },
  { label: 'FR / EN', mobile: true },
];

export function Everyday() {
  return (
    <section className="section everyday">
      <div className="wrap">
        <h2 className="title only-desktop">Le quotidien, sans friction.</h2>
        <ul className="tiles">
          {EVERYDAY.map((item) => (
            <li key={item.label} className={item.mobile ? undefined : 'only-desktop'}>
              {item.mobileLabel ? (
                <>
                  <span className="only-desktop">{item.label}</span>
                  <span className="only-mobile">{item.mobileLabel}</span>
                </>
              ) : (
                item.label
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
