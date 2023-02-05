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
            background: "linear-gradient(180deg, #20A1FE 0%, #20A1FE 50%, #75C4FF 50.1%, #75C4FF 100%) !important",
            borderRadius: "20px",
            borderStyle: "solid",
            borderWidth: "4px",
            borderColor: "#000",
            borderImageSlice: "4",
            borderImageWidth: "2",
            borderImageOutset: "0",
            borderImageSource: 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\'><path d=\'M2 2h2v2H2zM4 0h2v2H4zM10 4h2v2h-2zM0 4h2v2H0zM6 0h2v2H6zM8 2h2v2H8zM8 8h2v2H8zM6 10h2v2H6zM0 6h2v2H0zM10 6h2v2h-2zM4 10h2v2H4zM2 8h2v2H2z\' fill=\'%23000\' /></svg>")',
            position: "relative",
            display: "inline-block",
            margin: "0 15px 15px 0",
            padding: "15px 20px",
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
        {
          props: { variant: "contained", color: "error" },
          style: {
            color: "#000",     
            background: "linear-gradient(180deg, #D20404 0%, #D20404 50%, #FF1F1F 50.1%, #FF1F1F 100%) !important",
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
        {
          props: { variant: "contained", color: "success" },
          style: {
            color: "#000",     
            background: "linear-gradient(180deg, #21FEC9 0%, #21FEC9 50%, #A8FFFA 50.1%, #A8FFFA 100%) !important",
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
        {
          props: { variant: "contained", color: "secondary" },
          style: {
            color: "#000",     
            background: "linear-gradient(180deg, #AADBFF 0%, #AADBFF 50%, #E9F6FF 50.1%, #E9F6FF 100%) !important",
            "&:hover": {
              backgroundColor: "#222",
              color: "#20A1FE",
            },
            "&:active": {
              backgroundColor: "#000",
              color: "#20A1FE",
              
            },
          },
        },
      ],
    },
    MuiCard: {
      defaultProps: {
        className: "pixel-borders pixel-borders--2",
        style: {
          color: "#000",
          background: "linear-gradient(180deg, #75C4FF 0%, #75C4FF 50%, #B9E1FF 50.1%, #B9E1FF 100%)",
          borderRadius: "20px";
          borderStyle: "solid";
          borderWidth: "4px";
          borderColor: "#000";
          borderImageSlice: "4";
          borderImageWidth: "2",
          borderImageOutset: "0",
          borderImageSource: 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\'><path d=\'M2 2h2v2H2zM4 0h2v2H4zM10 4h2v2h-2zM0 4h2v2H0zM6 0h2v2H6zM8 2h2v2H8zM8 8h2v2H8zM6 10h2v2H6zM0 6h2v2H0zM10 6h2v2h-2zM4 10h2v2H4zM2 8h2v2H2z\' fill=\'%23000\' /></svg>")',
          position: "relative",
          display: "inline-block",
          margin: "0 15px 15px 0",
          padding: "15px 20px",
        },

      },

  },
  },
});
