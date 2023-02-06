import { Box, Button, Stack, Typography } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const CustomConnect = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const connected = mounted && account && chain;

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "95%",
              color: "white",
              paddingBottom: "15px"
            }}
          >
            <Typography>TVL: 105.02 tFIL</Typography>

            <Box
              sx={{
                display: "flex",
                gap: "20px",
              }}
            >
              <Typography>
                {connected &&
                  `${account?.displayBalance} - ${account?.address.substring(
                    0,
                    6
                  )}...${account?.address.substring(38)} |`}
              </Typography>

              <Typography
                onClick={connected ? openAccountModal : openConnectModal}
                sx={{
                  cursor: "pointer",
                }}
              >
                {connected ? "Account" : "Connect"}
              </Typography>
            </Box>
          </Box>
        );
      }}
    </ConnectButton.Custom>
  );
};
