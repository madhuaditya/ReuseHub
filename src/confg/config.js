const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId1: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID1),
    appwriteCollectionId2: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID2),
    appwriteCollectionId3: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID3),
    appwriteCollectionId4: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID4),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    recoveryPoint: String (import.meta.env.VITE_RECOVERY_OPINT_URL)
}
export default conf