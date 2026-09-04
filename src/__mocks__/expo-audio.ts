/* global jest */
module.exports = {
  useAudioPlayer: jest.fn(() => ({
    play: jest.fn(),
    seekTo: jest.fn().mockResolvedValue(undefined),
    remove: jest.fn()
  })),
  // @rific/feedback-press/audio's useAudioPool builds its pool with createAudioPlayer (a plain
  // factory), not the useAudioPlayer hook — both need mocking here.
  createAudioPlayer: jest.fn(() => ({
    play: jest.fn(),
    seekTo: jest.fn().mockResolvedValue(undefined),
    remove: jest.fn()
  }))
}
