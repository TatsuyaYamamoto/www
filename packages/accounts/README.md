# accounts

ref. [auth0]()

## Auth0 Setup flow example

### Tenant

- General
  - Settings
    - Friendly Name
    - Logo URL
    - Support URL
  - Languages
    - en
    - ja

### Connections

- twitter

### Application(SPA)

- Settings
  - Basic Information
    - Name
  - Application Properties
    - Application Logo
      - https://cdn.sokontokoro-factory.net/auth0/dl-code-dev.sokontokoro-factory.auth0.png
    - Application Type
      - Single Page Application
  - Application URIs
    - Allowed Callback URLs
      - http://localhost:3000
      - http://localhost:3000/callback
      - http://dl-code-dev.web.app
      - http://dl-code-dev.web.app/callback
    - Allowed Logout URLs
      - http://localhost:3000
      - http://dl-code-dev.web.app
    - Allowed Web Origins
      - http://localhost:3000
      - http://dl-code-dev.web.app
- Connections
  - something...
