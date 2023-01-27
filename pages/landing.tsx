import { Box, Button } from "@mui/material";
import Link from "next/link";

export default function Landing() {
  return (
    <Box>
      Landing page!
      <Button>
        <Link href="/">Game</Link>
      </Button>
    </Box>
  );
}
