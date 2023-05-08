// types/theme.ts
import { TypographyStyle } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    alt: string;
  }

  interface Palette {
    neutral: {
      dark: string;
      main: string;
      mediumMain: string;
      medium: string;
      light: string;
    };
  }

  interface PaletteOptions {
    neutral?: {
      dark?: string;
      main?: string;
      mediumMain?: string;
      medium?: string;
      light?: string;
    };
  }

  interface Typography {
    h1: TypographyStyle;
    h2: TypographyStyle;
    h3: TypographyStyle;
    h4: TypographyStyle;
    h5: TypographyStyle;
    h6: TypographyStyle;
  }
}
