# MyPet 🐾

Aplicação web full-stack desenvolvida para centralizar o histórico de saúde, estética e rotina de cuidados de cães, com cálculo automático de idade e alertas visuais de vencimento.

---

## 📋 Proposta do Projeto

### 1. Qual é o problema?
Tutores de cães frequentemente perdem o controle das datas de reaplicação de vacinas, vermífugos, antipulgas e intervalos de banho e tosa, além de precisarem reunir de cabeça informações essenciais (idade, peso, raça, alimentação, alergias e medicações) durante consultas veterinárias ou ao deixar o pet sob os cuidados de outra pessoa.

### 2. Para quem é?
Tutores de cães que desejam centralizar o histórico de saúde, estética e rotina de um ou mais pets em um único lugar, com alertas visuais de vencimento.

### 3. Solução em uma frase
Uma aplicação web (**MyPet**) com back-end em Java (Spring Boot) e front-end responsivo que centraliza a ficha completa de múltiplos cães, calcula automaticamente a idade a partir da data de nascimento e gerencia os alertas de vencimento de vacinas, medicamentos, banho e tosa.

---

## ✨ Funcionalidades Implementadas

- **Gerenciamento de Múltiplos Pets:** Cadastro, alternância rápida via barra de seleção (chips) e exclusão de perfis individuais, com suporte a upload de foto personalizada.
- **Ficha Completa com Idade Automática:** Registro e edição de nome, raça, data de nascimento (com cálculo automático em tempo real da idade em anos e meses), peso atual, tipo de pelagem, alimentação diária, alergias, medicamentos em uso, observações de comportamento e telefone do veterinário.
- **Controle de Saúde e Estética:** Registro de cuidados (**Vacina**, **Vermífugo**, **Antipulgas**, **Banho** e **Tosa**) com descrição, data de realização, cálculo automático da próxima data com base nos intervalos configuráveis de rotina e atalho **"✓ Feito hoje"** para renovação rápida.
- **Alertas Inteligentes de Vencimento:** Cálculo dinâmico dos dias restantes para cada cuidado registrado, exibindo contadores e badges de status (**Em dia**, **Vence em breve / Vence hoje** e **Atrasado**).
- **Cartão Resumo Compartilhável:** Geração automática de um resumo organizado com os dados vitais do pet e botão **"Copiar Resumo"** para envio rápido via WhatsApp.
- **Relatório Pré-Consulta para o Veterinário:** Consolidação automática dos dados clínicos da ficha, histórico recente de cuidados e sintomas relatados pelo tutor em um relatório estruturado pronto para copiar e enviar ao veterinário.
- **Persistência em Banco de Dados:** Armazenamento local persistente em arquivo via **Spring Data JPA** e **H2 Database** (`jdbc:h2:file:./data/mypetdb`), mantendo os dados salvos entre execuções sem necessidade de configurações externas.

---

## 🤖 Uso de Inteligência Artificial no Desenvolvimento

A Inteligência Artificial foi utilizada como parceira de desenvolvimento ao longo de todo o ciclo do projeto para:

- Estruturar a arquitetura da API REST em camadas (`model`, `repository`, `controller`) com Java e Spring Boot;
- Modelar o relacionamento JPA entre `Pet` e `Cuidado` com persistência em arquivo H2;
- Implementar a lógica de front-end (cálculo dinâmico de idade, contagem regressiva de prazos de vencimento, manipulação de estado e integração assíncrona via `fetch`);
- Depurar erros de mapeamento, pacotes Java, rotas REST e configuração de ambiente durante os testes.

---

## 🛠️ Tecnologias Utilizadas

- **Back-end:** Java 25, Spring Boot 4.x, Spring Web, Spring Data JPA, Hibernate
- **Banco de Dados:** H2 Database (persistência em arquivo local + Console Web)
- **Front-end:** HTML5, CSS3, JavaScript (Vanilla ES6+ / Fetch API)

---

## 📁 Estrutura do Projeto

