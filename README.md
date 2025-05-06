
## 📘 Documentação do Frontend - Projeto Blog Angular

### 🧱 Stack Utilizada

* Framework: Angular
* Componentes de UI: Angular Material
* Arquitetura: Componentes Standalone
* Gráficos: ng-apexcharts
* Gerenciamento de Rotas: Angular Router com AuthGuards
* Segurança: Interceptor HTTP para injeção de token
* Componentização: Foco em componentes reutilizáveis

### 🗂️ Estrutura de Pastas

```bash
src
└── app
    ├── auth                          # Funcionalidades de autenticação (login, registro)
    │   ├── components                # Componentes relacionados à autenticação
    │   │   ├── default-layout        # Layout padrão para páginas autenticadas
    │   │   ├── login                 # Tela de login
    │   │   └── register              # Tela de registro
    │   ├── models                    # Modelos de dados relacionados à autenticação
    │   └── services                  # Serviços de autenticação (login e registro)
    │
    ├── components                    # Componentes reutilizáveis e funcionais da aplicação
    │   ├── chart                     # Gráficos utilizando ng-apexcharts
    │   │   ├── date-posts-chart      # Gráfico de postagens por data
    │   │   ├── users-chart           # Gráfico de postagens por usuário
    │   │   ├── models                # Modelos utilizados nos gráficos
    │   │   └── services              # Serviços relacionados aos gráficos
    │   ├── posts                     # Funcionalidades de postagens
    │   │   ├── models                 # Modelos de dados de postagem
    │   │   ├── post-create           # Componente para criar postagens
    │   │   ├── post-create-page      # Página completa para criar postagens
    │   │   ├── post-detail           # Visualização de detalhes do post
    │   │   ├── post-edit             # Edição de postagens
    │   │   └── service               # Serviço de postagens
    │   └── topic                     # Funcionalidades relacionadas a tópicos
    │       ├── models                 # Modelo de dados de tópico
    │       ├── services               # Serviço de tópicos
    │       └── topic-create          # Criação de novos tópicos
    │
    ├── core                          # Camada central de funcionalidades reutilizáveis
    │   ├── interceptors              # Interceptadores (ex: envio automático do token JWT)
    │   └── styles                    # Estilos globais e variáveis SCSS
    │
    ├── dashboard                     # Páginas de dashboard
    │   └── components
    │       ├── analytics             # Estatísticas gerais da aplicação
    │       └── users-post            # Visualização de posts por usuário
    │
    ├── guards                        # AuthGuards para proteger rotas
    │   ├── authenticated-user.guard.ts
    │   └── post-owner.guard.ts
    │
    ├── home                          # Página inicial do blog
    │   ├── models                    # Modelos de dados usados na home
    │   └── home.component.*          # Componente da tela inicial
    │
    ├── shared                        # Componentes e serviços genéricos/reutilizáveis
    │   ├── components
    │   │   ├── dinamic-input         # Campo de input reutilizável
    │   │   ├── dinamic-loading-button# Botão com feedback de carregamento
    │   │   ├── fail-generic-modal    # Modal de erro genérico
    │   │   ├── generic-search        # Campo de busca genérico
    │   │   ├── list-items            # Lista de itens genérica
    │   │   ├── navbar                # Barra de navegação superior
    │   │   ├── searchable-list-card  # Cartão com lista e busca
    │   │   └── success-generic-modal # Modal de sucesso genérico
    │   └── services                  # Serviços reutilizáveis e auxiliares
    │
    ├── app.component.*              # Componente raiz da aplicação
    ├── app.config.ts                # Configurações globais do app
    └── app.routes.ts                # Definição das rotas principais

```

## 🧩 Desafios e Soluções do Projeto
1. Deploy Backend (Spring Boot) no Railway

* **Desafio:** *Aplicação entrando em looping na hora do deploy.*

