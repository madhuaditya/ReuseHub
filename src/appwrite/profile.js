import { Client , Databases, Query} from "appwrite";
import conf from "../confg/config";

class Profile {   
    client = new Client();
    account;
    database;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.database = new Databases(this.client);
    }

    async createProfile({ userId, name,enrollmentNo, phone ,email }) {
        try {
      
            if ( !userId || !name || !phone || !enrollmentNo || !email ) {
                // console.log(userId+" "+ name+" "+ phone+" "+ enrollmentNo +" "+ email)
                return { success: false, message: 'Missing required fields' };
            }

            const res = await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId1,
                userId,
                {
                  email, status:true , enrollmentNo,userId, name, phone,date : Date.now(),
                }
            ).then((res)=>(res));
            if (res) {
                return { success: true, data: res };
            }
            return { success: false, message: 'Failed to create profile' };
        } catch (error) {
            console.error("Error creating profile:", error.message);
            return { success: false, message: error.message };
        }
    }

    async updateProfile(userId, {...prop}) {
        try {
            const res = await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId1,
                userId,
                {
                
                    ...prop


                }
            );

            if (res) {
                return { success: true, data: res };
            }
            return { success: false, message: 'Failed to update profile' };
        } catch (error) {
            console.error("Error updating profile:", error.message);
            return { success: false, message: error.message };
        }
    }

    async deleteProfile(userId ) {
        try {
            const result = await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId1,
                userId
            );

            if (result) {
                return { success: true, message: 'Profile deleted successfully' };
            }
            return { success: false, message: 'Failed to delete profile' };
        } catch (error) {
            console.error("Error deleting profile:", error.message);
            return { success: false, message: error.message };
        }
    }

    async getProfile( userId ) {
        try {
            if(!userId){
                return { success: false, message: "userId missing" };
            }
            const res = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId1,
               [
                Query.equal("userId", [userId]),
               ]
            ).then((res)=>(res));
            if (res) {
                return { success: true, data: res };
            }
            return { success: false, message: 'Profile not found' };
        } catch (error) {
            console.error("Error fetching profile data:", error.message);
            return { success: false, message: error.message };
        }
    }
    // password recovery functions 

}

const profileManage = new Profile();
export default profileManage;
