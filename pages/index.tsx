import { CustomConnect } from "@/components/CustomConnect";
import HelpModal from "@/components/HelpModal";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import Image from "next/image";
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

      <Stack
        sx={{
          gap: "40px",
          alignItems: "center",
        }}
      >
        {_isConnected ? (
          <Link href="/heroes">
            <Button sx={{px: "100px !important",}}>Play</Button>
          </Link>
        ) : (
          <Button onClick={openConnectModal}>Connect</Button>
        )}
        <HelpModal buttonText="?" modalTitle="Help" modalText="......" />

      </Stack>
      <CustomConnect />
    </Stack>
  );
}
