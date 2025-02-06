import { Client, Storage , Databases, ID, Query} from "appwrite";
import conf from "../confg/config";

// import authService from "./auth";
class Service {
    client =  new Client();
    storage ;
    database;
    constructor(){
        this.client 
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.database = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

   // create items
    async createItem({
        userId ,
        name,
        category,
        description,
        condition,
        spacification,
        price,
        owner,
        status, 
        location,
        contect,
        featuredImage,
        
    }){
        
       
      try {
        const id = ID.unique()
        const res = await this.database.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId2,
            id,
            {
                itemId: id,
                userId ,
                name,
                category,
                description,
                condition,
                spacification,
                 price:Number(price),
                owner,
                status, 
                location,
                contect,
                featuredImage,
                uploadDate : Date.now(),
                
            }
        ).then(res=>res)
        if(res){
            return {succes : true, data: res}
        }else{
            return {succes : false , message : "Unable to upload item" }
        }
      } catch (error) {
        console.log("Appwrite throw error to uploade items "+ error.message);
         return {succes : false , message : error.message }
      }
    }
   // update items
    async updateItem(itemId, data){
        try {
            const res = await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId2,
                itemId,
                {
                itemId: data.itemId,
                userId: data.userId ,
                name : data.name,
                category : data.category,
                description:data.description,
                condition : data.condition,
                spacification :data.spacification,
                price :Number(data.price),
                owner: data.owner,
                status: data.status, 
                location : data.location,
                contect :data.contect,
                featuredImage :data.featuredImage,
                
                }
            )
            if(res){
                return {succes : true, data : res};
            }else {
                return {succes : false , message : "unable to update itme. "}
            }
        } catch (error) {
            console.log("Appwrite throe error to updating itmes "+ error.message)
            return {succes : false , message : error.message}
        }
    }
   // delete items
    async deleteItem (itemId){
        try{
            return await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId2,
                itemId
            )
        }catch(error){
            console.log("Appwrite throw error to delete item "+ error.message);
            
        }
    }
   // inactive item
   async inactive(itemId){
            try {
                const res = await this.database.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId2,
                    itemId,
                    {
                        state : "inactive"
                    }
                )
                if(res){
                    return {succes : true, data : res};
                }else {
                    return {succes : false , message : "unable to update itme. "}
                }
            } catch (error) {
                console.log("Appwrite throe error to updating itmes "+ error.message)
                return {succes : false , message : error.message}
            }
        }
   // set item stauts 
   async setStatus(itemId , status){
    try {
        const res = await this.database.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId2,
            itemId,
            {
                status
            }
        )
        if(res){
            return {succes : true, data : res};
        }else {
            return {succes : false , message : "unable to update itme. "}
        }
    } catch (error) {
        console.log("Appwrite throe error to updating itmes "+ error.message)
        return {succes : false , message : error.message}
    }
}

    async sold( cid , data){
            try {
                const res = await this.database.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId2,
                    cid ,
                    {
                        takenBy:data,
                       status : "Sold" 
                    }
                ).then(res=> res);
                if(res){
                    return {succes : true, data : res}
                }
                return {succes : false , message: "got error"}
            } catch (error) {
                console.log("Appwrite throw error to accept the requst", error.message)
                return {succes: false , message: error.message}
            }
        }

    // get item by id 
    async getItemById(itemId){
          try{
            const res = await this.database.listDocuments(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId2,
                [
                    Query.equal("itemId",[itemId]),
                    Query.equal("status", "Available")
                ]
            ).then(res=>res)
            if(res){
                return {succes : true, data : res}
            }else {
                return {succes: false , message : "unable to get item"}
            }
          }catch(error){
                console.log("Appwrite throw error to get item "+ error.message)
                return {succes: false , message : error.message}
          }
        }

        async getDirectItem(itemId){
            if(!itemId){
                return {succes: false , message: "Missing itemId"}
            }
            try{
              const res = await this.database.getDocument(
                  conf.appwriteDatabaseId, 
                  conf.appwriteCollectionId2,
                  itemId
              ).then(res=>res)
              if(res){
                  return {succes : true, data : res}
              }else {
                  return {succes: false , message : "unable to get item"}
              }
            }catch(error){
                  console.log("Appwrite throw error to get item "+ error.message)
                  return {succes: false , message : error.message}
            }
          }
   // get userspacific itmes 
    async getItemsByUserId(userId){
        // console.log(userId)
            try {
                const res = await this.database.listDocuments (
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId2,
                    [
                        Query.equal("userId",[userId]),
                     
                    ]
                ).then(res=>res)
                if(res){
                    // console.log(res.documents)
                    return {succes : true, data: res.documents}
                }else {
                    return {succes : false , message : "unable to get items "}
                }
            } catch (error) {
                console.log("Appwrite throw error to get item list "+ error.message);
                return {succes : false , message : error.message }
            }
    }
    async getAllItemNotUser(userId, page, category, value) {
        try {
            const num = Number(page);
            const price = Number(value);
            
            // console.log(category, num, " ", price)
            const response = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId2,
                [
                    Query.limit(10),
                    Query.offset(num * 10),
                    Query.notEqual("userId", userId),
                    Query.equal("status", "Available"), // Fixed spelling mistake
                    ...(category.length > 0 ? [Query.equal("category", category)] : []),
                    Query.lessThanEqual("price", price)
                ]
            ).then(res=> res)
            
            // console.log(response)
            if (response) {
                return { success: true, data: response.documents };
            }
            return { success: false, message: "Unable to fetch data" };
        } catch (error) {
            console.error("Appwrite error while fetching data:", error.message);
            return { success: false, message: error.message };
        }
    }
    
    
   // get itmes by time 
   async getItemsByData(data = Date.now()){
    try {
        const res = await this.database.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId2,
            [
                Query.lessThanEqual("date", data)
            ]
        )
        if(res){
            return {succes: true , data : res}
        }
        return {succes: false , message: "unable to get data from appwrite"}
    } catch (error) {
        console.log("Appwrite throw error to get data by date "+error.message);
        return {succes: false , message: error.message}
    }
   }

   // serch items by the name spacifics
   async getItemsBySpacifications(sapacifica=[]){
            try {
                const res = await this.database.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId2,
                    [
                        Query.equal("spacification",sapacifica)
                    ]
                )
                if(res){
                    return {succes: true , data : res}
                }
                return {succes: false , message: "unable to get data from appwrite"}
            } catch (error) {
                console.log("Appwrite throw error to get data by spacifications "+error.message);
                return {succes: false , message: error.message}
            }
   }
   // get items by category 
   async getItmesByCategoy(cat=[]){
               try{ const res = await this.database.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId2,
                    [
                        Query.equal("category",cat)
                    ]
                )
                if(res){
                    return {succes: true , data : res}
                }
                return {succes: false , message: "unable to get data from appwrite"}
            } catch (error) {
                console.log("Appwrite throw error to get data by category "+error.message);
                return {succes: false , message: error.message}
            }
   }
   // get items by the count or number of itmes list
