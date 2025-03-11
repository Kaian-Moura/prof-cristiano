// (POO) neste código:
// Esse jogo utiliza conceitos fundamentais de POO através das classes que representam diferentes cenas.
// Cada cena herda da classe Phaser.Scene, demonstrando herança.
// Encapsulamento é aplicado mantendo estados e métodos específicos dentro de cada classe.
// Polimorfismo é visto na implementação dos métodos preload(), create() e update() em cada cena.

// Alterações realizadas:
// - Mudança da GameScene2 para apresentar múltiplas portas, onde apenas uma leva à vitória e as outras para gameover
// - Implementei sistema para evitar sobreposição entre objetos (portas e chaves)
// - Reduzi as áreas de colisão para melhorar o jogo
// - Adicionei sistema de feedback ao jogador através de textos
// - Comentários explicativos detalhados do código


class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    preload() {
        this.load.image('startButton', 'assets/start.png');
        this.load.image('backgroundMenu', 'assets/background_menu.png');
    }

    create() {
        this.add.image(400, 300, 'backgroundMenu');
        this.add.text(250, 100, "Jogo do Labirinto", { fontSize: "48px", fill: "#fff" });
        let startButton = this.add.image(400, 400, 'startButton').setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
        this.score = 0;
        this.hasKey = false;
    }

    preload() {
        this.load.image('player', 'assets/player.png');
        this.load.image('key', 'assets/key.png');
        this.load.image('enemy', 'assets/enemy.png');
        this.load.image('door', 'assets/door.png');
        this.load.tilemapTiledJSON('map', 'assets/map.json');
        this.load.image('tiles', 'assets/tileset.png');
        this.load.image('backgroundGame', 'assets/background_game.png');
    }

    create() {
        this.add.image(400, 300, 'backgroundGame');
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("tileset", "tiles");
        map.createLayer("Ground", tileset, 0, 0);
        
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);
        
        this.spawnKey();
        this.door = this.physics.add.sprite(500, 200, 'door');
        this.physics.add.overlap(this.player, this.door, this.enterDoor, null, this);
        
        this.enemy = this.physics.add.sprite(400, 200, 'enemy');
        this.enemy.setVelocity(100, 100);
        this.enemy.setBounce(1, 1);
        this.enemy.setCollideWorldBounds(true);

        this.scoreText = this.add.text(16, 16, 'Placar: 0', { fontSize: '32px', fill: '#fff' });

        this.physics.add.overlap(this.player, this.keyItem, this.collectKey, null, this);
        this.physics.add.overlap(this.player, this.enemy, () => {
            this.scene.start('GameOverScene');
        });

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
        }
    }

    spawnKey() {
        if (this.keyItem) {
            this.keyItem.destroy();
        }
        let x = Phaser.Math.Between(50, 750);
        let y = Phaser.Math.Between(50, 550);
        this.keyItem = this.physics.add.sprite(x, y, 'key');
        this.physics.add.overlap(this.player, this.keyItem, this.collectKey, null, this);
        this.hasKey = false;
    }

    collectKey(player, key) {
        this.score += 10;
        this.scoreText.setText('Placar: ' + this.score);
        key.destroy();
        this.hasKey = true;
    }

    enterDoor(player, door) {
        if (this.hasKey) {
            this.scene.start('GameScene2');
        }
    }
}

//----------------------------------------------------------------------------//

class GameScene2 extends Phaser.Scene {
    constructor() {
        super("GameScene2");
        // Inicializando variáveis para a pontuação, chave e quantidade de portas
        this.score = 0;
        this.hasKey = false;
        this.doorCount = 5; // Número de portas para gerar
        this.minDistanceBetweenDoors = 100; // Distância mínima entre as portas
    }

    preload() {
        // Carregando os assets que vamos usar nesta fase
        this.load.image('player2', 'assets/player.png');
        this.load.image('key2', 'assets/key.png');
        this.load.image('enemy2', 'assets/enemy.png');
        this.load.image('door2', 'assets/door.png');
        this.load.tilemapTiledJSON('map2', 'assets/map.json');
        this.load.image('tiles2', 'assets/tileset.png');
        this.load.image('backgroundGame2', 'assets/background_game2.png');
    }

