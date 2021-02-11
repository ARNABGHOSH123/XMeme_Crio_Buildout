//This function validates the POST request syntax strictly adhering to content-types and empty payloads
function validatePostRequestSyntax(request){
    return (request.header('Content-Type')=='application/json' && 
            request.body.url!=null && 
            request.body.name!=null && 
            request.body.caption!=null &&
            request.body.caption.length!=0 &&
            request.body.url.length!=0 &&
            request.body.name.length!=0 && 
            Object.keys(request.body).length==3);
}

//This function validates the PATCH request syntax strictly adhering to content-types and empty payloads
function validatePatchRequestSyntax(request){
    return (request.header('Content-Type')=='application/json' &&
            request.body.caption!=null &&
            request.body.url!=null &&
            request.body.caption.length!=0 &&
            request.body.url.length!=0 &&
            Object.keys(request.body).length==2);
}

exports.validatePatchRequestSyntax = validatePatchRequestSyntax;
exports.validatePostRequestSyntax = validatePostRequestSyntax;