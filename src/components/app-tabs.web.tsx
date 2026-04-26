import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import React from 'react';
import {
  Pressable,
  useColorScheme,
  View,
  StyleSheet,
} from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import {
  Colors,
  MaxContentWidth,
  Spacing,
} from '@/constants/theme';

/**
 * Web-specific tab bar layout.
 *
 * Renders a floating top navigation bar with brand
 * name and tab triggers for Accueil and Questions.
 *
 * @returns JSX element with web tab navigation
 */
const AppTabs = () => {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton>Accueil</TabButton>
          </TabTrigger>
          <TabTrigger
            name="questions"
            href="/questions"
            asChild>
            <TabButton>Questions</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
};

export default AppTabs;

/**
 * Individual tab button with focus-aware styling.
 *
 * @param children - Button label content
 * @param isFocused - Whether this tab is active
 * @param props - Remaining TabTriggerSlotProps
 * @returns Styled pressable tab button
 */
export const TabButton = ({
  children,
  isFocused,
  ...props
}: TabTriggerSlotProps) => {
  return (
    <Pressable
      {...props}
      style={({ pressed }) =>
        pressed && styles.pressed
      }>
      <ThemedView
        type={
          isFocused
            ? 'backgroundSelected'
            : 'backgroundElement'
        }
        style={styles.tabButtonView}>
        <ThemedText
          type="small"
          themeColor={
            isFocused ? 'text' : 'textSecondary'
          }>
          {children}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
};

/**
 * Custom tab list container with brand label.
 *
 * Wraps tab triggers in a floating pill-shaped bar
 * centered at the top of the screen.
 *
 * @param props - TabListProps including children
 * @returns Styled container for tab navigation
 */
export const CustomTabList = (props: TabListProps) => {
  return (
    <View {...props} style={styles.tabListContainer}>
      <ThemedView
        type="backgroundElement"
        style={styles.innerContainer}>
        <ThemedText
          type="smallBold"
          style={styles.brandText}>
          L'Examen Civique
        </ThemedText>

        {props.children}
      </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    width: '100%',
    padding: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerContainer: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.five,
    borderRadius: Spacing.five,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    gap: Spacing.two,
    maxWidth: MaxContentWidth,
  },
  brandText: {
    marginRight: 'auto',
  },
  pressed: {
    opacity: 0.7,
  },
  tabButtonView: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },
});
