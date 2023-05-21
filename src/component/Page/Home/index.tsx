import React from "react";
import styles from "./homepage.module.scss";
import { Row, Col } from "antd";
import CountCard from "./homepageComponent/countCard";

import PendingTasks from "../../ReusableComponent/PendingTasks";

import { useData } from "../../Context/dataContext";

const Home = () => {
  const { count, pendingTasks } = useData();

  return (
    <>
      <div className={styles.container}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <CountCard count={count?.totalTasks || 0} text="Total Task" />
              </Col>
              <Col span={8}>
                <CountCard
                  count={count?.pendingTasks || 0}
                  text="Task Pending"
                />
              </Col>
              <Col span={8}>
                <CountCard
                  count={count?.completedTasks || 0}
                  text="Task Completed"
                />
              </Col>
            </Row>
          </Col>
          {pendingTasks && pendingTasks.length > 0 && (
            <Col span="24">
              <div className={styles.heading}>
                <h1>Pending Tasks</h1>
              </div>
            </Col>
          )}
          <Col span={24}>
            {pendingTasks && pendingTasks.length > 0 ? (
              <PendingTasks
                pendingTasks={pendingTasks ? pendingTasks.slice(0, 10) : []}
              />
            ) : (
              <>
                <div className={styles.imageContainer}>
                  <img src="/todo.png" alt="todo " className={styles.image} />
                </div>
                <div className={styles.textContainer}>
                  <h2>Add New Tasks To Complete </h2>
                </div>
              </>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home;
