import React,{useEffect,useState} from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios'
import {Icon,Col,Card,Row,Carousel} from 'antd'
import Meta from 'antd/lib/card/Meta'
import ImageSlider from '../../utils/ImageSlider.js'

function LandingPage() {


    const [products, setproducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)

    useEffect(() => {        //이 페이지가 실행되면 수행해야하는 효과.
       
        let body={
            skip:Skip,
            limit:Limit
        }
        axios.post('/api/product/products',body).then(response=>{
           if(response.data.success)
           {
               console.log(response.data)
               setproducts(response.data.productInfo);
           }
           else{
               alert('이 페이지에 오류가 발생했습니다.')
           }
        })
    }, [])
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

    }

    return (
        <div style={{width:'75%' ,margin:'3rem auto'}}>
            <div style={{textAlign:'center'}}>
              <h2>한정판 중고 신발들이 한눈에! <Icon type='like'/></h2>
            </div>
        
        <Row gutter={16,16}>
          {renderCards}
        </Row>

            <div style={{display:'flex',justifyContent:'center'}}>
                <button onClick={loadMoreHandler}>더보기</button>
            </div>
        </div>
    )
}

export default LandingPage
