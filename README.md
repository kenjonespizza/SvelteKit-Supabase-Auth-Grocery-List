# SvelteKit-Supabase-Auth Shopping List

## [`Demo: https://sveltekit-supabase-auth-grocery-list.vercel.app`](https://sveltekit-supabase-auth-grocery-list.vercel.app/).

## Developing
ENV Vars Need: 
```bash
VITE_SUPABASE_URL=https://XXXXX.supabase.co
VITE_SUPABASE_ANON_KEY=XXXXX
```

Supabase `items` table has the following schema:
```ts
interface Items {
  id: string   /* primary key */;
  created_at?: string;
  text?: string;
  completed?: boolean;
  user_id?: string;
  quantity?: number;
};
```

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
