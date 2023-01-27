import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import kaboom, { GameObj, Key, SpriteAnimPlayOpt, Vec2 } from "kaboom";
import { Box, Typography } from "@mui/material";

export default function Home() {
  const canvasRef = useRef(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket");
      setSocket(io("", { query: { name: "John Smith" } }));
    };
    socketInitializer();

    const k = kaboom({
      canvas: canvasRef.current || undefined,
      width: 400,
      height: 400,
      scale: 2,
    });

    // toggle fullscreen mode on "f"
    onKeyPress("f", () => {
      fullscreen(!isFullscreen());
    });

    loadSprite("dude", "/assets/dude.png", {
      sliceX: 5,
      anims: {
        right: {
          from: 1,
          to: 2,
          loop: true,
          pingpong: true,
          speed: 5,
        },
        left: {
          from: 1,
          to: 2,
          loop: true,
          pingpong: true,
          speed: 5,
        },
        up: {
          from: 1,
          to: 2,
          loop: true,
          pingpong: true,
          speed: 5,
        },
        down: {
          from: 1,
          to: 2,
          loop: true,
          pingpong: true,
          speed: 5,
        },
        attack: {
          from: 3,
          to: 4,
          loop: true,
          pingpong: true,
          speed: 10,
        },
      },
    });

    loadSprite("cloth", "/sprites/cloth.png", {
      sliceX: 5,
      sliceY: 9,
      anims: {
        right: {
          from: 0,
          to: 8,
          loop: true,
          speed: 5,
        },
        up: {
          from: 11,
          to: 21,
          loop: true,
          speed: 5,
        },
        down: {
          from: 22,
          to: 32,
          loop: true,
          speed: 5,
        },
      },
    });

    loadSprite("map", "/tiles/7.png", {
      sliceX: 5,
    });

    loadSprite("dungeon-1", "/assets/dungeon-1.png", {
      sliceX: 1,
    });


    const dirs: {
      [key: string]: Vec2;
    } = {
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
    };
    const SPEED = 120;
    const player = add([sprite("dude", { frame: 0 }), z(99), health(3), pos(200, 100), area(), "player"]);
    const map = add([sprite("map", { frame: 0 }), z(1), pos(100, 100), area(), "bush"]);
    const dungeon = add([sprite("dungeon-1", { frame: 0 }), z(1), pos(0, 0), width()/4, height()/4, area(), "bg"]);
    // const enemy = add([sprite("clotharmor"), pos(200, 200), "enemy"]);



    document.addEventListener("keypress", function(event) {
      // console.log(event.keyCode)
      if (event.keyCode == 97) {
        player.play("attack");
      }
    });

    for (const dir in dirs) {
      onKeyPress(dir as Key, () => {
        if (dir === "left") {
          player.play("right");
          player.flipX(false);
        } else {
          player.play(dir);
          player.flipX(true);
        }
      });
      onKeyDown(dir as any, () => {
        player.move(dirs[dir].scale(SPEED));
      });
      onKeyRelease(dir as any, () => {
        //if no other keys are pressed, stop the animation
        player.stop();
        dir === "left"
          ? (player.frame = 1)
          : dir === "right"
          ? (player.frame = 1)
          : dir === "up"
          ? (player.frame = 1)
          : (player.frame = 1);
      });
    }
  }, []);

  ////////////////////////////////
  ///////// SOCKET LOGIC /////////
  ////////////////////////////////
  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("connected");
      });
      socket.on("update-input", (input: string) => {
        setInput(input);
      });
    }
  }, [socket]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    socket?.emit("input-change", e.target.value);
  };

  return (
    <>
      <Head>
        <title>Heroes of Wallaby</title>
        <meta name="description" content="The all-mighty battle of Filecoinia!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#111",
          verticalAlign: "middle"
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            width: "100%",
            pr: "100px",
            pt: "10px",
          }}
        >
          <Typography sx={{
            color: "#777", paddingRight: "30px", paddingTop: "5px"}}
            ><i>Press <b>&quot;F&quot;</b> to toggle fullscreen.</i></Typography>
          <ConnectButton />
        </Box>
        

        <Box
          sx={{
            border: "5px solid brown",
          }}
        >
          <canvas ref={canvasRef} />
        </Box>
      </Box>
    </>
  );
}
