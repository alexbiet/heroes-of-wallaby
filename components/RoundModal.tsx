import { Box, Button, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Link from "next/link";

type modalProps = {
  buttonText : string;
  modalTitle : string;
  modalText : string;
  buttonColor : string;
  playClick : Function;
}

function RoundModal(props: modalProps) {

  const {
    buttonText,
    modalTitle,
    modalText,
    buttonColor,
    playClick,
  } = props;

  const [modalStatus, setModalStatus] = useState(false);

  return (
    <>
    <Button onClick={()=> { setModalStatus(!modalStatus); playClick() } } sx={{padding: "10px 20px 10px 20px !important", float: "right", marginBottom: "-50px"}} color={buttonColor == "success" ? "success" : "error"}>{buttonText}</Button>

    <Stack className="pixel-borders--2" sx={{ 
        display: modalStatus ? "block" : "none",
        position: "absolute",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        margin: "auto",
        width: "800px",
        height: "400px",
        padding: "40px 40px",
        background: "linear-gradient(180deg, #75C4FF 0%, #75C4FF 50%, #B9E1FF 50.1%, #B9E1FF 100%)",
      }}>

      <Typography variant="h5" color={buttonColor == "success" ? "#000" : "#D20404" }>{modalTitle}</Typography>
      {/* <Typography variant="body1">{modalText}</Typography> */}
      <br />
      <small>
      <Typography variant="body1">Round 1 / 10</Typography>
      <br />
      <Typography variant="body1">Dungeon Mode: Easy</Typography>
      <br />

      {(buttonColor=="success") ? (
          <Typography variant="body1">Rewards: <Box component="div" sx={{ display: 'inline', color: "#00FF19", textShadow: "2px 2px 0px rgba(0,0,0,0.5)"}}>+1.2 FIL</Box><br /></Typography>
        ):(
          <Typography variant="body1">Loss: <Box component="div" sx={{ display: 'inline', color: "#D20404", textShadow: "2px 2px 0px rgba(0,0,0,0.3)"}}>-0.2 FIL</Box><br /></Typography>
        )}
      </small>
        
        <br />
        <br />

        <Link href="/heroes" passHref>
        <Button 
          onClick={()=> { setModalStatus(!modalStatus); playClick() } } 
          sx={{padding: "10px 20px 10px 20px !important"}}>Go To Menu</Button>
        </Link>

        {(buttonColor=="success") ? (
          <Button 
            onClick={()=> { setModalStatus(!modalStatus); playClick() }  } 
            color="secondary"
            sx={{}}>Next Round</Button>
        ):(
          <Button 
            onClick={()=> { setModalStatus(!modalStatus); playClick() } } 
            color="secondary"
            sx={{}}>Try Again</Button>
        )}

      </Stack>
    </>
  );
}

export default RoundModal;
