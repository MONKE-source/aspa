import { useWindowDimensions, Platform } from "react-native";

/**
 * Custom hook for responsive layout across phones, tablets, and orientations.
 *
 * Usage:
 *   const { wp, hp, ms, fs, isLandscape, isTablet, width, height } = useResponsive();
 *
 *   wp(50)  => 50% of screen width
 *   hp(10)  => 10% of screen height
 *   ms(16)  => moderate scale based on smaller dimension (good for padding/margins)
 *   fs(16)  => font scale (capped growth on large screens)
 */
export default function useResponsive() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const isTablet = Platform.isPad || (Platform.OS === "android" && Math.min(width, height) >= 600);

  // Reference dimensions (iPhone 14 - 390 x 844)
  const BASE_WIDTH = 390;
  const BASE_HEIGHT = 844;

  // The "short" dimension — always the smaller of width/height.
  // This stays consistent regardless of orientation.
  const shortDim = Math.min(width, height);
  const longDim = Math.max(width, height);

  // Width-percentage: returns a fraction of the current screen width
  const wp = (pct) => (pct / 100) * width;

  // Height-percentage: returns a fraction of the current screen height
  const hp = (pct) => (pct / 100) * height;

  // Moderate scale: scales a value based on the short dimension relative to a
  // phone baseline (390). Growth is dampened by a factor so elements don't blow
  // up on very large screens.
  const ms = (size, factor = 0.5) => {
    const scale = shortDim / BASE_WIDTH;
    return size + (scale - 1) * size * factor;
  };

  // Font scale: like moderate scale but with even more dampening to keep text
  // readable without being comically large on 12.9" iPads.
  const fs = (size) => ms(size, 0.35);

  // Scale relative to the BASE_WIDTH, full linear scale
  const sw = (size) => (size / BASE_WIDTH) * width;

  // Scale relative to the BASE_HEIGHT, full linear scale
  const sh = (size) => (size / BASE_HEIGHT) * height;

  // Returns a value that caps element sizes in landscape to avoid elements
  // stretching too wide. Uses shortDim-based scaling in landscape and
  // width-based in portrait.
  const adaptiveWidth = (portraitPct, landscapeMax) => {
    if (isLandscape) {
      return Math.min(wp(portraitPct), landscapeMax || wp(portraitPct * 0.6));
    }
    return wp(portraitPct);
  };

  // Tab bar height: shorter in landscape, especially on tablets
  const tabBarHeight = isLandscape ? (isTablet ? 60 : 50) : (isTablet ? 80 : 90);

  return {
    width,
    height,
    isLandscape,
    isTablet,
    shortDim,
    longDim,
    wp,
    hp,
    ms,
    fs,
    sw,
    sh,
    adaptiveWidth,
    tabBarHeight,
  };
}
