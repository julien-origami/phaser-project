import Phaser, { TileSprite } from 'phaser'

class Ground extends TileSprite {
    //    GAME OBJECT, X, Y, WIDTH, HEIGHT, FRAME, ASSET GROUP
    constructor (game, x, y, width, height, frame, group, cursors) {
        super(game, x, y, width, height, 'ground', frame)
        if (group) {
            group.add(this)
        } else {
            game.add.existing(this)
        }
    }

    update () {}
}

export default Ground
