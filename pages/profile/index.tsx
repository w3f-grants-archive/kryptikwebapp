import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Divider from '../../components/Divider'
import { useKryptikAuthContext } from '../../components/KryptikAuthProvider'
import NavProfile from '../../components/NavProfile'
import { AiFillCodeSandboxCircle } from 'react-icons/ai'
import { useFirebaseAuth } from '../../src/helpers/firebaseHelper'


const Profile: NextPage = () => {
  const { authUser, loading, getUserPhotoPath, updateCurrentUserKryptik } = useKryptikAuthContext();
  const router = useRouter();
  // ROUTE PROTECTOR: Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser)
      router.push('/')
  }, [authUser, loading])

  const [photoUrl, setPhotoUrl] = useState("");
  const [name, setName] = useState("");
  const [loadingUpdate, setloadingUpdate] = useState(false);

  useEffect(()=>{
    let photoPath:string = getUserPhotoPath(authUser);
    console.log(photoPath)
    setPhotoUrl(photoPath);
  });


  const handleClickUpdate = async function(){
    if(name!="" && name!=authUser.name && !loadingUpdate){
      setloadingUpdate(true);
      authUser.name = name;
      await updateCurrentUserKryptik(authUser);
      setloadingUpdate(false);
    }
  }


  return (
    <div>
        <div className="text-center max-w-2xl mx-auto content-center">
           <div className="w-3/12 lg:w-2/12 px-4 mx-auto">
               {
                   photoUrl==""?
                   <div className="shadow rounded-full max-w-full h-auto align-middle border-none transition ease-in-out delay-100 transform hover:-translate-y-1"/>:
                   <img src={photoUrl} alt="Profile Image" className="shadow rounded-full max-w-full h-auto align-middle border-none transition ease-in-out delay-100 transform hover:-translate-y-1"/>
               }
          </div>
          <h1 className="mt-3 font-bold">{authUser.name}</h1>
          <Divider/>
        </div>
        <div className="container mt-5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:px-40">
            <div className="px-5 py-5 m-2 rounded">
              <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
                Profile Name
              </label>
              <input className="bg-gray-200 appearance-none max-w-20 border-2 border-gray-200 rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400" id="inline-full-name" placeholder={authUser.name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="px-5 py-5 m-2 rounded">
              <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
                Your Email
              </label>
              <input disabled className="hover:cursor-not-allowed bg-gray-200 appearance-none max-w-20 border-2 border-gray-200 rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 disabled" id="inline-full-name" placeholder={authUser.uid}/>
              <div className="flex justify-end mt-5">
                  {
                    !loadingUpdate?
                      <button onClick={()=>handleClickUpdate()} className="bg-transparent hover:bg-sky-400 text-sky-500 font-semibold hover:text-white py-2 px-4 border border-sky-500 hover:border-transparent rounded my-5">
                                  Save
                    </button>
                    :
                      <button disabled className="bg-transparent hover:cursor-not-allowed text-sky-500 font-semibold hover:text-white py-2 px-4 border border-sky-500 rounded my-5">
                                  Save
                                  {
                                    !loadingUpdate?"":
                                    <svg role="status" className="inline w-4 h-4 ml-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                    </svg>
                                  }
                    </button>
                  } 
            </div>
            </div>
        </div>
        
    <NavProfile/>
    </div>
 
  )
}

export default Profile