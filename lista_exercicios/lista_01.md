
NOME: KAIAN SANTOS MOURA
TURMA: 19

EXERCÍCIOS

# Questões objetivas
**1) Considerando a execução do código abaixo, indique a alternativa correta e justifique sua resposta.**
```javascript
console.log(x);
var x = 5;
console.log(y);
let y = 10;
```
a) A saída será undefined seguido de erro - RESPOSTA CERTO
Justificativa: o undefined acontece porque estamos tentando chamar o console.log antes de declarar a váriavel, e o erro do Y dá por conta que está usando LET, e o LET só existe dentro do seu próprio escopo, e como o console.log está fora do seu escopo, dá o erro.

b) A saída será 5 seguido de 10 - RESPOSTA ERRADA

c) A saída será undefined seguido de undefined - RESPOSTA ERRADA

d) A saída será erro em ambas as linhas que utilizam console.log - RESPOSTA ERRADA


**2) O seguinte código JavaScript tem um erro que impede sua execução correta. Analise e indique a opção que melhor corrige o problema. Justifique sua resposta.**

```javascript
function soma(a, b) {
    if (a || b === 0) {
        return "Erro: número inválido";
    }
    return a + b;
}
console.log(soma(2, 0));
```

a) Substituir if (a || b === 0) por if (a === 0 || b === 0) - ESTÁ CORRETO

Justificativa:

A expressão a || b === 0 está errada porque ela avalia a como um valor booleano e b apenas como zero. O certo é usar a === 0 || b === 0, que verifica corretamente se a ou b são zero.

b) Substituir if (a || b === 0) por if (a === 0 && b === 0) - ESTÁ ERRADO 

c) Substituir if (a || b === 0) por if (a && b === 0) - ESTÁ ERRADO

d) Remover completamente a verificação if (a || b === 0) - ESTÁ ERRADO

______
**3) Ao executar esse código, qual será a saída no console? Indique a alternativa correta e justifique sua resposta.**
```javascript
function calcularPreco(tipo) {
    let preco;

    switch(tipo) {
        case "eletrônico":
            preco = 1000;
        case "vestuário":
            preco = 200;
            break;
        case "alimento":
            preco = 50;
            break;
        default:
            preco = 0;
    }

    return preco;
}

console.log(calcularPreco("eletrônico"));
```

a) O código imprime 1000. - ESTÁ ERRADO

b) O código imprime 200. - ESTÁ CORRETO

Justificativa: O problema no código é que o case para "eletrônico" não possui um break, então a execução continua para o próximo case, que é "vestuário". Isso faz com que preco seja definido como 200 e, em seguida, o break interrompe a execução.

c) O código imprime 50. - ESTÁ ERRADO

d) O código gera um erro. - ESTÁ ERRADO

______
**4) Ao executar esse código, qual será a saída no console? Indique a alternativa correta e justifique sua resposta.**
```javascript
let numeros = [1, 2, 3, 4, 5];

let resultado = numeros.map(x => x * 2).filter(x => x > 5).reduce((a, b) => a + b, 0);

console.log(resultado);
```
a) 0 - ESTÁ ERRADO

b) 6 - ESTÁ ERRADO

c) 18 - ESTÁ ERRADO

d) 24 - ESTÁ CORRETO

Justificativa: o código primeiro multiplica cada elemento por 2, depois filtra os valores maiores que 5 e por último, soma esses valores.
______
**5) Qual será o conteúdo do array lista após a execução do código? Indique a alternativa correta e justifique sua resposta.**

```javascript
let lista = ["banana", "maçã", "uva", "laranja"];
lista.splice(1, 2, "abacaxi", "manga");
console.log(lista);
```

a) ["banana", "maçã", "uva", "abacaxi", "manga", "laranja"] - ESTÁ ERRADO

b) ["banana", "abacaxi", "manga"] - ESTÁ ERRADO

c) ["banana", "abacaxi", "manga", "laranja"] - ESTÁ CORRETO

Justificativa:  o splice modifica o array original removendo dois elementos a partir da posição 1 e adicionando dois novos elementos na mesma posição. Isso resulta em um novo array onde "maçã" e "uva" são substituídas por "abacaxi" e "manga".

d) ["banana", "maçã", "uva", "abacaxi", "manga"] - ESTÁ ERRADO
______
**6) Abaixo há duas afirmações sobre herança em JavaScript. Indique a alternativa correta e justifique sua resposta**

I. A herança é utilizada para compartilhar métodos e propriedades entre classes em JavaScript, permitindo que uma classe herde os métodos de outra sem a necessidade de repetir código.  
II. Em JavaScript, a herança é implementada através da palavra-chave `extends`.


a) As duas afirmações são verdadeiras, e a segunda justifica a primeira. - ESTÁ CORRETO

Justificativa:

A primeira afirmação descreve o propósito da herança, que é compartilhar métodos e propriedades entre classes, evitando a repetição de código. A segunda afirmação explica como a herança é implementada em JavaScript, utilizando a palavra-chave extends. Portanto, a segunda afirmação justifica a primeira.

b) As duas afirmações são verdadeiras, mas a segunda não justifica a primeira. - ESTÁ ERRADO

c) A primeira afirmação é verdadeira, e a segunda é falsa. - ESTÁ ERRADO

