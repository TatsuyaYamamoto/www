# Sokontokoro Factory Apps

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Apps

### www

website hosted at [https://www.sokontokoro-factory.net/](https://www.sokontokoro-factory.net/).

### api

functions used across projects in "そこんところ工房".

## Scripts

```
// Start development server.
$ npm start

// Build any codes, imagemin and copy assets.
$ npm run build

// Should exec before deploy.
// Hook production build script before.
$ npm version {major,minor,patch}

// Format code with prettier
// But, it will be executed before commit automatically.
$ format
```

## Note

### Firebase Targeting

```bash
$ firebase target:apply hosting w3-dev  w3-dev-sokontokoro-factory
$ firebase target:apply hosting api-dev api-dev-sokontokoro-factory
```

_Why is the target name and hosting identifier "w3" instead of "www"?_

=> www を含む文字列を firebase hosting の識別子に使えなかったから...

### firebase functions config for api package

_dev_

```shell script
$ firebase functions:config:get --project sokontokoro-factory-develop
```

```shell script
$ KEY=youtube_data_api                  ; firebase functions:config:set $KEY="$(cat .runtimeconfig.json | jq ".$KEY")" --project sokontokoro-factory-develop
$ KEY=cert.games_sokontokoro_factory_net; firebase functions:config:set $KEY="$(cat .runtimeconfig.json | jq ".$KEY")" --project sokontokoro-factory-develop
$ KEY=cert.dl_code_web_app              ; firebase functions:config:set $KEY="$(cat .runtimeconfig.json | jq ".$KEY")" --project sokontokoro-factory-develop
$ KEY=auth0                             ; firebase functions:config:set $KEY="$(cat .runtimeconfig.json | jq ".$KEY")" --project sokontokoro-factory-develop
```

_pro_

```shell script
$ firebase functions:config:get --project sokontokoro-factory
```

```shell script
$ KEY=youtube_data_api                  ; firebase functions:config:set $KEY="$(cat .runtimeconfig.pro.json | jq ".$KEY")" --project sokontokoro-factory
$ KEY=cert.games_sokontokoro_factory_net; firebase functions:config:set $KEY="$(cat .runtimeconfig.pro.json | jq ".$KEY")" --project sokontokoro-factory
$ KEY=cert.dl_code_web_app              ; firebase functions:config:set $KEY="$(cat .runtimeconfig.pro.json | jq ".$KEY")" --project sokontokoro-factory
$ KEY=auth0                             ; firebase functions:config:set $KEY="$(cat .runtimeconfig.pro.json | jq ".$KEY")" --project sokontokoro-factory

```

```bash
// cert.games_sokontokoro_factory_net
$ firebase functions:config:set --project sokontokoro-factory-develop cert.games_sokontokoro_factory_net="$(cat .runtimeconfig.json | jq '.cert.games_sokontokoro_factory_net')"

// cert.dl_code_web_app
$ firebase functions:config:set --project sokontokoro-factory-develop cert.dl_code_web_app="$(cat .runtimeconfig.json | jq '.cert.dl_code_web_app')"

// auth0
$ firebase functions:config:set --project sokontokoro-factory-develop auth0="$(cat .runtimeconfig.json | jq '.auth0')"
```

_local_

[Ref.](https://firebase.google.com/docs/functions/local-shell?hl=ja)

```bash
// "project root"に設置する!
// 理由: https://github.com/firebase/firebase-functions/blob/edcb35dd042cf350d50dfb618d60d0a5686e06fd/src/config.ts#L72
$ firebase functions:config:get > .runtimeconfig.json
```
