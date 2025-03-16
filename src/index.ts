import { Game } from './Game';
import './index.css';
import { sdk } from '@smoud/playable-sdk';

// Initialize the SDK
sdk.init((width: number, height: number) => {
  // Initialize game with container dimensions
  const game = new Game(width, height);

  // Set up all event listeners
  sdk.on('resize', game.resize, game);
  sdk.on('pause', game.pause, game);
  sdk.on('resume', game.resume, game);
  sdk.on('volume', game.volume, game);
  sdk.on('finish', game.finish, game);
});
