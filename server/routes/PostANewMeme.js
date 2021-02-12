/**
 * This file contains the route to post a new meme.Same payloads are not allowed.
 */

const {router}  = require('../api_config/CreateRouter');
const {validatePostRequestSyntax} = require('../api_config/RequestValidator');
const {Meme}  = require('../models/meme');


/**
 * @swagger
 * /memes:
 *  post:
 *      summary: Creates a new meme
 *      description: Creates a new meme object and returns the id of the newly created object
 *      tags: [Memes]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      required:
 *                          - name
 *                          - caption
 *                          - url
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: The name of the memer
 *                          caption:
 *                              type: string
 *                              description: The caption of the meme
 *                          url:
 *                              type: string
 *                              description: The url of the meme image
 *                      example:
 *                          name: Arnab Ghosh
 *                          caption: It is a meme
 *                          url: https://www.iqmetrix.com/hubfs/Meme%2021.jpg
 *                          
 *      responses:
 *          '201':
 *              description: Successfully creates a meme object and returns the id.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: Object
 *                          required:
 *                              - id
 *                          properties:
 *                              id:
 *                                  type: string
 *                                  description: The auto-generated id of the meme
 *                          example:
 *                              id: 6023dfc0dd18e418306a4274
 *          '400':
 *              description: Request syntax is incorrect or Content-Type header not set to application/json.
 *          '409':
 *              description: Meme with same payload(name/url/caption) is not allowed to be posted.
 */
router.post('',async (req,res)=> {
    let requestValidation = await validatePostRequestSyntax(req);
    if(requestValidation===true){
        console.log('here');
        Meme.findOne({$and:[{name: req.body.name},{caption: req.body.caption},{url: req.body.url}]},function(err,userWithSameCaptionOrUrl){
            if(err || userWithSameCaptionOrUrl===null || userWithSameCaptionOrUrl===undefined || userWithSameCaptionOrUrl==={}){
                let meme = new Meme({
                    name: req.body.name,
                    url: req.body.url,
                    caption: req.body.caption
                });
                meme.save(function(err,userSaved){
                    if(!err){
                        res.status(201).json({id: userSaved._id});
                    }
                });
            } 
            else{
                res.sendStatus(409);
            }
        });
    }
    else{
        res.sendStatus(400);
    }
});

exports.router = router;