# Connect

An advertising backend server and its web interface.
Built for SFC CLIP.

# Usage

- `/console`
  - Web interface
- `/api`
  - The root of API, which follows [JSON API](http://jsonapi.org) scheme
  - Endpoints:
    - `POST/GET/PATCH/DELETE /api/units`
    - `POST/GET/PATCH/DELETE /api/groups`
- `GET /any/{GroupID}`
  - Return an ID of the fewest accessed unit in the specified group
- `GET /img/{UnitID}`
  - Redirect to the registered image of the specified unit,
    and record an access
- `GET /open/{UnitID}`
  - Redirect to the registered URL of the specified unit,
    and record an access

# Requirements

- go
- Node.js
- MySQL / SQLite3

# Development

```sh
export NODE_OPTIONS=--openssl-legacy-provider
npm --prefix console install
npm --prefix console run dev

go get
go run main.go
```

# Build and run

- `.env.sample`をコピーして`.env`を作る
- `.env`の認証情報を適宜編集

```sh
export NODE_OPTIONS=--openssl-legacy-provider
npm --prefix console install
npm --prefix console run build

go get
go build
./connect --port=PORT --production=1
```
