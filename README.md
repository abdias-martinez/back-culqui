

# Levantar proyecto

1. Clonar el repositorio
2. Instalar dependencias
```
npm install
```
## Stack en desarrollo
* REST API with typescript
* MongoDB Atlas data storage
* Serverless
* Unit tests and lambda-tester interface test
* AWS lambda function

## Deploy

### Para instalar las dependencias
* Run npm install to install all the necessary dependencies.

### Configuracion local
* El proyecto está configurado por defecto que tome de AWS la url de mongo por mayor seguridad, pero en caso de probar en su local la URL de mongo es la siguiente
```
mongodb+srv://admin_user:ItlnqEdEdbiS7PQb@cluster0.pineioe.mongodb.net/culqui
```
y reemplazar en la configuracion del proccess.env en la conexión la ruta del archivo es la siguiente:
```
src\db\mongo.ts
```

### Implemente en AWS, simplemente ejecute:
```
$ npm run deploy

# or

$ serverless deploy
```