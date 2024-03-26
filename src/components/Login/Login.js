import React, { useState,useEffect,useReducer,useContext } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import AuthContext  from '../../store/auth-context';

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

  const authCtx=useContext(AuthContext);



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
    authCtx.onLogin(emailState.value, passwordState.value,collegenameState.value);
  };
  
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
        id="email" 
        label="E-MAIL"
         type="email" 
        isValid={emailIsValid} 
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}/>
        <Input 
        id="password" 
        label="Password"
         type="password" 
        isValid={passwordIsValid} 
        value={passwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}/>
        <Input 
        id="collegename" 
        label="COLLEGENAME"
         type="collegename" 
        isValid={collegenameIsValid} 
        value={collegenameState.value}
        onChange={collegenameChangeHandler}
        onBlur={validateCollegenameHandler}/>

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
