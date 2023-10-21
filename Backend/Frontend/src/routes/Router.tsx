import { Routes, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Login from '../Login';
import SignUp from '../Signup';
import Setting from '../Setting';
import DashBoard from '../DashBoard';
import App from '../App';
import Plans from '../Plans';
// import Checkout from './Checkout';
import PrivateRoute from './PrivateRoute';
import Confirm from '../components/Confirm';
import Channels from '../components/Channels/Channels';
import ForgetPass from '../components/Auth/ForgetPass';
import ResetPass from '../components/Auth/ResetPass';
import useCheckAuth from '../../helpers/useCheckAuth';
import InvoiceDetails from '../components/Payment/InvoiceDetails';
import FBCallback from '../components/Channels/FBCallback';
import FBBody from '../components/Channels/FBBody';
import Schedular from '../Schedular';
import Crafter from '../components/Crafter';
import SocialConnect from '../components/Channels/SocialConnect';
import ConfirmChannels from '../components/Channels/SocailChannel/ConfirmChannels';
// eslint-disable-next-line import/prefer-default-export
export function Router() {
  const { autoLogin } = useCheckAuth();
  useEffect(() => {
    autoLogin();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/plans" element={<Plans />} />
      <Route path="/resetpassword" element={<ResetPass />} />
      <Route path="/recoveraccount" element={<ForgetPass />} />
      <Route element={<PrivateRoute />}>
        <Route path="/crafter" element={<Crafter />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/dashboard/schedular" element={<Schedular />} />
        <Route path="/channel" element={<Channels />} />
        <Route path="/channels" element={<SocialConnect />} />
        <Route path="/channel/:auth" element={<SocialConnect />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/testfb" element={<FBBody />} />
        <Route path="/fbcallback" element={<FBCallback />} />
        <Route path="/setting/:id" element={<InvoiceDetails />} />
        <Route path="/payments/confirm" element={<Confirm />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}
