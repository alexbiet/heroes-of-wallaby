import { Box, Button, Typography } from "@mui/material";
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
          <>
            <Box
              sx={{
                display: connected ? "flex" : "none",
                color: "white",
                justifyContent: "space-between",
              }}
            >
              <Typography>TVL: 0.00 FIL</Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "20px",
                }}
              >
                <Typography>
                  {`${account?.displayBalance} - ${account?.address.substring(
                    0,
                    6
                  )}...${account?.address.substring(38)} | `}
                </Typography>
                <Button
                  onClick={connected ? openAccountModal : openConnectModal}
                  variant="text"
                  color="inherit"
                >
                  <Typography>Account</Typography>
                </Button>
              </Box>
            </Box>
            <Button>
              <Typography>Connect</Typography>
            </Button>
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};
