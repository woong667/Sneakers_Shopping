import React,{useEffect,useState} from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios'
import {Icon,Col,Card,Row,Carousel} from 'antd'
import Meta from 'antd/lib/card/Meta'
import ImageSlider from '../../utils/ImageSlider.js'
import CheckBox from './Section/CheckBox.js';
import {brand,price} from './Section/datas.js';
import RadioBox from './Section/RadioBox.js'

function LandingPage() {


    const [products, setproducts] = useState([])
    const [Skip, setSkip] = useState(0) 
    const [Limit, setLimit] = useState(8)     //한 페이지 몇개의 db를 가져오느냐 결정할때 사용할수 있음
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        brand:[],
        price:[]
    })

    useEffect(() => {        //이 페이지가 실행되면 수행해야하는 효과.
       
        let body={
            skip:Skip,
            limit:Limit
        }
       getproduct(body);
    }, [])

    const getproduct=(body)=>{
        axios.post('/api/product/products',body).then(response=>{
            if(response.data.success)
            {
                if(body.loadMore){
                    setproducts([...products,...response.data.productInfo]);    //이 문법 신기하다 잘기억해놓자. [...배열,...추가배열] 뒤에 append같은 느낌
                }
                else{
                     setproducts(response.data.productInfo);
                }
                setPostSize(response.data.postSize);
            }
            else{
                alert('이 페이지에 오류가 발생했습니다.')
            }
         })

    }
    const renderCards=products.map((product,index)=>{
            return <Col lg={6} md={8} xs={24}  key={index}>
            <Card 
            cover={<ImageSlider images={product.images}/>}>
                <Meta   
                title={product.title}
                description={`$${product.price}`}/>
                </Card>
                </Col>
    })

    const loadMoreHandler=()=>{

        let pp=Skip+Limit;
        let body={
            skip:pp,
            limit:Limit,
            loadMore:true
        }
        
        getproduct(body);
        setSkip(pp);
    }
    const showFilteredResults=(filters)=>{

        let body={
            skip:0,
            limit:Limit,
            filters:filters
        }
        getproduct(body)
        setSkip(0)
    }

    const handleFilters=(filters,category)=>{   //check박스에서 가져온것들을 landing페이지의 state에 넣어야하기에...
           const Newfilters={...Filters}
           Newfilters[category]=filters
           showFilteredResults(Newfilters);
    }

    return (
        <div style={{width:'75%' ,margin:'3rem auto'}}>
            <div style={{textAlign:'center'}}>
              <h2>한정판 중고 신발들이 한눈에! <Icon type='like'/></h2>
            </div>
            <Row gutter={16,16}>
                <Col lg={12} xs={24}>
                < CheckBox lists={brand} handleFilters={filters=>handleFilters(filters,"brand")}/> {/*filters에는 CheckBox에서 props로 보낸 newChecked있음 */}
                </Col>
                <Col lg={12} xs={24}>
                <RadioBox lists={price} handleFilters={filters=>handleFilters(filters,"price")}/>
                </Col>
           </Row>
        

        <Row gutter={16,16}>
          {renderCards}
        </Row>
        <br/>
        <br/>
         {PostSize>=Limit&&<div style={{display:'flex',justifyContent:'center'}}>
                <button onClick={loadMoreHandler}>더보기</button>
            </div>}
        </div>
    )
}

export default LandingPage
