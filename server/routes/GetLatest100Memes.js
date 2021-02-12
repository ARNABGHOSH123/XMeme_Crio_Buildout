/**
 * This file contains the route to fetch the latest 100 (maximum) memes from backend
 */

const {router}  = require('../api_config/CreateRouter');
const {mapToResponse} = require('../api_config/ResponseMapper');
const {Meme}  = require('../models/meme');


/**
 * @swagger
 * /memes:
 *  get:
 *      summary: Latest 100 (maximum) memes posted
 *      description:  Used to get the latest 100 (maximum) memes posted
 *      tags: [Memes]
 *      responses:
 *          200:
 *              description: List of latest 100 (maximum) meme objects
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Meme'
 */
router.get('',(_,res)=>{
    //Limit is kept to 100 and the sorting in reverse order of id to get latest 100 memes.
    Meme.find({},{},{limit: 100,sort:{_id:-1}}).exec(function(err,userList){
        if(!err){
            res.status(200).json(mapToResponse(userList));
        }
    });
});

exports.router = router;