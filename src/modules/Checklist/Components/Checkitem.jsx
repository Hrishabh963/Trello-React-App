import { Checkbox } from '@chakra-ui/react'
import React, { useState } from 'react'

const Checkitem = ({name,id}) => {
    const [check,setCheck] = useState(false);
    const handleCheck = ()=>{
        setCheck(!check);
    }
  return (
    <Checkbox isChecked={check} textDecoration={check?'line-through' : 'none'} onChange={handleCheck}>
      {name}
    </Checkbox>
  )
}

export default Checkitem
