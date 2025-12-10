import { Sequelize } from "sequelize";
import { createTable } from "./tables.mjs";

// On attend que la fonction retourne l'instance connectée
export const sequelize = await loadSequelize();
await createTable(sequelize);

/**
 * * @returns {Promise<Sequelize>}
 */
export async function loadSequelize() {
    try {
        // CORRECTION ICI : On utilise process.env pour lire les variables Docker
        const sequelize = new Sequelize(
            process.env.DB_NAME,     // Au lieu de 'thread-api' en dur
            process.env.DB_USER,     // Au lieu de 'root' en dur
            process.env.DB_PASSWORD, // Au lieu de 'root' en dur
            {
                dialect: "mysql",
                // C'est le point CRUCIAL : cela va lire "mysql" depuis le docker-compose
                // Le "|| 'localhost'" sert de sécurité si tu lances le script hors de Docker
                host: process.env.DB_HOST || "localhost" 
            }
        );
        
        await sequelize.authenticate();
        console.log("Connexion à la BDD réussie avec succès !");
        return sequelize;
    } catch (error) {
        console.error("Erreur Sequelize :", error);
        // Petit conseil : ne pas throw ici si tu veux gérer les retries, 
        // mais pour l'instant laissons comme ça.
        throw Error("Échec du chargement de Sequelize");
    }
}