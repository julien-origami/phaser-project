import { Sprite } from 'phaser'
import Config from '../Config'

class Player extends Sprite {
    constructor (game, x, y, cursors) {
        super(game, x, y, 'dog')
        this.cursors = cursors
        game.add.existing(this)
        this.frame = 2
        game.physics.arcade.enable(this)
        this.body.bounce.y = Config.bounce
        this.body.gravity.y = Config.gravity
        this.body.collideWorldBounds = true
        this.scale.setTo(1.2, 1.2)
        this.animations.add('left', [0, 1], 5, true)
        this.animations.add('right', [2, 3], 5, true)
    }

    update () {

        if (this.cursors.left.isDown) {
            this.body.velocity.x = -150
            this.direction = 'left'
        }
        else if (this.cursors.right.isDown) {
            this.body.velocity.x = 150
            this.direction = 'right'
            this.animations.play('right')
        }
        else {
            this.body.velocity.x = 0
            if (this.body.touching.down) {
                this.frame = this.direction === 'left' ? 1 : 2
            } else {
                this.frame = this.direction === 'left' ? 0 : 3
            }
        }

        if (this.cursors.up.isDown && this.body.touching.down) {
            this.body.velocity.y = -400
        }

        if (this.body.touching.down) {
            if (this.body.velocity.x > 0) {
                this.animations.play('right')
            } else if (this.body.velocity.x < 0) {
                this.animations.play('left')
            } else {
                this.animations.stop()
                this.frame = this.direction === 'left' ? 1 : 2
            }
        } else {
            this.animations.stop()
            this.frame = this.direction === 'left' ? 0 : 3
        }
    }
}

export default Player
