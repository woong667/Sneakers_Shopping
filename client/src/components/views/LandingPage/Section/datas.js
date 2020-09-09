const brand=[
    {
        "_id":1,
        "name":"NIKE"
    },
    {
        "_id":2,
        "name":"Adidas"
    },
    {
       "_id":3,
       "name":"New Balance"
    },
    {
        "_id":4,
        "name":"Converse"
    }
    ,{
        "_id":5,
        "name":"ETC"
    }
]

const price=[
    {
        "_id":0,
        "name":"Any",
        "array":[]
    },
    {
        "_id":1,
        "name":"10만원 이하",
        "array":[0,100000]
    },
    {
        "_id":2,
        "name":"10만원-20만원",
        "array":[100001,200000]
    },
    {
        "_id":3,
        "name":"20만원-30만원",
        "array":[200001,300000]
    },
    {
        "_id":4,
        "name":"30만원-40만원",
        "array":[300001,400000]
    },
    {
        "_id":5,
        "name":"40만원-50만원",
        "array":[400001,500000]
    },
    {
        "_id":6,    
        "name":"50만원 이상",
        "array":[500001,100000000]
    },
]

export {
    brand
    ,price
}