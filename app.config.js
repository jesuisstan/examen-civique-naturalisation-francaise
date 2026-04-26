module.exports = () => ({
  expo: {
    name: "Examen Civique Naturalisation Francaise",
    slug: "examen-civique-naturalisation-francaise",
    version: "1.1.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "examenciviquenaturalisationfrancaise",
    userInterfaceStyle: "automatic",
    ios: {
      icon: "./assets/expo.icon",
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage:
          "./assets/images/android-icon-foreground.png",
        backgroundImage:
          "./assets/images/android-icon-background.png",
        monochromeImage:
          "./assets/images/android-icon-monochrome.png",
      },
      predictiveBackGestureEnabled: false,
      package:
        "com.jesuisstan"
        + ".examenciviquenaturalisationfrancaise",
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          backgroundColor: "#208AEF",
          android: {
            image: "./assets/images/splash-icon.png",
            imageWidth: 76,
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: {},
      eas: {
        projectId:
          "487fd6d2-daf5-4f58-8c41-1b817f19d5c0",
      },
    },
    owner: "jesuisstan",
  },
});
