import React, { useState,useEffect,useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer=(state,action)=>{
  if( action.type === 'USER_INPUT' )
  {
    return { value:action.val, isValid:action.val.includes('@')};
  }
  if(action.type === 'INPUT_BLUR'){
    return {value:state.value,isValid:state.value.includes('@')};
  }
return { value:'',isValid:null};
};

const passwordReducer=(state,action)=>{
  if( action.type === 'USER_INPUT' )
  {
    return { value:action.val, isValid:action.val.trim().length>6};
  }
  if(action.type === 'INPUT_BLUR'){
    return {value:state.value,isValid:state.value.trim().length>6};
  }
return { value:'',isValid:null};
};

const collegenameReducer=(state,action)=>{
  if( action.type === 'USER_INPUT' )
  {
    return { value:action.val, isValid:action.val.trim().length>0};
  }
  if(action.type === 'INPUT_BLUR'){
    return {value:state.value,isValid:state.value.trim().length>0};
  }
return { value:'',isValid:null};
};


const Login = (props) => {
 // const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
 // const [enteredPassword, setEnteredPassword] = useState('');
 // const [passwordIsValid, setPasswordIsValid] = useState();
 // const [enteredCollegename, setEnteredCollegename]=useState('');
 // const [collegenameIsValid,setCollegenameIsValid]=useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState,dispatchEmail]=useReducer(emailReducer,{value:'',isValid:false});
  const [passwordState,dispatchPassword]=useReducer(passwordReducer,{value:'',isValid:false});
  const [collegenameState,dispatchCollegename]=useReducer(collegenameReducer,{value:'',isValid:false});

  const {isValid : emailIsValid}=emailState;
  const {isValid : passwordIsValid}=passwordState;
  const {isValid : collegenameIsValid}=collegenameState;

  useEffect(()=>{
    console.log('EFFECT RUNNING');
    return (()=>{
      console.log('EFFECT CLEANUP');
    })
  },[]);

  useEffect(()=>{
    
   const identifier= setTimeout(()=>{
      console.log('Checking form Validity !')
      setFormIsValid(
        emailIsValid 
        && passwordIsValid
        && collegenameIsValid
      );
    },500)
    
   return ()=>{
    console.log('CLEANUP');
    clearTimeout(identifier);
   };
  },[emailIsValid,passwordIsValid,collegenameIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT',val:event.target.value});

    setFormIsValid(
            emailState.value.includes('@') 
            && passwordState.isValid
          &&  collegenameState.isValid
          );
  };
  const collegenameChangeHandler = (event) => {
    dispatchCollegename({type:'USER_INPUT',val:event.target.value});
  
  setFormIsValid(
    emailState.isValid 
    &&  passwordState.isValid
    &&  collegenameState.value.trim().length>0
  );
};
  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USER_INPUT',val:event.target.value});

  
  setFormIsValid(
    emailState.isValid 
    &&  passwordState.value.trim().length>6
    &&  collegenameState.isValid
  );
  };
  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'INPUT_BLUR'})
  };
  const validateCollegenameHandler = () => {
    dispatchCollegename({type:'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value,collegenameState.value);
  };
  
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegenameState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="collegename">COLLEGE NAME</label>
          <input
            type="collegename"
            id="collegename"
            value={collegenameState.value}
            onChange={collegenameChangeHandler}
            onBlur={validateCollegenameHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
