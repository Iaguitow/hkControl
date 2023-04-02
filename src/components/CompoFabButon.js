import React, {useState} from 'react';
import { Fab,Box, Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import ModalNewRequest from "./CompoModalNewRequest";
import { RequestTypeActions } from "../Actions/ActionRequestType";
import { ActionRooms } from "../Actions/ActionRooms.js";
import { useSelector, useDispatch } from "react-redux";

const FabButton = () => {

  const [isMounted, setIsMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(state => state.reducerLogin);
  const getRooms = (token_api) => {dispatch(ActionRooms.getRooms(token_api)) }
  const getRequestType = (token_api) => {dispatch(RequestTypeActions.getRequestType(token_api,{setIsMounted})) }
  
    return(
      <Box>
        {showModal&&<ModalNewRequest isMounted={isMounted} showModal={ showModal } setShowModal={ setShowModal } setIsMounted={ setIsMounted }/>}
        <Fab
          {...NATIVEBASE_PROPS.FAB} 
          icon={<Icon as={AntDesign} {...NATIVEBASE_PROPS.ICON}/>}
          onPress={() =>{
              setIsMounted(true);
              const token_api = user.payload.tokenapi;
              getRequestType(token_api);
              getRooms(token_api);
              setShowModal(true)
            }}
          _spinner={
            {
              size:"lg"
            }
          }
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