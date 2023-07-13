import React from 'react'

const UserProfile = ({ params }: any) => {
  return (
    <div>
        <h3>User Profile</h3>

        <p>User Id <span style={{ color: "red" }}>{params.id}</span></p>
    </div>
  )
}

export default UserProfile;