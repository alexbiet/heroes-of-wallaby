import { useEffect } from "react";
import "phaser";

export default function Index() {
  useEffect(() => {
    loadGame();
  }, []);

  const loadGame = async () => {
    if (typeof window !== "object") {
      return;
    }

    var config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: "#4eb3e7",
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 300 },
          debug: false,
        },
      },

      parent: "game",

      scene: {
        preload: preload,
        create: create,
        update: update,
        level2: {
          create: level2Create,
        }
      },
    };

    var game = new Phaser.Game(config);

    let platforms: any;
    let player: any;
    let cursors: any;
    let stars: any;
    let score = 0;
    let scoreText: any;
    let bombs: any;
    let door: any;

    function preload(this: any) {
      this.load.image("sky", "assets/sky.png");
      this.load.image("ground", "assets/platform.png");
      this.load.image("star", "assets/star.png");
      this.load.image("bomb", "assets/bomb.png");
      this.load.spritesheet("dude", "assets/dude.png", {
        frameWidth: 32,
        frameHeight: 48,

      });
    }

    function create(this: any) {
      cursors = this.input.keyboard.createCursorKeys();

      this.add.image(400, 300, "sky");
      scoreText = this.add.text(16, 16, "score: 0", { fontSize: "32px", fill: "#000" });
      platforms = this.physics.add.staticGroup();

      platforms.create(400, 568, "ground").setScale(2).refreshBody();

      platforms.create(600, 400, "ground");
      platforms.create(50, 250, "ground");
      platforms.create(750, 220, "ground");

      player = this.physics.add.sprite(100, 450, "dude");
      player.setBounce(0.2);
      player.setCollideWorldBounds(true);

      this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "turn",
        frames: [{ key: "dude", frame: 4 }],
        frameRate: 20,
      });
      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
      });

      this.physics.add.collider(player, platforms);

      stars = this.physics.add.group({
        key: "star",
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 },
      });

      stars.children.iterate(function (child: any) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      });

      this.physics.add.collider(stars, platforms);
      this.physics.add.overlap(player, stars, collectStar, null, this);

      bombs = this.physics.add.group();

      this.physics.add.collider(bombs, platforms);

      this.physics.add.collider(player, bombs, hitBomb, null, this);

      door = this.physics.add.staticImage(200, 500, "dude");
      this.physics.add.collider(player, door, () => {
        this.scene.start("level2")
      });

    }

    function hitBomb(this: any, player: any, bomb: any) {
      this.physics.pause();

      player.setTint(0xff0000);

      player.anims.play("turn");

      this.gameOver = true;
    }

    function collectStar(player: any, star: any) {
      star.disableBody(true, true);

      score += 10;
      scoreText.setText("Score: " + score);

      if (stars.countActive(true) === 0) {
        stars.children.iterate(function (child: any) {
          child.enableBody(true, child.x, 0, true, true);
        });

        var x = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, "bomb");
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      }
    }
    
    function level2Create(this: any) {
      this.add.image(400, 300, "sky");
      scoreText = this.add.text(16, 16, "score: 0", { fontSize: "32px", fill: "#000" });

      player = this.physics.add.sprite(100, 450, "dude");
      player.setBounce(0.2);
      player.setCollideWorldBounds(true);

      
    }

    function update(this: any) {
      if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play("left", true);
      } else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play("right", true);
      } else {
        player.setVelocityX(0);

        player.anims.play("turn");
      }

      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
      }

      this.physics.collide(player, door,()=>{
        this.scene.start("level2");
      });
    }
  };

  return null;
}
