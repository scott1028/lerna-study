### Introduce

- This is a project scaffold using swagger driven style to develop backend api.
- Please use `localhost` as your development page whe using swagger. if you use `127.0.0.1`, sometime it will cause cors domain issue at api proxy.

### Project Structure

##### src/

##### src/backend/app.es6.js

- Your api server is here.

##### src/frontend/App.jsx

- Your frontend is here.

##### src/fixtures/**

- Your fixtures for fake data server.

#### src/yaml/**

- Your swagger yaml file is here.

### dotenv

- Configure target environment

```
# .env
NODE_ENV=production
```

```
# .env
NODE_ENV=development
```

### How to run

- Interactive API Doc

```sh
$ yarn
$ yarn lift
```

- open `http://127.0.0.1:3000/api-docs/` for api-doc or `http://127.0.0.1:3000` for web-interface

- Interactive API Doc Editor

```sh
$ yarn
$ yarn lift:edit
```

### Troubleshooting

- This project just integrates webpack with gulp.
- Notice! `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p` for resolution when gulp throw ENOSPC error.
- Express will handle `ETag` to control cache mechanism by default so when using with `Browsersync` sometime it will not connect websocket due to same ETag cause a old cached data retrieval.
- Ref: https://stackoverflow.com/questions/15191511/disable-etag-header-in-express-node-js

### What's following package for?

- `swagger-express-mw`: providing swagger.yaml to check api existing or not such as response no implemented message to client.
- `swagger-ui-express`: providing swagger-ui for user to browse the api-doc online.
- `js-yaml`: for loading swagger.yaml as loading swagger.json file.

### Reference

- Swagger Editor, we used from `node_modules/swagger-editor`
- Swagger UI, we used from `public/**` created by `swagger-ui` of npm package and copy the `dist` folder to `public` here
