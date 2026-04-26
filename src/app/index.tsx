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
  PDF_CARD_DESCRIPTION,
  PDF_CARD_TITLE,
  PROCEDURE_CARD_DESCRIPTION,
  PROCEDURE_CARD_TITLE,
  SIMULATOR_CARD_DESCRIPTION,
  SIMULATOR_CARD_TITLE,
} from '@/constants/content';
import {
  DOCUMENT_SIMULATOR_URL,
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
const handleOpenLink = async (url: string): Promise<void> => {
  if (Platform.OS === 'web') {
    Linking.openURL(url);
  } else {
    await openBrowserAsync(url);
  }
};

const CARDS = [
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
    title: PDF_CARD_TITLE,
    description: PDF_CARD_DESCRIPTION,
    url: QUESTIONS_PAGE_URL,
    iconName: {
      ios: 'arrow.down.doc',
      android: 'download',
      web: 'download',
    },
  },
] as const;

/**
 * Accueil (Home) screen — Tab 1.
 *
 * Presents the naturalization procedure overview,
 * action cards linking to official resources, and a
 * data-source disclaimer.
 *
 * @returns ScrollView-based home screen
 */
const HomeScreen = () => {
  const theme = useTheme();
  const { totalCount } = useQuestions();
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={styles.screen}>
      {/* Sticky header */}
      <View
        style={[
          styles.stickyHeader,
          {
            backgroundColor: theme.background,
            paddingTop: Platform.select({
              android: insets.top + Spacing.three,
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
          <ThemedText
            type="smallBold"
            themeColor="accent"
            style={styles.centered}>
            {totalCount} questions officielles
          </ThemedText>
        </View>
      </View>

      {/* Scrollable content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingBottom: Spacing.four,
          },
        ]}>
        <ThemedView style={styles.inner}>
          <ThemedText
            type="default"
            style={styles.intro}>
            {ACCUEIL_INTRO}
          </ThemedText>

          <View style={styles.cardsSection}>
            {CARDS.map((card) => (
              <ActionCard
                key={card.url}
                title={card.title}
                description={card.description}
                iconName={card.iconName}
                onPress={() =>
                  handleOpenLink(card.url)
                }
              />
            ))}
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
  cardsSection: {
    gap: Spacing.three,
  },
});
