<template>
  <div class="video-player">
    <video ref="video" loop muted playsinline src="/puppiness.mp4" width="600"></video>

    <div class="controls">
      <button @click="togglePlay()">Play/Pause</button>
    </div>
  </div>
</template>

<script>
import useGlobalEvent from '../use/globalEvent'

export default {
  name: 'Video',
  setup (props, context) {
    useGlobalEvent('keydown', (event) => {
      if (event.code === 'Space') {
        event.preventDefault();

        const video = context.refs.video
        video.paused ? video.play() : video.pause()
      }
    })
  }
}
</script>

<style>

</style>