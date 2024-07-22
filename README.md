 # API Workout of the Day
 > Desenvolvido por Marcos Vinicius Boava
 >> inspirado em <a href="https://www.freecodecamp.org/news/rest-api-design-best-practices-build-a-rest-api/">FreeCodeCamp🔥</a>

 <p>Boas práticas em desenvolvimento de API REST</p>

 <hr>

## Sumário

<ul>
    <li><a href="#SccTec">Tecnologias</a></li>
    <li><a href="#SccSetup">Setup</a></li>
    <li><a href="#SccArq">Arquitetura</a></li>
    <li><a href="#SccEnd">End Points</a></li>
    <li><a href="#SccNext">Próximos passos</a></li>
</ul>

<hr>

<h2 id="SccTec">Tecnologias</h2>

<ul>
    <li>Node.Js</li>
    <li>JavaScript</li>
    <li>Express</li>
    <li>Nodemon</li>
    <li>Body Parser</li>
    <li>Uuid</li>
    <li>ApiCache</li>
    <li>Http Client (a sua escolha)</li>
</ul>

<hr>

<h2 id="SccSetup">Setup</h2>

1º passo:
<p>Clonar o repositório</p>

```
git clone https://github.com/Mfrozzz/workoutOfTheDay-API.git
```
2º passo:
<p>Dirigir-se a pasta do projeto, via interface gráfica ou pelo terminal. Desse modo, abra o repositório em seu terminal. Por exemplo pelo comando:</p>

```
cd workoutOfTheDay-API
```

3º passo:
<p>Instalação de dependências</p>

```
npm i
```

<hr>

<h2 id="SccArq">Arquitetura</h2>

```
Request  Response
   |       ∧
   V       |
   --------
  | Router |
   --------
   |       ∧
   V       |
  ------------
 | Controller |
  ------------
  |          ∧
  V          |
  ---------------
 | Service Layer |
  ---------------
  |             ∧
  V             |
  -------------------
 | Data Access Layer |
  -------------------
```

* **Router**: Camada que recebe as requisições e por meio de suas rotas transfere para a controller correspondente;
* **Controller**: Camada que trata das requisições e respostas HTTP dos nossos end-points;
* **Service Layer**: Camada onde se encontram as regras de negócio do sistema;
* **Data Access Layer**: Camada que age junto do banco de dados, procurando, adicionando, atualizando ou deletando os registros. Neste primeiro momento, o banco de dados encontra-se como apenas um arquivo JSON.

<hr>

<h2 id="SccEnd">End-Points</h2>

<h3>Workout</h3>

<p>Estas rotas tem como URL base:</p>

```
localhost:3000/api/v1/workouts
```

<p>E seus end-points são:</p>

* **Get All Workouts:** Realiza a exibição de todos os registros da tabela;
* **Get One Workout:** Exibe um registro específico da tabela (busca pelo id do elemento);
* **Create New Workout:** Cria um novo registro na tabela;
* **Update Workout:** Atualiza determinado registro na tabela;
* **Get Records for Workout:** Exibe os records para o exercicio buscado (busca pelo id do elemento);
* **Get Workout Member ID:** Exibe qual membro exatamente possui o record;
* **Delete Workout:** Apaga o registro da tabela.

<h3>Record</h3>

<p>Estas rotas tem como URL base:</p>

```
localhost:3000/api/v1/records
```

<p>E seus end-points são:</p>

* **Get All Records:** Realiza a exibição de todos os registros da tabela;
* **Get One Record:** Exibe um registro específico da tabela (busca pelo id do elemento);
* **Create New Record:** Cria um novo registro na tabela;
* **Update Record:** Atualiza determinado registro na tabela;
* **Delete Record:** Apaga o registro da tabela.


<h3>Member</h3>

<p>Estas rotas tem como URL base:</p>

```
localhost:3000/api/v1/members
```

<p>E seus end-points são:</p>

* **Get All Members:** Realiza a exibição de todos os registros da tabela;
* **Get One Member:** Exibe um registro específico da tabela (busca pelo id do elemento);
* **Create New Member:** Cria um novo registro na tabela;
* **Update Member:** Atualiza determinado registro na tabela;
* **Delete Member:** Apaga o registro da tabela.


<hr>

<h2 id="SccNext">Próximos Passos</h2>

<p>Para trabalhos futuros e melhorias para esse pequeno projeto temos:</p>

* Utilização de um Banco de dados real (Seja ele SQL ou NoSQL);
* ~~Implementação de login, seção e Token;~~
* ~~Recursos de proteção de rotas e melhores tratamentos de erros;~~
* Migração da API para TypeScript;
* Implementação de um Front-end;
* ~~Recursos de criptografia de senha por Hash;~~
* Melhorias no arquivo README e tradução para o Inglês.