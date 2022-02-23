import '@mui/material/styles/createTypography';

declare module '@mui/material/styles/createTypography' {
  export interface Typography {
    [key: string]: any;
  }
}

declare module '@mui/material/styles/createPalette' {
  export interface Palette {
    [key: string]: any;
  }
}
