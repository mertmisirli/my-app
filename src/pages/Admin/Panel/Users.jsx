import React from 'react';

function Users() {
  const dummyUsers = [
    { id: 1, name: 'Ali Yılmaz', email: 'ali@example.com' },
    { id: 2, name: 'Ayşe Demir', email: 'ayse@example.com' },
    { id: 3, name: 'Mehmet Kaya', email: 'mehmet@example.com' },
  ];

  return (
    <div>
      <h5 className="mb-3">Kullanıcılar</h5>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>İsim</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {dummyUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
