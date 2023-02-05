import { CustomConnect } from "@/components/CustomConnect";
import { Box, Card, CardContent, CardMedia, Stack, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { theme } from "../styles/theme";
import {Howl, Howler} from 'howler';

export default function Heroes() {
  const [selected, setSelected] = useState<number>(0);

  const click = new Howl({
    src: ['/sfx/button_click.flac'],
    volume: 1.5,
  });
  click.play();
  
  function playClick() {
    click.play();
  }

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
          <Image src="/logo.png" alt="HoW :: The Dungeon of Souls" width={359} height={64} />
        </Link>
      </Stack>

      <Typography variant="h6" color="common.white">Choose Difficulty</Typography>

      <Box sx={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}>

        <Card
          onClick={() => { setSelected(0); playClick }}
          className={selected === 0 ? "pixel-box--primary-custom" : "pixel-borders--2"}
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
            <Image src="/assets/easy.png" height={226} width={226} alt="Easy" style={{border: "3px solid #fff", }}/>
          </CardMedia>
          <CardContent sx={{marginTop: "-10px", paddingTop: "0 !important", paddingBottom: "0 !important"}}>
            <Typography variant="h6" sx={{ color: selected === 0 ? "#20A1FE" : "black"}}>Easy</Typography>
          </CardContent>
            <small>
            <CardContent>
            Reward: 0.1% FIL
            <br />
            <br />
            Risk: 0% stake
            <br />
            <br />
            Description: heheh</CardContent>
            </small>
        </Card>
        <Card
          onClick={() => { setSelected(1); playClick }}
          className={selected === 1 ? "pixel-box--primary-custom" : "pixel-borders--2"}
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
            <Image src="/assets/medium.png" height={226} width={226} alt="Medium" style={{border: "3px solid #fff", }} />
          </CardMedia>
          <CardContent sx={{marginTop: "-10px", paddingTop: "0 !important", paddingBottom: "0 !important"}}>
            <Typography variant="h6" sx={{ color: selected === 1 ? "#20A1FE" : "black"}}>Medium</Typography>
          </CardContent>
            <small>
            <CardContent>
            Reward: 4% FIL
            <br />
            <br />
            Risk: -2% stake
            <br />
            <br />
            Earn 0.5 Prestige</CardContent>
            </small>
        </Card>

        <Card
          onClick={() => { setSelected(2); playClick }}
          className={selected === 2 ? "pixel-box--primary-custom" : "pixel-borders--2"}
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
            <Image src="/assets/hard.png" height={226} width={226} alt="DeGen" style={{border: "3px solid #fff", }} />
          </CardMedia>
          <CardContent sx={{marginTop: "-10px", paddingTop: "0 !important", paddingBottom: "0 !important"}}>
            <Typography variant="h6" sx={{ color: selected === 2 ? "#20A1FE" : "black"}}>DeGen Mode</Typography>
          </CardContent>
            <small>
            <CardContent>
            Reward: 10% FIL
            <br />
            <br />
            Risk: -6% stake
            <br />
            <br />
            Earn 1 Prestige</CardContent>
            </small>
        </Card>

      </Box>

        <Link href="/game" onClick={ playClick }>
            <Button sx={{px: "100px !important", display: "block"}}>Start Game</Button>
        </Link>

      <CustomConnect />
    </Stack>
  );
}
