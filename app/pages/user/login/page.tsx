"use client";

import { getErrorMessage } from "@/lib/err";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginServer } from "./f";
import { setToken } from "@/lib/auth/auth";

export default function Login() {
  const router = useRouter();
  const [uniq_name, uniq_nameSet] = useState("");
  const [password, passwordSet] = useState("");

  const login = async function (uniq_name: string, password: string) {
    // alert(`${uniq_name}, ${password}`);
    try {
      const token = await loginServer(uniq_name, password);
      // 成功则设置 token 到本地
      await setToken(token);
      alert("登录成功");
      router.push("/pages/talks/list");
    } catch (e) {
      alert(getErrorMessage(e));
      return;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');

        .lg-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0c0c0c;
          font-family: 'DM Sans', sans-serif;
        }

        .lg-card {
          width: 360px;
          padding: 48px 40px;
          background: #141414;
          border: 1px solid #222;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .lg-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .lg-title {
          font-family: 'DM Mono', monospace;
          font-size: 20px;
          font-weight: 500;
          color: #f0f0f0;
          margin: 0;
          letter-spacing: -0.3px;
        }

        .lg-subtitle {
          font-size: 13px;
          color: #555;
          margin: 0;
        }

        .lg-fields {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .lg-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .lg-label {
          font-size: 11px;
          font-family: 'DM Mono', monospace;
          color: #444;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        .lg-input {
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

        .lg-input::placeholder {
          color: #333;
        }

        .lg-input:focus {
          border-color: #444;
        }

        .lg-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-top: 4px;
        }

        .lg-btn-primary {
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

        .lg-btn-primary:hover {
          background: #fff;
        }

        .lg-btn-ghost {
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

        .lg-btn-ghost:hover {
          color: #888;
          border-color: #333;
        }
      `}</style>

      <div className="lg-wrapper">
        <div className="lg-card">
          <div className="lg-header">
            <h1 className="lg-title">欢迎回来</h1>
            <p className="lg-subtitle">登录你的账户</p>
          </div>

          <div className="lg-fields">
            <div className="lg-field">
              <label className="lg-label">唯一名称</label>
              <input
                id="uniq_name"
                className="lg-input"
                type="text"
                placeholder="your_handle"
                value={uniq_name}
                onChange={(e) => uniq_nameSet(e.target.value)}
              />
            </div>
            <div className="lg-field">
              <label className="lg-label">密码</label>
              <input
                id="password"
                className="lg-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => passwordSet(e.target.value)}
              />
            </div>
          </div>

          <div className="lg-actions">
            <button
              id="btn-login"
              className="lg-btn-primary"
              onClick={() => login(uniq_name, password)}
            >
              登录
            </button>
            <button
              id="btn-register"
              className="lg-btn-ghost"
              onClick={() => {
                router.push("/pages/user/register");
              }}
            >
              没有账户，去注册
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
