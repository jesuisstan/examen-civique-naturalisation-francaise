import {
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { CategoryChip } from '@/components/category-chip';
import {
  DisclaimerBanner,
} from '@/components/disclaimer-banner';
import { QuestionCard } from '@/components/question-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import {
  ALL_THEMES_LABEL,
  QUESTIONS_SUBTITLE,
  QUESTIONS_TITLE,
} from '@/constants/content';
import {
  MaxContentWidth,
  Spacing,
} from '@/constants/theme';
import { useQuestions } from '@/hooks/use-questions';
import type { QcmQuestion } from '@/types/questions';

interface ChipItem {
  key: string;
  label: string;
  value: string | null;
}

/**
 * Questions tab screen.
 *
 * Lets the user browse civic exam questions filtered
 * by theme categories, with a horizontal chip bar and
 * a performant FlatList of question cards.
 *
 * @returns Full-screen questions browser component
 */
const QuestionsScreen = () => {
  const insets = useSafeAreaInsets();
  const {
    themes,
    questionsByTheme,
  } = useQuestions();

  const [selectedTheme, setSelectedTheme] =
    useState<string | null>(null);

  const chipListRef =
    useRef<FlatList<ChipItem>>(null);

  const chipData = useMemo<ChipItem[]>(
    () => [
      {
        key: '__all__',
        label: ALL_THEMES_LABEL,
        value: null,
      },
      ...themes.map((t) => ({
        key: t,
        label: t,
        value: t as string | null,
      })),
    ],
    [themes],
  );

  const filteredQuestions = useMemo(
    () => questionsByTheme(selectedTheme),
    [questionsByTheme, selectedTheme],
  );

  const handleChipPress = useCallback(
    (value: string | null, index: number) => {
      setSelectedTheme(value);
      chipListRef.current?.scrollToIndex({
        index,
        viewPosition: 0.5,
        animated: true,
      });
    },
    [],
  );

  const renderChip = useCallback(
    ({
      item,
      index,
    }: {
      item: ChipItem;
      index: number;
    }) => (
      <CategoryChip
        label={item.label}
        isActive={selectedTheme === item.value}
        onPress={() =>
          handleChipPress(item.value, index)
        }
      />
    ),
    [selectedTheme, handleChipPress],
  );

  const chipKeyExtractor = useCallback(
    (item: ChipItem) => item.key,
    [],
  );

  const onChipScrollFailed = useCallback(
    (info: { index: number }) => {
      setTimeout(() => {
        chipListRef.current?.scrollToIndex({
          index: info.index,
          viewPosition: 0.5,
          animated: true,
        });
      }, 200);
    },
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: QcmQuestion }) => (
      <QuestionCard
        questionNumber={item.id}
        questionText={item.question}
        answers={item.suggested_answers}
      />
    ),
    [],
  );

  const keyExtractor = useCallback(
    (item: QcmQuestion) => String(item.id),
    [],
  );

  const listEmpty = useCallback(
    () => (
      <ThemedText
        type="small"
        themeColor="textSecondary"
        style={styles.empty}>
        Aucune question
      </ThemedText>
    ),
    [],
  );

  const topPadding = Platform.select({
    web: Spacing.six,
    android: insets.top,
    default: 0,
  });

  return (
    <ThemedView style={styles.container}>
      <View
        style={[
          styles.inner,
          {
            maxWidth: MaxContentWidth,
            paddingTop: topPadding,
          },
        ]}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText
            type="subtitle"
            style={styles.centered}>
            {QUESTIONS_TITLE}
          </ThemedText>
          <ThemedText
            type="small"
            themeColor="textSecondary"
            style={styles.centered}>
            {QUESTIONS_SUBTITLE}
          </ThemedText>
        </View>

        {/* Data source disclaimer */}
        <View style={styles.disclaimerRow}>
          <DisclaimerBanner />
        </View>

        {/* Category filter chips */}
        <FlatList
          ref={chipListRef}
          horizontal
          data={chipData}
          renderItem={renderChip}
          keyExtractor={chipKeyExtractor}
          extraData={selectedTheme}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            styles.chipRowContent
          }
          style={styles.chipRow}
          onScrollToIndexFailed={onChipScrollFailed}
        />

        {/* Count label */}
        <View style={styles.countRow}>
          <ThemedText
            type="small"
            themeColor="textSecondary">
            {filteredQuestions.length} questions
          </ThemedText>
        </View>

        {/* Questions list */}
        <FlatList
          data={filteredQuestions}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={listEmpty}
          contentContainerStyle={[
            styles.listContent,
            {
              paddingBottom: Spacing.four,
            },
          ]}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ThemedView>
  );
};

export default QuestionsScreen;

const SECTION_GAP = Spacing.three;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inner: {
    flex: 1,
    width: '100%',
  },
  header: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.half,
    paddingBottom: SECTION_GAP,
    alignItems: 'center',
  },
  centered: {
    textAlign: 'center',
  },
  disclaimerRow: {
    paddingHorizontal: Spacing.four,
    paddingBottom: SECTION_GAP,
  },
  chipRow: {
    flexGrow: 0,
    flexShrink: 0,
    paddingBottom: SECTION_GAP,
  },
  chipRowContent: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.two,
    alignItems: 'center',
  },
  countRow: {
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    paddingBottom: Spacing.two,
  },
  listContent: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  empty: {
    textAlign: 'center',
    paddingTop: Spacing.five,
  },
});
