import React, {useEffect, useState} from 'react';
import './NavBar.less';
import config from './NavBarConfig.json';
import Logo from '../../assets/casmm_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { removeUserSession } from '../../Utils/AuthRequests';
import { useGlobalState } from '../../Utils/userState';
import { studentMe } from '../../Utils/requests';



export default function NavBar() {
  const [value] = useGlobalState('currUser');
  const [hasParent, setHasParent] = useState(false);
  let currentRoute = window.location.pathname;
  let navigate = useNavigate();
  let routes = config.routes;


  const handleLogout = () => {
    removeUserSession();
    navigate('/');
  };

  const handleRouteChange = (route) => {
    navigate(route);
  };

  const shouldShowRoute = (route) => {
    if (currentRoute === routes[route]) return false;
    return config.users[value.role].includes(route);
  };

  // Fetch student data to check for parent email
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await studentMe();
        if(res.data.students[0].parent_email){
          setHasParent(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  

  const menu = (
    <Menu>
      {shouldShowRoute('Home') ? (
        <Menu.Item key='0' onClick={() => handleRouteChange(routes.Home)}>
          <i className='fa fa-home' />
          &nbsp; Home
        </Menu.Item>
      ) : null}
      {shouldShowRoute('Dashboard') ? (
        <Menu.Item key='1' onClick={() => handleRouteChange(routes.Dashboard)}>
          <i className='fa fa-home' />
          &nbsp; Dashboard
        </Menu.Item>
      ) : null}
      {shouldShowRoute('ContentCreatorDashboard') ? (
        <Menu.Item
          key='2'
          onClick={() => handleRouteChange(routes.ContentCreatorDashboard)}
        >
          <i className='fa fa-home' />
          &nbsp; Dashboard
        </Menu.Item>
      ) : null}
      {shouldShowRoute('ResearcherDashboard') ? (
        <Menu.Item
          key='3'
          onClick={() => handleRouteChange(routes.ResearcherDashboard)}
        >
          <i className='fa fa-home' />
          &nbsp; Dashboard
        </Menu.Item>
      ) : null}
      {shouldShowRoute('Sandbox') ? (
        <Menu.Item
          key='4'
          onClick={() => {
            localStorage.removeItem('sandbox-activity');
            handleRouteChange(routes.Sandbox);
          }}
        >
          <i className='fa fa-window-maximize' />
          &nbsp; Sandbox
        </Menu.Item>
      ) : null}
      {shouldShowRoute('TeacherLogin') ? (
        <Menu.Item
          key='5'
          onClick={() => handleRouteChange(routes.TeacherLogin)}
        >
          <i className='fa fa-sign-in-alt' />
          &nbsp; User Login
        </Menu.Item>
      ) : null}
      {shouldShowRoute('About') ? (
        <Menu.Item key='6' onClick={() => handleRouteChange(routes.About)}>
          <i className='fa fa-info-circle' />
          &nbsp; About
        </Menu.Item>
      ) : null}
      {shouldShowRoute('BugReport') ? (
        <Menu.Item key='7' onClick={() => handleRouteChange(routes.BugReport)}>
          <i className='fa fa-calendar-times' />
          &nbsp; Report a Bug
        </Menu.Item>
      ) : null}
      {shouldShowRoute('SignOut') ? (
        <Menu.Item key='8' onClick={() => handleLogout()}>
          <i className='fa fa-sign-out-alt' />
          &nbsp; Sign Out
        </Menu.Item>
      ) : null}
      {shouldShowRoute('ParentLogin') ? (
       (hasParent) ? (
          <Menu.Item key='9' onClick={() => handleRouteChange(routes.ParentLogin)}>
          <i className='fa fa-sign-in-alt' />
          &nbsp; Parent Login
        </Menu.Item>
        ) : (
          <Menu.Item key='10' onClick={() => handleRouteChange(routes.ParentSignUp)}>
          <i className='fa fa-sign-in-alt' />
          &nbsp; Parent Sign-Up
        </Menu.Item>
        )
      ) : null}
      {shouldShowRoute('StudentPortal') ? (
        <Menu.Item key='11' onClick={() => handleRouteChange(routes.StudentPortal)}>
          <i className='fa fa-sign-in-alt' />
          &nbsp; Student Portal
        </Menu.Item>
      ) : null}
      
    </Menu>
  );

  return (
    <span id='navBar'>
      <Link
        id='link'
        to={
          value.role === 'ContentCreator'
            ? '/ccdashboard'
            : value.role === 'Mentor'
            ? '/dashboard'
            : value.role === 'Student'
            ? '/student-portal'
            : value.role === 'Researcher'
            ? '/report'
            : '/'
        }
      >
        <img src={Logo} id='casmm-logo' alt='logo' />
      </Link>
      <div id='dropdown-menu'>
        <Dropdown overlay={menu} trigger={['click']}>
          <button
            className='ant-dropdown-link'
            onClick={(e) => e.preventDefault()}
          >
            {value.name ? value.name : 'Menu'} <DownOutlined />
          </button>
        </Dropdown>
      </div>
    </span>
  );
}
