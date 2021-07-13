<template>
  <div>
    <h2>{{ selectedNumber }} Logs</h2>
    <table>
      <tr>
        <th>#</th>
        <th>Agent Name</th>
        <th>Call date and time</th>
        <th>Resolution</th>
      </tr>
      <tr v-for="(log, index) in formattedCallResolution" :key="log.identifier">
        <td>{{ index + 1 }}</td>
        <td>{{ log.agent.firstName }} {{ log.agent.lastName }}</td>
        <td>{{ dateFormatter(log.dateTime) }}</td>
        <td>{{ log.logResolution.resolution }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Call",

  data() {
    return {
      selectedNumber: null,
    };
  },

  props: {
    agents: {
      type: Array,
      required: true,
    },
    logs: {
      type: Array,
      required: true,
    },
    resolutions: {
      type: Array,
      required: true,
    },
  },

  computed: {
    formattedCallResolution() {
      let all = [];
      let selectedNumberLogs = this.logs.filter(
        (log) => this.selectedNumber == log.number
      );

      selectedNumberLogs.forEach((log) => {
        let logResolution = this.resolutions.find(
          (res) => res.identifier == log.identifier
        );
        log.logResolution = logResolution;
        let agent = this.agents.find(
          (agent) => agent.identifier == log.agentIdentifier
        );
        log.agent = agent;
        all.push(log);
      });
      return all;
    },
  },

  created() {
    this.selectedNumber = this.$route.params.id;
  },

  methods: {
    dateFormatter(date) {
      date = new Date(date);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();

      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    },
  },
};
</script>

<style>
td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
