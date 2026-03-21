```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

```
my-app/
├── app/                        # 路由 + Server Components（默认 server-only）
│   ├── layout.tsx              # 根布局（必须，html/head/providers）
│   ├── page.tsx                # 首页 /
│   ├── dashboard/              # /dashboard
│   │   ├── page.tsx
│   │   └── layout.tsx          # dashboard 专属布局（sidebar 等）
│   ├── settings/               # /settings
│   │   └── page.tsx
│   ├── (auth)/                 # 路由组：不影响 URL，用于组织
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   └── api/                    # 只放对外用的 Route Handlers（webhook、mobile API）
│       └── stripe/webhook/route.ts
├── components/                 # 所有可复用 UI（client + server 混放）
│   ├── ui/                     # shadcn/ui 原子组件：Button、Card、Dialog...
│   ├── dashboard/              # dashboard 页面专用组合组件（可选 co-locate 到 app/ 里）
│   └── shared/                 # Header、Footer、Modal 等全局
├── lib/                        # 工具函数 + 数据层（最重要安全点）
│   ├── db/                     # Drizzle / Prisma client + schema
│   │   ├── index.ts
│   │   ├── schema.ts
│   │   └── client.ts
│   ├── data/                   # DAL：安全查询封装（getUserSafe、getPosts 等）
│   │   └── users.ts
│   ├── auth.ts                 # getSession / currentUser
│   └── utils.ts
├── actions/                    # Server Actions（可集中，也可 co-locate 到页面旁）
│   └── user.ts
├── hooks/                      # client hooks（useQuery 等）
├── types/                      # .ts 类型
├── public/                     # 静态资源（图片、favicon）
├── drizzle/                    # Drizzle migrations（如果用 Drizzle Kit）
└── .env
```
