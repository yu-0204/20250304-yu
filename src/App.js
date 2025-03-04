import React, { useState, useEffect } from 'react';
import './App.css';

// 假設的靜態用戶資料，包含多個用戶
const initialUsers = [
  { Name: 'John Doe', account: 'john_doe', password: 'password123' },
  { Name: 'Jane Smith', account: 'jane_smith', password: 'password456' },
  { Name: 'Admin', account: 'admin', password: 'admin123' }
];

function App() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [users, setUsers] = useState(initialUsers);  // 用useState來管理users
  const [newName, setNewName] = useState('');
  const [newAccount, setNewAccount] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // 嘗試從 localStorage 讀取登入用戶資料
  useEffect(() => {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      setLoggedInUser(JSON.parse(savedUser)); // 如果有登入資料，載入該資料
    }
    // 嘗試從 localStorage 讀取所有用戶資料
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers)); // 如果有儲存的用戶資料，載入它
    }
  }, []);

  // 處理登入邏輯
  const handleLogin = (e) => {
    e.preventDefault();

    // 根據帳號和密碼進行比對
    const user = users.find((user) => user.account === account && user.password === password);

    if (user) {
      setLoggedInUser(user);
      localStorage.setItem('loggedInUser', JSON.stringify(user)); // 登入後保存用戶資料至 localStorage
      setMessage(`登入成功，歡迎 ${user.Name}`);
    } else {
      setMessage('登入失敗，請檢查帳號和密碼');
    }
  };

  // 處理登出邏輯
  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser'); // 登出時清除 localStorage 中的資料
    setMessage('');
    setAccount('');
    setPassword('');
  };

  // 處理更新用戶資料
  const handleUpdateUser = (e) => {
    e.preventDefault();

    // 當用戶沒有輸入新資料時，使用舊資料
    const updatedUser = {
      Name: newName || loggedInUser.Name,
      account: newAccount || loggedInUser.account,
      password: newPassword || loggedInUser.password
    };

    // 更新 users 陣列中的資料
    const updatedUsers = users.map((user) =>
      user.account === loggedInUser.account ? updatedUser : user
    );

    // 更新 users 陣列狀態
    setUsers(updatedUsers);
    
    // 更新登入用戶資料
    setLoggedInUser(updatedUser);

    // 更新 localStorage 中的資料
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

    // 儲存更新後的 users 資料
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setMessage('資料更新成功！');
    setNewName('');
    setNewAccount('');
    setNewPassword('');
  };

  // 刪除帳號邏輯
  const handleDeleteAccount = () => {
    // 刪除用戶
    const updatedUsers = users.filter((user) => user.account !== loggedInUser.account);

    // 更新 users 陣列狀態
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers)); // 更新 localStorage

    // 刪除登入資料
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);

    setMessage('帳號已刪除！');
  };

  return (
    <div className="App">
      <h2>登入頁面</h2>
      
      {/* 顯示所有用戶資料 */}
      <div className="all-users-info">
        <h3>所有用戶資料</h3>
        {users.map((user, index) => (
          <div key={index} className="user-info">
            <p><strong>姓名：</strong>{user.Name}</p>
            <p><strong>帳號：</strong>{user.account}</p>
            <p><strong>密碼：</strong>{user.password}</p>
            <hr />
          </div>
        ))}
      </div>

      {/* 如果未登入，顯示登入表單 */}
      {!loggedInUser ? (
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="account">帳號：</label>
            <input
              type="text"
              id="account"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">密碼：</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">登入</button>
        </form>
      ) : (
        <div>
          {/* 顯示用戶修改資料表單 */}
          <h3>修改您的資料</h3>
          <form onSubmit={handleUpdateUser}>
            <div>
              <label htmlFor="newName">新姓名：</label>
              <input
                type="text"
                id="newName"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={loggedInUser.Name}
              />
            </div>
            <div>
              <label htmlFor="newAccount">新帳號：</label>
              <input
                type="text"
                id="newAccount"
                value={newAccount}
                onChange={(e) => setNewAccount(e.target.value)}
                placeholder={loggedInUser.account}
              />
            </div>
            <div>
              <label htmlFor="newPassword">新密碼：</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="輸入新密碼"
              />
            </div>
            <button type="submit">更新資料</button>
          </form>

          {/* 顯示訊息 */}
          {message && <p>{message}</p>}

          {/* 登出按鈕 */}
          <button onClick={handleLogout}>登出</button>

          {/* 刪除帳號按鈕 */}
          <button onClick={handleDeleteAccount}>刪除帳號</button>
        </div>
      )}
    </div>
  );
}

export default App;
