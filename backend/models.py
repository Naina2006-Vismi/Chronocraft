from sqlalchemy import Column, Integer, String, Float, ForeignKey, JSON, DateTime
from sqlalchemy.orm import relationship
from pgvector.sqlalchemy import Vector
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    preferences = Column(JSON, default={})
    created_at = Column(DateTime, default=datetime.utcnow)

    designs = relationship("WatchDesign", back_populates="user")
    wishlist = relationship("Wishlist", back_populates="user")

class Watch(Base):
    __tablename__ = "watches"

    id = Column(Integer, primary_key=True, index=True)
    brand = Column(String, index=True)
    model = Column(String, index=True)
    reference_price = Column(Float)
    current_price = Column(Float)
    currency = Column(String, default="USD")
    style = Column(String)
    attributes = Column(JSON) # e.g., {"case_material": "steel", "dial_color": "blue"}
    image_url = Column(String)

    # 512 dimensions for CLIP/SigLIP
    embedding = Column(Vector(512))

    offers = relationship("SellerOffer", back_populates="watch")

class SellerOffer(Base):
    __tablename__ = "seller_offers"

    id = Column(Integer, primary_key=True, index=True)
    watch_id = Column(Integer, ForeignKey("watches.id"))
    seller = Column(String)
    price = Column(Float)
    warranty = Column(String)
    return_policy = Column(String)
    seller_signals = Column(JSON) # e.g., {"authorized": True, "rating": 4.8}
    last_checked = Column(DateTime, default=datetime.utcnow)

    watch = relationship("Watch", back_populates="offers")

class WatchDesign(Base):
    __tablename__ = "watch_designs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True) # nullable for guest users
    name = Column(String, default="Custom Design")
    components = Column(JSON) # Selected case, dial, strap, etc.
    style_summary = Column(String, nullable=True)
    preview_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="designs")

class Wishlist(Base):
    __tablename__ = "wishlists"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    watch_id = Column(Integer, ForeignKey("watches.id"), nullable=True)
    design_id = Column(Integer, ForeignKey("watch_designs.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="wishlist")
