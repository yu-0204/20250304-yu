import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import './Register.css'; // 引入 CSS 文件

function Register() {
  const [name, setName] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 檢查帳號和密碼是否輸入
    if (!name || !account || !password) {
      setError('所有欄位都是必填的');
      return;
    }

    try {
      // 在 Supabase 中註冊用戶
      const {error} = await supabase
        .from('users')
        .insert([
          {
            name: name,
            account: account,
            password: password,
          },
        ]);

      if (error) {
        throw error;
      }

      setMessage('註冊成功！');
      setName('');
      setAccount('');
      setPassword('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-container">
      <h2>註冊頁面</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>名稱:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="請輸入您的名稱"
          />
        </div>
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
        <button type="submit" className="register-button">註冊</button>
      </form>
    </div>
  );
}

export default Register;
