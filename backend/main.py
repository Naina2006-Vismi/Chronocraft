from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
import uvicorn
import json
import os

from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base, get_db
import models

# Create tables if they don't exist (in a real app, use Alembic migrations)
# Base.metadata.create_all(bind=engine) # Will fail if DB is not running, uncomment later

app = FastAPI(title="ChronoCraft API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Schemas ---

class DesignCreate(BaseModel):
    name: str = "Custom Design"
    components: dict

class DesignResponse(BaseModel):
    id: int
    name: str
    components: dict

    class Config:
        from_attributes = True

class WatchResponse(BaseModel):
    id: int
    brand: str
    model: str
    reference_price: float
    current_price: float
    currency: str
    style: str
    attributes: dict
    image_url: str

    class Config:
        from_attributes = True

# --- Helper for Mock Data ---
def get_mock_watches():
    filepath = os.path.join(os.path.dirname(__file__), 'data', 'watches.json')
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except Exception:
        return []

# --- Endpoints ---

@app.get("/")
def read_root():
    return {"message": "Welcome to the ChronoCraft API"}

@app.post("/designs", response_model=DesignResponse)
def create_design(design: DesignCreate, db: Session = Depends(get_db)):
    # Mocking user_id for now as authentication is postponed
    db_design = models.WatchDesign(
        name=design.name,
        components=design.components
    )
    db.add(db_design)
    try:
        db.commit()
        db.refresh(db_design)
        return db_design
    except Exception as e:
        db.rollback()
        # If DB is not available, we return a mock response for UI development
        print(f"Database error: {e}")
        return DesignResponse(id=999, name=design.name, components=design.components)

@app.get("/designs/{design_id}", response_model=DesignResponse)
def get_design(design_id: int, db: Session = Depends(get_db)):
    try:
        design = db.query(models.WatchDesign).filter(models.WatchDesign.id == design_id).first()
        if design is None:
            raise HTTPException(status_code=404, detail="Design not found")
        return design
    except Exception as e:
         # Mock fallback if DB is down
         if design_id == 999:
             return DesignResponse(id=999, name="Mock Design", components={"case": "steel", "dial": "blue"})
         raise HTTPException(status_code=500, detail="Database connection failed")

@app.get("/watches", response_model=List[WatchResponse])
def get_watches(brand: Optional[str] = None, style: Optional[str] = None, db: Session = Depends(get_db)):
    try:
        query = db.query(models.Watch)
        if brand:
            query = query.filter(models.Watch.brand == brand)
        if style:
            query = query.filter(models.Watch.style == style)
        watches = query.all()
        # Fallback to mock data if DB is completely empty (never seeded)
        if not watches:
            raise Exception("Empty DB")
        return watches
    except Exception:
        # Mock fallback
        mock_data = get_mock_watches()
        if brand:
            mock_data = [w for w in mock_data if w['brand'] == brand]
        if style:
            mock_data = [w for w in mock_data if w['style'] == style]
        return mock_data

@app.get("/watches/{watch_id}", response_model=WatchResponse)
def get_watch(watch_id: int, db: Session = Depends(get_db)):
    try:
        watch = db.query(models.Watch).filter(models.Watch.id == watch_id).first()
        if not watch:
            raise HTTPException(status_code=404, detail="Watch not found")
        return watch
    except Exception:
        mock_data = get_mock_watches()
        watch = next((w for w in mock_data if w['id'] == watch_id), None)
        if not watch:
            raise HTTPException(status_code=404, detail="Watch not found")
        return watch

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
