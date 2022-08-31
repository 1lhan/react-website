import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './Components/LoginPage';
import MyCartPage from './Components/MyCartPage';
import MainPage from './Components/MainPage';
import ComputerComponents from './Components/ProductsPages/ComputerComponents';
import ComputerPeripherals from './Components/ProductsPages/ComputerPeripherals';
import SignUpPage from './Components/SignUpPage';
import MyAccount from './Components/MyAccountFolder/MyAccount';
import PaymentPage from './Components/PaymentPage';
import ProductDetails from './Components/ProductsPages/ProductDetails';
import PageNotFound from './Components/PageNotFound';

export default function Section() {

    const { isLoggedin } = useSelector(state => state.auth);

    return (
        <section>
            <div className='section-inclusive-div container'>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    {isLoggedin ? "" : <Route path='login-page' element={<LoginPage />} />}
                    {isLoggedin ? "" : <Route path='signup-page' element={<SignUpPage />} />}

                    <Route path='product/*' element={<ProductDetails />} />

                    <Route path='mycart-page' >
                        <Route index={true} element={<MyCartPage />} />
                        <Route path='payment' element={isLoggedin ? <PaymentPage /> : <LoginPage />} />
                    </Route>
                    <Route path='Computer-Components' element={<ComputerComponents />} />
                    <Route path='Computer-Peripherals' element={<ComputerPeripherals />} />

                    <Route path='my-account/*' element={isLoggedin ? <MyAccount /> : <LoginPage />} />

                    <Route path='/*' element={<PageNotFound />} />
                </Routes>
            </div>
        </section>
    )
}

