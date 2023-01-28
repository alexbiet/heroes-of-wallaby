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
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <Box
            sx={{
              display: ready ? "flex" : "none",
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
        );
      }}
    </ConnectButton.Custom>
  );
};
