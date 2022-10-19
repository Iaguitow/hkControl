import React,{useEffect} from "react";
import
    {
        Center,
        AlertDialog,
        Button,
        Text
    }
from "native-base"

const Alerts = ({alertType,isOpenAlert, setIsOpenAlert}) => {
   
    const cancelRef = React.useRef(null);

    return( 
        <Center>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpenAlert} onClose={() =>{setIsOpenAlert(false)}}>
              <AlertDialog.Content bgColor={"red.300"}>
                <AlertDialog.CloseButton />
                <AlertDialog.Header>ERROR.</AlertDialog.Header>
                <AlertDialog.Body>
                  <Text color={"black"} fontWeight="bold"> 1 - Make sure that you have filled up every single fields.</Text>

                  <Text color={"black"} fontWeight="bold"> 2 - Make sure that the room which you typed exists.</Text>

                  <Text color={"black"} fontWeight="bold"> 3 - Make sure that there is a porter responsible for this floor.</Text>
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