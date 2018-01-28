import Phaser, { State } from 'phaser'
import Player from '../sprites/Player'
import Coin from '../sprites/Coin'
import Config from '../Config'

class Game extends State {
    init () {
        this.stage.backgroundColor = '#FFFFFF'
        this.score = 0
    }

    preload () {}

    create () {
        this.world.resize(2200, 400)
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
    	//this.game.physics.arcade.gravity.y = Config.gravity
    	this.cursors = this.input.keyboard.createCursorKeys()

        const height = this.game.world.height
        const width = this.game.world.width
        //this.game.world.setBounds(0, 0, width, height)
        this.platforms = this.game.add.group()
        const bottom = height - 100
        this.platforms.enableBody = true
        this.ground = this.platforms.create(0, bottom, 'ground')
        this.platform1 = this.platforms.create(550, 240, 'ground')
        this.platform2 = this.platforms.create(450, 270, 'ground')
        this.platform1.scale.setTo(0.3, 1)
        this.platform1.body.immovable = true
        this.platform2.scale.setTo(0.3, 1)
        this.platform2.body.immovable = true
        this.ground.scale.setTo(6, 1.3)
        this.ground.body.immovable = true
        console.log(this.platforms)
        //this.platforms.physics.arcade.gravity.y = 0

        this.player = new Player(this.game, 300, 150)

        this.coins = this.game.add.group()
        this.coins.enableBody = true
        new Coin(this.game, 400, 170, this.coins)
        new Coin(this.game, 600, 210, this.coins)

        this.scoreText = this.game.add.text(16, 16, 'Diamonds: 0', { fontSize: '32px', fill: '#000' })
        this.game.camera.follow(this.player)
    }

    update() {
        this.game.physics.arcade.collide(this.player, this.platforms)
        this.game.physics.arcade.collide(this.coins, this.platforms)
        this.game.physics.arcade.overlap(this.player, this.coins, this.collectDiamond, null, this)
    }

    collectDiamond (player, coin) {
        coin.kill()
        this.score += 1
        this.scoreText.text = 'Diamond: ' + this.score
    }

    render () {
        if (__DEV__) {
            this.game.debug.spriteInfo(this.player, 32, 32)
        }
    }
}

export default Game
