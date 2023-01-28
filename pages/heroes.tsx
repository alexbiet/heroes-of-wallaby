import { CustomConnect } from "@/components/CustomConnect";
import { Box, Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function Heroes() {
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

      <Box>
        <Card className="pixel-borders pixel-borders--2 " sx={{ p: 6 }}>
          <CardMedia>
            <Image src="/assets/dungeon-1.png" height={250} width={250} alt="temp" />
          </CardMedia>
          <CardContent>
            <Typography variant="h4">Dungeon 1</Typography>
            <CardContent>Risk: 1</CardContent>
            <CardContent>Reward: 1</CardContent>
            <CardContent>Description: heheh</CardContent>
          </CardContent>
        </Card>
        <Card className="pixel-borders pixel-borders--2 " sx={{ p: 6 }}>
          <CardMedia>
            <Image src="/assets/dungeon-1.png" height={250} width={250} alt="temp" />
          </CardMedia>
          <CardContent>
            <Typography variant="h4">Dungeon 1</Typography>
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
