import { openBrowserAsync } from 'expo-web-browser';
import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { ActionCard } from '@/components/action-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import {
  ACCUEIL_INTRO,
  ACCUEIL_SUBTITLE,
  ACCUEIL_TITLE,
  CHARTE_CARD_DESCRIPTION,
  CHARTE_CARD_TITLE,
  FRENCH_LEVEL_CARD_DESCRIPTION,
  FRENCH_LEVEL_CARD_TITLE,
  NATIONALITY_CARD_DESCRIPTION,
  NATIONALITY_CARD_TITLE,
  PDF_CARD_DESCRIPTION,
  PDF_CARD_TITLE,
  PROCEDURE_CARD_DESCRIPTION,
  PROCEDURE_CARD_TITLE,
  SECTION_EXAM_TITLE,
  SECTION_PROCEDURE_TITLE,
  SIMULATOR_CARD_DESCRIPTION,
  SIMULATOR_CARD_TITLE,
} from '@/constants/content';
import {
  DOCUMENT_SIMULATOR_URL,
  FRENCH_LEVEL_URL,
  getCharteUrl,
  NATIONALITY_OVERVIEW_URL,
  NATURALIZATION_PROCEDURE_URL,
  QUESTIONS_PAGE_URL,
} from '@/constants/links';
import {
  MaxContentWidth,
  Spacing,
} from '@/constants/theme';
import { useQuestions } from '@/hooks/use-questions';
import { useTheme } from '@/hooks/use-theme';

/**
 * Open a URL in the in-app browser on native,
 * or in a new tab on web.
 *
 * @param url - fully-qualified URL to open
 * @returns void
 */
const handleOpenLink = async (
  url: string,
): Promise<void> => {
  if (Platform.OS === 'web') {
    Linking.openURL(url);
  } else {
    await openBrowserAsync(url);
  }
};

const PROCEDURE_CARDS = [
  {
    title: NATIONALITY_CARD_TITLE,
    description: NATIONALITY_CARD_DESCRIPTION,
    url: NATIONALITY_OVERVIEW_URL,
    iconName: {
      ios: 'person.text.rectangle',
      android: 'how_to_reg',
      web: 'how_to_reg',
    },
  },
  {
    title: PROCEDURE_CARD_TITLE,
    description: PROCEDURE_CARD_DESCRIPTION,
    url: NATURALIZATION_PROCEDURE_URL,
    iconName: {
      ios: 'doc.text',
      android: 'description',
      web: 'description',
    },
  },
  {
    title: SIMULATOR_CARD_TITLE,
    description: SIMULATOR_CARD_DESCRIPTION,
    url: DOCUMENT_SIMULATOR_URL,
    iconName: {
      ios: 'checklist',
      android: 'fact_check',
      web: 'fact_check',
    },
  },
  {
    title: FRENCH_LEVEL_CARD_TITLE,
    description: FRENCH_LEVEL_CARD_DESCRIPTION,
    url: FRENCH_LEVEL_URL,
    iconName: {
      ios: 'textformat.abc',
      android: 'translate',
      web: 'translate',
    },
  },
] as const;

const EXAM_CARDS = [
  {
    title: PDF_CARD_TITLE,
    description: PDF_CARD_DESCRIPTION,
    url: QUESTIONS_PAGE_URL,
    iconName: {
      ios: 'arrow.down.doc',
      android: 'download',
      web: 'download',
    },
  },
  {
    title: CHARTE_CARD_TITLE,
    description: CHARTE_CARD_DESCRIPTION,
    url: null,
    iconName: {
      ios: 'text.book.closed',
      android: 'menu_book',
      web: 'menu_book',
    },
  },
] as const;

/**
 * Accueil (Home) screen — Tab 1.
 *
 * Presents naturalization info, procedure links
 * and exam preparation resources in two sections.
 *
 * @returns ScrollView-based home screen
 */
const HomeScreen = () => {
  const theme = useTheme();
  const { totalCount } = useQuestions();
  const insets = useSafeAreaInsets();

  const handleCardPress = (
    url: string | null,
  ) => {
    const resolved = url ?? getCharteUrl();
    handleOpenLink(resolved);
  };

  return (
    <ThemedView style={styles.screen}>
      {/* Sticky header */}
      <View
        style={[
          styles.stickyHeader,
          {
            backgroundColor: theme.background,
            paddingTop: Platform.select({
              android:
                insets.top + Spacing.three,
              web: Spacing.six,
              default: Spacing.three,
            }),
          },
        ]}>
        <View style={styles.headerInner}>
          <ThemedText
            type="subtitle"
            style={styles.centered}>
            {ACCUEIL_TITLE}
          </ThemedText>
          <ThemedText
            type="default"
            themeColor="textSecondary"
            style={styles.centered}>
            {ACCUEIL_SUBTITLE}
          </ThemedText>
        </View>
      </View>

      {/* Scrollable content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: Spacing.four },
        ]}>
        <ThemedView style={styles.inner}>
          <ThemedText
            type="default"
            style={styles.intro}>
            {ACCUEIL_INTRO}
          </ThemedText>

          {/* Section 1 — Procedure */}
          <View style={styles.section}>
            <ThemedText
              type="smallBold"
              themeColor="textSecondary">
              {SECTION_PROCEDURE_TITLE}
            </ThemedText>
            <View style={styles.cardsGroup}>
              {PROCEDURE_CARDS.map((card) => (
                <ActionCard
                  key={card.url}
                  title={card.title}
                  description={card.description}
                  iconName={card.iconName}
                  onPress={() =>
                    handleCardPress(card.url)
                  }
                />
              ))}
            </View>
          </View>

          {/* Section 2 — Exam */}
          <View style={styles.section}>
            <ThemedText
              type="smallBold"
              themeColor="textSecondary">
              {SECTION_EXAM_TITLE}
            </ThemedText>
            <View style={styles.cardsGroup}>
              {EXAM_CARDS.map((card) => (
                <ActionCard
                  key={card.title}
                  title={card.title}
                  description={card.description}
                  iconName={card.iconName}
                  onPress={() =>
                    handleCardPress(card.url)
                  }
                />
              ))}
            </View>
          </View>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  stickyHeader: {
    alignItems: 'center',
    paddingBottom: Spacing.three,
    paddingHorizontal: Spacing.four,
  },
  headerInner: {
    maxWidth: MaxContentWidth,
    width: '100%',
    gap: Spacing.one,
    alignItems: 'center',
  },
  centered: {
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  intro: {
    lineHeight: 24,
  },
  section: {
    gap: Spacing.three,
  },
  cardsGroup: {
    gap: Spacing.two,
  },
});
