from fastapi import APIRouter, Depends, HTTPException, status
from jose import jwt, JWTError # Добавим JWTError на всякий случай, вдруг где пригодится
from sqlalchemy.orm import Session

from ..database import get_db
from . import schemas, crud, security

router = APIRouter()

# Эндпоинт для регистрации нового пользователя нахуй
@router.post("/register", response_model=schemas.Token, status_code=status.HTTP_201_CREATED)
async def register_user(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user_in.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Этот email уже занят, братан, придумай другой"
        )
    user = crud.create_user(db=db, user=user_in)
    
    access_token = security.create_access_token(
        data={"sub": user.email}
    )
    refresh_token = security.create_refresh_token(
        data={"sub": user.email}
    )
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

# Эндпоинт для входа пользователя в систему, ебать его в сраку
@router.post("/login", response_model=schemas.Token)
async def login_for_access_token(form_data: schemas.UserCreate, db: Session = Depends(get_db)): # Используем UserCreate для простоты, хотя по-хорошему нужна отдельная схема для логина
    user = crud.get_user_by_email(db, email=form_data.email)
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неправильный email или пароль, лошара",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = security.create_access_token(
        data={"sub": user.email}
    )
    refresh_token = security.create_refresh_token(
        data={"sub": user.email}
    )
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

# Эндпоинт для обновления токенов, блядь
@router.post("/refresh_token", response_model=schemas.Token)
async def refresh_access_token(refresh_token_str: str, db: Session = Depends(get_db)): # Принимаем refresh токен как строку в теле запроса, можно и через заголовок, но так проще для начала
    token_data = security.decode_token(refresh_token_str)
    if not token_data or not token_data.email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh токен хуевый или протух, иди нахуй логинься заново",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Проверим, что это действительно refresh токен, а не какая-то хуйня
    # В security.py мы добавляли "token_type": "refresh" в пейлоад рефреш токена
    try:
        payload = jwt.decode(refresh_token_str, security.SECRET_KEY, algorithms=[security.ALGORITHM])
        if payload.get("token_type") != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Это не refresh токен, ты че, охуел?",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except JWTError:
         raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh токен совсем хуевый, даже не парсится",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = crud.get_user_by_email(db, email=token_data.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Пользователя с таким email не существует, пиздец",
            headers={"WWW-Authenticate": "Bearer"},
        )

    new_access_token = security.create_access_token(data={"sub": user.email})
    new_refresh_token = security.create_refresh_token(data={"sub": user.email}) # Генерируем и новый refresh токен на всякий случай
    
    return {
        "access_token": new_access_token,
        "refresh_token": new_refresh_token,
        "token_type": "bearer"
    }

# Эндпоинт для выхода пользователя из системы. Просто, блядь, как два пальца обоссать.
@router.post("/logout", response_model=schemas.Msg)
async def logout():
    # Для JWT-аутентификации, выход на стороне сервера обычно не требует сложных действий,
    # типа добавления токена в черный список (хотя это было бы безопаснее).
    # Клиент просто должен удалить токен у себя.
    # Мы просто вернем сообщение, что все заебись.
    return {"message": "Ты успешно вышел, пиздуй отсюда!"}

# Все, блядь! Можно идти пить пиво!