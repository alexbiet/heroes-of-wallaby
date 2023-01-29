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
        <Image src="/logo.png" alt="HoW :: The Dungeon of Souls" width={612} height={109} /> 
      </Stack>

      <Box>
        <CardContent
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="h6">Choose Hero</Typography>

        </CardContent>


        <Stack sx={{
            display: "inline-block", 
            marginRight: "10px",
            }}>
        <Card
          onClick={() => setSelected(0)}
          className={selected === 0 ? "pixel-borders pixel-borders--2" : " "}
          sx={{
            padding: "0 !important",
            textAlign : "center",
            margin: "0 !important",
            display: "block !important",
          }}
        >  
          <CardContent>
            <Typography variant="h6">Swardarian</Typography>
            <Typography variant="body1">Level 4</Typography>
          </CardContent>
          <CardMedia
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 4,
            }}
          >
            <Image src="/assets/hero-1.png" height={200} width={200} alt="Swardarian" />
          </CardMedia>
          <CardContent>
            <CardContent>Life: &nbsp;
              <i className="nes-icon heart"></i>
              <i className="nes-icon heart"></i>
              <i className="nes-icon heart"></i>
              </CardContent>
            <CardContent>Stake: 2 FIL</CardContent>
            <CardContent>Rewards: 0.52 FIL</CardContent>
          </CardContent>
        </Card>

        <Link href="/difficulty">
            <Button sx={{px: "100px !important",}}>Pick</Button>
        </Link>
        <Button className="nes-btn is-error">Burn</Button>

        </Stack>

        <Stack sx={{
            display: "inline-block", 
            marginRight: "10px",
            }}>

        <Card
          onClick={() => setSelected(1)}
          className={selected === 1 ? "pixel-borders pixel-borders--2" : " "}
          sx={{
            padding: "0 !important",
            textAlign : "center",
            margin: "0 !important",
            display: "block !important",
          }}
        >
          <CardContent>
            <Typography variant="h6">Barberino</Typography>
            <Typography variant="body1">Level 1</Typography>
          </CardContent>
          <CardMedia
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 4,
            }}
          >
            <Image src="/assets/hero-2.png" height={200} width={200} alt="Barberino" />
          </CardMedia>
          <CardContent>
            <CardContent>Life: &nbsp;
              <i className="nes-icon heart"></i>
              <i className="nes-icon heart"></i>
              <i className="nes-icon heart"></i>
              </CardContent>
            <CardContent>Stake: 2 FIL</CardContent>
            <CardContent>Cost: 1 FIL</CardContent>
          </CardContent>
        </Card>
        <Button>Mint</Button>
        </Stack>


        <Stack sx={{display: "inline-block"}}>
        <Card
          onClick={() => setSelected(2)}
          className={selected === 2 ? "pixel-borders pixel-borders--2" : " "}
          sx={{
            padding: "0 !important",
            textAlign : "center",
            margin: "0 !important",
            display: "block !important",
          }}
        >
          <CardContent>
            <Typography variant="h6">Wallamaster</Typography>
            <Typography variant="body1">Level 1</Typography>
          </CardContent>
          <CardMedia
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 4,
            }}
          >
            <Image src="/assets/hero-3.png" height={200} width={200} alt="Wallamaster" />
          </CardMedia>
          <CardContent>
            <CardContent>Life: &nbsp;
              <i className="nes-icon heart"></i>
              <i className="nes-icon heart"></i>
              <i className="nes-icon heart"></i>
              </CardContent>
            <CardContent>Stake: 2 FIL</CardContent>
            <CardContent>Cost: 1 FIL</CardContent>
          </CardContent>
        </Card>
        <Button>Mint</Button>
        
        </Stack>
      </Box>

      <CustomConnect />
    </Stack>
  );
}
