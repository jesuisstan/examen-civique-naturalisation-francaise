import { SymbolView } from 'expo-symbols';
import { type ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SymbolName = ComponentProps<
  typeof SymbolView
>['name'];

interface ActionCardProps {
  title: string;
  description: string;
  onPress: () => void;
  iconName?: SymbolName;
}

/**
 * Reusable action card for the Accueil screen.
 *
 * Displays a pressable card with an optional leading
 * icon, title, description, and a trailing chevron.
 *
 * @param title - Card heading text
 * @param description - Supporting description text
 * @param onPress - Callback fired on card press
 * @param iconName - Platform-specific SF Symbol names
 * @returns Pressable card component
 */
const ActionCard = ({
  title,
  description,
  onPress,
  iconName,
}: ActionCardProps) => {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed && styles.pressed
      }>
      <ThemedView
        type="backgroundElement"
        style={[
          styles.container,
          { borderColor: theme.cardBorder },
        ]}>
        <View style={styles.row}>
          {iconName && (
            <View style={styles.iconWrapper}>
              <SymbolView
                name={iconName}
                size={24}
                tintColor={theme.accent}
              />
            </View>
          )}

          <View style={styles.content}>
            <ThemedText type="smallBold">
              {title}
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary">
              {description}
            </ThemedText>
          </View>

          <SymbolView
            name={{
              ios: 'chevron.right',
              android: 'chevron_right',
              web: 'chevron_right',
            }}
            size={16}
            tintColor={theme.textSecondary}
          />
        </View>
      </ThemedView>
    </Pressable>
  );
};

export { ActionCard };
export type { ActionCardProps };

const styles = StyleSheet.create({
  container: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    gap: Spacing.half,
  },
  pressed: {
    opacity: 0.7,
  },
});
