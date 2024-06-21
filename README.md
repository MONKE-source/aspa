# KKH-Paediatrics

## What I did?

1. Transitioned the project from the Expo CLI to React Native CLI due to compatibility issues.
2. Implemented the PDF viewer feature using the [react-native-pdf](https://www.npmjs.com/package/react-native-pdf) library.
   - Managed iOS Permissions, PodFile and Android packagingOptions.
   - Renamed 90+ files to suite the naming convention of accessing PDFs
3. Added RN Vector Icons to project using the [react-native-vectors-icons](https://www.npmjs.com/package/react-native-vector-icons) library.
   - Added fonts to Info.plist (iOS).
   - Integrated fonts by editing build.gradle (Android).
4. Setup Android Emulator and environment for the FIRST time on my MacBook.
   - Figured out Java environment variables and SDK, downloaded Android Studio for the firs time. Great experience trying out new things.

## The "Who is it for?"

#### App was built for the doctors and nurses of the KKH Womens and Childrens hospital. Reduced the hassle of carrying around a physical handbook and doing manual calculations all by themselves.

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## About me

I'm Caleb Han, a passionate Software Engineer specialising in the React framework. You can check me out [here](https://calebhan.vercel.app/). Currently a Secondary 4 student in the School of Science and Technology, Singapore studying for the GCE O-level examinations.

NOTE: All information correct as per time of writing (9 January 2024).
