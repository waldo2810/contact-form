
# Contacts form

## Running locally

### 1. Set up

1. Clone repository
2. Set up `.env` and `.env-docker` files.

### 2. Run

#### 2.1. Run with docker

1. Compose up
```bash
docker compose --env-file ./.env-docker up
```

2. Test

```bash
curl -X POST http://localhost:3000/contacts \
-H "Content-Type: application/json" \
-d '{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@gmail.com",
  "birthDate": "1990-01-01",
  "sex": "male",
  "address": {
    "line1": "123 Main St",
    "line2": "Apt 4B",
    "city": "Bogotá D.C.",
    "state": "DC",
    "country": "CO"
  }
}'
```

#### 2.2. Run with `pnpm`

1. Installation

```bash
$ pnpm install
```

2. Running the app

```bash
# development
$ pnpm run dev
```

3. Test

```bash
curl -X POST http://localhost:3000/contacts \
-H "Content-Type: application/json" \
-d '{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@gmail.com",
  "birthDate": "1990-01-01",
  "sex": "male",
  "address": {
    "line1": "123 Main St",
    "line2": "Apt 4B",
    "city": "Bogotá D.C.",
    "state": "DC",
    "country": "CO"
  }
}'
```
