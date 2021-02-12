const isImageUrl = require('image-url-validator').default;
//This function validates the POST request syntax strictly adhering to content-types and empty payloads
async function validatePostRequestSyntax(request){
    let requestSyntaxValidator =  (  request.header('Content-Type')=='application/json' && 
                                    request.body.url!=null && 
                                    request.body.name!=null && 
                                    request.body.caption!=null &&
                                    request.body.caption.length!=0 &&
                                    request.body.url.length!=0 &&
                                    request.body.name.length!=0 && 
                                    Object.keys(request.body).length==3);
    
    let nameValidator = (val) => {
        for(let i=0;i<val.length;i++){
            if(val[i]>='0' && val[i]<='9'){
                return false;
            }
        }
        return true;
    }
    if(requestSyntaxValidator && nameValidator(request.body.name)){
        let urlValidator=false;
        await isImageUrl(request.body.url).then((res)=>{urlValidator=res}).catch((err)=>{urlValidator=false});
        return urlValidator;
    }
    else{
        return false;
    }
}

//This function validates the PATCH request syntax strictly adhering to content-types and empty payloads
async function validatePatchRequestSyntax(request){

    let requestSyntaxValidator = (  request.header('Content-Type')=='application/json' &&
                                    request.body.caption!=null &&
                                    request.body.url!=null &&
                                    request.body.caption.length!=0 &&
                                    request.body.url.length!=0 &&
                                    Object.keys(request.body).length==2);

    if(requestSyntaxValidator){
        let urlValidator=false;
        await isImageUrl(request.body.url).then((res)=>{urlValidator=res}).catch((err)=>{urlValidator=false});
        return urlValidator;
    }
    else{
        return false;
    }
}

exports.validatePatchRequestSyntax = validatePatchRequestSyntax;
exports.validatePostRequestSyntax = validatePostRequestSyntax;