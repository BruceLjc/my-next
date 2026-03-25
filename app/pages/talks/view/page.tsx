"use client";

import { getToken } from "@/lib/auth/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { getTalkByID } from "../f";
import { useEffect, useState } from "react";
import { TalksMod } from "@/lib/db/schema";

export default function TalkView() {
  const router = useRouter();
  const [talk, setTalk] = useState<TalksMod>();
  const search = useSearchParams();
  const idStr = search.get("id");

  useEffect(() => {
    const token = getToken(); // 获取token
    const id = Number(idStr); // string转number

    if (token === null) {
      alert("鉴权失败");
      return;
    }

    getTalkByID(token, id).then(setTalk); // 获取并设置数据
  }, [idStr]);

  // 展示
  return (
    <div>
      {talk?.id}
      {/* <div>
        导航栏
        <span>
          <button onClick={() => {router.push(`/pages/talks/list`)}}>返回主页面</button>
        </span>
        <span>
          <button onClick={()=>{这里对应的use sever的函数，入参整个文章}}>保存</button>
        </span>
        <span>
          <button onClick={()=>{调用翻译函数，传入content，返回content。然后重新渲染content}}>翻译</button>
        </span>
      </div>
      <div>
        <span>
          展示对话，内置md渲染及右键编辑（高亮）
          这里是一个列表，根据role区分，一左一右，样式不同
        </span>
      </div> */}
    </div>
  );
}
