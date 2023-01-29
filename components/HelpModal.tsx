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
    <Button onClick={()=> setModalStatus(!modalStatus) }>Open!</Button>

    <Stack sx={{ display: modalStatus ? "block" : "none" }}>

      modalllllllll
      
      </Stack>
    </>
  );
}

export default HelpModal;
