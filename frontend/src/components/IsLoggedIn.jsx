import React, { useEffect , useState} from 'react'
import { Redirect } from 'react-router-dom';


export default function IsLoggedIn() {

    const [redirect, setRedirect] = useState(false);

    async function notLoggedIn_redirect() {

        let token = sessionStorage.getItem('auth');

        if (!token) {

            setRedirect(true);

        } else {

            const response = await fetch('/api/isLoggedIn', {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();

            console.log("Is logged In:") 
            console.log(data)

            if (data.error == "tokenVerifyError") {

                setRedirect(true);
            }

        }
    }


    useEffect(() => {

        notLoggedIn_redirect();

    }, []);

    return (
        <div>
            {redirect && <Redirect to='/login' />}

        </div>
    )
}
