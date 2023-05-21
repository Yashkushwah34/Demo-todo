import React from "react";
import styles from "./app.module.scss";
import Main from "./component/Main";
import NavigationBar from "./component/Navigation";
import RoutesContainer from "./component/Routes";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import { ApiProvider } from "./component/Context/apiContext";
import { UserProvider } from "./component/Context/userContext";
import { DataProvider } from "./component/Context/dataContext";

function App() {
  const pathNames = ["/login"];

  const location = useLocation();

  return (
    <>
      <ApiProvider>
        <div className={styles.container}>
          {!pathNames.includes(location.pathname) && <RoutesContainer />}
          <UserProvider>
            <DataProvider>
              <div
                className={classNames({
                  [styles.mainContainer]: !pathNames.includes(
                    location.pathname
                  ),
                  [styles.mainContainer2]: pathNames.includes(
                    location.pathname
                  ),
                })}
              >
                {!pathNames.includes(location.pathname) && <NavigationBar />}
                <div
                  className={classNames({
                    [styles.contentContainer]: !pathNames.includes(
                      location.pathname
                    ),
                    [styles.contentContainer2]: pathNames.includes(
                      location.pathname
                    ),
                  })}
                >
                  <Main pathname={location.pathname} pathNameList={pathNames} />
                </div>
              </div>
            </DataProvider>
          </UserProvider>
        </div>
      </ApiProvider>
    </>
  );
}

export default App;
