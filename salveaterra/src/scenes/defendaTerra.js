// Definindo a cena principal do jogo usando a biblioteca Phaser
class DefendaTerra extends Phaser.Scene {

    // Construtor da cena
    constructor() {
        super({
            key: 'DefendaTerra',
            physics: {
                arcade: {
                    gravity: { y: 0 }
                }
            }
        });
    }

    // Inicialização de variáveis e configurações da cena
    init() {
        // 1) FUNDO
        this.bg = {
            x: 0,
            y: 0,
            obj: null
        };

        // 2) PEDRAS
        this.stones = {
            speed: 200,
            interval: 1000,
            group: null,
            size: 0.1 // Reduzindo o tamanho da pedra
        };

        // 3) JOGADOR
        this.player = {
            width: 30,
            height: 30,
            obj: null,
            lives: 2, // Adicionando vidas ao jogador
            speed: 300,
            powerUpSpeed: 500,
            powerUpActive: false,
            powerUpTimer: null
        };

        // 4) CONTROLES DA RODADA
        this.gameControls = {
            over: false,
            score: 0,
            lastPowerUpScore: 0, // Controle do último score que gerou um power-up
            restartBt: null,
            collectedStones: [] // Lista que armazena informações sobre pedras coletadas
        };

        // 5) POWER-UPS
        this.powerUps = {
            interval: 5000,
            duration: 12000, // Alterado de 20000 para 12000 (12 segundos)
            group: null,
            size: 0.3
        };
    }

    // Pré-carregamento de recursos
    preload() {
        this.load.image('bg', 'img/fundo.jpg');
        this.load.image('player', 'img/steven.png');
        this.load.image('playerPowerUp', 'img/steven2.png');
        this.load.image('stone', 'img/stone.png');
        this.load.image('powerUp', 'img/powerup.png');
        this.load.image('gameOver', 'img/gameover.png');
        this.load.image('restart', 'img/restart_bt.png');
    }

    // Criação de elementos e configurações iniciais da cena
    create() {
        // 1) Adiciona a imagem de fundo
        this.bg.obj = this.add.image(this.bg.x, this.bg.y, 'bg').setOrigin(0, 0);

        // 2) Adiciona jogador e suas propriedades físicas
        this.player.obj = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height - 50, 'player').setScale(0.3);
        this.player.obj.setCollideWorldBounds(true);
        this.player.obj.body.allowGravity = false; // Desativar a gravidade para o jogador
        this.player.obj.body.setSize(this.player.obj.width, this.player.obj.height, true); // Ajustar a área de colisão
    
        // 3) Adiciona grupo de pedras
        this.stones.group = this.physics.add.group({
            defaultKey: 'stone',
            maxSize: 10
        });

        // 4) Adiciona grupo de power-ups
        this.powerUps.group = this.physics.add.group({
            defaultKey: 'powerUp',
            maxSize: 1
        });

        // 5) Adiciona evento de colisão entre jogador e pedras
        this.physics.add.overlap(this.player.obj, this.stones.group, this.catchStone, null, this);

        // 6) Adiciona evento de colisão entre jogador e power-ups
        this.physics.add.overlap(this.player.obj, this.powerUps.group, this.catchPowerUp, null, this);

        // 7) Adiciona os cursores que movimentarão o jogador
        this.cursors = this.input.keyboard.createCursorKeys();

        // 8) Mostra o placar, vidas e contagem de power-up
        this.scoreText = this.add.text(15, 15, this.game.name + ': 0', { fontSize: '20px', fill: '#ff6b8b', stroke: '#000', strokeThickness: 2 });
        this.livesText = this.add.text(15, 45, 'Vidas: ' + this.player.lives, { fontSize: '20px', fill: '#ff6b8b', stroke: '#000', strokeThickness: 2 });
        this.powerUpText = this.add.text(15, 75, '', { fontSize: '20px', fill: '#ff6b8b', stroke: '#000', strokeThickness: 2 });
        this.highScoreText = this.add.text(0, 15, 'high score: ' + this.game.highScore, { fontSize: '20px', fill: '#ff6b8b', stroke: '#000', strokeThickness: 2, align: 'right' });
        this.highScoreText.x = this.game.config.width - this.highScoreText.width - 15;
        this.gameControls.restartBt = this.add.image(this.game.config.width / 2 - 50, this.game.config.height / 4 * 3,
            'restart').setScale(0.3).setOrigin(0, 0).setInteractive().setVisible(false);

        // 9) Adiciona evento de clique no botão de "reiniciar"
        this.gameControls.restartBt.on('pointerdown', function () {
            if (this.gameControls.over) {
                this.gameControls.over = false;
                this.gameControls.score = 0;
                this.player.lives = 2; // Resetando as vidas do jogador
                this.stones.speed = 200; // Resetando a velocidade das pedras
                this.scene.restart();
            }
        }, this);

