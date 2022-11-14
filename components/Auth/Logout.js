import { useRouter } from 'next/router';

const Logout = () => {
    const router = useRouter();
    const token = localStorage.getItem('token');
    localStorage.removeItem(token);
    localStorage.clear()
    router.push('/login');
}

export default Logout