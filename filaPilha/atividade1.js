//Pilha:

// Classe Pilha
class Pilha {
    constructor() {
      this.itens = [];
    }
  
    empilhar(item) {
      this.itens.push(item);
      console.log(`✔️ Elemento '${item}' empilhado.`);
    }
  
    desempilhar() {
      if (this.estaVazia()) {
        console.log('⚠️ A pilha está vazia. Nada a desempilhar.');
        return null;
      }
      const removido = this.itens.pop();
      console.log(`❌ Elemento '${removido}' desempilhado.`);
      return removido;
    }
  
    topo() {
      if (this.estaVazia()) {
        return null;
      }
      return this.itens[this.itens.length - 1];
    }
  
    estaVazia() {
      return this.itens.length === 0;
    }
  
    limpar() {
      this.itens = [];
      console.log('🧹 Pilha esvaziada.');
    }
  
    imprimir() {
      console.log('📦 Pilha atual:', this.itens.slice().reverse().join(' <- topo'));
    }
  }
  
  // DEMONSTRAÇÃO

const pilha = new Pilha();
pilha.empilhar('Livro A')
pilha.empilhar('Livro B')
pilha.empilhar('Livro C')
pilha.empilhar('Livro D')
console.log(`Topo da pilha: ${pilha.topo()}`);
console.log(`Tamanho: ${pilha.tamanho()}`);
pilha.desempilhar();
pilha.imprimir();