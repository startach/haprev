
export const uploadImageHandler = async(userFolder,base64Img) =>{
    //Cloudinary API
    let apiUrlUpload = 'https://api.cloudinary.com/v1_1/startach/image/upload';
    let dataUp = {
        "file": base64Img,
        "upload_preset": 'atuhnhof',
        "public_id": userFolder + '_' + Date.now(),
        "folder": 'avatars/' + userFolder ,
    }

    response = await fetch(apiUrlUpload, {
        body: JSON.stringify(dataUp),
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
    })
    .catch((err) => { console.log(err); });
    data = response._bodyText;
    newAvatarUrl = JSON.parse(data).secure_url;
    return newAvatarUrl;
};