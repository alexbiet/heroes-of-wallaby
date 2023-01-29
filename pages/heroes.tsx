import { CustomConnect } from "@/components/CustomConnect";
import { Box, Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { theme } from "../styles/theme";

export default function Heroes() {
  const [selected, setSelected] = useState<number>(-1);

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
          textAlign: "center",
          background: "linear-gradient(180deg, #FFD700 0%, #FF8C00 100%)",
        }}
      >
        <Typography variant="h2" color="white">
          Heroes of Wallaby
        </Typography>
        <Typography variant="h4" color="red">
          The Dungeon of Souls
        </Typography>
      </Stack>

      <Box
        className="pixel-borders pixel-borders--2"
        sx={{
          background: `linear-gradient(180deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.dark} 50%, ${theme.palette.primary.main} 51%, ${theme.palette.primary.main} 100%)`,
        }}
      >
        <CardContent
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="h6">Choose Dificulty</Typography>
        </CardContent>
        <Card
          onClick={() => setSelected(0)}
          className={selected === 0 ? "pixel-borders pixel-borders--2" : "none !important"}
          sx={{
            margin: "0 !important",
            padding: "0 !important",
          }}
        >
          <CardMedia
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 4,
            }}
          >
            <Image src="/assets/dungeon-1.png" height={250} width={250} alt="temp" />
          </CardMedia>
          <CardContent>
            <Typography variant="h5">Dungeon 1</Typography>
            <CardContent>Risk: 1</CardContent>
            <CardContent>Reward: 1</CardContent>
            <CardContent>Description: heheh</CardContent>
          </CardContent>
        </Card>
        <Card
          onClick={() => setSelected(1)}
          className={selected === 1 ? "pixel-borders pixel-borders--2" : "none !important"}
          sx={{
            p: 6,
          }}
        >
          <CardMedia
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 4,
            }}
          >
            <Image src="/assets/dungeon-1.png" height={250} width={250} alt="temp" />
          </CardMedia>
          <CardContent>
            <Typography variant="h5">Dungeon 1</Typography>
            <CardContent>Risk: 1</CardContent>
            <CardContent>Reward: 1</CardContent>
            <CardContent>Description: heheh</CardContent>
          </CardContent>
        </Card>
      </Box>

      <CustomConnect />
    </Stack>
  );
}
