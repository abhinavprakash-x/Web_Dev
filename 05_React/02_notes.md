1. npm init
2. npm install react
3. npm install react-dom
4. npm install -D vite
5. npm install (installs all packages from package.json)


## NPM
Node Package Manager (Unofficial full form)
Like Google Drive but for JS Packages.

In package.json dependency versions can include `^` which means
this version or higher minor/patches. `~` means only patches.
versions are in the form X.Y.Z
where X = Major Version, Y = Minor Version, Z = Patch

dependencies are required at production, dev dependencies are only required while building
but not at production.

`package-lock.json` is a locked version with fixed version numbers for all dependencies.


## Vite
Vite is a bundler (extremely fast and optimized for real world apps)
Other bundlers
- webpack
- parcel

Vite contains `ESBuild` which is a more advanced version of babel used for jsx to js conversion.

`NOTE: Must Use type="module" in script tag so browser understands this is modern JS`

In package.json
```json
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "echo \"Error\" && exit 1"
}
```
Then `npm run build` to build production ready code i.e. bundle and make optimized code.
Only the code needed is put in these files.

Shortcut: `npm create vite@latest`

- export default function App() {}
- import App from "./App.jsx"
- Only one default export per file and filename must be same and first letter capital.

- named export
- export function Abhinav() {}
- import {Abhinav} from "./App.jsx"