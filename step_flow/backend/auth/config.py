import os
from dotenv import load_dotenv
from passlib.context import CryptContext

load_dotenv()

# JWT settings
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key") # Лучше брать из переменных окружения, но для начала и так сойдет, хули
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", 7))

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Database
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/dbname") # Это тоже в .env должно быть, пидоры!

# OAuth2
OAUTH2_SCHEME = None # Инициализируем позже, когда FastAPI приложение будет

# CORS
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",") # Для разработки похуй, но на проде надо конкретные домены