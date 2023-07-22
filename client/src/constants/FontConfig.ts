import { FontFamily } from "./FontFamily";
import { Layout } from "./Layout";

export const FontConfig: FontConfigSystem = {
  Heading1: {
    fontFamily: FontFamily.Bold,
    fontSize: 40,
    lineHeight: 2,
    spacing: 1,
    padding: 0,
  },
  Heading2: {
    fontFamily: FontFamily.Medium,
    fontSize: 24,
    lineHeight: 2,
    spacing: 0,
    padding: 0,
  },
  Heading3: {
    fontFamily: FontFamily.SemiBold,
    fontSize: 18,
    lineHeight: 2,
    spacing: 0,
    padding: 0,
  },
  BodyLarge: {
    fontFamily: FontFamily.Regular,
    fontSize: 16,
    lineHeight: 2,
    spacing: 0,
    padding: 0,
  },
  BodyMedium: {
    fontFamily: FontFamily.Regular,
    fontSize: 14,
    lineHeight: 2,
    spacing: 0,
    padding: 0,
  },
  BodySmall: {
    fontFamily: FontFamily.Regular,
    fontSize: 12,
    lineHeight: 2,
    spacing: 0,
    padding: 0,
  },
  Link: {
    fontFamily: FontFamily.Medium,
    fontSize: 12,
    lineHeight: 2,
    spacing: 0,
    padding: 0,
  },
  Button: {
    fontFamily: FontFamily.Bold,
    fontSize: 12,
    lineHeight: 4,
    spacing: 0.16,
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
