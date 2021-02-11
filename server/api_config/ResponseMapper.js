/*This function maps a response from MongoDB to follow the requirements in the form of
    [{id: _id,name,: <name>,caption: <caption>}] or {id: _id,name,: <name>,caption: <caption>}
*/
function mapToResponse(userDetails){
    return ((userDetails instanceof Array)===true)?userDetails.map((user)=>{
        return {
            id: user._id,
            name: user.name,
            url: user.url,
            caption: user.caption
        }}):
        {
            id: userDetails._id,
            name: userDetails.name,
            url: userDetails.url,
            caption: userDetails.caption
        };
}

exports.mapToResponse = mapToResponse;