"use client";

import { useState } from "react";
import { register } from "./f";
import { getErrorMessage } from "@/lib/err";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [uniq_name, setUniqName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const f = async function (
    uniq_name: string,
    username: string,
    password: string,
  ) {
    try {
      await register(uniq_name, username, password);
    } catch (e) {
      alert(`注册失败 ${getErrorMessage(e)}`);
      return;
    }
    alert("注册成功");
    router.push("/pages/user/login");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');

        .rg-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0c0c0c;
          font-family: 'DM Sans', sans-serif;
        }

        .rg-card {
          width: 360px;
          padding: 48px 40px;
          background: #141414;
          border: 1px solid #222;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .rg-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .rg-title {
          font-family: 'DM Mono', monospace;
          font-size: 20px;
          font-weight: 500;
          color: #f0f0f0;
          margin: 0;
          letter-spacing: -0.3px;
        }

        .rg-subtitle {
          font-size: 13px;
          color: #555;
          margin: 0;
        }

        .rg-fields {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .rg-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .rg-label {
          font-size: 11px;
          font-family: 'DM Mono', monospace;
          color: #444;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        .rg-input {
          background: #0c0c0c;
          border: 1px solid #2a2a2a;
          border-radius: 3px;
          padding: 10px 12px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #e0e0e0;
          outline: none;
          transition: border-color 0.15s;
        }

        .rg-input::placeholder {
          color: #333;
        }

        .rg-input:focus {
          border-color: #444;
        }

        .rg-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-top: 4px;
        }

        .rg-btn-primary {
          width: 100%;
          padding: 11px;
          background: #f0f0f0;
          color: #0c0c0c;
          border: none;
          border-radius: 3px;
          font-size: 13px;
          font-family: 'DM Mono', monospace;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: 0.3px;
          transition: background 0.15s;
        }

        .rg-btn-primary:hover {
          background: #fff;
        }

        .rg-btn-ghost {
          width: 100%;
          padding: 11px;
          background: transparent;
          color: #444;
          border: 1px solid #222;
          border-radius: 3px;
          font-size: 13px;
          font-family: 'DM Mono', monospace;
          cursor: pointer;
          letter-spacing: 0.3px;
          transition: color 0.15s, border-color 0.15s;
        }

        .rg-btn-ghost:hover {
          color: #888;
          border-color: #333;
        }
      `}</style>

      <div className="rg-wrapper">
        <div className="rg-card">
          <div className="rg-header">
            <h1 className="rg-title">创建账户</h1>
            <p className="rg-subtitle">填写以下信息完成注册</p>
          </div>

          <div className="rg-fields">
            <div className="rg-field">
              <label className="rg-label">唯一名称</label>
              <input
                className="rg-input"
                type="text"
                placeholder="your_handle"
                value={uniq_name}
                onChange={(e) => setUniqName(e.target.value)}
              />
            </div>
            <div className="rg-field">
              <label className="rg-label">用户名</label>
              <input
                className="rg-input"
                type="text"
                placeholder="显示名称"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="rg-field">
              <label className="rg-label">密码</label>
              <input
                className="rg-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="rg-actions">
            <button
              className="rg-btn-primary"
              onClick={() => f(uniq_name, username, password)}
            >
              注册
            </button>
            <button
              className="rg-btn-ghost"
              onClick={() => router.push("/pages/user/login")}
            >
              已有账户，去登录
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
