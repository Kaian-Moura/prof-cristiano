class Bemvindo extends Phaser.Scene {

    /**
     * Construtor da classe
     * Define a chave única da cena dentro do framework Phaser
     */
    constructor() {
        super({
            key: 'Bemvindo', // Identificador único da cena
        });
    }

    /**
     * Método de pré-carregamento
     * Carrega todos os recursos necessários para a cena antes de ela ser iniciada
     * É executado antes do método create()
     */
    preload() {
        this.load.html("form", "form/form.html");   // Carrega o formulário HTML para entrada do nome
        this.load.image("play", "img/play_bt.png"); // Carrega imagem do botão de jogar
        this.load.image("logo", "img/steven.png");  // Carrega o logotipo do jogo
        this.load.image("helpButton", "img/help_bt.png"); // Carrega o botão de ajuda
    }

    /**
     * Método de criação da cena
     * Configura e adiciona todos os elementos visuais e interativos na tela
     * É chamado uma vez após o preload() ter sido concluído
     */
    create() {
        // Configuração de controles do teclado para interação do usuário
        this.cursors = this.input.keyboard.createCursorKeys(); // Teclas direcionais
        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER); // Tecla Enter
        this.nameFilled = false; // Flag que indica se o usuário já inseriu um nome válido

        // Adiciona o logo do jogo no lado esquerdo da tela (ajustado para layout paisagem)
        this.logo = this.add.image(
            this.game.config.width / 4,     // Posicionado a 1/4 da largura da tela
            this.game.config.height / 2,     // Centralizado verticalmente
            'logo'                          // Usa a imagem carregada com chave 'logo'
        ).setOrigin(0.5).setScale(0.5);     // Define o ponto de origem e escala da imagem

        // Adiciona o título do jogo abaixo do logo
        this.title = this.add.text(
            this.game.config.width / 4,     // Alinhado com o logo
            this.game.config.height / 4,    // Posicionado acima do logo
            "Defensor da terra",            // Texto do título do jogo
            {
                // Estilização do texto do título
                color: "#ff6b8b",           // Cor rosa
                fontSize: "38px",           // Tamanho da fonte
                fontFamily: "Arial",        // Tipo da fonte
                fontStyle: "bold",          // Estilo negrito
                // Adiciona sombra ao texto para melhor legibilidade
                stroke: "#000",             // Contorno preto
                strokeThickness: 2,         // Espessura do contorno
                shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 2, stroke: true, fill: true }
            }
        ).setOrigin(0.5); // Centraliza o ponto de origem do texto

        // Configuração do texto de boas-vindas que será atualizado com o nome do jogador
        var text = { height: 20, padding: 15, content: "Seja bem vindo(a) --" }
        this.message = this.add.text(
            this.game.config.width * 0.6,     // No lado direito da tela
            this.game.config.height / 3,      // Posição vertical
            text.content,                   // Texto inicial
            {
                // Estilização similar ao título
                color: "#ff6b8b",
                fontSize: "32px",
                fontFamily: "Arial",
                fontStyle: "bold italic",
                stroke: "#000",             // Contorno preto
                strokeThickness: 2,         // Espessura do contorno
                shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 2, stroke: true, fill: true }
            }
        ).setOrigin(0.5);

        // Cria um container para agrupar elementos do formulário
        // Isso facilita mostrar/esconder todos eles de uma vez
        this.formContainer = this.add.container(0, 0);
        
        // Configuração do formulário para entrada do nome do jogador
        var inputSize = { width: 270, height: 42, padding: 15 };
        var inputButton = { width: 30, height: 12 };
        
        // Calcula a posição do campo de entrada para centralizá-lo no lado direito
        var inputCoords = {
            xposition: this.game.config.width * 0.6 - inputSize.width / 2,
            yposition: this.game.config.height / 2 - inputSize.height / 2,
        };
        
        // Adiciona o formulário HTML para entrada de texto
        this.inputName = this.add.dom(inputCoords.xposition, inputCoords.yposition)
            .createFromCache('form')  // Usa o arquivo HTML carregado
            .setOrigin(0, 0);         // Define origem no canto superior esquerdo
        this.formContainer.add(this.inputName); // Adiciona ao container para agrupamento

        // Cria um botão de confirmação ao lado do campo de texto
        const nameOkTextButton = this.add.text(
            inputCoords.xposition + inputSize.width + 13, // Posicionado logo após o campo de texto
            inputCoords.yposition + inputButton.height + 2, // Alinhado verticalmente
            ">",                      // Texto do botão (uma seta)
            {
                // Estilização do botão
                backgroundColor: "#8ecbf4",   // Cor de fundo azul
                fontSize: "20px",             // Tamanho da fonte
                fontFamily: "Courier New",    // Tipo da fonte
                padding: { left: 10, right: 10, top: 5, bottom: 5 }, // Preenchimento interno
                borderRadius: 5,              // Bordas arredondadas
                shadow: { offsetX: 1, offsetY: 1, color: '#000', blur: 1, stroke: true, fill: true }
            }
        );
        nameOkTextButton.setInteractive(); // Habilita interatividade no botão
        this.formContainer.add(nameOkTextButton); // Adiciona ao container

        // Configura os eventos para confirmação do nome do jogador
        // Evento 1: Quando a tecla Enter é pressionada
        this.returnKey.on("down", event => {
            this.updateName(this.inputName); // Chama método para atualizar o nome
        });

        // Evento 2: Quando o botão de confirmação é clicado
        nameOkTextButton.on('pointerdown', () => {
            this.updateName(this.inputName); // Chama método para atualizar o nome
        });

        // Cria o botão de início do jogo (inicialmente invisível)
        this.playBt = this.add.image(
            this.game.config.width * 0.6,    // No lado direito da tela
            this.game.config.height * 0.7,   // Parte inferior da área de formulário
            'play'                          // Imagem do botão de jogar
        )
        .setScale(0.15)            // Define o tamanho
        .setOrigin(0.5, 0.5)       // Define origem no centro da imagem
        .setInteractive()          // Habilita interatividade
        .setVisible(false);        // Inicialmente invisível até que um nome seja inserido

        // Configura evento para iniciar o jogo quando o botão "play" é clicado
        this.playBt.on('pointerdown', function () {
            if (this.nameFilled) { // Só inicia se o jogador inseriu um nome
                this.game.highScore = 0; // Inicializa pontuação máxima
                this.scene.start('DefendaTerra', this.game); // Muda para a cena do jogo
            }
        }, this);

        // Adiciona o botão de ajuda ("Como Jogar") no canto superior direito da tela
        const howToPlayButton = this.add.text(
            this.game.config.width - 10,    // Próximo à borda direita
            10,                             // Próximo à borda superior
            "?",                            // Texto do botão (um ponto de interrogação)
            {
                // Estilização do botão
                backgroundColor: "#ff6b8b",   // Cor de fundo rosa
                color: "#ffffff",             // Cor do texto (branco)
                fontSize: "24px",             // Tamanho da fonte
                fontFamily: "Arial",          // Tipo da fonte
                fontStyle: "bold",            // Estilo negrito
                padding: { left: 12, right: 12, top: 8, bottom: 8 }, // Preenchimento interno
                borderRadius: 20,             // Bordas bem arredondadas (formato circular)
                shadow: { offsetX: 1, offsetY: 1, color: '#000', blur: 1, stroke: true, fill: true }
            }
        ).setOrigin(1, 0)          // Alinha ao canto superior direito
         .setInteractive();        // Habilita interatividade
        
        // Configura evento para mostrar instruções quando o botão de ajuda é clicado
        howToPlayButton.on('pointerdown', () => {
            this.showHowToPlay(); // Chama método para exibir instruções
        });
        
        // Cria o pop-up de instruções (inicialmente oculto)
        this.createHowToPlayPopUp();
    }

    /**
     * Método para atualizar o nome do jogador
     * @param {DOM} inputNameElement - O elemento DOM com o campo de texto
     * Executado quando o jogador confirma o nome digitado
     */
    updateName(inputNameElement) {
        // Recupera o valor digitado no campo de texto
        let name = inputNameElement.getChildByName("name");
        
        // Verifica se foi inserido um nome
        if (name.value != "") {
            // Atualiza o texto de boas-vindas com o nome do jogador
            this.message.setText("Olá, " + name.value);
            
            // Mostra o botão de iniciar o jogo
            this.playBt.setVisible(true);
            
            // Marca que o nome foi preenchido corretamente
            this.nameFilled = true;
            
            // Armazena o nome do jogador no objeto global do jogo
            this.game.name = name.value;
        }
    }
    
    /**
     * Método para criar o pop-up com as instruções do jogo
     * Configura a estrutura visual e os elementos interativos do pop-up
     */
    createHowToPlayPopUp() {
        // Cria um fundo semi-transparente que cobre toda a tela
        // Isso bloqueia interações com elementos por baixo do pop-up
        this.overlay = this.add.rectangle(
            this.game.config.width / 2,     // Centro horizontal da tela
            this.game.config.height / 2,    // Centro vertical da tela
            this.game.config.width,         // Largura total da tela
            this.game.config.height,        // Altura total da tela
            0x000000,                       // Cor preta
            0.7                             // 70% de opacidade
        );
        this.overlay.setVisible(false);     // Inicialmente invisível
        this.overlay.setInteractive();      // Bloqueia interações com elementos por baixo
        
        // Cria um container para agrupar todos os elementos do pop-up
        this.howToPlayPopUp = this.add.container(
            this.game.config.width / 2,     // Centro horizontal da tela
            this.game.config.height / 2     // Centro vertical da tela
        );
        this.howToPlayPopUp.setVisible(false); // Inicialmente invisível
        
        // Define a ordem de profundidade (z-index) para garantir que o pop-up
        // apareça sobre outros elementos da interface
        this.overlay.setDepth(100);          // Fundo abaixo do conteúdo
        this.howToPlayPopUp.setDepth(101);   // Conteúdo acima do fundo
        
        // Cria o painel de fundo do pop-up (mais largo para modo paisagem)
        const popUpBg = this.add.rectangle(
            0,                              // Centralizado no container (x)
            0,                              // Centralizado no container (y)
            this.game.config.width - 200,   // Largura um pouco menor que a tela
            250,                            // Altura reduzida para formato landscape
            0x000000,                       // Cor preta
            0.8                             // 80% de opacidade
        );
        // Adiciona uma borda rosa ao painel
        popUpBg.setStrokeStyle(2, 0xff6b8b);
        
        // Adiciona o título do pop-up
        const popUpTitle = this.add.text(
            0,                   // Centralizado horizontalmente no container
            -100,                // Posicionado na parte superior do pop-up
            "Como Jogar",        // Texto do título
            {
                // Estilização do título
                color: "#ff6b8b",  // Cor rosa
                fontSize: "28px",  // Tamanho da fonte
                fontFamily: "Arial", // Tipo da fonte
                fontStyle: "bold"  // Estilo negrito
            }
        ).setOrigin(0.5);  // Centraliza o texto
        
        // Lista com as instruções do jogo
        const instructions = [
            "• Use as setas para mover o personagem",
            "• Não deixe as pedras tocarem o chão",
            "• Colete pedras para ganhar pontos",
            "• Power-ups aparecem a cada 25 pontos",
            "• Você tem 2 vidas"
        ];
        
        // Array para armazenar os objetos de texto das instruções
        const instructionTexts = [];
        
        // Adiciona cada instrução como um texto individual
        // Isso permite posicionar cada linha separadamente
        instructions.forEach((instruction, index) => {
            instructionTexts.push(
                this.add.text(
                    -popUpBg.width / 2 + 20,  // Alinhado à esquerda com margem
                    -65 + (index * 30),        // Cada linha posicionada abaixo da anterior (ajustado para menor altura)
                    instruction,               // Texto da instrução
                    {
                        // Estilização do texto
                        color: "#ffffff",      // Cor branca
                        fontSize: "18px",      // Tamanho da fonte
                        fontFamily: "Arial"    // Tipo da fonte
                    }
                ).setOrigin(0, 0)  // Alinha ao canto superior esquerdo
            );
        });
        
        // Cria o botão para fechar o pop-up
        const closeButton = this.add.text(
            0,                   // Centralizado horizontalmente
            85,                 // Posicionado na parte inferior do pop-up (ajustado para altura menor)
            "Fechar",            // Texto do botão
            {
                // Estilização do botão
                backgroundColor: "#ff6b8b",  // Cor de fundo rosa
                color: "#ffffff",            // Cor do texto branca
                fontSize: "20px",            // Tamanho da fonte
                fontFamily: "Arial",         // Tipo da fonte
                fontStyle: "bold",           // Estilo negrito
                padding: { left: 20, right: 20, top: 10, bottom: 10 } // Preenchimento interno
            }
        ).setOrigin(0.5)         // Centraliza o texto no botão
         .setInteractive();      // Habilita interatividade
        
        // Configura evento para fechar o pop-up quando o botão é clicado
        closeButton.on('pointerdown', () => {
            this.hideHowToPlay();  // Chama método para ocultar o pop-up
        });
        
        // Adiciona todos os elementos criados ao container do pop-up
        this.howToPlayPopUp.add([popUpBg, popUpTitle, ...instructionTexts, closeButton]);
    }
    
    /**
     * Método para mostrar o pop-up de instruções
     * Chamado quando o jogador clica no botão de ajuda
     */
    showHowToPlay() {
        // Oculta o formulário de entrada de nome para evitar sobreposições
        this.formContainer.setVisible(false);
        
        // Mostra o fundo semi-transparente e o conteúdo do pop-up
        this.overlay.setVisible(true);
        this.howToPlayPopUp.setVisible(true);
    }
    
    /**
     * Método para esconder o pop-up de instruções
     * Chamado quando o jogador clica no botão "Fechar" do pop-up
     */
    hideHowToPlay() {
        // Restaura a visibilidade do formulário de entrada
        this.formContainer.setVisible(true);
        
        // Oculta o fundo semi-transparente e o conteúdo do pop-up
        this.overlay.setVisible(false);
        this.howToPlayPopUp.setVisible(false);
    }
}