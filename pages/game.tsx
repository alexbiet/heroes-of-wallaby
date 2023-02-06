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
import { Howl, Howler } from "howler";
import { useRouter } from "next/router";
import { CONTRACT_ABI, CONTRACT_ADDRESS, DEPLOYER_PK } from "@/constants/constants";

export default function Home() {
  const canvasRef = useRef(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [input, setInput] = useState<string>("");
  const provider = useProvider();
  const router = useRouter();
  const [selectedHero, setSelectedHero] = useState<string>("");
  const gameSigner = new ethers.Wallet(DEPLOYER_PK, provider);
  const gameContractOwner = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, gameSigner);

  const click = new Howl({
    src: ["/sfx/button_click.flac"],
    volume: 1.5,
  });

  const pickItem = new Howl({
    src: ["/sfx/pick_item.wav"],
    volume: 1,
  });

  const win = new Howl({
    src: ["/sfx/win.aif"],
    volume: 1,
  });

  const loss = new Howl({
    src: ["/sfx/loss.aif"],
    volume: 1,
  });

  const door = new Howl({
    src: ["/sfx/door_1.wav"],
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

    if (router.query.h) {
      // console.log(router.query.h);
      // console.log(router.query.d);
      setSelectedHero("/assets/hero-sprite-" + router.query.h + ".png");
    } else {
      setSelectedHero("/assets/hero-sprite-1.png");
    }

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
        },
      },
    });

    loadSprite("hero", selectedHero, {
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
          speed: 4,
        },
      },
    });

    loadSprite("dungeon-1", "/assets/dungeon-1.png", {});
    loadSprite("dungeon-2", "/assets/dungeon-2.png", {});
    loadSprite("dungeon-3", "/assets/dungeon-3.png", {});

    loadSprite("square", "/assets/square.png");

    loadSprite("door", "/assets/door.png", {
      sliceX: 8,
      sliceY: 5,
    });

    loadSpriteAtlas("/assets/items-atlas.png", {
      key: {
        x: 0,
        y: 0,
        width: 64,
        height: 64,
      },
      coin: {
        x: 64,
        y: 0,
        width: 64,
        height: 64,
      },
      heartFull: {
        x: 128,
        y: 0,
        width: 64,
        height: 64,
      },
      heartEmpty: {
        x: 192,
        y: 0,
        width: 64,
        height: 64,
      },
      trophy: {
        x: 256,
        y: 0,
        width: 64,
        height: 64,
      },
    });

    loadSpriteAtlas("/assets/enemies-atlas-bg.png", {
      goblin: {
        x: 0,
        y: 0,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      wolf: {
        x: 0,
        y: 64,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      skeleton: {
        x: 0,
        y: 128,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
    });

    const walk = new Howl({
      src: ["/sfx/footsteps/step_cloth_1.ogg"],
      volume: 1,
      loop: true,
    });

    const fight_1 = new Howl({
      src: ["/sfx/fight/new_hits_1.wav"],
      volume: 1,
    });

    const fight_2 = new Howl({
      src: ["/sfx/fight/big_punch.wav"],
      volume: 1,
    });
  
    const fight_3 = new Howl({
      src: ["/sfx/fight/fire_attack.wav"],
      volume: 0.5,
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

    scene("game", (dungeonId: number, playerHealth: number) => {
      layers(["bg", "game", "ui"], "obgamej");

      function generateLevel(dungeonId: number) {
        if (dungeonId === 0) {
          add([sprite("dungeon-1"), scale(0.79)]);
        }
        if (dungeonId === 1) {
          add([sprite("dungeon-2"), scale(0.79)]);
        }
        if (dungeonId === 2) {
          add([sprite("dungeon-3"), scale(0.79)]);
        }

        const characters: any = {
          g: {
            sprite: "goblin",
          },
          w: {
            sprite: "wolf",
          },
          s: {
            sprite: "skeleton",
          },
        };

        let dungeons = [
          [
            "====================",
            "=========x==========",
            "=========- =========",
            "==      =- ==     ==",
            "==  p   =- ==     ==",
            "==    = =- ==     ==",
            "==  g   =- ==     ==",
            "====   ==     w  ===",
            "====             ===",
            "====      =      ===",
            "====     ==      ===",
            "==          g     ==",
            "==    s           ==",
            "==           =    ==",
            "==        =  =    ==",
            "==                ==",
            "==      =- =      ==",
            "====================",
            "====================",
            "====================",
          ],
          [
            "====================",
            "====================",
            "====================",
            "=== ==   ===   s ===",
            "=== ==  ==== =  ====",
            "=== p    ===     ===",
            "===    ==      w ===",
            "===    ==      = ===",
            "===    ==        ===",
            "===              ===",
            "===      ==-     ===",
            "===      ==-     ===",
            "=====-    =-     ===",
            "=====- =       = ===",
            "===        =-    ===",
            "====           =====",
            "===            =====",
            "========-   ========",
            "=========x  ========",
            "=========   ========",
          ],
          [
            "====================",
            "=========x =========",
            "=========  =       =",
            "===     =- =   s   =",
            "=== p   =- =       =",
            "===     =- =       =",
            "===     =- =   w   =",
            "=== =   =- =       =",
            "===   - =- =       =",
            "=======       ======",
            "======             =",
            "=   ==             =",
            "=   ==             =",
            "======             =",
            "=     =======      =",
            "=           =  ==  =",
            "=           =  ==  =",
            "=           =      =",
            "=           =      =",
            "====================",
          ],
        ];

        let level = dungeons[dungeonId];

        let levelConfig = {
          width: 40,
          height: 40,
          "=": () => [
            "wall",
            sprite("square", {
              width: 40,
              height: 40,
            }),
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
          any(ch: string) {
            const char = characters[ch];
            if (char) {
              return ["enemy", sprite(char.sprite), solid(), area()];
            }
          },
          p: () => [
            "player",
            sprite("hero"),
            health(playerHealth),
            solid(),
            area({
              width: 40,
              height: 40,
              offset: vec2(40, 40),
            }),
          ],
        };

        const gameLevel = addLevel(level, levelConfig);

        if (dungeonId === 0) {
          const pressPlay = add([sprite("press-play"), scale(1), area(), "pressPlay"]);
          pressPlay.play("idle");

          onClick("pressPlay", (pressPlay) => {
            pressPlay.destroy();
          });
        }

        const player = get("player")[0];

        const emptyHearts = [];
        for (let i = 0; i < 3; i++) {
          emptyHearts.push(add([sprite("heartEmpty"), pos(30 + i * 64, 30), "heartEmpty"]));
        }
        const hearts: any = [];
        for (let i = 0; i < player.hp(); i++) {
          hearts.push(add([sprite("heartFull"), pos(30 + i * 64, 30), "heartFull"]));
        }

        player.onHurt(() => {
          hearts.pop().destroy();
          if (player.hp() === 0) {
            go("gameover");
          }
        });

        for (const dir in dirs) {
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
            if (player.curAnim() === "attack") return;
            player.move(dirs[dir].scale(SPEED));
          });
          onKeyRelease(dir as any, () => {
            walk.stop();
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

        onCollide("player", "door", (p, d) => {
          if (dungeonId === 2) {
            go("win");
          }
          go("game", dungeonId + 1, player.hp());
          player.pos = vec2(200, 100);
        });

        onCollide("player", "enemy", async (p, e) => {
          console.log("collided");

          if(router.query.h) {
            if(router.query.h == "1") {
              fight_1.play();
            } else if (router.query.h == "2") {
              fight_2.play();
            } else {
              fight_3.play();
            }
          }
          
          e.play("attack", {
            onEnd: () => {
              player.hurt(1);
              e.destroy();
            },
          });
          p.play("attack", {
            onEnd: () => {
              p.stop();
            },
          });

          // const bal = await WGoldContract.balanceOf("0x69420f472c8adB8ef633c35062a54b38F32fB0D7");
          // console.log(bal.toString());
        });
      }

      generateLevel(dungeonId);
    });

    go("game", 0, 3);
  }, [provider, router, selectedHero]);

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

        <Link href="/heroes" onClick={playClick}>
          <Button style={{ float: "right", marginTop: "-60px" }}>MENU</Button>
        </Link>

        {/* TEMP */}
        <Box sx={{ float: "right", marginRight: "0" }}>
          <RoundModal
            buttonColor="success"
            buttonText="Win"
            modalTitle="Round 1 Completed!"
            modalText="<b>.....</b>"
            playClick={playClick}
          />
          <RoundModal
            buttonColor="error"
            buttonText="Loss"
            modalTitle="Round 1 Failed!"
            modalText="<b>.....</b>"
            playClick={playClick}
          />
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
          <canvas ref={canvasRef} style={{ margin: "0", padding: "0" }} />
        </Box>
      </Box>
      <CustomConnect />
    </Stack>
  );
}
