import { CustomConnect } from "@/components/CustomConnect";
import { Box, Card, CardContent, CardMedia, Stack, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Howl, Howler } from "howler";
import { useRouter } from 'next/router';
import "../styles/globals.scss";

export default function Heroes() {
  const [selected, setSelected] = useState<number>(-1);
  const router = useRouter();

  const click = new Howl({
    src: ["/sfx/button_click.flac"],
    volume: 1.5,
  });

  function playClick() {
    click.play();
  }

  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
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
      <Typography variant="h6" color="common.white">
        Choose Hero
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Stack sx={{}}>
          <Card
            className="pixel-borders--2"
            sx={{
              padding: "0 !important",
              marginBottom: "20px",
              textAlign: "left",
              display: "block !important",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <CardContent>
              <small>
                <Typography variant="h6">Swardarian</Typography>
                <Typography variant="body1" sx={{ opacity: ".6" }}>
                  Level 4
                </Typography>
              </small>
            </CardContent>
            <CardMedia
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 1,
              }}
            >
              <Image
                src="/assets/hero-1.png"
                height={226}
                width={226}
                alt="Swardarian"
                style={{ border: "3px solid #fff" }}
              />
            </CardMedia>
            <CardContent>
              <small>
                <CardContent sx={{ paddingTop: "0 !important", paddingBottom: "0 !important" }}>
                  Life:&nbsp;
                  <i className="nes-icon heart"></i>
                  <i className="nes-icon heart"></i>
                  <i className="nes-icon heart"></i>
                  <br />
                  <br />
                  Stake: 2 FIL
                  <br />
                  <br />
                  Rewards: 0.52 FIL
                </CardContent>
              </small>
            </CardContent>
          </Card>

          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <Link
              href={{
                pathname: "/difficulty",
                query: {
                  h: '1'
                }
              }}
              passHref
              onClick={() => {
                playClick;
              }}
            >
              <Button sx={{ width: "100%" }}>Pick</Button>
            </Link>

            <Link
              href="#"
              passHref
              style={{ width: "100%", textAlign: "center", marginTop: "-20px" }}
              onClick={() => {
                playClick;
              }}
            >
              <Button color="error" sx={{ padding: "10px 20px 10px 20px !important" }}>
                Burn
              </Button>
            </Link>
          </Stack>
        </Stack>

        <Stack sx={{}}>
          <Card
            className="pixel-borders--2"
            sx={{
              padding: "0 !important",
              marginBottom: "20px",
              textAlign: "left",
              display: "block !important",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <CardContent>
              <small>
                <Typography variant="h6">Barberino</Typography>
                <Typography variant="body1" sx={{ opacity: ".6" }}>
                  Level 1
                </Typography>
              </small>
            </CardContent>
            <CardMedia
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 1,
              }}
            >
              <Image
                src="/assets/hero-2.png"
                height={226}
                width={226}
                alt="Barberino"
                style={{ border: "3px solid #fff" }}
              />
            </CardMedia>
            <CardContent>
              <small>
                <CardContent sx={{ paddingTop: "0 !important", paddingBottom: "0 !important" }}>
                  Life:&nbsp;
                  <i className="nes-icon heart"></i>
                  <i className="nes-icon heart"></i>
                  <i className="nes-icon heart"></i>
                  <br />
                  <br />
                  Stake: 2 FIL
                  <br />
                  <br />
                  Rewards: 1.52 FIL
                </CardContent>
              </small>
            </CardContent>
          </Card>

          
          <Link
              href={{
                pathname: "/difficulty",
                query: {
                  h: '2'
                }
              }}
              passHref
              onClick={() => {
                playClick;
              }}
            >
              <Button sx={{ width: "100%" }}>Pick</Button>
          </Link>
          <Button color="success" style={{ width: "100%" }} onClick={playClick}>
            Mint
          </Button>
        </Stack>

        <Stack>
          <Card
            className="pixel-borders--2"
            sx={{
              padding: "0 !important",
              marginBottom: "20px",
              textAlign: "left",
              display: "block !important",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <CardContent>
              <small>
                <Typography variant="h6">Wallamaster</Typography>
                <Typography variant="body1" sx={{ opacity: ".6" }}>
                  Level 1
                </Typography>
              </small>
            </CardContent>
            <CardMedia
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 1,
              }}
            >
              <Image
                src="/assets/hero-3.png"
                height={226}
                width={226}
                alt="Wallamaster"
                style={{ border: "3px solid #fff" }}
              />
            </CardMedia>
            <CardContent>
              <small>
                <CardContent sx={{ paddingTop: "0 !important", paddingBottom: "0 !important" }}>
                  Life:&nbsp;
                  <i className="nes-icon heart"></i>
                  <i className="nes-icon heart"></i>
                  <i className="nes-icon heart"></i>
                  <br />
                  <br />
                  Stake: 2 FIL
                  <br />
                  <br />
                  Rewards: 2.52 FIL
                </CardContent>
              </small>
            </CardContent>
          </Card>

                    
          <Link
              href={{
                pathname: "/difficulty",
                query: {
                  h: '3'
                }
              }}
              passHref
              onClick={() => {
                playClick;
              }}
            >
              <Button sx={{ width: "100%" }}>Pick</Button>
          </Link>
          <Button color="success" style={{ width: "100%" }} onClick={playClick}>
            Mint
          </Button>
        </Stack>
      </Box>

      <CustomConnect />
    </Stack>
  );
}
