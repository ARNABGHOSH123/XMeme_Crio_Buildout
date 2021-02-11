

/**
 * @swagger
 * components:
 *  schemas:
 *      Meme:
 *          type: object
 *          required:
 *              - name
 *              - caption
 *              - url
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the meme
 *              name:
 *                  type: string
 *                  description: The name of the memer
 *              caption:
 *                  type: string
 *                  description: The caption of the meme
 *              url:
 *                  type: string
 *                  description: The url of the meme image
 *          example:
 *              id: 6023dfc0dd18e418306a4274
 *              name: Arnab Ghosh
 *              caption: It is a meme
 *              url: https://www.iqmetrix.com/hubfs/Meme%2021.jpg
 *          
 */

 /**
 * @swagger
 *  tags:
 *      name: Memes
 *      description: Memes managing API
 */

require('./GetLatest100Memes');
require('./GetMemeById');
require('./PostANewMeme');
require('./UpdateAMeme');
const {router} = require('../api_config/CreateRouter');
exports.router = router;