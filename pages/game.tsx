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
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [heroId, setHeroId] = useState<string>("");
  const [difficultyId, setDifficultyId] = useState<string>("");
  const [failModal, setFailModal] = useState<boolean>(false);
  const [winModal, setWinModal] = useState<boolean>(false);
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
    src: ["/sfx/win.wav"],
    volume: 1,
  });

  const loss = new Howl({
    src: ["/sfx/loss.wav"],
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
      setHeroId(router.query.h.toString());
      setSelectedHero("/assets/hero-sprite-" + router.query.h + ".png");
    } else {
      setSelectedHero("/assets/hero-sprite-1.png");
    }

    if (router.query.d) {
      setDifficultyId(router.query.d.toString());
      if (router.query.d.toString() == "1") {
        setSelectedDifficulty("Easy");
      } else if (router.query.d.toString() == "2") {
        setSelectedDifficulty("Moderate");
      } else {
        setSelectedDifficulty("DeGen Mode");
      }
    }

    if (router.query.w) {
      if (router.query.w.toString() == "0") {
        setWinModal(false);
        setFailModal(true);
      } else if (router.query.w.toString() == "1") {
        setWinModal(true);
        setFailModal(false);
      } else {
        setWinModal(false);
        setFailModal(true);
      }

      console.log("Win: " + winModal);
      console.log("Fail: " + failModal);
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
      zombie: {
        x: 0,
        y: 192,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      blueDevil: {
        x: 0,
        y: 256,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      redDevil: {
        x: 0,
        y: 320,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      greenDevil: {
        x: 0,
        y: 384,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      blueBoar: {
        x: 0,
        y: 448,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      redBoar: {
        x: 0,
        y: 512,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      pumpkinKing: {
        x: 0,
        y: 576,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      worm: {
        x: 0,
        y: 640,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      eyeball: {
        x: 0,
        y: 704,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      ghost: {
        x: 0,
        y: 768,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      snake: {
        x: 0,
        y: 832,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      bat: {
        x: 0,
        y: 896,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      flower: {
        x: 0,
        y: 960,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      spider1: {
        x: 0,
        y: 1024,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      spider2: {
        x: 0,
        y: 1088,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      spider3: {
        x: 0,
        y: 1152,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      spider4: {
        x: 0,
        y: 1216,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      spider5: {
        x: 0,
        y: 1280,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      spider6: {
        x: 0,
        y: 1344,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      spider7: {
        x: 0,
        y: 1408,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      spider8: {
        x: 0,
        y: 1472,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      spider9: {
        x: 0,
        y: 1536,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      spider10: {
        x: 0,
        y: 1600,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      spider11: {
        x: 0,
        y: 1664,
        width: 192,
        height: 64,
        sliceX: 3,
        anims: {
          attack: { from: 0, to: 2, speed: 4 },
        },
      },
      bigBoss: {
        x: 0,
        y: 1728,
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

    scene("gameover", () => {
      setFailModal(true);
    });

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

        const characters: any = [
          {
            sprite: "goblin",
            hitChance: 0.1,
          },
          {
            sprite: "wolf",
            hitChance: 0.1,
          },
          {
            sprite: "skeleton",
            hitChance: 0.1,
          },
          {
            sprite: "zombie",
            hitChance: 0.1,
          },
          {
            sprite: "blueDevil",
            hitChance: 0.1,
          },
          {
            sprite: "redDevil",
            hitChance: 0.1,
          },
          {
            sprite: "greenDevil",
            hitChance: 0.1,
          },
          {
            sprite: "blueBoar",
            hitChance: 0.1,
          },
          {
            sprite: "redBoar",
            hitChance: 0.1,
          },
          {
            sprite: "pumpkinKing",
            hitChance: 0.1,
          },
          {
            sprite: "worm",
            hitChance: 0.1,
          },
          {
            sprite: "eyeball",
            hitChance: 0.1,
          },
          {
            sprite: "ghost",
            hitChance: 0.1,
          },
          {
            sprite: "snake",
            hitChance: 0.1,
          },
          {
            sprite: "bat",
            hitChance: 0.1,
          },
          {
            sprite: "flower",
            hitChance: 0.1,
          },
          {
            sprite: "spider1",
            hitChance: 0.1,
          },
          {
            sprite: "spider2",
            hitChance: 0.1,
          },
          {
            sprite: "spider3",
            hitChance: 0.1,
          },
          {
            sprite: "spider4",
            hitChance: 0.1,
          },
          {
            sprite: "spider5",
            hitChance: 0.1,
          },
          {
            sprite: "spider6",
            hitChance: 0.1,
          },
          {
            sprite: "spider7",
            hitChance: 0.1,
          },
          {
            sprite: "spider8",
            hitChance: 0.1,
          },
          {
            sprite: "spider9",
            hitChance: 0.1,
          },
          {
            sprite: "spider10",
            hitChance: 0.1,
          },
          {
            sprite: "spider11",
            hitChance: 0.1,
          },
          {
            sprite: "bigBoss",
            hitChance: 0.1,
          },
        ];

        let dungeons = [
          [
            "====================",
            "=========x==========",
            "=========- =========",
            "==      =- ==     ==",
            "==  p   =- ==     ==",
            "==    = =- ==     ==",
            "==  e   =- ==     ==",
            "====   ==     e  ===",
            "====             ===",
            "====      =      ===",
            "====     ==      ===",
            "==          e     ==",
            "==    e           ==",
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
            "=== ==   ===   e ===",
            "=== ==  ==== =  ====",
            "=== p    ===     ===",
            "===    ==      e ===",
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
            "===     =- =   e   =",
            "=== p   =- =       =",
            "===     =- =       =",
            "===     =- =   e   =",
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
          e: (e: string) => [
            "enemy",
            solid(),
            sprite(characters[Math.floor(Math.random() * (characters.length - 1))].sprite),
            area(),
          ],
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
            // go("gameover");
            loss.play();

            setFailModal(true);

            // setTimeout(()=> {
            //   router.push({pathname: '/game', query: { h: heroId, d: difficultyId, w: 0}});
            // }, 800);
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
          if (dungeonId < 2) {
            go("game", dungeonId + 1, player.hp());
            player.pos = vec2(200, 100);
            door.play();
          } else {
            win.play();
            setWinModal(true);
          }
        });

        onCollide("player", "enemy", async (p, e) => {
          console.log("collided");

          if(router.query.h) {
            if(router.query.h == "1") {
              fight_1.play();
            } else if (router.query.h == "2") {
              fight_2.play();
            } else if (router.query.h == "3") {
              fight_3.play();
            } else {
              fight_1.play();
            }
          }

          e.play("attack", {
            onEnd: () => {
              player.hurt(1);
              e.destroy();

              add([
                sprite("heartFull"),
                scale(0.8),
                solid(),
                pos(e.pos.x, e.pos.y),
                area({
                  width: 40,
                  height: 40,
                }),
                "life",
              ]);
              //% chance to drop heart
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

        onCollide("player", "life", (p, l) => {
          l.destroy();
          pickItem.play();

          if (player.hp() < 3) {
            player.heal(1);
          }

          hearts.push(
            add([sprite("heartFull"), pos(30 + (player.hp() - 1) * 64, 30), "heartFull"])
          );
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

        <Stack
          className="pixel-borders--2"
          sx={{
            display: winModal || failModal ? "block" : "none",
            position: "absolute",
            left: "0",
            right: "0",
            top: "0",
            bottom: "0",
            margin: "auto",
            width: "800px",
            height: "400px",
            padding: "40px 40px",
            background:
              "linear-gradient(180deg, #75C4FF 0%, #75C4FF 50%, #B9E1FF 50.1%, #B9E1FF 100%)",
          }}
        >
          {winModal ? (
            <Typography variant="h5" color="#000">
              {" "}
              Dungeon Completed!{" "}
            </Typography>
          ) : (
            <Typography variant="h5" color="#D20404">
              {" "}
              Dungeon Failed!{" "}
            </Typography>
          )}

          <br />
          <small>
            <Typography variant="body1">Dungeon Mode: {selectedDifficulty}</Typography>
            <br />

            {winModal ? (
              <Typography variant="body1">
                Rewards:{" "}
                <Box
                  component="div"
                  sx={{
                    display: "inline",
                    color: "#00FF19",
                    textShadow: "2px 2px 0px rgba(0,0,0,0.5)",
                  }}
                >
                  +0.2 tFIL
                </Box>
                <br />
              </Typography>
            ) : (
              <Typography variant="body1">
                Loss:{" "}
                <Box
                  component="div"
                  sx={{
                    display: "inline",
                    color: "#D20404",
                    textShadow: "2px 2px 0px rgba(0,0,0,0.3)",
                  }}
                >
                  -0.2 tFIL
                </Box>
                <br />
              </Typography>
            )}
          </small>

          <br />
          <br />

          <Link href="/heroes" passHref>
            <Button
              onClick={() => {
                playClick();
              }}
              sx={{ padding: "10px 20px 10px 20px !important" }}
            >
              Go To Menu
            </Button>
          </Link>

          {winModal ? (
            <Button
              onClick={() => {
                playClick();
                router.push({pathname: '/game', query: { h: heroId, d: difficultyId}})
              }}
              color="secondary"
              sx={{}}
            >
              Next Round
            </Button>
          ) : (
            <Button
              onClick={() => {
                playClick();
                router.push({pathname: '/game', query: { h: heroId, d: difficultyId}})
              }}
              color="secondary"
              sx={{}}
            >
              Try Again
            </Button>
          )}
        </Stack>
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
