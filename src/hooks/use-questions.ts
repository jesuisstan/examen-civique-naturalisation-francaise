import { useMemo } from 'react';

import type {
  QcmData,
  QcmQuestion,
} from '@/types/questions';

import raw from
  '@/constants/data-gouv-qcm-civique-naturalisation.json';

const data = raw as QcmData;

/** Shape returned by {@link useQuestions}. */
export interface UseQuestionsResult {
  /** Ordered list of theme names. */
  themes: string[];
  /**
   * Return questions for a given theme,
   * or all questions when `themeName` is null.
   *
   * @param themeName - theme to filter by, or null
   * @returns matching questions
   */
  questionsByTheme: (
    themeName: string | null,
  ) => QcmQuestion[];
  /** Flat array of every question. */
  allQuestions: QcmQuestion[];
  /** Total number of questions in the dataset. */
  totalCount: number;
}

/**
 * Provide access to the QCM civique dataset.
 *
 * Memoises derived collections so consumers can
 * call the hook in any component without redundant
 * recomputation.
 *
 * @returns themes, questions helpers, and totals
 */
export const useQuestions = (): UseQuestionsResult => {
  const themes = useMemo(
    () => data.data.map((t) => t.theme),
    [],
  );

  const allQuestions = useMemo(
    () => data.data.flatMap((t) => t.questions),
    [],
  );

  const questionsByTheme = useMemo(() => {
    const map = new Map<string, QcmQuestion[]>(
      data.data.map((t) => [t.theme, t.questions]),
    );

    return (themeName: string | null): QcmQuestion[] =>
      themeName === null
        ? allQuestions
        : map.get(themeName) ?? [];
  }, [allQuestions]);

  const totalCount = allQuestions.length;

  return {
    themes,
    questionsByTheme,
    allQuestions,
    totalCount,
  };
};
