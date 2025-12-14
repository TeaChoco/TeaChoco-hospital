//-Path: "TeaChoco-Hospital/client/src/App.tsx"
import Home from './pages/Home';
import Signin from './pages/Signin';
import Layout from './layout/Laout';
import { Routes, Route } from 'react-router-dom';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>   
                <Route index element={<Home />} />
            </Route>
            <Route path="signin" element={<Signin />} />
        </Routes>
    );
}
