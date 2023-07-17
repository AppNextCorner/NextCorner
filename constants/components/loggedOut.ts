import SignInPage from "pages/auth/SignInPage";
import SignUpPage from "pages/auth/SignUpPage";

export const loggedOutScreens = [
    {
        name: "Login",
        component: SignInPage,
      },
      {
        name: "Register",
        component: SignUpPage,
      }
]