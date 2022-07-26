import React,{useEffect} from "react";
import
    {
        Center,
        AlertDialog,
        Button
    }
from "native-base"

const Alerts = ({alertType,isOpenAlert, setIsOpenAlert}) => {
   
    const cancelRef = React.useRef(null);

    return( 
        <Center>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpenAlert} onClose={() =>{setIsOpenAlert(false)}}>
              <AlertDialog.Content bgColor={"red.300"}>
                <AlertDialog.CloseButton />
                <AlertDialog.Header>EMPTY FIELDS.</AlertDialog.Header>
                <AlertDialog.Body>
                  Please, fill up every single field before try to save it. Or check the room number typed. It should be a real room number.
                </AlertDialog.Body>
                <AlertDialog.Footer bgColor={"red.300"}>
                  <Button.Group space={2}>
                    <Button colorScheme="danger" onPress={() =>{setIsOpenAlert(false)}}>
                      OK
                    </Button>
                  </Button.Group>
                </AlertDialog.Footer>
              </AlertDialog.Content>
            </AlertDialog>
          </Center>
          )
  };

  export default Alerts;