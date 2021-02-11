/**
 * This file contains the route to fetch a meme object by id.If id is invalid it sends 404 response.
 */

const {router}  = require('../api_config/CreateRouter');
const {mapToResponse} = require('../api_config/ResponseMapper');
const {Meme}  = require('../models/meme');

/**
 * @swagger
 *  /memes/{id}:
 *      get:
 *          summary: Get the meme by id
 *          tags: [Memes]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: id of the required meme object
 *          responses:
 *              200:
 *                  description: A single meme object
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Meme'
 *              404:
 *                  description: Requested meme object was not found
 */

router.get('/:id',(req,res)=>{
    const id = req.params.id.toString();
    Meme.findById(id,function(err,userFound){
        if(err){
            res.sendStatus(404);
        }
        else{
            res.status(200).json(mapToResponse(userFound));
        }
    });
});

exports.router = router;