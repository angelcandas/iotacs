# IoTACS: IoT device dashboard

A full-stack IoT platform I built in 2018: register devices, stream their sensor data over MQTT, see it live on charts, and send commands back to the device from the browser.

> **Status:** archived portfolio project (2018). The Heroku deployment went offline when Heroku ended its free tier, so there is no live demo. The code is kept here as a record of the architecture.

## How it works

```
 ┌───────────────┐   MQTT over WebSockets   ┌────────────────┐
 │  IoT devices  │ ───────────────────────▶ │  iotacsmqtt    │
 └───────────────┘   publish {token, data}  │  Mosca broker  │
                                            └───────┬────────┘
                                 auth + store       │ REST
                                                    ▼
 ┌───────────────┐       REST + JWT        ┌────────────────┐     ┌────────────┐
 │  iotacs (this │ ◀─────────────────────▶ │  iotacsback    │ ──▶ │ PostgreSQL │
 │  repo) React  │                         │  Express API   │     └────────────┘
 └───────┬───────┘                         └────────────────┘
         │  live updates + commands (MQTT/WSS)
         └──────────────────────────────▶ broker
```

| Repo | Role | Stack |
|---|---|---|
| **iotacs** (this repo) | Web dashboard | React 16, PrimeReact, Chart.js / ECharts / Google Charts, Konva, mqtt.js |
| [iotacsback](https://github.com/angelcandas/iotacsback) | REST API: users, device tokens, readings | Node, Express, Knex, PostgreSQL, JWT, bcrypt |
| [iotacsmqtt](https://github.com/angelcandas/iotacsmqtt) | MQTT broker; checks each publisher against the API before accepting data | Node, Mosca |

## Features

- **Accounts:** sign up and sign in, with JWT-protected API routes and bcrypt-hashed passwords.
- **Device tokens:** each device gets its own token; data published with a token is stored against that device only.
- **Live dashboard:** a card per device with line, radar and temperature gauge charts, updated in real time over MQTT.
- **Remote actions:** send a command or ask a device for a fresh reading ("Data now") from its card.
- **Extras:** a whiteboard (Konva) and an image face-detection demo using the Clarifai API.

## Run locally

This is 2018-era code (Create React App 1, React 16) and expects an older Node (8 or 10).

```bash
npm install
npm start          # http://localhost:3000
```

The API URL is set in `src/services/Global.jsx`, and the MQTT broker URL in `src/components/Device/Device.js`.