    create() {
        // Adicionando o fundo da fase
        this.add.image(400, 300, 'backgroundGame2');
        
        // Configurando o mapa da fase usando Tiled
        const map = this.make.tilemap({ key: "map2" });
        const tileset = map.addTilesetImage("tileset", "tiles2");
        map.createLayer("Ground", tileset, 0, 0);
        
        // Adicionando texto de instruções para o jogador
        this.add.text(100, 100, "Fase 2 - Ache a porta correta", { fontSize: "32px", fill: "#fff" });
        
        // Criando o personagem do jogador
        this.player2 = this.physics.add.sprite(100, 100, 'player2');
        this.player2.setCollideWorldBounds(true); // Impede que o jogador saia da tela
        this.player2.setBounce(0.2); // Adiciona um pequeno efeito de quicar
        // Reduzindo a área de colisão do player2 - 75% do tamanho original
        this.player2.body.setSize(this.player2.width * 0.75, this.player2.height * 0.75, true);
        
        // Inicializando o array de portas e criando portas aleatórias
        this.doors = [];
        this.createRandomDoors();
        
        // Gerando a chave em posição aleatória DEPOIS de criar as portas
        // para verificar a posição em relação às portas
        this.spawnKey2();
        
        // Criando o inimigo que se move pela tela
        this.enemy2 = this.physics.add.sprite(400, 200, 'enemy2');
        this.enemy2.setVelocity(100, 100); // Velocidade inicial do inimigo
        this.enemy2.setBounce(1, 1); // Faz o inimigo quicar nas bordas
        this.enemy2.setCollideWorldBounds(true); // Mantém o inimigo dentro da tela
        
        // Adicionando textos de informação na tela
        this.scoreText = this.add.text(16, 16, 'Placar: 0', { fontSize: '32px', fill: '#fff' });
        this.statusText = this.add.text(16, 60, 'Procure a chave e a porta certa!', { fontSize: '20px', fill: '#fff' });
        
        // Configurando colisões entre objetos
        this.physics.add.overlap(this.player2, this.keyItem, this.collectKey2, null, this);
        this.physics.add.overlap(this.player2, this.enemy2, () => {
            this.scene.start('GameOverScene');
        });
        
        // Configurando os controles do teclado para movimento
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // Controle de movimento do jogador com as setas do teclado
        this.player2.setVelocity(0); // Reseta a velocidade a cada frame
        
        // Movimento horizontal (esquerda/direita)
        if (this.cursors.left.isDown) {
            this.player2.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player2.setVelocityX(160);
        }
        
        // Movimento vertical (cima/baixo)
        if (this.cursors.up.isDown) {
            this.player2.setVelocityY(-160);
        } else if (this.cursors.down.isDown) {
            this.player2.setVelocityY(160);
        }
    }

    spawnKey2() {
        // Remover a chave anterior se existir
        if (this.keyItem) {
            this.keyItem.destroy();
        }
        
        // Verificar se temos portas para evitar sobreposição
        let doorPositions = this.doors ? this.doors.map(door => ({x: door.x, y: door.y})) : [];
        
        let x, y;
        let validPosition = false;
        let attempts = 0;
        const maxAttempts = 50;
        
        // Tentar encontrar uma posição válida para a chave (longe das portas)
        while (!validPosition && attempts < maxAttempts) {
            // Gerar posição aleatória para a chave
            x = Phaser.Math.Between(50, 750);
            y = Phaser.Math.Between(50, 550);
            
            // Verificar se a chave está longe o suficiente das portas
            validPosition = true;
            for (let pos of doorPositions) {
                let distance = Phaser.Math.Distance.Between(x, y, pos.x, pos.y);
                if (distance < this.minDistanceBetweenDoors) {
                    validPosition = false;
                    break;
                }
            }
            
            attempts++;
        }
        
        // Se não encontrou posição ideal, avisar no console
        if (!validPosition) {
            console.log(`Não foi possível encontrar posição ideal para a chave após ${maxAttempts} tentativas.`);
        }
        
        // Criar o sprite da chave e configurar a colisão
        this.keyItem = this.physics.add.sprite(x, y, 'key2');
        // Reduzindo a área de colisão da chave - 50% do tamanho original
        this.keyItem.body.setSize(this.keyItem.width * 0.5, this.keyItem.height * 0.5, true);
        this.physics.add.overlap(this.player2, this.keyItem, this.collectKey2, null, this);
        this.hasKey = false; // Jogador começa sem a chave
    }

