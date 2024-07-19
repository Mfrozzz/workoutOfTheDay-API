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

<ul>
    <li> <b>Router</b>: Camada que recebe as requisições e por meio de suas rotas transfere para a controller correspondente;</li>
    <li><b>Controller</b>: Camada que trata das requisições e respostas HTTP dos nossos end-points;</li>
    <li><b>Service Layer</b>: Camada onde se encontram as regras de negócio do sistema;</li>
    <li><b>Data Access Layer</b>: Camada que age junto do banco de dados, procurando, adicionando, atualizando ou deletando os registros. Neste primeiro momento, o banco de dados encontra-se como apenas um arquivo JSON.</li>
</ul>

<hr>

<h2 id="SccEnd">End-Points</h2>

<h3>Workout</h3>

<p>Estas rotas tem como URL base:</p>

```
localhost:3000/api/v1/workouts
```

<p>E seus end-points são:</p>
<ul>
    <li><b>Get All Workouts:</b> Realiza a exibição de todos os registros da tabela;</li>
    <li><b>Get One Workout:</b> Exibe um registro específico da tabela (busca pelo id do elemento);</li>
    <li><b>Create New Workout:</b> Cria um novo registro na tabela;</li>
    <li><b>Update Workout:</b> Atualiza determinado registro na tabela;</li>
    <li><b>Get Records for Workout:</b> Exibe os records para o exercicio buscado (busca pelo id do elemento);</li>
    <li><b>Get Workout Member ID:</b> Exibe qual membro exatamente possui o record;</li>
    <li><b>Delete Workout:</b> Apaga o registro da tabela.</li>
</ul>

<h3>Record</h3>

<p>Estas rotas tem como URL base:</p>

```
localhost:3000/api/v1/records
```

<p>E seus end-points são:</p>
<ul>
    <li><b>Get All Records:</b> Realiza a exibição de todos os registros da tabela;</li>
    <li><b>Get One Record:</b> Exibe um registro específico da tabela (busca pelo id do elemento);</li>
    <li><b>Create New Record:</b> Cria um novo registro na tabela;</li>
    <li><b>Update Record:</b> Atualiza determinado registro na tabela;</li>
    <li><b>Delete Record:</b> Apaga o registro da tabela.</li>
</ul>

<h3>Member</h3>

<p>Estas rotas tem como URL base:</p>

```
localhost:3000/api/v1/members
```

<p>E seus end-points são:</p>
<ul>
    <li><b>Get All Members:</b> Realiza a exibição de todos os registros da tabela;</li>
    <li><b>Get One Member:</b> Exibe um registro específico da tabela (busca pelo id do elemento);</li>
    <li><b>Create New Member:</b> Cria um novo registro na tabela;</li>
    <li><b>Update Member:</b> Atualiza determinado registro na tabela;</li>
    <li><b>Delete Member:</b> Apaga o registro da tabela.</li>
</ul>

<hr>

<h2 id="SccNext">Próximos Passos</h2>

<p>Para trabalhos futuros e melhorias para esse pequeno projeto temos:</p>
<ul>
    <li>Utilização de um Banco de dados real (Seja ele SQL ou NoSQL);</li>
    <li>Implementação de login, seção e Token;</li>
    <li>Recursos de proteção de rotas e melhores tratamentos de erros;</li>
    <li>Migração da API para TypeScript;</li>
    <li>Implementação de um Front-end;</li>
    <li>Recursos de criptografia de senha por Hash;</li>
    <li>Melhorias no arquivo README e tradução para o Inglês.</li>
</ul>