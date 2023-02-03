import { Box, Button, Stack, Typography, Icon } from "@mui/material";
import { useState, useEffect } from "react";

type modalProps = {
  buttonText : string;
  modalTitle : string;
  modalText : string;
}

function HelpModal(props: modalProps) {

  const {
    buttonText,
    modalTitle,
    modalText,
  } = props;

  const [modalStatus, setModalStatus] = useState(false);

  return (
    <>
    <Button onClick={()=> setModalStatus(!modalStatus) }>{buttonText}</Button>

    <Stack className="pixel-borders--2" sx={{ 
        display: modalStatus ? "block" : "none",
        position: "absolute",
        left:  "0",
        right: "0",
        top: "0",
        bottom: "0",
        margin: "auto",
        width: "800px",
        height: "500px",
        padding: "20px 40px",
        overflowY: "scroll",
        background: "linear-gradient(180deg, #75C4FF 0%, #75C4FF 50%, #B9E1FF 50.1%, #B9E1FF 100%)",
      }}>
      
      <Icon className="nes-icon close" onClick={()=> setModalStatus(!modalStatus) } sx={{
        float: "right",
      }}></Icon>

      <Typography variant="h5">{modalTitle}</Typography>
      {/* <Typography variant="body1">{modalText}</Typography> */}
      <br />
      <small>
      <Typography variant="body1"><b>1. 👽 Create Character</b> - Mint your NFT hero by staking 10 FIL. Mint cost is 10%.</Typography>
      <br />
      <Typography variant="body1"><b>2. 🏛️ Enter Dungeons</b> - fight enemies for 10 rounds, win to earn rewards and increase your stake.</Typography>
      <br />
      <Typography variant="body1"><b>3. 🎱 Pick Difficulty</b> - easy for no risk and small rewards, medium for small risk and medium rewards and DeGen mode for larger risks and generous rewards.</Typography>
      <br />
      <Typography variant="body1"><b>4. 🗑️ Collect</b> - lifes and keys by killing enemies. More lifes will increase your chance of completing the dungeon. Keys can open secret doors with more rewards. </Typography>
      <br />
      <Typography variant="body1"><b>5. 🌟 Earn Rewards</b> - Complete dungeons at higher difficulty to increase your prestiege level, take moderate risks and earn rewards to increase your stake.</Typography>
      <br />
      <Typography variant="body1"><b>6. 🔥 Burn NFT</b> -  Burn your character to collect your stake, earned rewards and a trophy NFT (non-playable) with your game stats. You can trade this NFT on the market.</Typography>
      </small>
      </Stack>
    </>
  );
}

export default HelpModal;
