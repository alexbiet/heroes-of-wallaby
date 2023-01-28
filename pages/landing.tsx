import { CustomConnect } from "@/components/CustomConnect";
import { Box, Button, Stack, ThemeProvider, Typography } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { customTheme } from "@/styles/customTheme";

export default function Landing() {
  return (
    <ThemeProvider theme={customTheme}>
      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1200px",
          height: "800px",
          width: "800px",
          mx: "auto",
          mt: "50px",
          backgroundImage: "url(/assets/welcome-screen.png)",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          border: "5px solid brown",
        }}
      >
        <Stack
          sx={{
            alignItems: "center",
            background: "linear-gradient(180deg, #FFD700 0%, #FF8C00 100%)",
            mt: "100px",
          }}
        >
          <Typography variant="h2" color="white" fontFamily="Press Start 2P, sans-serif">
            Heroes of Wallaby
          </Typography>
          <Typography variant="h4" color="red">
            The Dungeon of Souls
          </Typography>
        </Stack>
        <Stack
          sx={{
            gap: "40px",
            alignItems: "center",
          }}
        >
          {/* <CustomConnect /> */}
          <Button
            variant="contained"
            onClick={() => {
              alert("Coming soon! Learn about HoW.");
            }}
          >
            ?
          </Button>
        </Stack>
        <Box
          sx={{
            mb: "20px",
          }}
        >
          <Button>
            <Link href="/">Game</Link>
          </Button>
        </Box>
      </Stack>
    </ThemeProvider>
  );
}
