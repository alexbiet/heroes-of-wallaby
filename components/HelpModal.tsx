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
        bottom:  "0",
        margin:  "auto",
        background: "white",
        width: "800px",
        height: "500px",
        padding: "20px",
      }}>
      
      <Icon className="nes-icon close" onClick={()=> setModalStatus(!modalStatus) } sx={{
        float: "right",
      }}></Icon>

    
      <Typography variant="h5">{modalTitle}</Typography>
      <Typography variant="body1">{modalText}</Typography>
      
      </Stack>
    </>
  );
}

export default HelpModal;
