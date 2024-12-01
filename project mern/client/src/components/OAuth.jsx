import {GoogleAuthProvider, signInWithPopup,getAuth} from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {

    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const HandleGoogleClick = async () => {

        try {
            const provider = new GoogleAuthProvider();
            const auth= getAuth(app);
            const result = await signInWithPopup(auth,provider);
            
            const res = await fetch ('/api/auth/google' ,{

                method : 'POST',
                headers : {

                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify ({

                    name: result.user.displayName,
                    email: result.user.email,
                    photo : result.user.photoURL,
                }),
            });
            const data = await res.json();
            console.log(data);
            dispatch(signInSuccess(data));
            Navigate('/');
        } 
       
        catch (error) {
            console.log("Can not signin with google",error)
        }
    }


  return (
    <button  type = 'button'onClick={HandleGoogleClick} className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>
      Continue With Your Google Account
    </button>
  )
}
