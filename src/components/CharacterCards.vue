<template>
  <div>
    <video-player />

    <div class="order-locations">
      <p>Order locations by: </p>
      <button class="ui blue button" @click="setLocationOrder('name')">Name</button>
      <button class="ui orange button" @click="setLocationOrder('dimension')">Dimension</button>
    </div>

    <div class="ui divider"></div>

    <div class="locations">
      <h1 class="ui header">Locations</h1>

      <div class="ui container cards locations">
        <div
          v-for="location in locationsOrdered"
          :key="location.id"
          class="ui card"
        >
          <div class="content">
            <div class="header">{{ location.name }}</div>
          </div>

          <div class="content">
            <div class="ui small feed">
              <div class="event">
                <div class="content">
                  <div class="summary">
                    ID: {{ location.id }}
                  </div>
                </div>
              </div>

              <div class="event">
                <div class="content">
                  <div class="summary">
                    Type: {{ location.type }}
                  </div>
                </div>
              </div>

              <div class="event">
                <div class="content">
                  <div class="summary">
                    Dimension: {{ location.dimension }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ui divider"></div>

    <div class="order-characters">
      <p>Order characters by: </p>
      <button class="ui blue button" @click="setCharacterOrder('name')">Name</button>
      <button class="ui orange button" @click="setCharacterOrder('id')">Id</button>
    </div>

    <div class="ui divider"></div>

    <div class="characters">
      <h1 class="ui header">Characters</h1>

      <div class="ui container cards">
        <div
          v-for="character in charactersOrdered"
          :key="character.id"
          class="ui card"
        >
          <div class="image">
            <img :src="character.image">
          </div>
          <div class="content">
            <span class="header">{{character.name}}</span>
            <div class="meta">
              <span class="date">Status: {{character.status}}</span>
            </div>
          </div>
          <div class="extra content">
            {{character.species}}
          </div>
        </div>
      </div>
    </div>

    <div v-if="loadingState === 'loading'">
      Loading characters...
      <img src="/spinner.svg" alt="loading">
    </div>
  </div>
</template>

<script>
  import useOrdering from '../use/ordering'
  import useFetchResource from '../use/fetch'
  import useGlobalEvent from '../use/globalEvent'
  import VideoPlayer from './VideoPlayer'

  export default {
    setup () {
      const { loadingState, elements: characters, fetchResource: fetchAllCharacters } = useFetchResource('https://rickandmortyapi.com/api/character')
      const { elements: locations, fetchResource: fetchAllLocations } = useFetchResource('https://rickandmortyapi.com/api/location')

      const { orderedElements: charactersOrdered, setOrderKey: setCharacterOrder } = useOrdering(characters)
      const { orderedElements: locationsOrdered, setOrderKey: setLocationOrder } = useOrdering(locations)

      useGlobalEvent('click', () => {
        characters.value.shift()
      })

      return { loadingState, characters, fetchAllCharacters, locations, fetchAllLocations, charactersOrdered, setCharacterOrder, locationsOrdered, setLocationOrder }
    },
    components: {
      VideoPlayer
    },
    created () {
      this.fetchAllCharacters()
      this.fetchAllLocations()
    }
  }
</script>

<style lang="scss" scoped>
.cards {
  justify-content: space-around;
  margin-top: 2rem;

  .card {
    cursor: pointer;
    transition: all 0.3s ease-out;

    &:hover {
      transform: scale(1.05);
      transition: all 0.3s ease-in;
    }
  }
}
</style>
