import React, {useState} from 'react';
import { Fab,Box, Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import ModalNewRequest from "./CompoModalNewRequest";

const FabButton = () => {

  const [isLoading, setIsloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
    return(
      <Box>
        <ModalNewRequest showModal={ showModal } setShowModal={ setShowModal }/>
        <Fab
          {...NATIVEBASE_PROPS.FAB} 
          icon={<Icon as={AntDesign} {...NATIVEBASE_PROPS.ICON}/>}
          onPress={() =>{setShowModal(true)}}
          _spinner={
            {
              size:"lg"
            }
          }
          isLoading={isLoading}
        />
      </Box>
    );
  };

 const NATIVEBASE_PROPS={
    FAB:{
      bgColor:"rgb(228, 208, 10)",
      shadow:2, 
      size:"lg"
    },
    ICON:{
      color:"white",
      name:"plus", 
      size:"lg"
    }
  }

  export default FabButton;