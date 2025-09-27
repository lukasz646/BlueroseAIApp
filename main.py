# main.py
from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS – gdybyś testował z przeglądarki/web
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # możesz tu wpisać konkretny origin
    allow_methods=["*"],
    allow_headers=["*"],
)

class Status(BaseModel):
    running: bool
    updated_at: str | None = None

_state = {"running": False, "updated_at": None}

# === ZGODNIE Z FRONTENDEM ===
@app.get("/status", response_model=Status)
def get_status():
    return Status(running=_state["running"], updated_at=_state["updated_at"])

@app.post("/bot/start")
def start_bot():
    _state["running"] = True
    _state["updated_at"] = datetime.utcnow().isoformat()
    print("✅ BOT został uruchomiony.")
    return {"ok": True}

@app.post("/bot/stop")
def stop_bot():
    _state["running"] = False
    _state["updated_at"] = datetime.utcnow().isoformat()
    print("🛑 BOT został zatrzymany.")
    return {"ok": True}
