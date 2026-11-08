### SUMMARY
tutorial for me on making a node.js, typescript, express backend

### SETUP-ON-CLONE
```
npm install

npx tsx watch ./src/index.tsx
# or `npm run dev` if the package.json in configured
```

### STARTUP

```
npx tsx watch ./src/index.tsx
# or `npm run dev` if the package.json in configured
```
|term|description|
|-|-|
|`npx`| runs a package from npm without installing it globally;<br>uses the copy in `node_modules` if there is one |
|`tsx`| runs TypeScript (and JSX) directly without a compile step;<br>skips type checking, so use `tsc --noEmit` to see type errors |
|`watch`| restarts the script every time you save a file it uses (can be ommited so the script doesnt restart) |
|`index.tsx`| the entry file to run |

### DATABASE CONNECTION

Open http://localhost:3102/browser/ and log in with admin@admin.com / admin.
Then register the database:
1. Servers(right click) -> Register -> Server...
2. General tab, 
- Name: tutorial-express
3. Connection tab:
- Host: postgres
- Port: 5432
- Maintenance database: postgres
- Username: postgres
- Password: postgres

### BACKGROUND

related topics include
|term|description|
|-|-|
|Node.js| `javascript run time that allows js to run outside the browser`|
|React| `is a library for building interfaces out of components`|
|Next.js| `uses node to serve an API for your React UI and other tools that make the UI better`|
|Express| `is a framework on top of node`|

### SETUP-INITIAL
```
npm install express
npm install @types/express --save-dev
npm install typescript tsx @types/node --save-dev

cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
EOF
```
|term|description|
|-|-|
|`--save-dev`| alternatively `-D`<br> marks it as a development dependency (not needed on run)|
|`tsx`| runs typescript without compiling as a script for development |
|`typescript`| TypeScript compiler (tsc), which turns .ts files into JavaScript.|
|`@types/express` | Adds Express types and functions to TypeScript;<br>This allows autocomplete and typechecking  |
|`@types/node`| Adds built-in Node modules' types and functions to TypeScript;<br>This allows autocomplete and typechecking|
|`txconfig.json`| configures that TypeScript compiler|

### TODO
```
```