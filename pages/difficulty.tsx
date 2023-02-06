import { CustomConnect } from "@/components/CustomConnect";
import { Box, Card, CardContent, CardMedia, Stack, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { theme } from "../styles/theme";
import {Howl, Howler} from 'howler';
import { useRouter } from 'next/router';

export default function Heroes() {
  const [selected, setSelected] = useState<number>(1);
  const router = useRouter();

  const click = new Howl({
    src: ['/sfx/button_click.flac'],
    volume: 1.5,
  });
  click.play();
  
  function playClick() {
    click.play();
  }

  useEffect(()=>{
    if(router)
    console.log(router.query.h);

  },[router])

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
          onClick={() => { setSelected(1); playClick }}
          variant={selected === 1 ? "outlined" : "elevation"}
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
            <Typography variant="h6" sx={{ color: selected === 1 ? "#20A1FE" : "black"}}>Easy</Typography>
          </CardContent>
            <small>
            <CardContent>
            Reward: 0.1 tFIL
            <br />
            <br />
            Risk: 0 
            <br />
            <br />
            Level 0.2/dgn.</CardContent>
            </small>
        </Card>
        <Card
          onClick={() => { setSelected(2); playClick }}
          variant={selected === 2 ? "outlined" : "elevation"}
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
            <Typography variant="h6" sx={{ color: selected === 2 ? "#20A1FE" : "black"}}>Medium</Typography>
          </CardContent>
            <small>
            <CardContent>
            Reward: 0.2 tFIL
            <br />
            <br />
            Risk: -0.2 tFIL
            <br />
            <br />
            Level 0.5/dgn.</CardContent>
            </small>
        </Card>

        <Card
          onClick={() => { setSelected(3); playClick }}
          variant={selected === 3 ? "outlined" : "elevation"}
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
            <Typography variant="h6" sx={{ color: selected === 3 ? "#20A1FE" : "black"}}>DeGen Mode</Typography>
          </CardContent>
            <small>
            <CardContent>
            Reward: 0.8 tFIL
            <br />
            <br />
            Risk: -0.5 tFIL
            <br />
            <br />
            Level 1/dgn.</CardContent>
            </small>
        </Card>

      </Box>

        <Link 
          href={{
            pathname: "/game",
            query: {
              h: router.query.h || 1,
              d: selected,
            }
          }} 
          onClick={ playClick }>
            <Button sx={{px: "100px !important", display: "block"}}>Start Game</Button>
        </Link>

      <CustomConnect />
    </Stack>
  );
}
