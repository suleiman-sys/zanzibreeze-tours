import { Navigate } from "react-router-dom";

export default function ProtectedRoute({

  children,

}) {

  const token =
    localStorage.getItem(
      "adminToken"
    );

  const adminAuth =
    localStorage.getItem(
      "adminAuth"
    );

  /* NOT LOGGED IN */

  if (

    !token ||

    !adminAuth

  ) {

    localStorage.removeItem(
      "adminToken"
    );

    localStorage.removeItem(
      "adminAuth"
    );

    localStorage.removeItem(
      "adminData"
    );

    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );

  }

  /* TOKEN EXPIRED CHECK */

  try {

    const parsedAuth =
      JSON.parse(adminAuth);

    if (

      !parsedAuth ||

      parsedAuth !== true

    ) {

      localStorage.removeItem(
        "adminToken"
      );

      localStorage.removeItem(
        "adminAuth"
      );

      localStorage.removeItem(
        "adminData"
      );

      return (
        <Navigate
          to="/admin/login"
          replace
        />
      );

    }

  } catch (error) {

    localStorage.removeItem(
      "adminToken"
    );

    localStorage.removeItem(
      "adminAuth"
    );

    localStorage.removeItem(
      "adminData"
    );

    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );

  }

  return children;

}