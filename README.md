## 接口协议

登陆 Post /auth/login 入参 {

}

返回结果 (不需要对 id进行处理反正没有用) { id: sessionId, status: 'ok', }




获取问题： Get /questions

返回结果

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

提交结果：
Post /submit
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


// 这接口后面再讨论目前先不管
get Result 
{
    获取结果
}
