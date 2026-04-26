import { NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

/**
 * Native tab bar for iOS/Android platforms.
 *
 * Renders bottom tabs for the main app sections:
 * Accueil (home) and Questions.
 *
 * @returns JSX element with configured NativeTabs
 */
const AppTabs = () => {
  const scheme = useColorScheme();
  const colors =
    Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{
        selected: { color: colors.text },
      }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>
          Accueil
        </NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require(
            '@/assets/images/tabIcons/home.png'
          )}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="questions">
        <NativeTabs.Trigger.Label>
          Questions
        </NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require(
            '@/assets/images/tabIcons/explore.png'
          )}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default AppTabs;
