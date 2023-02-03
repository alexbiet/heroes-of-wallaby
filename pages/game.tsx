import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import { CustomConnect } from "@/components/CustomConnect";
import kaboom, { GameObj, Key, SpriteAnimPlayOpt, Vec2 } from "kaboom";
import { Box, Button, Typography, Stack } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { ethers } from "ethers";
import { useProvider } from "wagmi";

export default function Home() {
  const canvasRef = useRef(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [input, setInput] = useState<string>("");
  const provider = useProvider();

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket");
      setSocket(io("", { query: { name: "John Smith" } }));
    };
    socketInitializer();

    const k = kaboom({
      canvas: canvasRef.current || undefined,
      width: 800,
      height: 800,
      scale: 0.8,
    });

    const WGoldContract = new ethers.Contract(
      "0xf1854ECD035A82aB14c8B5334a8cA2C3eD766BB6",
      [
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      provider
    );

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
          speed: 4,
        },
        up: {
          from: 1,
          to: 2,
          loop: true,
          pingpong: true,
          speed: 4,
        },
        down: {
          from: 1,
          to: 2,
          loop: true,
          pingpong: true,
          speed: 4,
        },
        attack: {
          from: 4,
          to: 2,
          speed: 5,
          loop: true,
        },
      },
    });

    loadSprite("dungeon-1", "/assets/dungeon-1.png", {});

    loadSprite("clotharmor", "/assets/clotharmor.png", {
      sliceX: 5,
      sliceY: 9,
    });

    loadSprite("square", "/assets/square.png");

    loadSprite("door", "/assets/door.png", {
      sliceX: 8,
      sliceY: 5,
    });

    loadSprite("portal", "/assets/portal.png");

    const dirs: {
      [key: string]: Vec2;
    } = {
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
    };
    const SPEED = 300;

    const dungeon = add([sprite("dungeon-1"), scale(0.79)]);

    const levels = [
      addLevel(
        [
          "====================",
          "=========x==========",
          "=========- =========",
          "==      =- ==     ==",
          "==      =- ==     ==",
          "==    = =- ==     ==",
          "==      =- ==     ==",
          "====   ==        ===",
          "====             ===",
          "====      =      ===",
          "====     ==      ===",
          "==                ==",
          "==                ==",
          "==           =    ==",
          "==        =  =    ==",
          "==                ==",
          "==      =- =      ==",
          "====================",
          "====================",
          "====================",
        ],

        {
          width: 40,
          height: 40,
          "=": () => [
            "wall",
            solid(),

            area({
              width: 40,
              height: 40,
            }),
          ],
          "-": () => [
            "halfwall",
            solid(),
            area({
              width: 30,
              height: 40,
            }),
          ],
          x: () => [
            "door",
            solid(),
            sprite("door", {
              width: 80,
              height: 80,
              frame: 35,
            }),
            area({
              width: 80,
              height: 40,
            }),
          ],
        }
      ),
      addLevel(
        [
          "====================",
          "=                  =",
          "=                  =",
          "=                  =",
          "=                  =",
          "=                  =",
          "=                  =",
          "=                  =",
          "=                  =",
          "=                  =",
          "=                  =",
          "=                  =",
          "=                  =",
          "=                  =",
          "=                  =",
          "=                  =",
          "=                  =",
          "=                  =",
          "=                  =",
          "====================",
        ],

        {
          width: 40,
          height: 40,
          "=": () => [
            "wall",
            solid(),

            area({
              width: 40,
              height: 40,
            }),
          ],
          "-": () => [
            "halfwall",
            solid(),
            area({
              width: 30,
              height: 40,
            }),
          ],
          x: () => [
            "door",
            solid(),
            sprite("door", {
              width: 80,
              height: 80,
              frame: 35,
            }),
            area({
              width: 80,
              height: 40,
            }),
          ],
        }
      ),
    ];

    levels[0];

    const player = add([
      sprite("dude"),
      health(3),
      pos(200, 100),
      solid(),
      area({
        width: 40,
        height: 40,
        offset: vec2(40, 40),
      }),
      "player",
    ]);

    const enemy = add([sprite("clotharmor"), solid(), area(), pos(200, 200), "enemy"]);

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

    onCollide("player", "enemy", async (p, e) => {
      console.log("collided");
      p.play("attack");
      e.destroy();
      const bal = await WGoldContract.balanceOf("0x69420f472c8adB8ef633c35062a54b38F32fB0D7");
      console.log(bal.toString());
    });
  }, [provider]);

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
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        // maxWidth: "1100px",
        height: "100vh",
        width: "100%",
        mx: "auto",
        mt: "0",
        backgroundImage: "url(/assets/welcome-screen.png)",
        backgroundSize: "60%",
        backgroundPosition: "center bottom 20px",
        backgroundColor: "#100400",
      }}
    >
      <Stack
        sx={{
          textAlign: "center",
          paddingTop: "30px",
        }}
      >
        <Link href="/">
          <Image src="/logo.png" alt="HoW :: The Dungeon of Souls" width={359} height={64} />
        </Link>
      </Stack>

      <Box sx={{}}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              color: "#777",
              py: "5px",
            }}
          >
            <small>
              <i>
                Press <b>&quot;F&quot;</b> to toggle fullscreen.
              </i>
            </small>
          </Typography>
        </Box>

        <Box
          sx={{
            border: "5px solid brown",
            display: "block",
            backgroundColor: "#111111",
          }}
        >
          <canvas ref={canvasRef} style={{ margin: "0", padding: "0" }} />
        </Box>
        <Link href="/heroes">
          <Button style={{ position: "absolute", top: "20px", right: "10px" }}>MENU</Button>
        </Link>
      </Box>
      <CustomConnect />
    </Stack>
  );
}
