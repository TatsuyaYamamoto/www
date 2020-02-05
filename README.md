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
