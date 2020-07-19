import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setUserAuth } from "./redux/actions/actions";
import CookBookContainer from "./components/CookBookContainer/CookBookContainer";

const App = ({ setUserAuth, token }) => {
  useEffect(() => {
    console.log("render App useEffect");
    let userData = JSON.parse(localStorage.getItem("cookBookUserData"));
    if (userData && userData.token) {
      setUserAuth({
        login: userData.login,
        id: userData.userId,
        isAuthenticated: true,
        token: userData.token,
      });
    }
  }, [token, setUserAuth]);

  return <CookBookContainer />;
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
  };
}

export default connect(mapStateToProps, { setUserAuth })(App);
