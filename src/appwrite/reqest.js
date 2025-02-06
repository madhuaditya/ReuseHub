
import { Client , Databases, ID, Query} from "appwrite";
import conf from "../confg/config"
import service from './manage'

import profileManage from './profile'

    class Request {
        client = new Client();
        database ;
        constructor(){
            this.client 
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.database = new Databases(this.client);
        }

        async createRequest (itemId , userId, {...prop} ){
            // console.log("yes me called")
            if(!itemId|| !userId ){
                return {success:false , message : "Missing item Id or UserId Please update Profile"}
            }
            try {
                const id = ID.unique();
                const resonce =await this.database.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId4,
                    id,
                    {
                        itemId,
                        userId,
                       ...prop
                    }
                ).then(res=>res)
                return {success: true, data : resonce}

                
            } catch (error) {
                console.log("Appwrite throw excpetion to create request", error.message)
                return {success:false , message: error.message}
            }
        }

        async getReqest(reqestId){
            if(!reqestId){
                return {success: false , message: "Missing requesId"}
            }
            try {

                const responce = await this.database.getDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId4,
                    reqestId
                ).then(res=> res)
                if(responce){
                    return {success:true, data : res}
                }
                return {success:false , message: res}
            } catch (error) {
                console.log("Appwrite throw error to get reqest" , error.message);
                return {success: false , message: error.message}
            }
        }

        async updateRequest(reqestId, takenBy){
            if(!reqestId || !takenBy){
                return {success: false , message: "Missing field please update your Profle"}
            }

            try {
                const responce = await this.database.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId4,
                    reqestId,
                    {
                        takenBy
                    }
                ).then(res=> res)
                if(responce){
                    return {success:true, data : responce}
                }
                return {success:false , message: "Unable to update"}
                
            } catch (error) {
                console.log("Appwrite throw exception to update reqest Data", error.message);
                return {success: false , message:error.message}
            }
        }
        
        async deleteOneRequest(reqestId){
            if(!reqestId){
                return {success: false , message: "Missing requesId"}
            }
            try {

                const responce = await this.database.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId4,
                    reqestId
                ).then(res=> res)
                if(responce){
                    return {success:true, data : res}
                }
                return {success:false , message: res}
            } catch (error) {
                console.log("Appwrite throw error to Delete " , error.message);
                return {success: false , message: error.message}
            }
        }

        async deleteAllReqestByItemId(itemId){
            if(!itemId){
                return {succes: false , message: "Missing itemId field"}
            }
            try {
                 return {succes:true, data:"Deleted all items"}
            } catch (error) {
                console.log("Appwrite throw exception to deleteAllReqest ByItemId");
                
            }
        }
        async isSended (userId, itemId){
            if(!userId|| !itemId){
                return {
                    succes: false ,
                    message: "Missing Filed userId and ItemId"
                }
            }

            try {
                const res = await this.database.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId4,
                    [
                        Query.equal("userId", userId),
                        Query.equal("itemId", itemId)
                    ]
                ).then(res=> res)
                if(res){
                    if(res.documents[0]){
                        // console.log(res)
                        return {succes: true, data :"your sendend reqest already for this item"}
                    }
                }
                
                return {
                    succes: false,
                    message: "Not find Item"
                }

            } catch (error) {
                console.log("appwrte throw error", error.message)
                return {succes: false , message: error.message}
            }


        }

        async getReqestByItemId(itemId){
            if(!itemId){
                return {success: false , message: "ItemId missing field"}
            }
            try {
                
                const resonce = await this.database.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId4,
                    [
                        Query.equal("itemId", itemId)
                    ]
                ).then(res=> res)

                if(resonce){
                    return {success:true, data : resonce.documents}
                }
                return {success: false , message: resonce}
                
            } catch (error) {
                console.log("Appwrite thow error in getreqest by Id", error.message)
                return {success: false , message: error.message}
            }
        }


        async getReqestByUserId(userId){
            if(!userId){
                return {success: false , message: "userId missing field"}
            }
            try {
                
                const resonce = await this.database.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId4,
                    [
                        Query.equal("userId", userId)
                    ]
                ).then(res=> res)

                if(resonce){
                    return {success:true, data : resonce.documents}
                }
                return {success: false , message: resonce}
                
            } catch (error) {
                console.log("Appwrite thow error in getreqest by Id", error.message)
                return {success: false , message: error.message}
            }
        }

        async getUserDetailByReqestId(reqestId){
            const  responce = await this.getReqest(reqestId)
            if(!responce.success){
                return responce;
            }
            const userId = responce.data.userId;
            const responce2 = await profileManage.getProfile(userId)
            if(!responce2.success) return responce2
            const userData = responce2.data.documents[0]
            const data = {
                userId:userData.userId,
                name : userData.name,
                address: userData.address,
                contect: userData.contect
            }
            return {success:true, data: data}
        }

     async getItemDetailByReqestId(reqestId){
            const  responce = await this.getReqest(reqestId)
            if(!responce.success){
                return responce;
            }
            const itemId = responce.data.itemId;

            const responce2 = await service.getDirectItem(itemId)
            if(!responce2.succes) return responce2
            const itemData = responce2.data
            const data = {
                itemId: itemData.itemId,
                name : itemData.name,
                address: itemData.address,
                contect: itemData.contect,
                price: itemData.price,
                owner: itemData.owner,
                takenBy: itemData.takenBy
            }
            return {success:true, data: data}
        }

}

const request = new Request();
export default request;