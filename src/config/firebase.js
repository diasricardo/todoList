import admin from "firebase-admin";
import dotenv from "dotenv";
import { readFileSync } from "fs";

// Carrega as variáveis de ambiente do arquivo .env para o processo atual
dotenv.config();

// Carrega as credenciais do Firebase a partir do arquivo JSON
const serviceAccount = JSON.parse(readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_KEY));

// Inicializa o Firebase Admin SDK com as credenciais carregadas
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), // Usa as credenciais para autenticar o Firebase
});

// Obtém uma instância do Firestore (banco de dados do Firebase)
const db = admin.firestore();

// Exporta a instância do Firestore para ser usada em outros arquivos
export { db };

