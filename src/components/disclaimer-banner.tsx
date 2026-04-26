import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { ExternalLink } from '@/components/external-link';
import { ThemedText } from '@/components/themed-text';
import {
  DISCLAIMER_BODY,
  DISCLAIMER_TITLE,
} from '@/constants/content';
import { QCM_CIVIQUE_URL } from '@/constants/links';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Collapsible disclaimer banner with accent border.
 *
 * Starts collapsed but visually prominent. Contains
 * data source attribution (Licence Ouverte 2.0).
 * Chevron animates between down (closed) and up.
 *
 * @returns Animated disclaimer block
 */
export const DisclaimerBanner = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const rotation = useSharedValue(0);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
    ],
  }));

  const toggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    rotation.value = withTiming(
      next ? 180 : 0,
      { duration: 250 },
    );
  };

  return (
    <Pressable
      onPress={toggle}
      style={({ pressed }) =>
        pressed && styles.pressed
      }>
      <View
        style={[
          styles.container,
          {
            borderColor: theme.accent,
            backgroundColor: theme.accentLight,
          },
        ]}>
        <View style={styles.header}>
          <SymbolView
            name={{
              ios: 'info.circle.fill',
              android: 'info',
              web: 'info',
            }}
            size={16}
            tintColor={theme.accent}
          />
          <ThemedText
            type="small"
            style={{
              color: theme.accent,
              flex: 1,
            }}>
            {DISCLAIMER_TITLE}
          </ThemedText>
          <Animated.View style={chevronStyle}>
            <SymbolView
              name={{
                ios: 'chevron.down',
                android: 'expand_more',
                web: 'expand_more',
              }}
              size={12}
              tintColor={theme.accent}
            />
          </Animated.View>
        </View>
        {isOpen && (
          <Animated.View
            entering={FadeIn.duration(200)}>
            <View style={styles.body}>
              <ThemedText
                type="small"
                style={{ color: theme.accent }}>
                {DISCLAIMER_BODY}
              </ThemedText>
              <ExternalLink
                href={QCM_CIVIQUE_URL}>
                <ThemedText type="linkPrimary">
                  leqcmcivique.fr
                </ThemedText>
              </ExternalLink>
            </View>
          </Animated.View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.two,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  body: {
    marginTop: Spacing.one,
    gap: Spacing.one,
  },
  pressed: {
    opacity: 0.8,
  },
});
