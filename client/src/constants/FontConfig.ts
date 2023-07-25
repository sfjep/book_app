import { FontFamily } from "./FontFamily";
import { Layout } from "./Layout";

export const FontConfig: FontConfigSystem = {
  Heading1: {
    fontFamily: FontFamily.Bold,
    fontSize: 40,
    lineHeight: 2,
    spacing: 1,
    padding: 20,
  },
  Heading2: {
    fontFamily: FontFamily.Bold,
    fontSize: 26,
    lineHeight: 2,
    spacing: 1,
    padding: 20,
  },
  Heading3: {
    fontFamily: FontFamily.Bold,
    fontSize: 18,
    lineHeight: 2,
    spacing: 1,
    padding: 20,
  },
  BodyLarge: {
    fontFamily: FontFamily.Regular,
    fontSize: 24,
    lineHeight: 2,
    spacing: 0,
    padding: 20,
  },
  BodyMedium: {
    fontFamily: FontFamily.Regular,
    fontSize: 18,
    lineHeight: 2,
    spacing: 0,
    padding: 20,
  },
  BodySmall: {
    fontFamily: FontFamily.Regular,
    fontSize: 12,
    lineHeight: 2,
    spacing: 0,
    padding: 20,
  },
  Link: {
    fontFamily: FontFamily.Medium,
    fontSize: 14,
    lineHeight: 2,
    spacing: 0,
    padding: 0,
  },
  Button: {
    fontFamily: FontFamily.Bold,
    fontSize: 14,
    lineHeight: 2.5,
    spacing: 0,
    padding: Layout.standardPaddingSmall,
  },
};

type FontConfigType = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  spacing: number;
  padding: number;
};

type FontConfigSystem = {
  Heading1: FontConfigType;
  Heading2: FontConfigType;
  Heading3: FontConfigType;
  BodyLarge: FontConfigType;
  BodyMedium: FontConfigType;
  BodySmall: FontConfigType;
  Link: FontConfigType;
  Button: FontConfigType;
};
