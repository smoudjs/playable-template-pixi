import { sdk } from '@smoud/playable-sdk';
import * as PIXI from 'pixi.js';
// Using assets/* alias configured in tsconfig.json for direct assets import
import buttonBg from 'assets/button.png';

export class Game {
  private app: PIXI.Application;
  private installButton: PIXI.Container;
  private buttonTexture: PIXI.Texture;

  constructor(width: number, height: number) {
    // Create PIXI application
    this.app = new PIXI.Application();

    this.app
      .init({
        width,
        height,
        backgroundColor: 0x1c1c1c,
        resolution: 1.5,
        autoDensity: true
      })
      .then(() => {
        document.body.appendChild(this.app.canvas);

        // Load texture and create game
        PIXI.Assets.load(buttonBg).then((texture) => {
          this.buttonTexture = texture;
          this.create();
        });
      });
  }

  public create(): void {
    this.installButton = new PIXI.Container();
    this.installButton.eventMode = 'static';
    this.installButton.cursor = 'pointer';
    this.app.stage.addChild(this.installButton);

    // Create button sprite
    const buttonBackground = new PIXI.Sprite(this.buttonTexture);
    buttonBackground.anchor.set(0.5);
    buttonBackground.scale.set(0.35);
    this.installButton.addChild(buttonBackground);

    // Create text
    const installText = new PIXI.Text({
      text: 'Install',
      style: new PIXI.TextStyle({
        fontFamily: 'cursive',
        fontSize: 35,
        fill: 0xffffff,
        fontWeight: 'bold',
        dropShadow: {
          color: 0xfffc6a,
          alpha: 0.63,
          blur: 9,
          distance: 4,
          angle: Math.PI / 6
        }
      })
    });
    installText.anchor.set(0.5);
    this.installButton.addChild(installText);

    // Add click handler
    this.installButton.on('pointerdown', () => sdk.install());

    // Set up interaction listener
    sdk.on('interaction', (count: number) => {
      console.log(`Interaction count: ${count}`);

      if (sdk.interactions >= 10) {
        sdk.finish();
      }
    });

    sdk.start();
  }

  public resize(width: number, height: number): void {
    // Resize the application
    this.app.renderer.resize(width, height);

    // Calculate scale based on screen dimensions
    const scaleX = width / 320;
    const scaleY = height / 480;
    const scale = Math.min(scaleX, scaleY); // Use smaller scale to fit both dimensions

    // Update button and text positions and scale
    if (this.installButton) {
      this.installButton.position.set(width / 2, height / 2);
      this.installButton.scale.set(scale);
    }
  }

  public pause(): void {
    console.log('Game paused');
  }

  public resume(): void {
    console.log('Game resumed');
  }

  public volume(value: number): void {
    console.log(`Volume changed to: ${value}`);
  }

  public finish(): void {
    console.log('Game finished');
  }
}
