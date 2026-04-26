import { StyleSheet, View } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface QuestionCardProps {
  questionNumber: number;
  questionText: string;
  answers: string[];
}

const BADGE_HEIGHT = 28;
const BADGE_MIN_WIDTH = 28;

/**
 * Card displaying a civic exam question with
 * an expandable suggested-answers section.
 *
 * Shows a numbered badge, the question text, and
 * a collapsible list of bullet-pointed answers.
 *
 * @param questionNumber - Display index for the badge
 * @param questionText - The question to display
 * @param answers - Array of suggested answer strings
 * @returns Themed card with collapsible answers
 */
const QuestionCard = ({
  questionNumber,
  questionText,
  answers,
}: QuestionCardProps) => {
  const theme = useTheme();

  return (
    <ThemedView
      type="backgroundElement"
      style={[
        styles.container,
        { borderColor: theme.cardBorder },
      ]}>
      <View style={styles.header}>
        <View
          style={[
            styles.badge,
            { backgroundColor: theme.accent },
          ]}>
          <ThemedText
            type="small"
            style={styles.badgeText}>
            {questionNumber}
          </ThemedText>
        </View>
        <ThemedText
          type="default"
          style={styles.questionText}>
          {questionText}
        </ThemedText>
      </View>

      <Collapsible title="Réponse(s) suggérée(s)">
        <View style={styles.answersContainer}>
          {answers.map((answer, index) => (
            <ThemedText
              key={index}
              type="small"
              themeColor="textSecondary">
              {'• '}{answer}
            </ThemedText>
          ))}
        </View>
      </Collapsible>
    </ThemedView>
  );
};

export { QuestionCard };
export type { QuestionCardProps };

const styles = StyleSheet.create({
  container: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    borderWidth: 1,
    gap: Spacing.three,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two,
  },
  badge: {
    minWidth: BADGE_MIN_WIDTH,
    height: BADGE_HEIGHT,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.one,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  questionText: {
    flex: 1,
  },
  answersContainer: {
    gap: Spacing.one,
  },
});
