import Phaser, { Sprite } from 'phaser'

class Coin extends Sprite {
    //    GAME OBJECT, X, Y, ASSET GROUP
    constructor (game, x, y, group) {
        super(game, x, y, 'coin')
        if (group) {
            group.add(this)
        } else {
            game.add.existing(this)
        }
        this.animations.add('turn', [0, 1, 2, 3, 4, 5], 15, true)
        this.body.gravity.y = 300
        this.body.bounce.y = 0.3
        this.animations.play('turn')
    }

    update () {}
}

export default Coin
