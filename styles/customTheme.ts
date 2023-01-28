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
            //background gradient top to bottom gold to yellow to orange
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
    
  },
});
