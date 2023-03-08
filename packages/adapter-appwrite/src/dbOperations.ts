import {Client,Databases} from"node-appwrite";
import {nanoid} from "nanoid"
import {
        Adapter,
        AdapterUser,
        AdapterAccount,
        AdapterSession,
        VerificationToken,
      } from "next-auth/adapters"
      


export const createUserFunc = async (appwriteClient,databaseId,userColId,user:AdapterUser)=>{
        const db = new Databases(appwriteClient);
        const userCollection=db.createDocument(databaseId,userColId,nanoid(10),user);
        userCollection.then(function (response){
              return response[0]
        },
                        function (error){
                                console.log(error);
                } )
}
export const getUserByEmailFunc = async (appwriteClient,databaseId,userColId,email:string)=>{
        const db = new Databases(appwriteClient);
        const userCollection=db.listDocuments(databaseId,userColId);
        userCollection.then(function (response){
             response.documents.forEach((user:any)=>{
                         if(user.email==email){
                                        return user;
                                }
                        })
        },
                        function (error){
                                console.log(error);
                } )
}
export const getUserByIdFunc = async (appwriteClient,databaseId,userColId,id:string)=>{
        const db = new Databases(appwriteClient);
        const userCollection=db.listDocuments(databaseId,userColId);
        userCollection.then(function (response){
             response.documents.forEach((user:any)=>{
                         if(user.id==id){
                                        return user;
                                }
                        })
        },
                        function (error){
                                console.log(error);
                } )
}

export const getUserByAccountFunc = async (appwriteClient,databaseId,userColId,provider:string,providerAccountId:string)=>{
        const db = new Databases(appwriteClient);
        const userCollection=db.listDocuments(databaseId,userColId);
        userCollection.then(function (response){
             response.documents.forEach((user:any)=>{
                         if(user.provider==provider && user.providerAccountId==providerAccountId){
                                        return user;
                                }
                        })
        },
                        function (error){
                                console.log(error);
                } )
}

export const updateUserFunc = async (appwriteClient,databaseId,user,userColId)=>{
        const db = new Databases(appwriteClient);
        const userCollection=db.updateDocument(databaseId,userColId,user.id,user);
        userCollection.then(function (response){
                return  response[0]
        },
                        function (error){
                                console.log(error);
                } )
}
           
export const deleteUserFunc = async (appwriteClient,databaseId,id:string,userColId)=>{
        const db = new Databases(appwriteClient);
        const userCollection=db.deleteDocument(databaseId,userColId,id);
        userCollection.then(function (response){
              return  response
        },
                        function (error){
                                console.log(error);
                } )
}

export const linkAccountFunc = async (appwriteClient,databaseId,accountColId,userId:string,provider:string,providerAccountId:string,refreshToken:string,accessToken:string,accessTokenExpires:string)=>{
        const db = new Databases(appwriteClient);
        const accountCollection=db.listDocuments(databaseId,accountColId);
        accountCollection.then(function (response){
                response.documents.forEach((account:any)=>{
                        if(account.userId==userId && account.provider==provider && account.providerAccountId==providerAccountId){
                                return account;
                        }
                })
        },
                        function (error){
                                console.log(error);
                } )
}

export const unlinkAccountFunc = async (appwriteClient,databaseId,accountColId,userId:string,provider:string,providerAccountId:string)=>{
        const db = new Databases(appwriteClient);
        const accountCollection=db.listDocuments(databaseId,accountColId);
        accountCollection.then(function (response){
                response.documents.forEach((account:any)=>{
                        if(account.userId==userId && account.provider==provider && account.providerAccountId==providerAccountId){
                                const deleteAccount=db.deleteDocument(databaseId,accountColId,account.id);
                                deleteAccount.then(function (response){
                                        return response
                                },
                                                function (error){
                                                        console.log(error);
                                                } )
                        }
                })
        },
                        function (error){
                                console.log(error);
                } )
}

export const createSessionFunc = async (appwriteClient,databaseId,sessionColId,session:AdapterSession)=>{
        const db = new Databases(appwriteClient);
        const sessionCollection=db.createDocument(databaseId,sessionColId,nanoid(10),session);
        sessionCollection.then(function (response){
                console.log(response);
        },
                        function (error){
                                console.log(error);
                } )
}

export const getSessionFunc = async (appwriteClient,databaseId,sessionColId,sessionToken:string)=>{
        const db = new Databases(appwriteClient);
        const sessionCollection=db.listDocuments(databaseId,sessionColId);
        sessionCollection.then(function (response){
                response.documents.forEach((session:any)=>{
                        if(session.sessionToken==sessionToken){
                                return session;
                        }
                })
        },
                        function (error){
                                console.log(error);
                } )
}
export const getSessionAndUserFunc = async (appwriteClient,databaseId,sessionColId,userColId,sessionToken:string)=>{
        const db = new Databases(appwriteClient);
        const sessionCollection=db.listDocuments(databaseId,sessionColId);
        sessionCollection.then(function (response){
                response.documents.forEach((session:any)=>{
                        if(session.sessionToken==sessionToken){
                                const userCollection=db.listDocuments(databaseId,userColId);
                                userCollection.then(function (response){
                                        response.documents.forEach((user:any)=>{
                                                if(user.id==session.userId){
                                                        return {session,user};
                                                }
                                        })
                                },
                                                function (error){
                                                        console.log(error);
                                                } )
                        }
                })
        },
                        function (error){
                                console.log(error);
                } )
}

export const updateSessionFunc = async (appwriteClient,databaseId,sessionColId,session)=>{
        const db = new Databases(appwriteClient);
        const sessionCollection=db.updateDocument(databaseId,sessionColId,session.id,session);
        sessionCollection.then(function (response){
                console.log(response);
        },
                        function (error){
                                console.log(error);
                } )


        }
export const deleteSessionFunc = async (appwriteClient,databaseId,sessionColId,sessionToken:string)=>{
        const db = new Databases(appwriteClient);
        const sessionCollection=db.listDocuments(databaseId,sessionColId);
        sessionCollection.then(function (response){
                response.documents.forEach((session:any)=>{
                        if(session.sessionToken==sessionToken){
                                const deleteSession=db.deleteDocument(databaseId,sessionColId,session.id);
                                deleteSession.then(function (response){
                                        console.log(response);
                                },
                                                function (error){
                                                        console.log(error);
                                                } )
                        }
                })
        },
                        function (error){
                                console.log(error);
                } )
}

export const createVerificationTokenFunc=async (appwriteClient,databaseId,VerificationId,token:VerificationToken)=>{
        const db = new Databases(appwriteClient);
        const tokenCollection=db.createDocument(databaseId,VerificationId,nanoid(10),token);
        tokenCollection.then(function (response){
                console.log(response);
        },
                        function (error){
                                console.log(error);
                } )
}

export const useVerificationTokenFunc = async (appwriteClient,databaseId,VerificationId,token:string)=>{
        const db = new Databases(appwriteClient);
        const tokenCollection=db.listDocuments(databaseId,VerificationId);
        tokenCollection.then(function (response){
                response.documents.forEach((token:any)=>{
                        if(token.token==token){
                                return token;
                        }
                })
        },
                        function (error){
                                console.log(error);
                } )
}