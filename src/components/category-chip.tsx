import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface CategoryChipProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

/**
 * Filter chip for selecting question categories.
 *
 * Toggles between active (accent background) and
 * inactive (neutral background) visual states.
 *
 * @param label - Chip display text
 * @param isActive - Whether chip is currently selected
 * @param onPress - Callback fired on chip press
 * @returns Pressable pill-shaped chip component
 */
const CategoryChip = ({
  label,
  isActive,
  onPress,
}: CategoryChipProps) => {
  const theme = useTheme();

  const backgroundColor = isActive
    ? theme.accent
    : theme.backgroundElement;

  const textColor = isActive
    ? '#ffffff'
    : theme.textSecondary;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        { backgroundColor },
        pressed && styles.pressed,
      ]}>
      <ThemedText
        type="small"
        style={{ color: textColor }}>
        {label}
      </ThemedText>
    </Pressable>
  );
};

export { CategoryChip };
export type { CategoryChipProps };

const CHIP_HEIGHT = 36;

const styles = StyleSheet.create({
  chip: {
    height: CHIP_HEIGHT,
    borderRadius: CHIP_HEIGHT / 2,
    paddingHorizontal: Spacing.four,
    justifyContent: 'center',
    flexShrink: 0,
  },
  pressed: {
    opacity: 0.7,
  },
});
