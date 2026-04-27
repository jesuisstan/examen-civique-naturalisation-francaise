/**
 * External URLs used throughout the app.
 */

export const NATIONALITY_OVERVIEW_URL =
  'https://www.service-public.gouv.fr/'
  + 'particuliers/vosdroits/N111';

export const FRENCH_LEVEL_URL =
  'https://www.service-public.gouv.fr/'
  + 'particuliers/vosdroits/F11926';

export const NATURALIZATION_PROCEDURE_URL =
  'https://www.immigration.interieur.gouv.fr/'
  + 'devenir-francais/'
  + 'procedures-dacces-a-nationalite-francaise';

export const DOCUMENT_SIMULATOR_URL =
  'https://www.service-public.gouv.fr/'
  + 'simulateur/calcul/Naturalisation';

export const QUESTIONS_PDF_URL =
  'https://www.immigration.interieur.gouv.fr/'
  + 'sites/dgef/files/medias/documents/2026-01/'
  + 'examen-civique-naturalisation'
  + '-questions-de-connaissance-20251212.pdf';

export const QUESTIONS_PAGE_URL =
  'https://www.immigration.interieur.gouv.fr/'
  + 'documentation/ressources/'
  + 'questions-de-connaissance-pour-lexamen'
  + '-civique-nationalite-francaise.html';

export const DATA_GOUV_DATASET_URL =
  'https://www.data.gouv.fr/datasets/'
  + 'examen-civique-naturalisation'
  + '-questions-de-connaissances'
  + '-officielles-et-propositions-de-reponses';

export const QCM_CIVIQUE_URL =
  'https://leqcmcivique.fr';

const CHARTE_BASE_URL =
  'https://www.legifrance.gouv.fr/'
  + 'loda/article_lc/LEGIARTI000025263486/';

/**
 * Build the Charte des droits et devoirs URL
 * with today's date appended (YYYY-MM-DD).
 *
 * @returns Full Legifrance URL for the Charte
 */
export const getCharteUrl = (): string => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1)
    .padStart(2, '0');
  const dd = String(d.getDate())
    .padStart(2, '0');
  return `${CHARTE_BASE_URL}${yyyy}-${mm}-${dd}`;
};
