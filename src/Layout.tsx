import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

const Layout = () => (
    <div className='min-h-screen flex flex-col justify-between'>
        <Navigation />
        <main>
            <Outlet />
        </main>
        <Footer />
    </div>

);

export default Layout;
