export type CarTest = {
    id: string
    //题目
    qname: string
    //与题目关联的图片
    imgurl: string
    //最差的回答
    bastanswer: string
    //最佳答案id
    bestanswerid: string
    //该题的类型盲猜是科目一二三
    type: string
    //回答
    answer: string
    //解释答案
    explananswer: string
    //章节ID，与我无用
    chapterId: string
    //错误率
    errorRate: number
    //选项
    items: [
        {
            name: string
            symbol: string
            order: number
        }
    ],
    //多选题答案
    multiChoiceAnswer: string
}