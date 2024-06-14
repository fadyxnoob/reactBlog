import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

// Creating Class for that database connection
export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectID)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // create mehod to create post 
    async createPost({ title, slug, content, image, status, userID }) {
        try {
            return await this.databases.createDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,
                {
                    title,
                    slug,
                    content,
                    image,
                    status,
                    userID,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: create post :: error", error);
        }
    }

    // creat method to update post
    async updatePost(slug, { title, content, image, status }) {
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updaePost :: error", error)

        }

    }

    // creating a method to delete post 
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: delete post :: error", error);
            return false;
        }

    }

    // getting on post
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,
            )
        } catch (error) {
            console.log("Appwrite service :: get post :: error", error)
            return false;
        }
    }

    //creating method to get getting all posts
    async getPosts(quaries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                quaries,
            )
        } catch (error) {
            console.log("Appwrite service :: Listing Posts :: error", error)

        }
    }

    // File Uploading Methods
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appWriteBucketID,
                ID.unique(),
                file,

            )
        } catch (error) {
            console.log("Appwrite service :: upload file :: error", error)
            return false

        }
    }

    // File Deletng Methods
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appWriteBucketID,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: delete file :: error", error)
            return false;

        }
    }

    // file preview method 
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            config.appWriteBucketID,
            fileId,
        )
    }
}
const service = new Service();
export default service;
