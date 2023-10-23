import React from "react";
import { Card , CardBody, CardHeader } from "@chakra-ui/react";
const List = ({name = '',listCards = []}) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">{name}</Heading>
      </CardHeader>

      <CardBody>
        
      </CardBody>
    </Card>
  );
};

export default List;
