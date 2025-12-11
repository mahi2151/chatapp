import "dotenv/config";


export const ENV = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/myapp",
    JWT_SECRET: process.env.JWT_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
    CLIENT_URL: process.env.CLIENT_URL,
    NODE_ENV: process.env.NODE_ENV || "development",
};

//PORT=3000
//MONGO_URL= "mongodb+srv://mahiyadav21nov_db_user:YJwKe4QOW5JTV1Ep@cluster0.qs2tbxp.mongodb.net/?appName=Cluster0"
//NODE_ENV=development node server.js

//JWT_SECRET=my_jwt_secret_key

//RESEND_API_KEY=re_hwQW3A4G_Fv9epuPaRDDX5ArpZEWHBqee 

//EMAIL_FROM="onboarding@resend.dev"
//EMAIL_FROM_NAME="MAHI YADAV"
//CLIENT_URL=http://localhost:5173