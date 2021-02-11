/**
 * This file contains the route for updating a meme strictly following the given request payload
 * {caption: <some_caption>,url: <same_url>} and the meme object's id is present as parameter in the
 * request url.It adheres to conflict checking as in POST route.
 */

const {router}  = require('../api_config/CreateRouter');
const {validatePatchRequestSyntax} = require('../api_config/RequestValidator');
const {Meme}  = require('../models/meme');

/**
 * @swagger
 * /memes/{id}:
 *      patch:
 *          summary: Updates an already existing meme object
 *          tags: [Memes]
 *          description: Updates a meme object specified by the given id
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: id of the object which needs to be updated
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: Object
 *                          required:
 *                              - caption
 *                              - url
 *                          properties:
 *                               caption:
 *                                  type: string
 *                                  description: The caption of the meme
 *                               url:
 *                                  type: string
 *                                  description: The url of the meme image
 *                          example:
 *                              caption: It is a meme
 *                              url: https://www.iqmetrix.com/hubfs/Meme%2021.jpg
 *          responses:
 *              204:
 *                  description: Successfully updates a specified meme object with given details.
 *              404:
 *                  description: Requested meme object was not found.
 *              400:
 *                  description: Request syntax is incorrect or Content-Type header not set to application/json.
 *              409:
 *                  description: Meme with same name,url and caption are not allowed.
 *                                  
 */

router.patch('/:id',(req,res)=>{
    if(validatePatchRequestSyntax(req)){
        const id = req.params.id.toString();
        Meme.findById(id,function(err,userFound){
            if(err){
                res.sendStatus(404);
            }
            else{
                Meme.findOne({$and: [{$nor: [{_id: id}]},{$and:[{name: userFound.name},{caption: req.body.caption},{url: req.body.url}]}]},function(err,userWithSameCaptionOrUrl){
                    if(err || userWithSameCaptionOrUrl===null || userWithSameCaptionOrUrl===undefined || userWithSameCaptionOrUrl==={}){
                        Meme.updateOne({_id: id},{caption: req.body.caption,url: req.body.url},function(err,result){
                            if(!err){
                                res.sendStatus(204);
                            }
                        })
                    }
                    else{
                        res.sendStatus(409);
                    }
                });
            }
        });
        
    }
    else{
        res.sendStatus(400);
    }
});

exports.router = router;