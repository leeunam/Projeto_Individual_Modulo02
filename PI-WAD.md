# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## Simples

#### Leunam Sousa de Jesus

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)

Esse projeto tem como objetivo o desenvolvimento de uma **plataforma web para gerenciamento de eventos e inscrições**, voltada para oferecer uma experiência prática e organizada tanto para organizadores quanto para participantes. O sistema permitirá a criação e divulgação de eventos, inscrição de usuários com envio automático de e-mails de confirmação, geração de **QR Codes exclusivos** para entrada e um processo de **check-in digital** no local do evento.

Além dessas funcionalidades principais, a plataforma contará com a possibilidade de **exportar listas de presença**, auxiliando na gestão e controle de público, e também com um **minissistema de recompensas baseado em pontuação**. Esse sistema premiará usuários que participarem ativamente dos eventos, incentivando o engajamento contínuo.

Todo o projeto será desenvolvido com foco em **clareza** e **simplicidade**, com o objetivo de garantir uma navegação intuitiva e acessível para qualquer perfil de usuário.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas

![Image](/assets/henrique.png)
![Image](/assets/giulia.png)

### 2.2. User Stories

| User Stories | Requisitos | Critérios de Aceite |
|-|-|-|
| US01 | **Como** organizador de eventos, **quero** criar eventos e cadastrar informações (nome, data, local, descrição), **para que** os participantes possam visualizar e se inscrever com facilidade. | - Deve ser possível criar um evento preenchendo nome, data, local e descrição. <br> - O evento deve aparecer na lista de eventos disponíveis para os usuários.<br>- O sistema deve validar se todos os campos obrigatórios foram preenchidos. |
| US02 | **Como** participante, **quero** me inscrever em eventos e receber um QR Code de confirmação por e-mail, **para que** eu possa fazer o check-in rapidamente no dia do evento. | - Deve ser possível realizar a inscrição em um evento com sucesso.<br>- Um e-mail de confirmação deve ser enviado automaticamente para o usuário inscrito.<br>- O e-mail deve conter um QR Code exclusivo para o participante. |
| US03 | **Como** participante frequente, **quero** acumular pontos ao participar dos eventos, **para que** eu possa resgatar recompensas e ser incentivado a continuar participando. | - A cada evento check-in realizado, o usuário deve ganhar pontos no sistema.<br>- Deve ser possível visualizar o saldo de pontos acumulados.<br>- Deve existir uma área para resgatar recompensas disponíveis usando pontos. |

## Análise INVEST da User Story US01

**User Story analisada:**  
*US01 |  Como organizador de eventos, quero criar eventos e cadastrar informações (nome, data, local, descrição), para que os participantes possam visualizar e se inscrever com facilidade.*

### INVEST:

- **I – Independente:**  
  Esta funcionalidade pode ser implementada e testada separadamente, sem depender de outras funcionalidades (como sistema de pontos ou inscrição de eventos).

- **N – Negociável:**  
  Os campos a serem preenchidos na criação do evento podem ser ajustados conforme necessidades futuras (ex: adicionar imagem, categorias).

- **V – Valiosa:**  
  A criação de eventos em uma plataforma é essencial para a gestão do evento por parte dos organizadores além de garantir visibilidade externa para possíveis interessados.

- **E – Estimável:**  
  A criação de formulários e a persistência dos dados no banco de dados podem ser facilmente estimadas em termos de esforço e tempo.

- **S – Pequena:**  
  A User Story é específica e pequena a um processo (criação e exibição do evento), podendo ser desenvolvida em um curto ciclos de desenvolvimento.

- **T – Testável:**  
  Pode-se testar se o organizador consegue criar o evento, se as informações são salvas corretamente e se o evento aparece para os participantes.

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

*Posicione aqui os diagramas de modelos relacionais do seu banco de dados, apresentando todos os esquemas de tabelas e suas relações. Utilize texto para complementar suas explicações, se necessário.*

*Posicione também o modelo físico com o Schema do BD (arquivo .sql)*

### 3.1.1 BD e Models (Semana 5)
*Descreva aqui os Models implementados no sistema web*

### 3.2. Arquitetura (Semana 5)

*Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário.*

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
  
*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes (Semana 03)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

### 3.4. Guia de estilos (Semana 05)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.*  

### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que seu parceiro possa consultar caso ele se interessar em aprofundar. Um exemplo de referência de livro e de site:_<br>

---
---