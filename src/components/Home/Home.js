import React, {useContext} from 'react';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import AuthContext from '../../store/auth-context';

const Home = (props) => {
const authCtx=useContext(AuthContext)
  return (
    <Card className={classes.home}>
    <Button onClick={authCtx.onLogout}>Logout</Button>
      <h1>Welcome back!</h1>
    </Card>
  );
};

export default Home;
