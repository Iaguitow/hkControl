import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

class Image{
    imagePermission(){
        return new Promise((resolve, reject) => {
            try {
                if (Platform.OS !== 'web') {
                    ImagePicker.requestMediaLibraryPermissionsAsync().then(permission =>{
                        if (permission.status !== 'granted') {
                            alert('Sorry, we need camera roll permissions to make this work!');
                            return;
                        }
                        resolve(permission);
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    }
    
    resizeImage(image, bg) {
        return new Promise((resolve, reject) =>{
            try {
                const originalWidth = image.assets[0].width;
                const newWidth = bg?600:200;
                const prop = (100*newWidth/originalWidth)/100;
                const newHeight = Math.floor(prop*image.assets[0].height);

                const manipResult = ImageManipulator.manipulateAsync(
                    image.localUri || image.assets[0].uri,
                    [{resize:{height:newHeight,width:newWidth}}],
                    //[{crop:{originX:1280,originY:1280,width:200,height:200}}],
                    { compress: 1, base64:true, format: ImageManipulator.SaveFormat.PNG }
                  );
                  resolve(manipResult);
            } catch (error) {
                reject(error);
            }
        });
      }

    imagePicker(bg = false) {
        return new Promise((resolve, reject) =>{
            try {
                this.imagePermission().then(permission =>{
                    ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        //allowsEditing:true,
                        aspect: bg?[22, 9]:[4, 3],
                        quality: 1,
                      }).then(imgPicked =>{
                        if (!imgPicked.canceled) {
                            this.resizeImage(imgPicked, bg).then(imageBase64 => {
                                resolve(imageBase64);
                            });
                        }else{
                            resolve(imgPicked);
                        }
                      });
                });
            } catch (error) {
                reject(error);
            }
        })
    }
}

const ImagePickup = new Image()
export default ImagePickup;

