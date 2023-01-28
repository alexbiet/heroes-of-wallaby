import { CustomConnect } from "@/components/CustomConnect";
import { Box, Button, Stack, Typography } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function Landing() {
  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "1100px",
        height: "100vh",
        width: "100%",
        mx: "auto",
        mt: "0",
        backgroundImage: "url(/assets/welcome-screen.png)",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <Stack
        className="pixel-borders pixel-borders--2"
        sx={{
          alignItems: "center",
          background: "linear-gradient(180deg, #FFD700 0%, #FF8C00 100%)",
          mt: "100px",
        }}
      >
        <Typography variant="h2" color="white">
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
        <CustomConnect />

        <Button
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
  );
}
