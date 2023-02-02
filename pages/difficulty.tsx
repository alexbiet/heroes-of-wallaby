import { CustomConnect } from "@/components/CustomConnect";
import { Box, Card, CardContent, CardMedia, Stack, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { theme } from "../styles/theme";

export default function Heroes() {
  const [selected, setSelected] = useState<number>(-1);

  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        // maxWidth: "1100px",
        height: "100vh",
        width: "100%",
        mx: "auto",
        mt: "0",
        backgroundImage: "url(/assets/welcome-screen.png)",
        backgroundSize: "60%",
        backgroundPosition: "center bottom 20px",
        backgroundColor: "#100400",
      }}
    >
      <Stack
        sx={{
          textAlign: "center",
          paddingTop: "30px",
        }}
      > 
        <Link href="/">
          <Image src="/logo.png" alt="HoW :: The Dungeon of Souls" width={612} height={109} /> 
        </Link>
      </Stack>

      <Box
        className="pixel-borders pixel-borders--2"
        sx={{
          background: `linear-gradient(180deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.dark} 50%, ${theme.palette.primary.main} 51%, ${theme.palette.primary.main} 100%)`,
          maxWidth: "1000px",
          textAlign: "center",
        }}
      >
        <CardContent
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="h6">Choose Difficulty</Typography>

        </CardContent>


        <Card
          onClick={() => setSelected(0)}
          className={selected === 0 ? "pixel-borders pixel-borders--2" : "none !important"}
          sx={{
            padding: "0 !important",
            textAlign : "center",
            marginRight: "10px",
            display: "inline-block !important",
            marginBottom: "20px",
          }}
        >
          <CardMedia
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 4,
            }}
          >
            <Image src="/assets/dungeon-1.png" height={200} width={200} alt="Easy" />
          </CardMedia>
          <CardContent>
            <Typography variant="h5">Easy</Typography>
            <small>
            <CardContent>Risk: 1</CardContent>
            <CardContent>Reward: 1</CardContent>
            <CardContent>Description: heheh</CardContent>
            </small>
          </CardContent>
        </Card>
        <Card
          onClick={() => setSelected(1)}
          className={selected === 1 ? "pixel-borders pixel-borders--2" : "none !important"}
          sx={{
            padding: "0 !important",
            textAlign : "center",
            marginRight: "10px",
            display: "inline-block !important",
            marginBottom: "20px",
          }}
        >
          <CardMedia
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 4,
            }}
          >
            <Image src="/assets/dungeon-2.png" height={200} width={200} alt="Medium" />
          </CardMedia>
          <CardContent>
            <Typography variant="h5">Medium</Typography>
            <small>
            <CardContent>Risk: 1</CardContent>
            <CardContent>Reward: 1</CardContent>
            <CardContent>Description: heheh</CardContent>
            </small>
          </CardContent>
        </Card>

        <Card
          onClick={() => setSelected(2)}
          className={selected === 2 ? "pixel-borders pixel-borders--2" : " "}
          sx={{
            padding: "0 !important",
            textAlign : "center",
            display: "inline-block !important",
            marginBottom: "20px",
          }}
        >
          <CardMedia
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 4,
            }}
          >
            <Image src="/assets/dungeon-3.png" height={200} width={200} alt="DeGen" />
          </CardMedia>
          <CardContent>
            <Typography variant="h5">DeGen Mode</Typography>
            <small>
            <CardContent>Risk: 1</CardContent>
            <CardContent>Reward: 1</CardContent>
            <CardContent>Description: heheh</CardContent>
            </small>
          </CardContent>
        </Card>

        <Link href="/game">
            <Button sx={{px: "100px !important", display: "block"}}>Start Game</Button>
        </Link>
      </Box>

      <CustomConnect />
    </Stack>
  );
}
