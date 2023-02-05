import { CustomConnect } from "@/components/CustomConnect";
import HelpModal from "@/components/HelpModal";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { Howl, Howler } from "howler";

export default function Landing() {
  const account = useAccount();
  const { isConnected } = useAccount();
  const [_isConnected, _setIsConnected] = useState<boolean>(false);
  const [soundHover, setSoundHover] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const { openConnectModal } = useConnectModal();

  const click = new Howl({
    src: ["/sfx/button_click.flac"],
    volume: 1.5,
  });
  click.play();

  const soundtrack = new Howl({
    src: ["/sfx/menu_music.mp3"],
    volume: 0.2,
    onplay: () => {
      setPlaying(true);
    },
    onstop: () => {
      setPlaying(false);
    },
  });

  function playClick() {
    click.play();
  }

  function toggleSoundtrack() {
    console.log(playing);
    if (playing) {
      // bug: stop not working...
      soundtrack.stop();
      soundtrack.unload();
    } else {
      soundtrack.play();
    }
  }

  useEffect(() => {
    _setIsConnected(isConnected);
  }, [isConnected]);

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

      <Stack
        sx={{
          gap: "40px",
          alignItems: "center",
        }}
      >
        {_isConnected ? (
          <Link href="/heroes" passHref>
            <Button className="pixel-borders--2" sx={{ px: "100px !important" }} onClick={playClick}>
              Play
            </Button>
          </Link>
        ) : (
          <Button onClick={openConnectModal}>Connect</Button>
        )}
        <HelpModal buttonText="?" modalTitle="Help" modalText="..." playClick={playClick} />

        <Button
          onClick={toggleSoundtrack}
          onMouseEnter={() => setSoundHover(true)}
          onMouseLeave={() => setSoundHover(false)}
        >
          {soundHover ? (
            <Image src="/assets/sound-hover.png" width="21" height="24" alt="Sound"></Image>
          ) : (
            <Image src="/assets/sound.png" width="21" height="24" alt="Sound"></Image>
          )}
        </Button>
      </Stack>
      <CustomConnect />
    </Stack>
  );
}
