import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
    init () {
        this.stage.backgroundColor = '#000000'
        this.fontsReady = false
        this.fontsLoaded = this.fontsLoaded.bind(this)
    }

    create () {
        this.game.stage.smoothed = true
        /*this.game.scale.minWidth =
        this.game.scale.minHeight =
        this.game.scale.maxWidth =
        this.game.scale.maxHeight = */
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
        this.scale.pageAlignHorizontally = true
        this.scale.pageAlignVertically  = true
    }

    preload () {
        WebFont.load({
            google: {
                families: ['Bangers']
            },
            active: this.fontsLoaded
        })

        const text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
        text.anchor.setTo(0.5, 0.5)

        this.load.image('loaderBg', './assets/images/loader-bg.png')
        this.load.image('loaderBar', './assets/images/loader-bar.png')
    }

    render () {
        if (this.fontsReady) {
            this.state.start('Splash')
        }
    }

    fontsLoaded () {
        this.fontsReady = true
    }
}
