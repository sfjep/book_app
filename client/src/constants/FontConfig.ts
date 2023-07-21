import { FontFamily } from "./FontFamily";

export const FontConfig: FontConfigSystem = {
  Heading1: {
    fontFamily: FontFamily.Bold,
    fontSize: 40,
    lineHeight: 40,
    spacing: -0.16,
  },
  Heading2: {
    fontFamily: FontFamily.Medium,
    fontSize: 24,
    lineHeight: 32,
    spacing: 0,
  },
  Heading3: {
    fontFamily: FontFamily.SemiBold,
    fontSize: 18,
    lineHeight: 24,
    spacing: 0,
  },
  BodyLarge: {
    fontFamily: FontFamily.Regular,
    fontSize: 16,
    lineHeight: 24,
    spacing: 0,
  },
  BodyMedium: {
    fontFamily: FontFamily.Regular,
    fontSize: 14,
    lineHeight: 20,
    spacing: 0,
  },
  BodySmall: {
    fontFamily: FontFamily.Regular,
    fontSize: 12,
    lineHeight: 18,
    spacing: 0,
  },
  Link: {
    fontFamily: FontFamily.Medium,
    fontSize: 12,
    lineHeight: 16,
    spacing: 0,
  },
  Button: {
    fontFamily: FontFamily.Bold,
    fontSize: 14,
    lineHeight: 16,
    spacing: 0.16,
  },
};

type FontConfigType = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  spacing: number;
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
