# MeuPet 🐾

## Proposta

1. **Qual é o problema?**
Tutores de cães frequentemente perdem o controle das datas de reaplicação de vacinas, vermífugos, antipulgas e intervalos de banho e tosa, além de precisarem reunir de cabeça informações essenciais (idade, peso, raça, alimentação, alergias e medicações) durante consultas veterinárias ou ao deixar o pet sob os cuidados de outra pessoa.

2. **Para quem é?**
Tutores de cães que desejam centralizar o histórico de saúde, estética e rotina do seu pet em um único lugar com alertas visuais de vencimento.

3. **Qual é a minha solução, em uma frase?**
Uma aplicação web (**MeuPet**) com back-end em Java (Spring Boot) e front-end responsivo que centraliza a ficha completa do cachorro e calcula automaticamente os alertas de vencimento de vacinas, medicamentos, banho e tosa.

4. **O que a primeira versão vai fazer?**
- **Ficha Completa do Cão:** Cadastrar e editar nome, raça, idade, peso atual, tipo de pelagem, alimentação diária, alergias, medicamentos em uso, observações de comportamento e telefone do veterinário.
- **Controle de Saúde e Estética:** Registrar aplicações e cuidados (*Vacinas*, *Vermífugo*, *Antipulgas*, *Banho* e *Tosa*) com data realizada e data da próxima dose/sessão.
- **Alertas Inteligentes de Vencimento:** Calcular no back-end (usando `LocalDate` no Java) quantos dias faltam para cada próximo cuidado e retornar o status (**Em dia**, **Vence em breve** e **Atrasado**).
- **Cartão Resumo Compartilhável:** Gerar uma visualização limpa com os dados vitais do pet e botão de "Copiar Resumo" para enviar rapidamente no WhatsApp.
- **Persistência em Banco de Dados:** Armazenar os registros via Spring Data JPA com banco H2 (ou arquivo local H2) para facilitar a execução e testes sem dependências externas.

5. **Como vou usar a IA?**
Vou utilizar a IA como parceira de desenvolvimento para estruturar a arquitetura da API REST em Java (Spring Boot), revisar as regras de negócio de cálculo de datas com `LocalDate`, auxiliar na integração com o front-end e depurar possíveis erros durante os testes.# MyPet
