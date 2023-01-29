import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#75C4FF",
      dark: "#20A1FE",
      light: "#B9E1FF",
    },
    secondary: {
      main: "#000",
    },
  },
  typography: {
    fontFamily: "Press Start 2P, cursive",
  },

  components: {
    MuiButton: {
      defaultProps: {
        className: "pixel-borders pixel-borders--2",
        variant: "contained",
        disableRipple: true,
      },

      variants: [
        {
          props: { variant: "contained" },
          style: {
            color: "#000",     
            background: "linear-gradient(180deg, #20A1FE 0%, #20A1FE 50%, #75C4FF 51%, #75C4FF 100%) !important",
            "&:hover": {
              backgroundColor: "#222",
              color: "#fff",
            },
            "&:active": {
              backgroundColor: "#000",
              color: "#fff",
              
            },
          },
        },
      ],
    },
    MuiCard: {
      defaultProps: {
        // className: "pixel-borders ",
        style: {
          color: "#000",
          background: `linear-gradient(180deg, #75C4FF 0%, #75C4FF 50%, #B9E1FF 51%, #B9E1FF 100%)`,
        },

      },

  },
  },
});
