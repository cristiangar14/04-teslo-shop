# Descripción



## Correr en dev

1. Clonar el repositorio
2. Crear una copia del archivo ```.env.template``` ye renombrarlo a ```.env``` y cambiar las variables de entorno
3. Instalar dependencias ```npm install```
4. levantar la base de datos ```docker compose up -d```
5. correr las migraciones de prisma ```npx prisma migrate dev```
6. ejecutar seed  ```npm run seed```
7. Correr el proyecto ```npm run dev```



## Correr en prod