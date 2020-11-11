import React,{useState,useEffect} from 'react'
import { Button, Descriptions } from 'antd'

function ProductInfo(props) {
    return (
        <div>
            <Descriptions title="상세정보">
                <Descriptions.Item label="Price">{props.detail.price}원</Descriptions.Item>
                <Descriptions.Item label="Update Date">{props.detail.updatedAt}</Descriptions.Item>
                <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
                <Descriptions.Item label="Description">{props.detail.description}</Descriptions.Item>
            </Descriptions>
            <br />
            <br />
            <br />
        </div>
    )
}

export default ProductInfo
