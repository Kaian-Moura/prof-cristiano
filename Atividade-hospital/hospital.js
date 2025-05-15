// Classe Fila
class Fila {
  constructor() {
    this.itens = [];
  }

  // Adiciona elemento ao final da fila
  enfileirar(elemento) {
    this.itens.push(elemento);
  }

  // Remove o primeiro elemento (o que chegou primeiro)
  desenfileirar() {
    return this.itens.shift();
  }

  // Mostra quem está no início da fila
  primeiro() {
    return this.itens[0];
  }

  // Verifica se está vazia
  estaVazia() {
    return this.itens.length === 0;
  }

  // Retorna todos os elementos
  mostrarFila() {
    return [...this.itens];
  }
}

// Classe Pilha (LIFO - Last In, First Out)
class Pilha {
  constructor() {
    this.itens = [];
  }

  // Adiciona elemento no topo
  empilhar(elemento) {
    this.itens.push(elemento);
  }

  // Remove o topo
  desempilhar() {
    return this.itens.pop();
  }

  // Verifica o topo
  topo() {
    return this.itens[this.itens.length - 1];
  }

  // Verifica se está vazia
  estaVazia() {
    return this.itens.length === 0;
  }

  // Retorna todos os elementos
  mostrarPilha() {
    return [...this.itens];
  }

  // Extra: busca um paciente na pilha
  buscarPaciente(nome) {
    return this.itens.includes(nome);
  }
}

// Simulação hospitalar
const filaAtendimento = new Fila();
const pilhaProntuarios = new Pilha();

// Adicionando 5 pacientes à fila
filaAtendimento.enfileirar("Ana Souza");
filaAtendimento.enfileirar("Bruno Lima");
filaAtendimento.enfileirar("Carlos Silva");
filaAtendimento.enfileirar("Daniela Alves");
filaAtendimento.enfileirar("Eduardo Rocha");

console.log("Próximo a ser atendido:", filaAtendimento.primeiro());

// Atendendo 2 pacientes
for (let i = 0; i < 2; i++) {
  const pacienteAtendido = filaAtendimento.desenfileirar();
  console.log(`Atendendo: ${pacienteAtendido}`);
  pilhaProntuarios.empilhar(pacienteAtendido);
}

// Mostrando o estado final
console.log("\nFila restante:");
console.log(filaAtendimento.mostrarFila());

console.log("\nPilha de prontuários:");
console.log(pilhaProntuarios.mostrarPilha());

// Extra: busca por paciente
console.log("\nBuscar 'Carlos Silva' nos prontuários:", pilhaProntuarios.buscarPaciente("Carlos Silva"));
console.log("Buscar 'Ana Souza' nos prontuários:", pilhaProntuarios.buscarPaciente("Ana Souza"));
