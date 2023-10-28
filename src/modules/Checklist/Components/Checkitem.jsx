import { DeleteIcon } from '@chakra-ui/icons';
import { Checkbox, Flex, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'

const Checkitem = ({name='',id='',checked=false,handleCheckState,handleCheckItemsDelete}) => {
    const [check,setCheck] = useState(checked);
    const handleCheck = ()=>{
        setCheck(!check);
        handleCheckState(!check,id);
    }
    const deleteCurrentCheckItem = (event)=>{
      event.stopPropagation();
      handleCheckItemsDelete(id);
    }
  return (
    <Flex>
    <Checkbox isChecked={check} textDecoration={check?'line-through' : 'none'} onChange={handleCheck}>
      {name}
    </Checkbox>
    <IconButton onClick={deleteCurrentCheckItem} size={'sm'} variant={'ghost'} _hover={{bgColor:'#FFFFFF',color:'red'}} icon={<DeleteIcon />} />
    </Flex>
  )
}

export default Checkitem
