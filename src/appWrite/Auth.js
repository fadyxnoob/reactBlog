import config from '../config/config';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    constructor() {
        this.client = new Client()
            .setEndpoint(config.appWriteUrl) // Your Appwrite Endpoint
            .setProject(config.appWriteProjectID); // Your project ID

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("Failed to Signup ::", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession (email, password);
            localStorage.setItem('appwriteSession', JSON.stringify(session));
            return session;
        } catch (error) {
            console.error("Login error:: Failed to Login :: ", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Appwrite service :: getCurrentUser :: error", error);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            localStorage.removeItem('appwriteSession');
        } catch (error) {
            console.error("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;
