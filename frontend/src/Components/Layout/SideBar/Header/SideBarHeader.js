import React from "react";
import profileIcon from '../../../../assets/avatar/man.png';
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { logout } from '../../../../actions/userAction';

const SideBarHeader = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="profile-section">
      <div className="left">
        <img src={profileIcon} alt="avatar" />
        <div className="user-info">
          <h3>{props.name}</h3>
          <p>My Account</p>
        </div>
      </div>
      <div className="right">
        <i className="fa-solid fa-ellipsis-vertical"></i>
        <div className="dropdown-menu">
          <div className="dropdown-item">
            <button onClick={()=>dispatch(logout(props.showAlert, navigate))}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarHeader;
