import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <p> 오늘의 나와 다음달의 나와 그 다음달의 내가 만나면....  <Icon type="smile" /></p>
        </div>
    )
}

export default Footer
