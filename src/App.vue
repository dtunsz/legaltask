<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <router-view
        v-if="!isLoading"
        :agents="agents"
        :logs="logs"
        :resolutions="resolutions"
    />
  </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return{
            isLoading: true,
            agents: [],
            logs: [],
            resolutions: []
        }
    },
    created() {
        Promise.all([
            fetch("http://localhost:3000/").then(response => response.json()),
            fetch("http://localhost:3000/logs").then(response => response.json()),
            fetch("http://localhost:3000/resolutions").then(response => response.json())
        ]).then(responses => {
            this.agents = responses[0];
            this.logs = responses[1];
            this.resolutions = responses[2];
            this.isLoading = false;
        }).catch(error => {
            console.error('Unable to fetch data', error)
            this.isLoading = false;
        });
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