//    async elementByFilter(specification = [], category = [], status = [], price = "50000") {
//     try {
//         console.log("Category:", category);
//         console.log("Specification:", specification);
//         console.log("Status:", status);
//         console.log("Price:", price);

//         const filters = [];

//         // Apply filters only if values exist
//         if (specification.length > 0) filters.push(Query.equal("spacification", specification));
//         if (category.length > 0) filters.push(Query.equal("category", category));
//         if (status.length > 0) filters.push(Query.equal("status", status));
//         if (price) filters.push(Query.lessThanEqual("price", Number(price)));

//         console.log("Filters applied:", filters); // Debugging output

//         const response = await this.database.listDocuments(
//             conf.appwriteDatabaseId,
//             conf.appwriteCollectionId2,
//             filters
//         );

//         console.log("Response:", response);
//         return { success: true, data: response.documents };
//     } catch (error) {
//         console.error("Error fetching filtered elements:", error.message);
//         return { success: false, message: error.message };
//     }
// }
async elementByFilter(userId, specification = [], category = [], status = [], price = "50000") {
    try {
        console.log("Fetching all items...");
       const response = await this.database.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId2,
            [
                Query.notEqual("userId", userId),
                Query.equal("status", "Available") // Fixed spelling mistake
            ]
        );

        if (!response || !response.documents) {
            return { success: false, message: "No data found" };
        }

        // console.log("Total items fetched:", response.documents.length);

        // Filter the items in JavaScript
        const filteredItems = response.documents.filter(item => {
            return (
                ( specification.indexOf(item.spacification)>=0?true: false) &&
                ( category.indexOf(item.category)>=0?true: false) &&
                ( status.indexOf(item.status)>=0?true: false) &&
                (price ? item.price <= Number(price) : true)
            );
        });

        // console.log(filteredItems);

        return { success: true, data: filteredItems };
    } catch (error) {
        console.error("Error fetching or filtering elements:", error.message);
        return { success: false, message: error.message };
    }
}

    // reject any person by the id
    async rejectTouser(id , userId){
        if(!id || !userId){
            return {succes:false, message : " missing parameters"}
        }
        try {
            // reject function  not yet complete 
            // remove to gift request 
            // remove to profile request also

            return {succes:true , data :{}}
        } catch (error) {
            console.log("Appwrite throw error to reject some", error.message)
            return {succes:false , message: error.message}
        }
    }

    // strong function see status of our reqests

     getjson(name , itemId, status) {
        
        return {
            name:name,
            itemId: itemId,
            status:status
        }

    }

    async getStatusById(userId, arr=[]){
        if(!userId){
            return {succes:false , message: "Missing filed"}
        }
        // console.log(arr)
        if(arr.length==0){
            return {succes: true , data:arr}
        }
            // 
           const newArray = await Promise.all(arr.map(async (itm) => {
                const obj = JSON.parse(itm);
                // console.log(obj)
                try {
                    const res = await this.database.getDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteCollectionId2,
                        obj.itemId
                    ).then(res=>res);
            
                    let status = res?.takenBy === obj.userId;
                    return this.getjson(res?.name || obj.name, obj.itemId, status);
                } catch (error) {
                    console.error("Error fetching document:", error);
                    return this.getjson(obj.name, obj.itemId, false);
                }
            }));
             
            return {succes: true, data : newArray}
    }

   // buy setrequest to get item
   async addRequest(itemId, profileId ,{name , userId}, data){
        try {

            const myJSON = JSON.stringify({name , userId});
            const json = JSON.stringify({...data})

            // console.log(myJSON+" "+  json)
            // console.log(itemId+" "+ userId +" "+ name)
            const responce = await this.database.getDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId2,
                    itemId
                   
            ).then((res)=>(res))
            // console.log(" array of the item ",responce)
            const arr1 = responce.request;

            const res2 = await this.database.getDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId1,
                    userId
            ).then(res=> (res))
            // console.log(res2)
            const arr2 = res2.request
            // console.log(" array of the user ",res2)
            arr2.push(json)
            arr1.push(myJSON);
            const res = await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId2,
                itemId,
                {
                  request:  arr1
                }
            ).then(res=>res);
            const res3 = await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId1,
                userId,
                {
                    request:  arr2
                }
            ).then(res=>res);
             if(res && res3){
                return { succes: true, data: res}
             }else {
                return {succes: false , message: res}
             }
            
        } catch (error) {
            console.log(error.message)
            return {succes: false, message : error.message}
        }
   }
   // send feedback
   async sendFeedBack({...props}){
  
    try {
        const id = ID.unique()
        const res = await  this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId3,
            id,
            {
                ...props
            }
      ).then(res=> res)
      if(res){
        return true ;
      }
      else {
        return false ;
      }
    } catch (error) {
        console.log("Appwrite throw errorn in feedback sections " + error.message)
        return false;
    }
      
   }
   // upload image for items or person profile
    async uploadFile(file){
        try {
            const id = ID.unique();
            const res = await this.storage.createFile(
                conf.appwriteBucketId,
                id,
                file
            )
       
            if(res){
                const featuredImage = await this.getFilePreview(id)
                return {succes :true , data :featuredImage};
            }else {
                return {succes :false , message :"unable to uploade image "};
            }
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error.message);
            return {succes :false , message : error.message};
        }
    }

   // delete image form bucket ** importent this

    async deleteFile(fileId){
        try {
           const res = await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            if(res){
                return true ;
            }
            return  false ;
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }
    
    // get file for preview 

  async  getFilePreview(fileId){
        return await this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}
 const serive = new Service();
 export default serive 