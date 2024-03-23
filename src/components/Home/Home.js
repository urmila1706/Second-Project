import React from 'react';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';

const Home = (props) => {
  return (
    <Card className={classes.home}>
    <Button onClick={props.onLogout}>Logout</Button>
      <h1>Welcome back!</h1>
    </Card>
  );
};

export default Home;
