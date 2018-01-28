import { Sprite } from 'phaser'
import Config from '../Config'

class Player extends Sprite {
    constructor (game, x, y) {
        super(game, x, y, 'dog')
        game.add.existing(this)
        this.frame = 2
        game.physics.arcade.enable(this)
        this.body.bounce.y = Config.bounce
        this.body.gravity.y = Config.gravity
        this.body.collideWorldBounds = true
        this.animations.add('left', [0, 1], 5, true)
        this.animations.add('right', [2, 3], 5, true)
    }

    update () {
        const cursors = game.input.keyboard.createCursorKeys()
        this.direction = this.direction ? this.direction : 'left'

        if (this.body.touching.down) {
            if (cursors.left.isDown) {
                this.body.velocity.x = -80
                this.animations.play('left')
                this.direction = 'left'
            }
            else if (cursors.right.isDown) {
                this.body.velocity.x = 80
                this.animations.play('right')
                this.direction = 'right'
            }
            else {
                this.animations.stop()
                this.frame = this.direction === 'left' ? 1 : 2
                this.body.velocity.x = 0
            }

            if (cursors.up.isDown && this.body.touching.down) {
                this.body.velocity.y = -250
            }
        } else {
            this.frame = this.direction === 'left' ? 0 : 3
        }
    }
}

export default Player
