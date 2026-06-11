# PADRÃO ESTRUTURA

```
.
├── src/
├── app/
├── │
│   └── core/                          # Serviços e lógica singleton (carregados uma vez)
│       ├── guards/                    # Guards de rota (auth.guard.ts, role.guard.ts)
│       ├── interceptors/              # HTTP interceptors (auth, loading, error)
│       ├── services/                  # Serviços globais (auth.service, storage.service)
│       ├── models/                    # Interfaces e tipos globais (user.model.ts)
│       └── core.providers.ts          # Providers do core (usado em app.config.ts)
├── │
│   └── shared/                        # Componentes, pipes e diretivas reutilizáveis
│       ├── components/                # Componentes genéricos (button, modal, table...)
│       │   ├── button/
│       │   │   ├── button.component.ts
│       │   │   ├── button.component.html
│       │   │   └── button.component.scss
│       │   └── modal/
│       ├── directives/                # Diretivas reutilizáveis (click-outside, tooltip)
│       ├── pipes/                     # Pipes customizados (cpf-mask, currency-br)
│       ├── validators/                # Validadores de formulário customizados
│       └── shared.imports.ts          # Barrel com imports comuns (CommonModule, etc.)
├── │
│   ├── features/                      # Módulos de funcionalidade (domínios do negócio)
│   ├── │
│   │   └── auth/                      # Domínio: autenticação
│   │       ├── pages/                 # Componentes de página (rotas)
│   │       │   ├── login/
│   │       │   │   ├── login.component.ts
│   │       │   │   ├── login.component.html
│   │       │   │   └── login.component.scss
│   │       │   └── register/
│   │       ├── components/            # Componentes internos da feature
│   │       ├── services/              # Serviços específicos desta feature
│   │       ├── models/                # Interfaces/tipos desta feature
│   │       ├── store/                 # Estado local (NgRx/Signal Store)
│   │       │   ├── auth.store.ts      # Signal Store (Angular 17+)
│   │       │   └── auth.actions.ts
│   │       └── auth.routes.ts         # Rotas lazy desta feature
│   ├── │
│   │   └── dashboard/                 # Domínio: dashboard
│   │       ├── pages/
│   │       ├── components/
│   │       ├── services/
│   │       └── dashboard.routes.ts
│   └── │
│       └── [feature-name]/            # Padrão repetido para cada domínio
│           ├── pages/
│           ├── components/
│           ├── services/
│           ├── models/
│           ├── store/
│           └── [feature-name].routes.ts
├── │
│   └── layout/                        # Estrutura visual da aplicação
│       ├── header/
│       │   ├── header.component.ts
│       │   ├── header.component.html
│       │   └── header.component.scss
│       ├── sidebar/
│       ├── footer/
│       └── main-layout/               # Wrapper principal com header + sidebar + router-outlet
├── │
│   ├── app.component.ts               # Componente raiz (mínimo, só o router-outlet)
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.config.ts                  # provideRouter, provideHttpClient, etc.
│   └── app.routes.ts                  # Rotas raiz com lazy loading para as features
├── │
├── assets/                            # Arquivos estáticos
│   ├── icons/
│   ├── images/
│   └── fonts/
├── │
├── environments/                      # Configurações por ambiente
│   ├── environment.ts                 # development
│   └── environment.prod.ts            # production
├── │
├── styles/                            # Estilos globais
│   ├── _variables.scss                # Variáveis SCSS globais (cores, fontes, espaçamentos)
│   ├── _mixins.scss                   # Mixins reutilizáveis
│   ├── _reset.scss                    # Reset CSS
│   ├── _typography.scss               # Estilos de tipografia global
│   └── _themes.scss                   # Temas (dark/light mode)
├── │
├── index.html
├── main.ts                            # Ponto de entrada — bootstrapApplication()
└── styles.scss                        # Importa os arquivos de /styles/
```

---