* **Solução:** Fazer uso de variáveis de ambiente e criar o domínio onde o servidor ficará disponível.

2. Autenticação e Segurança no Frontend

* **Desafio:** *Proteger rotas e garantir envio de token de forma segura.*

* **Solução:** Implementação de AuthGuards para proteger páginas como criação de post e dashboard.
Criação de um interceptor HTTP para injetar automaticamente o token JWT nas requisições autenticadas.


3. Organização e Reutilização de Componentes Angular

* **Desafio:** *Evitar duplicação de código e manter o frontend escalável.*

* **Solução:** Adoção de componentes standalone com Angular Material.
Criação de componentes reutilizáveis como dinamic-loading-button, searchable-list-card, generic-search, etc.

4. Exibição de Informações Visuais (Analytics)

* **Desafio:** *Apresentar dados relevantes de forma visual, interativa e coesa.*

* **Solução:** Uso da biblioteca ng-apexcharts para exibir gráficos de posts por data e por usuário.
Separação dos dados em serviços e modelos específicos para alimentar os gráficos.

5. Estruturação do projeto Angular
* **Desafio:** *Manter a estrutura modular e clara para facilitar manutenção.*
* **Solução:** Estrutura segmentada por domínio: auth, components, core, dashboard, guards, shared, etc.
Organização por modelos, serviços e páginas dentro de cada feature.

6. Tratamento de Erros e Feedback ao Usuário

* **Desafio:** *Informar erros e sucessos de forma clara.*

* **Solução:** Criação de modais genéricos de falha e sucesso (fail-generic-modal e success-generic-modal).
Botões com carregamento visual (dinamic-loading-button) para melhor UX.

## 📘 Aprendizados adquiridos com o projeto

1. Deploy e Configuração de Backend
* Aprendizado: A importância do uso de variáveis de ambiente para configurar de forma segura e dinâmica a aplicação em produção.

* Ganhos técnicos: Compreensão de serviços de deploy em nuvem (como Railway), manipulação de domínio, e identificação de problemas de runtime.

2. Segurança e Autenticação no Frontend
* Aprendizado: Como proteger rotas de forma eficaz com AuthGuards e garantir a autenticação por meio de JWT.

* Ganhos técnicos: Consolidação dos conceitos de segurança em SPAs (Single Page Applications), interceptação de requisições e boas práticas com tokens.

3. Componentização e Reutilização Angular
* Aprendizado: A importância da componentização e reutilização para criar aplicações escaláveis e de fácil manutenção.

* Ganhos técnicos: Domínio sobre standalone components, Angular Material e criação de interfaces reutilizáveis.

4. Visualização de Dados (Analytics)
* Aprendizado: Como transformar dados brutos em informações visuais claras e relevantes para o usuário.

* Ganhos técnicos: Experiência com bibliotecas de gráficos como ng-apexcharts, além da separação de responsabilidades em serviços e modelos.

5. Estruturação e Modularização do Projeto
* Aprendizado: A importância de seguir uma estrutura de pastas organizada por domínio e funcionalidade.

* Ganhos técnicos: Visão arquitetural de um projeto Angular modular e bem segmentado, com separação clara entre responsabilidades.

6. UX e Feedback ao Usuário
* Aprendizado: Que fornecer feedbacks visuais imediatos melhora significativamente a experiência do usuário.

* Ganhos técnicos: Criação de componentes genéricos de feedback (modais, botões com loading), demonstrando atenção à usabilidade.




## 🚀 Deploy
A aplicação está com os ambientes integrados, frontend e backend. Links a seguir:

*  *Frontend:* https://blog-pessoal-acelera.netlify.app

        hospedado na Netlify, com deploy automático de acordo com commits na branch master.


* *Backend:* https://blog-pessoal-production.up.railway.app

        hospedado na Railway, possui logs em tempo real, gerenciamento de banco de dados PostgreSQL e também acompanha os commits da branch master.