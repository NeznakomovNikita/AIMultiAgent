from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .auth import models as auth_models
from .auth.router import router as auth_router
from .database import engine, Base
from .auth.config import ALLOWED_ORIGINS

# Создаем таблицы в БД (если их нет)
# В реальном проекте лучше использовать Alembic для миграций, но для начала похуй
auth_models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Step Flow API",
    description="API для проекта Step Flow, нахуй!",
    version="0.1.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS, # Список разрешенных источников
    allow_credentials=True,
    allow_methods=["*"], # Разрешаем все методы, хули нам
    allow_headers=["*"], # И все заголовки тоже
)

# Подключаем роутер аутентификации
app.include_router(auth_router, prefix="/auth", tags=["Auth"])

@app.get("/")
async def root():
    return {"message": "Здарова, заебал! Это API для Step Flow."}

# Тут можно будет добавить другие роутеры для workflow и прочей хуйни