from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import random
import asyncio
import uvicorn

app = FastAPI()

# Allow React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        print(f"✅ Client connected ({len(self.active_connections)} total)")

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        print(f"❌ Client disconnected ({len(self.active_connections)} total)")

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception:
                self.disconnect(connection)


manager = ConnectionManager()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)

    # Initial realistic startup state
    previous_temp = 75.0             # Holding temperature
    previous_humidity = 60.0         # Typical internal humidity
    target_temp = 75.0               # Target holding temp °C

    try:
        while True:

            # --- Door Open Simulation ---
            door_opened = random.random() < 0.05  # 5% chance each cycle

            # Temperature base drift
            temperature = previous_temp + random.uniform(-0.3, 0.3)

            if door_opened:
                # Sudden realistic drop (3–8°C)
                temperature -= random.uniform(3, 8)

            # Clamp realistic temperature range
            temperature = max(55, min(temperature, 85))

            # --- Thermal recovery towards target ---
            recovery_rate = 0.15  # thermal inertia shaping
            temperature += (target_temp - temperature) * recovery_rate

            temperature = round(temperature, 2)

            # --- Humidity drift ---
            humidity = previous_humidity + random.uniform(-1.5, 1.5)
            humidity = max(40, min(humidity, 85))
            humidity = round(humidity, 2)

            # --- Power draw simulation ---
            # When temperature is low → heaters activate more
            temp_diff = target_temp - temperature
            heating_factor = max(0, min(temp_diff / 15, 1))  # normalized 0–1
            base_power = 0.9    # baseline heater load
            power = round(base_power + (heating_factor * 0.9), 2)  # 0.9–1.8 kW

            # --- Voltage fluctuation ---
            voltage = round(230 + random.uniform(-2.5, 2.5), 1)

            # --- Fan speed stability ---
            fan_speed = random.randint(1350, 1550)

            data = {
                "temperature": temperature,
                "humidity": humidity,
                "power": power,
                "voltage": voltage,
                "fan_speed": fan_speed,
                "door_opened": door_opened,
            }

            await manager.broadcast(data)

            # Update rolling state
            previous_temp = temperature
            previous_humidity = humidity

            await asyncio.sleep(2)

    except WebSocketDisconnect:
        manager.disconnect(websocket)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
