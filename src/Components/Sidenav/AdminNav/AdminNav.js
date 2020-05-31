import React from 'react'

export default function AdminNav(props) {
  return (
          <div className="menu-container">
            <a href="/admin" id="admin" className={`${props.activeMenu === "admin" ? "activeMenu" : "menuItems"}`}>
              <p>Administration</p>
              <span className="material-icons-outlined">supervised_user_circle</span>
            </a>
          </div>
  )
}