        // 10) Cria pedras em intervalos regulares
        this.stoneTimer = this.time.addEvent({
            delay: this.stones.interval,
            callback: this.dropStone,
            callbackScope: this,
            loop: true
        });
    }

    // Atualização lógica do jogo a cada frame
    update() {
        // Controla se o jogo acabou e paraliza a cena (interrompendo a execução de "update")
        if (this.gameControls.over) {
            return;
        }

        // Inclui controle de movimentação do jogador
        if (this.cursors.left.isDown) {
            this.player.obj.setVelocityX(-this.player.speed);
        } else if (this.cursors.right.isDown) {
            this.player.obj.setVelocityX(this.player.speed);
        } else {
            this.player.obj.setVelocityX(0);
        }

        // Verifica se alguma pedra tocou o chão
        this.stones.group.children.iterate(stone => {
            if (stone && stone.y > this.game.config.height) {
                this.missStone();
                stone.destroy();
            }
        });

        // Atualiza o texto do power-up se estiver ativo
        if (this.player.powerUpActive) {
            const remainingTime = Math.ceil((this.player.powerUpTimer.delay - this.player.powerUpTimer.getElapsed()) / 1000);
            this.powerUpText.setText('Power-Up: ' + remainingTime + 's');
        } else {
            this.powerUpText.setText('');
        }

        // Verifica se é hora de criar um novo power-up
        // Verificamos se a pontuação é um múltiplo de 25
        if (this.gameControls.score % 25 === 0 && this.gameControls.score !== this.gameControls.lastPowerUpScore) {
            this.gameControls.lastPowerUpScore = this.gameControls.score;
            this.dropPowerUp();
        }
    }

    // Função chamada quando o jogador pega uma pedra
    catchStone(player, stone) {
        if (stone.active) {
            stone.destroy();
            this.gameControls.score++;
            this.scoreText.setText(this.game.name + ': ' + this.gameControls.score);

            // Registra informação sobre a pedra coletada na lista
            this.gameControls.collectedStones.push({
                x: stone.x,
                y: stone.y,
                time: new Date().getTime()
            });

            // Aumenta a velocidade das pedras a cada 10 pontos
            if (this.gameControls.score % 10 === 0) {
                this.stones.speed += 50;
            }
        }
    }

    // Função chamada quando o jogador perde uma vida
    missStone() {
        this.player.lives--;
        this.livesText.setText('Vidas: ' + this.player.lives);
        if (this.player.lives <= 0) {
            this.gameOver();
        }
    }

    // Função para criar uma nova pedra
    dropStone() {
        // Reduzindo a área de queda para 84% da largura (8% a 92%)
        const x = Phaser.Math.Between(this.game.config.width * 0.08, this.game.config.width * 0.92);
        const stone = this.stones.group.get(x, 0);
        if (stone) {
            stone.setActive(true);
            stone.setVisible(true);
            stone.setScale(this.stones.size); // Aplicando o tamanho reduzido
            stone.body.setVelocityY(this.stones.speed);
        }
    }

    // Função para criar um novo power-up
    dropPowerUp() {
        // Reduzindo a área de queda para 84% da largura (8% a 92%)
        const x = Phaser.Math.Between(this.game.config.width * 0.08, this.game.config.width * 0.92);
        const powerUp = this.powerUps.group.get(x, 0);
        if (powerUp) {
            powerUp.setActive(true);
            powerUp.setVisible(true);
            powerUp.setScale(this.powerUps.size); // Aplicando o tamanho reduzido
            powerUp.body.setVelocityY(this.stones.speed);
        }
    }

    // Função chamada quando o jogador pega um power-up
    catchPowerUp(player, powerUp) {
        if (powerUp.active) {
            powerUp.destroy();
            this.activatePowerUp();
        }
    }

    // Função para ativar o power-up
    activatePowerUp() {
        this.player.powerUpActive = true;
        this.player.speed = this.player.powerUpSpeed;
        this.player.obj.setTexture('playerPowerUp');
        this.player.obj.body.setSize(this.player.obj.width, this.player.obj.height, true); // Ajustar a área de colisão

        // Desativa o power-up após a duração
        this.player.powerUpTimer = this.time.addEvent({
            delay: this.powerUps.duration,
            callback: this.deactivatePowerUp,
            callbackScope: this
        });
    }

    // Função para desativar o power-up
    deactivatePowerUp() {
        this.player.powerUpActive = false;
        this.player.speed = 300;
        this.player.obj.setTexture('player');
        this.player.obj.body.setSize(this.player.obj.width, this.player.obj.height, true); // Ajustar a área de colisão
    }

    // Função chamada quando o jogo acaba
    gameOver() {
        this.physics.pause();
        this.stoneTimer.remove(false); // Parar a geração de pedras
        this.gameControls.over = true;
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'gameOver').setScale(0.1);
        this.gameControls.restartBt.visible = true;
        if (this.gameControls.score > this.game.highScore) {
            this.game.highScore = this.gameControls.score;
            this.highScoreText.setText('high score: ' + this.game.highScore);
        }

        // Exemplo de estrutura de repetição for: Analisa as pedras coletadas
        let totalTimeCollecting = 0;
        for (let i = 0; i < this.gameControls.collectedStones.length; i++) {
            const stone = this.gameControls.collectedStones[i];
            // Aqui poderíamos fazer alguma análise com os dados coletados
            if (i > 0) {
                const prevStone = this.gameControls.collectedStones[i-1];
                totalTimeCollecting += (stone.time - prevStone.time);
            }
        }
        // Este cálculo poderia ser usado para estatísticas do jogo
        console.log("Tempo médio entre capturas: " + 
                   (this.gameControls.collectedStones.length > 1 ? 
                    totalTimeCollecting / (this.gameControls.collectedStones.length - 1) : 0) + "ms");
    }
}