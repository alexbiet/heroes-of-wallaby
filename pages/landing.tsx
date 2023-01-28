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
          ></Button>

          <div className="pixel-borders pixel-borders--1">Pixel border 1</div>
          <div className="pixel-borders pixel-borders--1 pixel-borders--1-inset">Pixel inset 1</div>
          <div className="pixel-borders pixel-borders--2">Pixel border 2</div>
          <div className="pixel-borders pixel-borders--2-inset">Pixel inset 2</div>
          <button className="pixel-borders pixel-box--light">Pixel light</button>
          <button className="pixel-borders pixel-box--primary">Pixel primary</button>
          <button className="pixel-borders pixel-box--success">Pixel success</button>
          <button className="pixel-borders pixel-box--warning">Pixel warning</button>
          <button className="pixel-borders pixel-box--error">Pixel error</button>
        </Stack>
        <Box
          sx={{
            mb: "20px",
          }}
        >
          <Button className="pixel-borders pixel-borders--2">
            <Link href="/">Game</Link>
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
}
