import { CustomConnect } from "@/components/CustomConnect";
import { Box, Card, CardContent, CardMedia, Stack, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Heroes() {
  const [selected, setSelected] = useState<number>(-1);

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
        <Image src="/logo.png" alt="HoW :: The Dungeon of Souls" width={612} height={109} />
      </Stack>
      <Typography variant="h6" color="common.white">
        Choose Hero
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack sx={{}}>
          <Card
            onClick={() => setSelected(0)}
            className={selected === 0 ? "pixel-borders pixel-borders--2" : " "}
            sx={{
              padding: "0 !important",
              textAlign: "center",
              margin: "0 !important",
              display: "block !important",
              maxWidth: "400px",
              width: "100%",
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
              <CardContent>
                Life: &nbsp;
                <i className="nes-icon heart"></i>
                <i className="nes-icon heart"></i>
                <i className="nes-icon heart"></i>
              </CardContent>
              <CardContent>Stake: 2 FIL</CardContent>
              <CardContent>Rewards: 0.52 FIL</CardContent>
            </CardContent>
          </Card>

          <Link href="/difficulty" passHref>
            <Button
              className="nes-btn "
              sx={{
                width: "100%",
              }}
            >
              Pick
            </Button>
          </Link>
          <Button className="nes-btn is-error">Burn</Button>
        </Stack>

        <Stack sx={{}}>
          <Card
            onClick={() => setSelected(1)}
            className={selected === 1 ? "pixel-borders pixel-borders--2" : " "}
            sx={{
              padding: "0 !important",
              textAlign: "center",
              margin: "0 !important",
              display: "block !important",
              maxWidth: "400px",
              width: "100%",
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
              <CardContent>
                Life: &nbsp;
                <i className="nes-icon heart"></i>
                <i className="nes-icon heart"></i>
                <i className="nes-icon heart"></i>
              </CardContent>
              <CardContent>Stake: 2 FIL</CardContent>
              <CardContent>Rewards: 1.52 FIL</CardContent>
            </CardContent>
          </Card>
          <Button>Mint</Button>
        </Stack>

        <Stack>
          <Card
            onClick={() => setSelected(2)}
            className={selected === 2 ? "pixel-borders pixel-borders--2" : " "}
            sx={{
              padding: "0 !important",
              textAlign: "center",
              margin: "0 !important",
              display: "block !important",
              maxWidth: "400px",
              width: "100%",
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
              <CardContent>
                Life: &nbsp;
                <i className="nes-icon heart"></i>
                <i className="nes-icon heart"></i>
                <i className="nes-icon heart"></i>
              </CardContent>
              <CardContent>Stake: 2 FIL</CardContent>
              <CardContent>Rewards: 2.52 FIL</CardContent>
            </CardContent>
          </Card>
          <Button>Mint</Button>
        </Stack>
      </Box>

      <CustomConnect />
    </Stack>
  );
}
