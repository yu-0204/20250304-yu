import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import './Login.css'; // 引入 CSS 文件

function Login() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState('');
  const [newAccount, setNewAccount] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // 登入處理
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!account || !password) {
      setError('帳號和密碼都是必填的');
      return;
    }

    try {
      // 從 USER 表格中查找符合的帳號和密碼
      const { data, error } = await supabase
        .from('users') // 用 users 表格進行查詢
        .select('*')
        .eq('account', account) // 使用帳號比對
        .eq('password', password); // 使用密碼比對

      if (error) {
        throw error;
      }

      if (data.length > 0) {
        setUser(data[0]); // 成功登入後保存用戶資料
        setName(data[0].name); // 設定 name 為用戶的名稱
        setAccount(data[0].account); // 設定 account 為用戶的帳號
        setMessage('登入成功！');
        setAccount('');
        setPassword('');
      } else {
        setError('帳號或密碼錯誤');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // 修改用戶資料
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!newName && !newAccount && !newPassword) {
      setError('請至少修改一項資料');
      return;
    }

    try {
      const updatedUser = {
        name: newName || user.name,
        account: newAccount || user.account,
        password: newPassword || user.password,
      };

      const { error } = await supabase
        .from('users')
        .update(updatedUser)
        .eq('account', user.account); // 根據帳號更新資料

      if (error) {
        throw error;
      }

      setUser(updatedUser); // 更新 user 狀態
      setMessage('資料更新成功！');
      setNewName('');
      setNewAccount('');
      setNewPassword('');
    } catch (error) {
      setError('更新資料時發生錯誤: ' + error.message);
    }
  };

  // 刪除帳號
  const handleDeleteAccount = async () => {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('account', user.account); // 根據帳號刪除資料

      if (error) {
        throw error;
      }

      setUser(null); // 刪除帳號後清除用戶狀態
      setMessage('帳號已刪除！');
      setAccount('');
      setPassword('');
    } catch (error) {
      setError('刪除帳號時發生錯誤: ' + error.message);
    }
  };

  // 登出處理
  const handleLogout = async () => {
    setUser(null);
    setMessage('已成功登出！');
  };

  return (
    <div className="login-container">
      {!user ? (
        <div>
          <h2>登入頁面</h2>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>帳號:</label>
              <input
                type="text"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                placeholder="請輸入您的帳號"
              />
            </div>
            <div className="form-group">
              <label>密碼:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="請輸入您的密碼"
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
            <button type="submit" className="login-button">登入</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>歡迎，{user.name}！</h2>
          <p>您目前已經登入。</p>

          <h3>修改您的資料</h3>
          <form onSubmit={handleUpdate} className="update-form">
            <div className="form-group">
              <label>新名稱:</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={user.name}
              />
            </div>
            <div className="form-group">
              <label>新帳號:</label>
              <input
                type="text"
                value={newAccount}
                onChange={(e) => setNewAccount(e.target.value)}
                placeholder={user.account}
              />
            </div>
            <div className="form-group">
              <label>新密碼:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="輸入新密碼"
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
            <button type="submit" className="update-button">更新資料</button>
          </form>

          <button onClick={handleDeleteAccount} className="delete-button">刪除帳號</button>
          <button onClick={handleLogout} className="logout-button">登出</button>
        </div>
      )}
    </div>
  );
}

export default Login;
