import { Box, Button, Stack, Typography } from "@mui/material";
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

    <Stack sx={{ display: modalStatus ? "block" : "none" }}>

    
      <Typography variant="h1">{modalTitle}</Typography>
      <Typography variant="body1">{modalText}</Typography>
      
      </Stack>
    </>
  );
}

export default HelpModal;
