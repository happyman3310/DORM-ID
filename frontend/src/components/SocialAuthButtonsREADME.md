Настройка социальных сетей
Google OAuth2
Перейдите на Google Developers Console .
Создайте новый проект.
В разделе "Credentials" создайте новую OAuth 2.0 Client ID.
Введите URI перенаправления (http://localhost:5000/api/auth/google/callback).
Сохраните полученные Client ID и Client Secret в вашем файле .env.
Facebook OAuth2
Перейдите на Facebook for Developers .
Создайте новое приложение.
В разделе "Settings" -> "Basic" найдите ваши App ID и App Secret.
В разделе "Products" -> "Facebook Login" настройте URI перенаправления (http://localhost:5000/api/auth/facebook/callback).
Сохраните полученные App ID и App Secret в вашем файле .env.
Пример файла .env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
JWT_SECRET=your_jwt_secret
PORT=5000
MONGO_URI=mongodb://mongo:27017/dorm
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=dorm_db
POSTGRES_HOST=db
POSTGRES_PORT=5432