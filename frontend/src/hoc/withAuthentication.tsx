import { ComponentType, useEffect, useState } from "react";
import axios from "axios";
import { User } from "types/user";
import { useNavigate } from "react-router-dom";

const withAuthentication =
  <T extends {}>(Component: ComponentType<T>) =>
  (props: T) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      (async () => {
        try {
          const ova_user = JSON.parse(
            `${localStorage.getItem("ova_user")}`
          ) as User;

          const users = (
            await axios.get(`${process.env.REACT_APP_HOST}/users/`)
          ).data as User[];

          const user =
            users.length > 0
              ? users.find((user) => user.username === ova_user.username)
              : null;

          if (user && user.password === ova_user.password) {
            setIsAuthenticated(true);
          }
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      })();
    }, []);

    useEffect(() => {
      if (!isAuthenticated && !isLoading) {
        navigate("/login", { replace: true });
      }
    }, [isAuthenticated, isLoading, navigate]);

    if (isError) return <div>Error Loading Page</div>;
    if (isLoading) return <div>Loading...</div>;

    return <Component {...props} />;
  };

export default withAuthentication;
