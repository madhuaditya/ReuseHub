import { Client, Account, ID } from "appwrite";
import conf from '../confg/config'
import profileManage from "./profile";

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ name, email, password, phoneNo , enrollmentNo }) {
     
        try {
            const id = ID.unique();
            const res = await this.account.create(id, email, password, name, phoneNo).then((res)=>(res));
            if (res) {

                    const data= await this.createSession(email, password); 

                    if(data.succes)
                    {
                        const userData = await this.currentUser()
                        // console.log(userData)
                        const responce = await profileManage.createProfile(
                        {
                            userId : userData.data.$id,                            
                            name , 
                            enrollmentNo ,
                            phone: phoneNo,
                            email
                        
                        }) 
                    }         
                    return data;
            }
            return false;
        } catch (error) {
            console.error("Error creating account:", error.message);
            return false;
        }
    }

    async passwordChange(email){
        if(!email){
            return false
        }
        try {
            const promise = this.account.createRecovery(email, 
                conf.recoveryPoint 
            );

            promise.then(function (response) {
               return   response   // Success
            }, function (error) {
                console.log(error); 
                return false// Failure
            });
        } catch (error) {
            console.log("Appwrite throow error to send mail " , error.message)
            return false 
        }
    }

    async changeChage(userId , secret , password){
       try {
        const promise = this.account.updateRecovery(
            userId,
            secret,
            password
        ).then(res=>res);
        return {succes:true ,data : promise}
        // Failure
           
       } catch(error){
        console.log(error)
        return  {succes:false ,message : error}
       }
        
    }

    async createSession(email, password) {
        try {
         
            const responce = await this.account.createEmailPasswordSession(email, password).then((res)=>( res));
            if(responce){
               
               return {succes : true, data : responce}
            }
            return {succes: false , message: "unable to login"} 
        } catch (error) {
            console.error("Error during login:", error.message);
            return {succes: false , message: error.message} 
        }
    }

    async deleteSession() {
        try {
            const res = await this.account.deleteSessions();
            return res || false;
        } catch (error) {
            console.error("Error logging out:", error.message);
            return false;
        }
    }

    async currentUser() {
        try {
            const res = await this.account.get().then((res)=>(res));
            if(res){
               
                return {succes: true , data : res}
            }else {
                return {
                    succes: false,
                    message : "Ueser Not defind",
                }
            }
        } catch (error) {
            console.error("Error fetching current user:", error.message);
            return false;
        }
    }
}

const authService = new AuthService();
export default authService;
