import { SymbolView } from 'expo-symbols';
import { PropsWithChildren, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Expandable section with animated chevron.
 *
 * The whole component sits inside a rounded container
 * with background color. Chevron points down when
 * collapsed, up when open.
 *
 * @param title - Section heading shown next to chevron
 * @param children - Expandable content
 * @returns Animated collapsible component
 */
export const Collapsible = ({
  children,
  title,
}: PropsWithChildren & { title: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
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
    <View
      style={[
        styles.wrapper,
        { backgroundColor: theme.background },
      ]}>
      <Pressable
        style={({ pressed }) => [
          styles.heading,
          pressed && styles.pressedHeading,
        ]}
        onPress={toggle}>
        <Animated.View style={chevronStyle}>
          <SymbolView
            name={{
              ios: 'chevron.down',
              android: 'expand_more',
              web: 'expand_more',
            }}
            size={14}
            weight="bold"
            tintColor={theme.textSecondary}
          />
        </Animated.View>

        <ThemedText
          type="small"
          themeColor="textSecondary">
          {title}
        </ThemedText>
      </Pressable>
      {isOpen && (
        <Animated.View
          entering={FadeIn.duration(200)}
          style={styles.content}>
          {children}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  pressedHeading: {
    opacity: 0.7,
  },
  content: {
    marginTop: Spacing.two,
    paddingLeft: Spacing.four + Spacing.two,
  },
});
