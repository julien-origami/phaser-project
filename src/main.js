import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'

import Config from './Config'

class Game extends Phaser.Game {
    constructor () {
        super(Config.gameWidth, Config.gameHeight, Phaser.AUTO, 'content', null)
        this.state.add('Boot', BootState, false)
        this.state.add('Splash', SplashState, false)
        this.state.add('Game', GameState, false)

        if (!window.cordova) {
            this.state.start('Boot')
        }
    }
}

window.game = new Game()

if (window.cordova) {
    const app = {
        initialize: () => {
            document.addEventListener(
                'deviceready',
                this.onDeviceReady.bind(this),
                false
            )
        },

        onDeviceReady: () => {
            this.receivedEvent('deviceready')
            window.game.state.start('Boot')
        },

        receivedEvent: id => {
            console.log('Received Event: ' + id)
        }
    }

    app.initialize()
}
