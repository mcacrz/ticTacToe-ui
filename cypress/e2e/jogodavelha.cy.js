describe('Jogo da Velha', () => {
  const symbolO = "O";
  const symbolX = "X";

  beforeEach(() => {
    // Visitar a página do jogo
    cy.visit('/');
  });

  it('Deve iniciar o jogo corretamente', () => {
    // Verificar se o botão de início está habilitado
    cy.get('button[data-test="startButton"]').should('not.be.disabled');
    cy.get('select[data-test="p1Symbol"]').select(symbolO);

    // Iniciar o jogo
    cy.get('button[data-test="startButton"]').click();



    // Verificar se o botão de início está desabilitado após iniciar o jogo
    cy.get('button[data-test="startButton"]').should('be.disabled');
  });

  it('Deve permitir que os jogadores façam movimentos', () => {
    // Iniciar o jogo
    cy.get('select[data-test="p2Symbol"]').select(symbolO);
    cy.get('button[data-test="startButton"]').click();

    // Fazer um movimento no tabuleiro
    cy.get('div[data-test="p1"]').click();

    // Verificar se o movimento foi registrado
    cy.get('div[data-test="p1"]').should('contain', symbolX); // Supondo que o símbolo do jogador 1 seja 'X'

    // Fazer outro movimento no tabuleiro
    cy.get('#p2').click();

    // Verificar se o movimento foi registrado
    cy.get('#p2').should('contain', symbolO); // Supondo que o símbolo do jogador 2 seja 'O'
  });
  
  it('Deve exibir a mensagem correta quando o jogo termina em empate', () => {
    // Iniciar o jogo
    cy.get('select[data-test="p2Symbol"]').select(symbolO);
    cy.get('button[data-test="startButton"]').click();

    // Simular movimentos que resultam em empate
    cy.get('#p1').click();
    cy.get('#p2').click();
    cy.get('#p3').click();
    cy.get('#p5').click();
    cy.get('#p4').click();
    cy.get('#p6').click();
    cy.get('#p8').click();
    cy.get('#p7').click();
    cy.get('#p9').click();

    // Verificar se a mensagem de empate é exibida
    cy.get('.messages').should('contain', 'O jogo empatou');

    // Verificar se o botão de início está habilitado após o jogo terminar
    cy.get('button[data-test="startButton"]').should('not.be.disabled');
  });
  
  it('Deve alternar a vez dos jogadores corretamente', () => {
    // Iniciar o jogo
    cy.get('select[data-test="p2Symbol"]').select(symbolO);
    cy.get('button[data-test="startButton"]').click();

    // Fazer um movimento no tabuleiro
    cy.get('#p1').click();

    // Verificar se a mensagem indica a vez do jogador 2
    cy.get('.messages').should('contain', 'Jogada do P2');

    // Fazer outro movimento no tabuleiro
    cy.get('#p2').click();

    // Verificar se a mensagem indica a vez do jogador 1
    cy.get('.messages').should('contain', 'Jogada do P1');
  });

  it('finish game with Horizontal Top', () => {
    // Iniciar o jogo
    cy.get('select[data-test="p2Symbol"]').select(symbolO);
    cy.get('button[data-test="startButton"]').click();

    cy.get('#p1').click();
    cy.get('#p4').click();
    cy.get('#p2').click();
    cy.get('#p5').click();
    cy.get('#p3').click();

    cy.get('#p1').should('have.class', 'highlight')
    cy.get('#p2').should('have.class', 'highlight')
    cy.get('#p3').should('have.class', 'highlight')
  })

  it('finish game with Horizontal Middle', () => {
    // Iniciar o jogo
    cy.get('select[data-test="p2Symbol"]').select(symbolO);
    cy.get('button[data-test="startButton"]').click();

    cy.get('#p4').click();
    cy.get('#p1').click();
    cy.get('#p5').click();
    cy.get('#p2').click();
    cy.get('#p6').click();

    cy.get('#p4').should('have.class', 'highlight')
    cy.get('#p5').should('have.class', 'highlight')
    cy.get('#p6').should('have.class', 'highlight')
  })

  it('finish game with Horizontal Bottom', () => {
    // Iniciar o jogo
    cy.get('select[data-test="p2Symbol"]').select(symbolO);
    cy.get('button[data-test="startButton"]').click();

    cy.get('#p7').click();
    cy.get('#p1').click();
    cy.get('#p8').click();
    cy.get('#p2').click();
    cy.get('#p9').click();

    cy.get('#p7').should('have.class', 'highlight')
    cy.get('#p8').should('have.class', 'highlight')
    cy.get('#p9').should('have.class', 'highlight')
  })

  it('finish game with Vertical Left', () => {
    // Iniciar o jogo
    cy.get('select[data-test="p2Symbol"]').select(symbolO);
    cy.get('button[data-test="startButton"]').click();

    cy.get('#p1').click();
    cy.get('#p2').click();
    cy.get('#p4').click();
    cy.get('#p5').click();
    cy.get('#p7').click();

    cy.get('#p1').should('have.class', 'highlight')
    cy.get('#p4').should('have.class', 'highlight')
    cy.get('#p7').should('have.class', 'highlight')
  })

  it('finish game with Vertical Middle', () => {
    // Iniciar o jogo
    cy.get('select[data-test="p2Symbol"]').select(symbolO);
    cy.get('button[data-test="startButton"]').click();

    cy.get('#p2').click();
    cy.get('#p1').click();
    cy.get('#p5').click();
    cy.get('#p4').click();
    cy.get('#p8').click();

    cy.get('#p2').should('have.class', 'highlight')
    cy.get('#p5').should('have.class', 'highlight')
    cy.get('#p8').should('have.class', 'highlight')
  })

  it('finish game with Vertical Right', () => {
    // Iniciar o jogo
    cy.get('select[data-test="p2Symbol"]').select(symbolO);
    cy.get('button[data-test="startButton"]').click();

    cy.get('#p3').click();
    cy.get('#p1').click();
    cy.get('#p6').click();
    cy.get('#p4').click();
    cy.get('#p9').click();

    cy.get('#p3').should('have.class', 'highlight')
    cy.get('#p6').should('have.class', 'highlight')
    cy.get('#p9').should('have.class', 'highlight')
  })

  it('finish game with Diagonal Left Right', () => {
    // Iniciar o jogo
    cy.get('select[data-test="p2Symbol"]').select(symbolO);
    cy.get('button[data-test="startButton"]').click();

    cy.get('#p1').click();
    cy.get('#p3').click();
    cy.get('#p5').click();
    cy.get('#p6').click();
    cy.get('#p9').click();

    cy.get('#p1').should('have.class', 'highlight')
    cy.get('#p5').should('have.class', 'highlight')
    cy.get('#p9').should('have.class', 'highlight')
  })

  it('finish game with Diagonal Right Left', () => {
    // Iniciar o jogo
    cy.get('select[data-test="p2Symbol"]').select(symbolO);
    cy.get('button[data-test="startButton"]').click();

    cy.get('#p3').click();
    cy.get('#p1').click();
    cy.get('#p5').click();
    cy.get('#p2').click();
    cy.get('#p7').click();

    cy.get('#p3').should('have.class', 'highlight')
    cy.get('#p5').should('have.class', 'highlight')
    cy.get('#p7').should('have.class', 'highlight')
  })
});