```text
MyPet/
├── data/                                  # Arquivo físico do banco H2 (gerado automaticamente)
│   └── mypetdb.mv.db
├── pom.xml                                # Dependências Maven (Web, JPA, H2)
└── src/main/
    ├── java/br/com/mypet/
    │   ├── MypetApplication.java          # Classe principal Spring Boot
    │   ├── controller/
    │   │   └── PetController.java         # Endpoints REST (/api/pets)
    │   ├── model/
    │   │   ├── Pet.java                   # Entidade JPA do Pet
    │   │   └── Cuidado.java               # Entidade JPA dos Cuidados
    │   └── repository/
    │       └── PetRepository.java         # Interface Spring Data JPA
    └── resources/
        ├── application.properties         # Configurações do H2, console web e JPA
        └── static/
            ├── index.html                 # Interface principal (4 abas + modal)
            ├── css/style.css              # Estilização responsiva
            └── js/app.js                  # Regras de interface, cálculos e consumo da API
```

---

## ⚙️ Pré-requisitos e Configuração

Para rodar o projeto localmente, você precisa ter instalado:

- **Java JDK 21 ou superior** (desenvolvido com Java 25)
- **Maven** (ou utilizar o wrapper `./mvnw` incluso no projeto)
- **IDE de preferência** (VS Code com *Extension Pack for Java* ou IntelliJ IDEA)

### Configuração do Banco (`src/main/resources/application.properties`)

O projeto já está configurado para salvar os dados em arquivo local dentro da pasta `./data/`:

```properties
spring.application.name=mypet

# Banco H2 salvo em arquivo local (persiste após reiniciar)
spring.datasource.url=jdbc:h2:file:./data/mypetdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# Criação e atualização automática das tabelas pelo Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Habilita o painel visual do H2 no navegador
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

---

## 🚀 Passo a Passo: Como Executar e Testar

### 1. Clonar o repositório

```bash
git clone <url-do-seu-repositorio>
cd MyPet
```

### 2. Iniciar o servidor Spring Boot

Você pode iniciar a aplicação de duas maneiras:

- **Pelo VS Code / IntelliJ:** Abra o arquivo `src/main/java/br/com/mypet/MypetApplication.java` e clique em **Run** (`▶`).
- **Pelo Terminal:** Execute o comando na raiz do projeto:

```bash
./mvnw spring-boot:run
```

Aguarde aparecer no terminal a mensagem: `Started MypetApplication`.

### 3. Acessar a aplicação web

Abra o navegador e acesse: `http://localhost:8080`

Na primeira execução, se o banco estiver vazio, o sistema cria automaticamente um perfil de exemplo (**Toffee**) já persistido no H2. A partir daí, você pode:

1. Clicar em **"+ Novo pet"** para cadastrar seus próprios cães, informando nome, raça, foto e data de nascimento (a idade é calculada automaticamente).
2. Usar a aba **"Cuidados"** para registrar vacinas, vermífugos, antipulgas, banhos e tosas, acompanhando os badges de status no topo e usando **"✓ Feito hoje"** quando renovar um cuidado.
3. Editar dados clínicos na aba **"Ficha"** e clicar em **"Salvar ficha"**.
4. Copiar os dados prontos para WhatsApp na aba **"Resumo"** ou gerar um relatório clínico estruturado na aba **"Para O Veterinário"**.

### 4. Inspecionar o Banco de Dados H2 (Opcional)

Com a aplicação rodando, você pode visualizar diretamente as tabelas `PET` e `CUIDADO`:

1. Acesse `http://localhost:8080/h2-console`
2. Preencha os campos de conexão exatamente assim:
   - **JDBC URL:** `jdbc:h2:file:./data/mypetdb`
   - **User Name:** `sa`
   - **Password:** *(deixe em branco)*
3. Clique em **Connect**, digite `SELECT * FROM PET;` e clique em **Run**.

---

## 🔌 Endpoints da API REST

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/pets` | Lista todos os pets cadastrados e seus respectivos cuidados |
| `POST` | `/api/pets` | Cadastra um novo pet ou atualiza um pet existente (e sua lista de cuidados) |
| `DELETE` | `/api/pets/{id}` | Remove um pet do banco de dados pelo seu `ID` |