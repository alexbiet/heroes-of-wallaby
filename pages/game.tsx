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
import RoundModal from "@/components/RoundModal";
import {Howl, Howler} from 'howler';

export default function Home() {
  const canvasRef = useRef(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [input, setInput] = useState<string>("");
  const provider = useProvider();

  const click = new Howl({
    src: ['/sfx/button_click.flac'],
    volume: 1.5,
  });

  const walk = new Howl({
    src: ['/sfx/footsteps/step_cloth_1.ogg'],
    volume: 1,  
    loop: true,
  });

  const fight_1 = new Howl({
    src: ['/sfx/fight/new_hits_1.wav'],
    volume: 1,
  });

  const fight_2 = new Howl({
    src: ['/sfx/fight/big_punch.wav'],
    volume: 1,
  });

  const fight_3 = new Howl({
    src: ['/sfx/fight/fire_attack.wav'],
    volume: 0.5,
  });

  const pickItem = new Howl({
    src: ['/sfx/pick_item.wav'],
    volume: 1,
  });

  const win = new Howl({
    src: ['/sfx/win.aif'],
    volume: 1,
  });

  const loss = new Howl({
    src: ['/sfx/loss.aif'],
    volume: 1,
  });

  const door = new Howl({
    src: ['/sfx/door_1.wav'],
    volume: 1,
  });

  function playClick() {
    click.play();
  }





  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket");
      setSocket(io("", { query: { name: "John Smith" } }));
    };
    // socketInitializer();

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

    loadSprite("press-play", "/assets/press-play.png", {
      sliceX: 2, 
      anims: {
        idle: {
          from: 0,
          to: 1,
          loop: true,
          pingpong: true,
          speed: 2,
        }
      }});

    loadSprite("dude", "/assets/hero-sprite-1.png", {
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

    loadSprite("game-items", "/assets/game-items.png", {
      sliceX: 5,
      sliceY: 1,
    });

    loadSprite("enemies", "/assets/enemies-sprite.png", {
      sliceX: 3,
      sliceY: 27,
      anims: {
        idle: {
          from: 0,
          to: 0,
        },
        attack: {
          from: 1,
          to: 2,
          loop: true,
          pingpong: true,
          speed: 4,
        },
      }
    });


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
    const pressPlay = add([sprite("press-play"), scale(1)]);
    pressPlay.play("idle");

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
      onMouseDown( () => {
        if(pressPlay) pressPlay.destroy();
      })

      onKeyPress(dir as Key, () => {
        walk.play();
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
        walk.stop();
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
      fight_1.play();
      // fight_2.play();
      // fight_3.play();
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


  const [activeCanvas, setActiveCanvas] = useState(false);

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
          width: "100%",
          marginBottom: "-70px",
        }}
      >
        <Link href="/">
          <Image src="/logo.png" alt="HoW :: The Dungeon of Souls" width={359} height={64} />
        </Link>

        <Link href="/heroes" onClick={ playClick }>
          <Button style={{ float: "right", marginTop: "-60px" }}>MENU</Button>
        </Link>

        {/* TEMP */}
        <Box sx={{ float: "right", marginRight: "0" }}>
          <RoundModal buttonColor="success" buttonText="Win" modalTitle="Round 1 Completed!" modalText="<b>.....</b>" playClick={ playClick } />
          <RoundModal buttonColor="error" buttonText="Loss" modalTitle="Round 1 Failed!" modalText="<b>.....</b>" playClick={ playClick } />
        </Box>

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
              p: "0",
              m: "0",
              pb: "10px",
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
          <canvas 
            ref={canvasRef} 
            style={{ margin: "0", padding: "0" }} 
            />
            
        </Box>
        
      </Box>
      <CustomConnect />
    </Stack>
  );
}
