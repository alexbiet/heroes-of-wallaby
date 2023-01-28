import { CustomConnect } from "@/components/CustomConnect";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";

export default function Landing() {
  const account = useAccount();
  const { isConnected } = useAccount();
  const [_isConnected, _setIsConnected] = useState<boolean>(false);
  const { openConnectModal } = useConnectModal();

  useEffect(() => {
    _setIsConnected(isConnected);
  }, [isConnected]);

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

      <Stack
        sx={{
          gap: "40px",
          alignItems: "center",
        }}
      >
        {_isConnected ? (
          <Link href="/heroes">
            <Button>Play</Button>
          </Link>
        ) : (
          <Button onClick={openConnectModal}>Connect</Button>
        )}
        <Button
          onClick={() => {
            alert("Coming soon! Learn about HoW.");
          }}
        >
          ?
        </Button>
      </Stack>
      <CustomConnect />
    </Stack>
  );
}
