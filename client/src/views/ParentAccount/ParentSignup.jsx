import { message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar'; 
import { updateStudent, studentMe } from '../../Utils/requests';
import './Parent.less'; 

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  
  return {
    value,
    onChange: handleChange,
  };
};

export default function ParentSignup() {
  const email = useFormInput('');
  const password = useFormInput('');
  const confirmPassword = useFormInput('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    if(password.value && email.value){
      if(password.value == confirmPassword.value){
        try{
          let student = (await studentMe()).data.students[0];
          if(student){
            student.parent_email = email.value;
            student.parent_key = password.value;
            const res = await updateStudent(student.id, student);
            setLoading(false);
            if(res.data){
              navigate('/restrict-access');
            }else {
              message.error('Email or password not valid.');
            }
          }else{
            setLoading(false);
            console.log('Something went wrong.');
          }
        
        }catch(error){
          setLoading(false);
          console.log(error);
        }
      } else{
        setLoading(false);
        message.error('Passwords do not match.');
      }
    } else {
      message.error("Please input valid email and password.")
    }
  };

  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='content-wrapper'>
        <form
          id='box'
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSignup();
          }}
        >
          <div id='box-title'>Create Parent Account</div>
          <input
            type='email'
            {...email}
            placeholder='Email'
            autoComplete='username'
          />
          <input
            type='password'
            {...password}
            placeholder='Password'
            autoComplete='new-password'
          />
          <input
            type='password'
            {...confirmPassword}
            placeholder='Confirm Password'
            autoComplete='new-password'
          />
          <input
            type='button'
            value={loading ? 'Creating Account...' : 'Create Account'}
            onClick={handleSignup}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
}
