# Sokontokoro Factory WWW

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

hosted at [https://www.sokontokoro-factory.net/](https://www.sokontokoro-factory.net/).

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

### config

_dev or pro on firebase_

```bash
$ firebase functions:config:get
{
  "youtube_data_api": {
    "api_key": "***"
  }
}

```

_local_

[Ref.](https://firebase.google.com/docs/functions/local-shell?hl=ja)

```bash
// "project root"に設置する!
// 理由: https://github.com/firebase/firebase-functions/blob/edcb35dd042cf350d50dfb618d60d0a5686e06fd/src/config.ts#L72
$ firebase functions:config:get > .runtimeconfig.json
```
