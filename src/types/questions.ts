/**
 * TypeScript interfaces for the QCM civique JSON data.
 *
 * Mirrors the structure of
 * `data-gouv-qcm-civique-naturalisation.json`.
 */

/** Metadata block of the QCM dataset. */
export interface QcmMetadata {
  titre: string;
  auteur_reponses_suggerees: string;
  site_web: string;
  avertissement_legal: string;
  licence: string;
}

/** A single question with its suggested answers. */
export interface QcmQuestion {
  id: number;
  question: string;
  suggested_answers: string[];
}

/** A thematic group of questions. */
export interface QcmTheme {
  theme: string;
  questions: QcmQuestion[];
}

/** Root shape of the QCM JSON file. */
export interface QcmData {
  metadata: QcmMetadata;
  data: QcmTheme[];
}
