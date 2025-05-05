//Fila


// Classe Fila (FIFO)
class Fila {
    constructor() {
      this.itens = [];
    }
  
    // Adiciona um item ao final da fila
    enfileirar(item) {
      this.itens.push(item);
      console.log(`📥 '${item}' entrou na fila.`);
    }
  
    // Remove o item do início da fila
    desenfileirar() {
      if (this.estaVazia()) {
        console.log('⚠️ A fila está vazia. Nenhum item para remover.');
        return null;
      }
      const removido = this.itens.shift();
      console.log(`🚪 '${removido}' saiu da fila.`);
      return removido;
    }
  
    // Mostra o primeiro da fila
    frente() {
      return this.itens[0];
    }
  
    // Verifica se a fila está vazia
    estaVazia() {
      return this.itens.length === 0;
    }

    // Limpa a fila
    limpar() {
      this.itens = [];
      console.log('🧹 Fila esvaziada.');
    }
  
    // Imprime a fila atual
    imprimir() {
      console.log('🚶‍♂️ Fila atual:', this.itens.join(' -> ') || 'vazia');
    }
  }
  
  // DEMONSTRAÇÃO

  const fila = new Fila();
  fila.enfileirar('Paulo');
  fila.enfileirar('Eduardo');
  fila.enfileirar('Richard');
  fila.enfileirar('Vitor');
  fila.desenfileirar();

  console.log(`Primeiro da fila: ${fila.frente()}`)
  fila.imprimir();
