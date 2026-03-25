"use client";

import { getToken } from "@/lib/auth/auth";
import { getTalksByUserId } from "../f";
import { TalksMod } from "@/lib/db/schema";
import { useEffect, useState } from "react";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import TalksView from "../view/page";

export default function TalkList() {
  const router = useRouter();
  const [list, setList] = useState<TalksMod[]>([]);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    const data = getTalksByUserId(token);
    console.log(data);
    data.then(setList);
  }, []);
  return (
    <>
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');

      .tl-wrapper {
        min-height: 100vh;
        background: #0c0c0c;
        font-family: 'DM Sans', sans-serif;
        padding: 48px 24px;
      }

      .tl-header {
        max-width: 720px;
        margin: 0 auto 32px;
      }

      .tl-title {
        font-family: 'DM Mono', monospace;
        font-size: 18px;
        color: #f0f0f0;
        margin: 0;
      }

      .tl-count {
        font-size: 12px;
        color: #444;
        margin-top: 4px;
      }

      .tl-list {
        max-width: 720px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 12px;
        list-style: none;
        padding: 0;
      }

      .tl-item {
        background: #141414;
        border: 1px solid #222;
        border-radius: 4px;
        padding: 20px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: border-color 0.15s;
        cursor: pointer;
      }

      .tl-item:hover {
        border-color: #333;
      }

      .tl-item-left {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .tl-item-title {
        font-size: 15px;
        color: #e0e0e0;
        font-weight: 500;
      }

      .tl-item-meta {
        font-family: 'DM Mono', monospace;
        font-size: 11px;
        color: #444;
        display: flex;
        gap: 16px;
      }

      .tl-badge {
        font-family: 'DM Mono', monospace;
        font-size: 10px;
        padding: 3px 8px;
        border-radius: 2px;
        border: 1px solid;
      }

      .tl-badge-done {
        color: #4ade80;
        border-color: #4ade8033;
        background: #4ade8010;
      }

      .tl-badge-pending {
        color: #555;
        border-color: #333;
      }

      .tl-empty {
        text-align: center;
        color: #333;
        font-family: 'DM Mono', monospace;
        font-size: 13px;
        padding: 80px 0;
      }
    `}</style>

      <div className="tl-wrapper">
        <div className="tl-header">
          <h1 className="tl-title">我的对话</h1>
          <p className="tl-count">{list.length} 条记录</p>
        </div>

        {list.length === 0 ? (
          <div className="tl-empty">暂无数据</div>
        ) : (
          <ul className="tl-list">
            {list.map((talk) => (
              <li
                key={talk.id}
                className="tl-item"
                onClick={() => {
                  router.push(`/pages/talks/view?id=${talk.id}`);
                }}
              >
                <div className="tl-item-left">
                  <div className="tl-item-title">{talk.title}</div>
                  <div className="tl-item-meta">
                    <span>创建 {talk.createdAt?.toLocaleDateString()}</span>
                    <span>更新 {talk.updatedAt?.toLocaleDateString()}</span>
                  </div>
                </div>
                <span
                  className={`tl-badge ${talk.translated ? "tl-badge-done" : "tl-badge-pending"}`}
                >
                  {talk.translated ? "已翻译" : "未翻译"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
