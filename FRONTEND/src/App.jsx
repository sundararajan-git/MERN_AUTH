import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import axios from "./LIB/axios.js";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./LIB/REDUX/SLICES/UserSlice.js";
import { Toaster } from "react-hot-toast";

const Signup = lazy(() => import("./PAGES/SINGUP/Signup"));
const Login = lazy(() => import("./PAGES/LOGIN/Login"));
const Home = lazy(() => import("./PAGES/HOME/Home"));
const ForgotPassword = lazy(() =>
  import("./PAGES/FORGOT PASSWORD/ForgotPassword")
);
const VerificationEmail = lazy(() =>
  import("./PAGES/VERIFICATION EMAIL/VerificationEmail")
);
const ReserPassword = lazy(() =>
  import("./PAGES/RESET PASSWORD/ReserPassword")
);

const PageNotFound = lazy(() => import("./PAGES/404/PageNotFound"));
const AnimatedLogo = lazy(() => import("./COMPONENTS/AnimatedLogo.jsx"));

const App = () => {
  // USER INFO FROM THE REDUX
  const user = useSelector((state) => {
    return state.userInfo.user;
  });

  // CONTORL THE COMPONENTES
  const [conApp, setConApp] = useState({
    isvalid: false,
    isloading: true,
  });

  // LOCATION HOOK
  const location = useLocation();
  //  REDUX  USER CONSTROL HOOK
  const dispatch = useDispatch();

  console.log(location)
  
  // CHECK VALID USER
  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

  // CHECK AUTH
  const checkAuth = async () => {
    try {
      const authRes = await axios.get("check-auth", {
        withCredentials: true,
      });

      console.log(authRes);

      if (authRes?.data?.success) {
        dispatch(updateUser(authRes?.data?.user));
        setConApp((pre) => {
          return { ...pre, isvalid: true, isloading: false };
        });
      } else {
        setConApp((pre) => {
          return { ...pre, isvalid: false, isloading: false };
        });
      }
    } catch (err) {
      setConApp((pre) => {
        return { ...pre, isvalid: false, isloading: false };
      });
    }
  };

  // FOR LOADING
  if (conApp?.isloading) {
    return <AnimatedLogo />;
  }

  // REDIRECT ROUTE
  const RedirectAuth = ({ children }) => {
    if (conApp?.isvalid) {
      if (!user?.idVerfied) {
        return <Navigate to="/verification" replace />;
      } else {
        return <Navigate to="/home" replace />;
      }
    }

    return children;
  };

  // PRODUCTED ROUTES
  const ProtectedRoute = ({ children }) => {
    if (!conApp?.isvalid) {
      return <Navigate to="/login" replace />;
    }

    if (!user?.idVerfied) {
      return <Navigate to="/verification" replace />;
    }

    return children;
  };

  return (
    <Suspense fallback={<AnimatedLogo />}>
      <Routes>
        <Route
          path="/"
          element={
            <RedirectAuth>
              <Login />
            </RedirectAuth>
          }
        />
        <Route
          path="signup"
          element={
            <RedirectAuth>
              <Signup />
            </RedirectAuth>
          }
        />
        <Route
          path="login"
          element={
            <RedirectAuth>
              <Login />
            </RedirectAuth>
          }
        />
        <Route path="verification" element={<VerificationEmail />} />
        <Route path="reset-password/:token" element={<ReserPassword />} />
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </Suspense>
  );
};

export default App;
