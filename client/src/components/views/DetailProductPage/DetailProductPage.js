import React,{useState,useEffect} from 'react'
import axios from 'axios';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import {Row,Col} from 'antd';



function ProductDetailPage(props) {

    const product_id=props.match.params.productId;
    const [Product, setProduct] = useState({})
    useEffect(() => {     

        axios.get(`/api/product/product_by_id?id=${product_id}&type=single`) //서버에 요청.
        .then(response=>{
            if(response.data.success){
                console.log(response.data);
                setProduct(response.data.product[0]);
                
            }
            else{
                  alert("상세 데이터 로드에 실패하였습니다.");
            }
        })
        
    }, [])
    
    return (
        
            <div style={{ width: '100%', padding: '3rem 4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
             <h1>{Product.title}</h1>
            </div>
            <br />

             <Row gutter={[16,16]}>
                 <Col lg={12} sm={24}><ProductImage detail={Product}/></Col>

                 <Col lg={12} sm={24}>  <ProductInfo detail={Product}/></Col>
            

            </Row>

            <br/>

          
            
        </div>
       
    )
}

export default ProductDetailPage
