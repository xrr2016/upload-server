# Upload server

🌩A node.js server that uploads files to cloud


## Api
post /upload

## Dev

```bash
npm i
npm run dev
open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
docker build -t upload-server .

docker stop upload-server
docker rm upload-server

docker run -d -p 7001:7001 --rm --name=upload-server upload-server
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+
