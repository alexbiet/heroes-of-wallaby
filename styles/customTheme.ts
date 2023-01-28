import { createTheme } from "@mui/material";

export const customTheme = createTheme({
  palette: {
    primary: {
      main: "#FFF",
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
    
  },
});
