地址 http://localhost:3000

## 接口协议

登陆 Post /auth/login 入参 {

}

返回结果 (不需要对 id进行处理反正没有用) { id: sessionId, status: 'ok', }

获取问题： Get /question-naire/:type/:id type = 'question' | 'info' | 'accuracy' 其中
question 是问答部分 accuracy是第二部分 info 是最后一个部分 id 是表示第几个问卷，目前就一个问卷在里面，所以直接用 1 返回结果
结果可能要你再简单解析下。

```
type answerType = "radio" | "input" 

{
    {
        id:Int
        type: 'consultant',
        content: string,
        explain:string?
    },
    {
        type: answerType
        content:string[]?
    }
}
```

提交结果： Post /question-naire/:chat/:id

```
type result = {
    questionId:Int
    // （所有的结果统一保存为string）
    answer:string
}

// 入参
{
    result:result[]
}
```

// 这接口后面再讨论目前先不管 get Result { 获取结果 }
