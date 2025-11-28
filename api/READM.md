# challenge-7-backend-quarta-noite-intensivo — API Financeira (Codi Cash)

Um backend completo para gestão financeira das unidades da Codi Academy. 
Fornece APIs para autenticação, unidades, vendas, despesas, categorias e relatórios avançados. 
Construído com **Node.js + Fastify + TypeScript + Prisma + PostgreSQL**, seguindo padrões profissionais de mercado.

---

# 🚀 Tecnologias Principais

| Tecnologia | Uso |
|-----------|-----|
| **Node.js + TypeScript** | Runtime e linguagem |
| **Fastify** | Framework HTTP rápido e seguro |
| **Prisma ORM** | ORM tipado para Postgres |
| **PostgreSQL** | Banco de dados principal |
| **Zod** | Validação de schemas |
| **JWT (Access + Refresh)** | Autenticação |
| **Vitest + Supertest** | Testes automatizados |
| **Swagger (OpenAPI)** | Documentação |
| **Docker + Docker Compose** | Infraestrutura |

---

# 📁 Estrutura de Pastas

```
.
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   app.ts
│   server.ts
│
├───@types
│       fastify.d.ts
│
├───auth
│       authController.ts
│       authGuard.ts
│       authRoutes.ts
│       authService.ts
│       schemas.ts
│       verifyToken.ts
│
├───constants
│       roles.ts
│
├───controllers
│       categoryController.ts
│       expenseController.ts
│       saleController.ts
│       unitController.ts
│       userController.ts
│
├───middlewares
│       authenticate.ts
│       authGlobal.ts
│       autorizeRoles.ts
│       errorHandler.ts
│       hasRole.ts
│       isSelforAdmin.ts
│       rolesMiddleware.ts
│
├───mocks
│       prismaMock.ts
│
├───plugins
│       swagger.ts
│
├───repositories
│       categoryRepository.ts
│       expenseRepository.ts
│       saleRepository.ts
│       unitRepository.ts
│       userRepository.ts
│
├───routes
│       categoryRoutes.ts
│       expenseRoutes.ts
│       saleRoutes.ts
│       unitRoutes.ts
│       userRoutes.ts
│
├───schemas
│       categorySchema.ts
│       expenseSchema.ts
│       saleSchema.ts
│       unitSchema.ts
│       userSchema.ts
│
├───services
│       categoryService.ts
│       expenseService.ts
│       saleService.ts
│       unitService.ts
│       userService.ts
│
├───tests
│   │   setup.ts
│   │   tests-utils.ts
│   │
│   ├───e2e
│   │       auth.e2e.test.ts
│   │       categories.e2e.test.ts
│   │       expenses.e2e.test.ts
│   │       sales.e2e.test.ts
│   │       units.e2e.test.ts
│   │       users.e2e.test.ts
│   │
│   └───unit
│           authService.unit.test.ts
│           generateToken.unit.test.ts
│           middlewares.unit.test.ts
│           saleService.unit.test.ts
│           tokenUtils.unit.test.ts
│           userController.unit.test.ts
│
└───utils
        comparePassword.ts
        env.ts
        generateToken.ts
        hash.ts
        prisma.ts
├── compose.yaml
├── Dockerfile
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

# ⚙️ Instalação e Execução (Local)

## 1. Clone o repositório
```
git clone https://github.com/seu-usuario/challenge-7-backend-quarta-noite-intensivo
cd challenge-7-backend-quarta-noite-intensivo
```

## 2. Instale dependências
```
npm install
```

## 3. Configure o .env
```
cp .env.example .env
```

### `.env.example`
```
NODE_ENV=development
PORT=4000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/<nome_do_banco>?schema=public"
JWT_SECRET="sua_chave_super_secreta"
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

## 4. Rodar migrations
```
npm run prisma:migrate
```

## 5. Rodar seeds
```
npm run prisma:seed
```

## 6. Rodar aplicação
```
npm run dev
```

API em:
http://localhost:4000

---

# 🐳 Rodando com Docker

## Subir containers
```
docker compose up --build
```

## Acessar API
http://localhost:4000

---

# 🧪 Testes
```
npm test
```

---

# 🔐 Autenticação (JWT)

Fluxo completo:
1. Login → access + refresh tokens  
2. Requests → Authorization: Bearer <token>  
3. Refresh token quando expirar  
4. Logout invalida refresh  

---

# 📘 Documentação Swagger
Disponível em:
```
GET /docs
http://localhost:4000/docs
```

---

# 🗄️ Modelo de Dados (ER Simplificado)

- User 1:N Sales  
- User 1:N Expenses  
- Unit 1:N Sales  
- Unit 1:N Expenses  
- Category 1:N Expenses  

---

# 📊 Endpoints

### Autenticação
- POST /auth/login  
- POST /auth/refresh  
- POST /auth/logout  

### Unidades
- GET /units  
- POST /units  

### Vendas
- GET /sales?filters  
- POST /sales  

### Despesas
- GET /expenses?filters  
- POST /expenses  

### Categorias
- GET /categories  
- POST /categories  

### Relatórios
- GET /reports/summary  
- GET /reports/series  
- GET /reports/expenses-distribution  

---

# 🧮 Regra de Negócio (Venda)

```
netValue = grossValue - discount - taxes - commissions - cardFees
```

---

# 🛡️ Segurança

- Validação Zod  
- JWT expiração curta  
- Refresh token rotacionado  
- CORS  
- ORM → proteção SQL Injection  

---

# 🧱 Arquitetura

- Fastify HTTP  
- Modules Pattern  
- Prisma ORM  
- Middlewares  
- Validação com Zod  
- Camada de serviços  
- DTOs e Responses  

---

# 🗂️ Commits (Conventional Commits)

```
feat: nova funcionalidade
fix: correção
chore: manutenção
refactor: melhoria interna
docs: documentação
test: testes
```

---

# 🛣️ Roadmap

- [ ] Autenticação  
- [ ] CRUD unidades  
- [ ] CRUD vendas  
- [ ] CRUD despesas  
- [ ] Relatórios  
- [ ] Seeds  
- [ ] Docker  
- [ ] Swagger  
- [ ] CI/CD  
- [ ] Deploy  

---

# ✔️ Checklist do Challenge

- README completo ✔️  
- Autenticação  
- CRUDs  
- Relatórios  
- Seeds  
- Docker  
- Swagger  
- Testes  

---

# 🤝 Contribuição

```
git checkout -b feature/minha-feature
git commit -m "feat: nova feature"
git push origin feature/minha-feature
```

---

# 📄 Licença

MIT – Livre para estudos e uso.