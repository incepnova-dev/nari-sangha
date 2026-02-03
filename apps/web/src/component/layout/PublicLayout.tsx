import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";
import LandingModals from "../landing/LandingModals";
import { useLandingAuth } from "../landing/useLandingAuth";
import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../routes/routeConstants";
import styles from "../landing/landing.module.css";
import "../../styles/themes.module.css";

const PublicLayout: React.FC = () => {
    const { user } = useAuth();
    const location = useLocation();

    const {
        isSignUpModalOpen,
        isSignInModalOpen,
        handleSignUpClick,
        handleSignInClick,
        handleCloseSignUpModal,
        handleSignInModalClose,
        handleSignInSuccess,
    } = useLandingAuth({}); // onSignInSuccess is optional

    // Determine theme based on current route
    const getThemeClass = () => {
        const path = location.pathname;
        if (path.startsWith(ROUTES.JOURNEYS)) return 'theme-lavender';
        if (path.startsWith(ROUTES.PRODUCTS)) return 'theme-pink';
        if (path.startsWith(ROUTES.APPOINTMENTS)) return 'theme-mint';
        if (path.startsWith(ROUTES.COMMUNITY)) return 'theme-peach';
        if (path.startsWith(ROUTES.SYMPTOM_CHECKER)) return 'theme-blue';
        return '';
    };

    return (
        <div className={`${styles.page} ${getThemeClass()}`}>
            <Navbar
                onSignInClick={handleSignInClick}
                isAuthenticated={!!user}
            />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />

            <LandingModals
                isSignInModalOpen={isSignInModalOpen}
                isSignUpModalOpen={isSignUpModalOpen}
                onSignInClose={handleSignInModalClose}
                onSignUpClose={handleCloseSignUpModal}
                onSignInSuccess={handleSignInSuccess}
                onSignUpClick={handleSignUpClick}
                onSignInClick={handleSignInClick}
            />
        </div>
    );
};

export default PublicLayout;
