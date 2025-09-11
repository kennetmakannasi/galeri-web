import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { UseToken } from './helpers/useToken';
import { useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

window.pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_REVERB_APP_KEY,

    wsHost: import.meta.env.VITE_REVERB_HOST,

    wsPort: import.meta.env.VITE_REVERB_PORT,

    wssPort: import.meta.env.VITE_REVERB_PORT,

    forceTLS: false, // Ubah ke true jika Anda menggunakan HTTPS

    disableStats: true,
    cluster: 'mt1',
  encrypted: false,
  enabledTransports: ['ws', 'wss'],
  authEndpoint: `${import.meta.env.VITE_API_URL}/broadcasting/auth`,
  auth: {
    headers: {
      Authorization: `Bearer ${UseToken()}`
    }
  }
});
export default function Notification() {

    useEffect(()=>{
         const channel = window.Echo.private(`private-channel.user.${Cookies.get("uId")}`)
            channel.listen('PostEvent', (e) => {
            console.log(e);
                alert(`${e.liker.name} ${e.type === 'liked'? 'liked': e.type === 'commented' ? 'commented':''} your post`)
            })

            channel.listen('UserEvent', (e) => {
                console.log(e);
                alert(`${e.follower.name} followed you`)
            })


            return () => {
            channel.stopListening('PostEvent');
            channel.stopListening('UserEvent');
            };
    },[])
}