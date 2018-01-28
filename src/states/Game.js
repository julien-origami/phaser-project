import Phaser, { State } from 'phaser'
import Player from '../sprites/Player'
import Coin from '../sprites/Coin'
import Ground from '../grounds/Ground'
import Config from '../Config'

class Game extends State {
    init () {
        this.stage.backgroundColor = '#FFFFFF'
        this.score = 0
    }

    preload () {}

    create () {
        this.world.resize(1500, 400)
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
    	this.game.physics.arcade.gravity.y = Config.gravity
    	this.cursors = this.input.keyboard.createCursorKeys()

        this.grounds = this.game.add.group()
        this.grounds.enableBody = true
        new Ground(this.game, 0, this.game.world.height - 105, 400, 105, '2', this.platforms)
        new Ground(this.game, 384, this.game.world.height - 105, 128, 105, '3', this.platforms)

        new Ground(this.game, 582, this.game.world.height - 105, 128, 105, '1', this.platforms)
        new Ground(this.game, 710, this.game.world.height - 105, this.game.world.width - 710, 105, '2', this.platforms)

        this.game.world.setBounds(0, 0, this.game.world.width, this.game.world.height)
        this.platforms = this.game.add.group()
        this.platforms.enableBody = true

        new Ground(this.game, 0, this.game.world.height - 100, 400, 100, '2', this.platforms)
        new Ground(this.game, 384, this.game.world.height - 100, 128, 100, '3', this.platforms)

        new Ground(this.game, 582, this.game.world.height - 100, 128, 100, '1', this.platforms)
        new Ground(this.game, 710, this.game.world.height - 100, this.game.world.width - 710, 100, '2', this.platforms)

        this.player = new Player(this.game, 300, 150, this.cursors)
        console.log(this.player)
        this.player.anchor.setTo(0.5, 0.0)

        this.coins = this.game.add.group()
        this.coins.enableBody = true

        const coinsPosition = [{width: 400, height: 170}, {width: 600, height: 210}]
        coinsPosition.forEach(o => new Coin(this.game, o.width, o.height, this.coins, this.cursor))

        this.scoreText = this.game.add.text(16, 16, 'Coins: 0', { fontSize: '32px', fill: '#000' })
        this.scoreText.fixedToCamera = true
        this.game.camera.follow(this.player)

        this.platforms.setAll('body.allowGravity', false)
        this.platforms.setAll('body.immovable', true)
        this.platforms.setAll('renderable', false)
        this.platforms.setAll('body.checkCollision.down', false)
    }

    update() {
        this.game.physics.arcade.collide(this.player, this.platforms)
        this.game.physics.arcade.collide(this.coins, this.platforms)
        this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoins, null, this)
    }

    collectCoins (player, coin) {
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