    collectKey2(player, key) {
        // Quando o jogador coleta a chave:
        this.score += 10; // Aumenta a pontuação
        this.scoreText.setText('Placar: ' + this.score); // Atualiza o texto da pontuação
        key.destroy(); // Remove a chave do jogo
        this.hasKey = true; // Marca que o jogador possui a chave
        this.statusText.setText('Ache a porta correta!'); // Atualiza as instruções
    }

    createRandomDoors() {
        // Limpar portas existentes se houver
        if (this.doors.length > 0) {
            this.doors.forEach(door => door.destroy());
            this.doors = [];
        }

        // Escolher aleatoriamente qual será a porta vencedora
        this.winningDoorIndex = Phaser.Math.Between(0, this.doorCount - 1);
        
        // Lista para armazenar as posições das portas já criadas
        let doorPositions = [];
        
        // Criar as portas com posições aleatórias
        for (let i = 0; i < this.doorCount; i++) {
            let x, y;
            let validPosition = false;
            let attempts = 0;
            const maxAttempts = 50; // Limite de tentativas para evitar loops infinitos
            
            // Tentar encontrar uma posição válida (sem sobreposição)
            while (!validPosition && attempts < maxAttempts) {
                // Gerar coordenadas aleatórias
                x = Phaser.Math.Between(150, 650);
                y = Phaser.Math.Between(150, 450);
                
                // Verificar se está longe o suficiente das outras portas
                validPosition = true;
                for (let pos of doorPositions) {
                    let distance = Phaser.Math.Distance.Between(x, y, pos.x, pos.y);
                    if (distance < this.minDistanceBetweenDoors) {
                        validPosition = false;
                        break;
                    }
                }
                
                attempts++;
            }
            
            // Se não encontrar posição após muitas tentativas, usar última posição mesmo
            if (!validPosition) {
                console.log(`Não foi possível encontrar posição ideal para porta ${i+1} após ${maxAttempts} tentativas.`);
            }
            
            // Armazenar a posição desta porta
            doorPositions.push({x, y});
            
            // Criar a porta no jogo
            let door = this.physics.add.sprite(x, y, 'door2');
            // Reduzindo a área de colisão da porta - 60% do tamanho original
            door.body.setSize(door.width * 0.6, door.height * 0.6, true);
            
            // Adicionar número à porta para identificação
            this.add.text(x - 5, y - 35, `${i+1}`, { fontSize: '20px', fill: '#fff' });
            
            // Configurar detecção de quando o jogador toca esta porta
            this.physics.add.overlap(this.player2, door, () => {
                this.checkDoor(i);
            }, null, this);
            
            // Adicionar esta porta ao array de portas
            this.doors.push(door);
        }
        
        // Para depuração: mostrar qual é a porta vencedora
        console.log(`Porta vencedora: ${this.winningDoorIndex + 1}`);
    }
    
    checkDoor(doorIndex) {
        // Verificar se o jogador tem a chave antes de poder usar uma porta
        if (!this.hasKey) {
            this.statusText.setText('Você precisa da chave primeiro!');
            return;
        }
        
        // Verificar se a porta selecionada é a correta
        if (doorIndex === this.winningDoorIndex) {
            // Se for a porta correta, vai para a tela de vitória
            this.scene.start('WinScene');
        } else {
            // Se for uma porta errada, vai para a tela de game over
            this.scene.start('GameOverScene');
        }
    }
}

class GameOverScene extends Phaser.Scene {
    constructor() {                      //quando o jogador perde é redirecionado para essa tela
        super("GameOverScene");
    }

    preload() {
        this.load.image('backgroundGameOver', 'assets/background_gameover.png');
    }

    create() {
        this.add.image(400, 300, 'backgroundGameOver');
        this.add.text(300, 100, "Game Over", { fontSize: "48px", fill: "#f00" });
        this.input.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}

class WinScene extends Phaser.Scene {
    constructor() {
        super("WinScene");
    }

    preload() {
        this.load.image('backgroundWin', 'assets/background_win.png');
    }

    create() {
        this.add.image(400, 300, 'backgroundWin');
        this.add.text(300, 100, "Você Ganhou!", { fontSize: "48px", fill: "#0f0" });
        this.input.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: { 
        default: 'arcade', 
        arcade: { 
            gravity: { y: 0 }
        } 
    },
    scene: [MenuScene, GameScene, GameScene2, GameOverScene, WinScene]
};

const game = new Phaser.Game(config);