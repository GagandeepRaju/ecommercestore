import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../util/firebase/firebase.js";
import CartIcon from "../cart/cart.icon";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();
  };

  return (
    <Fragment>
      <div className="ui secondary menu">
        <Link className="item" to="/">
          <CrwnLogo />
        </Link>
        <div className="right menu">
          <Link className="item ui button" to="/shop">
            Shop
          </Link>
          {currentUser ? (
            <Link className="item ui button" onClick={signOutHandler}>
              Sign Out
            </Link>
          ) : (
            <Link className="item ui button" to="/signin">
              Sign In
            </Link>
          )}
          <div className="item ui button">
            <CartIcon />
          </div>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
