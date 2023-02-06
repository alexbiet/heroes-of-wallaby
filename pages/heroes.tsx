import { CustomConnect } from "@/components/CustomConnect";
import { Box, Card, CardContent, CardMedia, Stack, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Howl, Howler } from "howler";
import { useRouter } from "next/router";
import { CONTRACT_ABI, CONTRACT_ADDRESS, DEPLOYER_PK } from "@/constants/constants";
import { ethers } from "ethers";
import { useAccount, useProvider, useSigner } from "wagmi";

export default function Heroes() {
  const [selected, setSelected] = useState<number>(-1);
  const [ownsHero, setOwnsHero] = useState<boolean>(false);
  const [heroes, setHeroes] = useState<any[]>([]);
  const router = useRouter();
  //get address from wagmi
  const { address } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const gameSigner = new ethers.Wallet(DEPLOYER_PK, provider);
  const gameContractPlayerWithSigner = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer!);
  const gameContractPlayer = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

  const click = new Howl({
    src: ["/sfx/button_click.flac"],
    volume: 1.5,
  });

  useEffect(() => {
    //check if user has a hero
    const checkHero = async () => {
      const balance = await gameContractPlayer.balanceOf(address);
      if (balance > 0) {
        setOwnsHero(true);
      }
    };
    const getAllHeroes = async () => {
      setHeroes(await gameContractPlayerWithSigner.getAllHeroes());
    };

    if (address && gameContractPlayer && gameContractPlayerWithSigner.provider) {
      checkHero();
      if (ownsHero && heroes.length === 0) getAllHeroes();
      console.log(heroes);
    }
  }, [address, gameContractPlayer, gameContractPlayerWithSigner, heroes, heroes.length, ownsHero]);

  function handlePlay(heroNumber: number) {
    setSelected(heroNumber);
    click.play();
  }

  function handleMint(heroNumber: number) {
    console.log("minting" + heroNumber);
    gameContractPlayerWithSigner.depositMint(heroNumber, {
      value: ethers.utils.parseEther("0.1"),
      gasLimit: 1000000000,
    });
  }

  function handleBurn(heroNumber: number) {
    gameContractPlayerWithSigner.reclaimStake(heroNumber);
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
              hidden={!ownsHero}
              href={{
                pathname: "/difficulty",
                query: {
                  h: "1",
                },
              }}
              passHref
              onClick={() => {
                handlePlay(1);
              }}
            >
              <Button sx={{ width: "100%" }}>Pick</Button>
            </Link>
            <Button
              hidden={ownsHero}
              color="success"
              style={{ width: "100%" }}
              onClick={() => handleMint(1)}
            >
              Mint
            </Button>

            <Box
              sx={{ width: "100%", textAlign: "center", marginTop: "-20px" }}
              onClick={() => {
                handleBurn(1);
              }}
            >
              <Button
                hidden={!ownsHero}
                onClick={() => handleBurn(1)}
                color="error"
                sx={{ padding: "10px 20px 10px 20px !important" }}
              >
                Burn
              </Button>
            </Box>
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
            hidden={!ownsHero}
            href={{
              pathname: "/difficulty",
              query: {
                h: "2",
              },
            }}
            passHref
            onClick={() => {
              handlePlay(2);
            }}
          >
            <Button sx={{ width: "100%" }}>Pick</Button>
          </Link>
          <Button
            hidden={ownsHero}
            color="success"
            style={{ width: "100%" }}
            onClick={() => handleMint(2)}
          >
            Mint
          </Button>

          <Box
            sx={{ width: "100%", textAlign: "center" }}
            onClick={() => {
              handleBurn(3);
            }}
          >
            <Button
              hidden={!ownsHero}
              onClick={() => handleBurn(2)}
              color="error"
              sx={{ padding: "10px 20px 10px 20px !important" }}
            >
              Burn
            </Button>
          </Box>
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
            hidden={!ownsHero}
            href={{
              pathname: "/difficulty",
              query: {
                h: "3",
              },
            }}
            passHref
            onClick={() => handlePlay(3)}
          >
            <Button sx={{ width: "100%" }}>Pick</Button>
          </Link>
          <Button
            hidden={ownsHero}
            color="success"
            style={{ width: "100%" }}
            onClick={() => handleMint(3)}
          >
            Mint
          </Button>

          <Box
            sx={{ width: "100%", textAlign: "center" }}
            onClick={() => {
              handleBurn(3);
            }}
          >
            <Button
              hidden={!ownsHero}
              onClick={() => handleBurn(3)}
              color="error"
              sx={{ padding: "10px 20px 10px 20px !important" }}
            >
              Burn
            </Button>
          </Box>
        </Stack>
      </Box>

      <CustomConnect />
    </Stack>
  );
}
