import { DeleteIcon } from '@chakra-ui/icons';
import { Checkbox, Flex, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'

const Checkitem = ({name,id,checked,handleCheckState}) => {
    const [check,setCheck] = useState(checked);
    const handleCheck = ()=>{
        setCheck(!check);
        handleCheckState(!check,id);
    }
  return (
    <Flex>
    <Checkbox isChecked={check} textDecoration={check?'line-through' : 'none'} onChange={handleCheck}>
      {name}
    </Checkbox>
    <IconButton id={id} className='delete_checkitem' size={'sm'} variant={'ghost'} _hover={{bgColor:'#FFFFFF',color:'red'}} icon={<DeleteIcon />} />
    </Flex>
  )
}

export default Checkitem