d) A primeira afirmação é falsa, e a segunda é verdadeira. - ESTÁ ERRADO
______
**7) Dado o seguinte código. Indique a alternativa correta e justifique sua resposta.**

```javascript
class Pessoa {
  constructor(nome, idade) {
    this.nome = nome;
    this.idade = idade;
  }

  apresentar() {
    console.log(`Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`);
  }
}

class Funcionario extends Pessoa {
  constructor(nome, idade, salario) {
    super(nome, idade);
    this.salario = salario;
  }

  apresentar() {
    super.apresentar();
    console.log(`Meu salário é R$ ${this.salario}.`);
  }
}
```


I) A classe Funcionario herda de Pessoa e pode acessar os atributos nome e idade diretamente.  
II) O método `apresentar()` da classe Funcionario sobrepõe o método `apresentar()` da classe Pessoa, mas chama o método da classe pai usando `super`.  
III) O código não funciona corretamente, pois Funcionario não pode herdar de Pessoa como uma classe, já que o JavaScript não suporta herança de classes.

Quais das seguintes afirmações são verdadeiras sobre o código acima?

a) I e II são verdadeiras. - ESTÁ CORRETO

Justificativa: 

A herança de classes em JavaScript é usada pelapalavra-chave extends, e a classe Funcionario pode acessar os atributos nome e idade da classe Pessoa. O método apresentar() da classe Funcionario sobrepõe o método da classe Pessoa e chama o método da classe pai usando super.

b) I, II e III são verdadeiras. - ESTÁ ERRADO

c) Apenas II é verdadeira. - ESTÁ ERRADO

d) Apenas I é verdadeira. - ESTÁ ERRADO

______

**8) Analise as afirmações a seguir. Indique a alternativa correta e justifique sua resposta.**

**Asserção:** O conceito de polimorfismo em Programação Orientada a Objetos permite que objetos de diferentes tipos respondam à mesma mensagem de maneiras diferentes.  
**Razão:** Em JavaScript, o polimorfismo pode ser implementado utilizando o método de sobrecarga de métodos em uma classe.

a) A asserção é falsa e a razão é verdadeira. - ESTÁ ERRADO

b) A asserção é verdadeira e a razão é falsa. - ESTÁ CORRETO

Justificativa:

A asserção é verdadeira porque o polimorfismo permite que objetos de diferentes tipos respondam à mesma mensagem de maneiras diferentes. A razão é falsa porque o polimorfismo em JavaScript não é implementado pela sobrecarga de métodos, mas sim pela substituição de métodos e herança.

c) A asserção é verdadeira e a razão é verdadeira, mas a razão não explica a asserção. - ESTÁ ERRADO

d) A asserção é verdadeira e a razão é verdadeira, e a razão explica a asserção. - ESTÁ ERRADO

______

# Questões dissertativas
9) O seguinte código deve retornar a soma do dobro dos números de um array, mas contém erros. Identifique os problema e corrija o código para que funcione corretamente. Adicione comentários ao código explicado sua solução para cada problema.

```javascript
function somaArray(numeros) {

    for (i = 0; i < numeros.size; i++) {
        soma = 2*numeros[i];
    }
    return soma;
}
console.log(somaArray([1, 2, 3, 4]));
```

CÓDIGO CORRIJIGO

```javascript
function somaArray(numeros) {
    // Declarar a variável soma e iniciar com 0
    let soma = 0;

    // Declarar a variável i com let para uso no loop
    for (let i = 0; i < numeros.length; i++) {
        // Acumular a soma do dobro dos números
        soma += 2 * numeros[i];
    }

    // Retornar o valor acumulado de soma
    return soma;
}

// Exibir o resultado no console
console.log(somaArray([1, 2, 3, 4])); // Saída esperada: 20

```
______
10) Crie um exemplo prático no qual você tenha duas classes:

- Uma classe `Produto` com atributos `nome` e `preco`, e um método `calcularDesconto()` que aplica um desconto fixo de 10% no preço do produto.
- Uma classe `Livro` que herda de `Produto` e modifica o método `calcularDesconto()`, aplicando um desconto de 20% no preço dos livros.

Explique como funciona a herança nesse contexto e como você implementaria a modificação do método na classe `Livro`.

código:

```javascript
class Produto {
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
  }

  calcularDesconto() {
    return this.preco * 0.9; // Aplica um desconto de 10%
  }
}

const produto = new Produto("Genérico", 100);
console.log(`Preço com desconto de 10%: R$ ${produto.calcularDesconto()}`); // Exibirá 90

```

```javascript
class Livro extends Produto {
  constructor(nome, preco, autor) {
    super(nome, preco);
    this.autor = autor;
  }

  calcularDesconto() {
    return this.preco * 0.8; // Aplica um desconto de 20%
  }
}

const livro = new Livro("JavaScript Avançado", 100, "John Doe");
console.log(`Preço com desconto de 20%: R$ ${livro.calcularDesconto()}`); // Exibirá 80

```

Explicação:

Herança: A classe Livro herda os atributos e métodos da classe Produto usando a palavra-chave extends. Isso significa que Livro tem acesso aos atributos nome e preco definidos em Produto sem precisar redefini-los.
Modificação de Método: A classe Livro redefine o método calcularDesconto() para aplicar um desconto diferente (20% em vez de 10%). Usamos a mesma assinatura de método, mas implementamos uma lógica diferente para a classe derivada.
