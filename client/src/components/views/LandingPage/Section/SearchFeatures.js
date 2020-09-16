import React,{useState} from 'react'
import { Input } from 'antd';
const { Search } = Input;
function SearchFeatures(props) {


    const [SearchTerm, setSearchTerm] = useState("")

    const searchHandler=(event)=>{
        setSearchTerm(event.currentTarget.value);
        props.refreshFunction(event.currentTarget.value)
        //console.log(SearchTerm);

    }

    return (
        <div>
           <Search
              placeholder="신발 찾아주세요!"
              onChange={searchHandler}
              style={{ width: 200 }}
              value={SearchTerm}     //밸류도 하나 넣어주고 usestate에서 조작해준다
            />
        </div>
    )
}

export default SearchFeatures
