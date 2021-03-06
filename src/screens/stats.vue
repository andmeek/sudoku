<template>
  <div class="stats screen">
    <header>
      <h1>Gameplay Stats</h1>

      <button
        ref="exit"
        class="menu"
        @click="$emit('exit')"
      >
        Back
      </button>
    </header>

    <table>
      <tr>
        <th>Difficulty</th>
        <th>Plays</th>
        <th>Completed</th>
        <th>Best Time</th>
      </tr>
      <tr
        v-for="(details, difficulty) in stats"
        :key="difficulty"
      >
        <td>{{ difficulty }}</td>
        <td>{{ details === null ? '' : details.plays }}</td>
        <td>{{ details === null ? '' : details.completed }}</td>
        <td>{{ bestTime(difficulty) }}</td>
      </tr>
    </table>

    <h2>Plays</h2>

    <ul>
      <li
        v-for="play in plays"
        :key="play.id"
      >
        {{ dateFormat(play.date) }} - {{ play.difficulty }}, {{ play.completed ? 'completed' : 'incompleted' }} in {{ play.timer.toTimerDisplay() }}, with {{ play.mistakes }} mistakes.
      </li>
    </ul>

    <button
      ref="wipe"
      class="menu"
      @click="wipeStats"
    >
      Wipe Stats
    </button>
  </div>
</template>

<script>
import Database from '../database.js'

export default {
  data: function () {
    return {
      plays: null,
      stats: {
        Easy: null,
        Medium: null,
        Hard: null,
        'Very Hard': null,
        Insane: null,
        Unthinkable: null
      }
    }
  },
  mounted () {
    this.loadStats()
  },
  methods: {
    bestTime: function (difficulty) {
      if (this.stats[difficulty] !== null && this.stats[difficulty].besttime !== null) {
        return this.stats[difficulty].besttime.toTimerDisplay()
      }
      return null
    },
    dateFormat: function (epoch) {
      return (new Date(epoch)).toLocaleDateString()
    },
    loadPlays: function () {
      this.plays = []

      return new Promise((resolve) => {
        Database.games().then((games) => {
          this.plays = games.reverse()

          resolve()
        })
      })
    },
    loadStats: function () {
      return this.loadPlays().then(() => {
        Object.keys(this.stats).forEach((key) => {
          this.stats[key] = null
        })

        this.plays.forEach((play) => {
          const difficulty = play.difficulty

          if (this.stats[difficulty] === null) {
            this.stats[difficulty] = { plays: 0, besttime: null, completed: 0 }
          }

          this.stats[difficulty].plays++

          if (play.completed === true) {
            if (this.stats[difficulty].besttime === null) {
              this.stats[difficulty].besttime = play.timer
            } else if (this.stats[difficulty].besttime > play.timer) {
              this.stats[difficulty].besttime = play.timer
            }

            this.stats[difficulty].completed++
          }
        })
      })
    },
    wipeStats: function () {
      if (window.confirm('Are you sure you want to permanently wipe your game plays?')) {
        return Database.drop().then(() => {
          this.loadStats()
        })
      }
    }
  }
}
</script>

<style>
.stats h1 {
  display: inline-block
}

.stats header button {
  display: inline-block;
  float: right;
  margin-top: 1.2em;
  width: 20%;
}

.stats table {
  border-spacing: 0px 12px;
  font-size: 1.2em;
  margin: 12px;
  width: 100%;
}
.stats th {
  text-align: left;
}

.stats ul {
  padding-inline-start: 0px;
}

.stats li {
  list-style: none;
  margin: 12px;
  font-size: 1.2em;
}
</style>
