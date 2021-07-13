<template>
  <div>
    <h2>{{ selectedAgent.firstName }} {{ selectedAgent.lastName }} Logs</h2>
    <table>
      <tr>
        <th>#</th>
        <th>Phone number</th>
        <th>Call date and time</th>
        <th>Resolution</th>
      </tr>
      <tr
        v-for="(log, index) in formattedAgentResolution"
        :key="log.identifier"
      >
        <td>{{ index + 1 }}</td>
        <td>{{ log.number }}</td>
        <td>{{ dateFormatter(log.dateTime) }}</td>
        <td>{{ log.logResolution.resolution }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Agent",

  data() {
    return {
      selectedAgent: {},
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
    formattedAgentResolution() {
      let all = [];
      let filteredLogs = this.logs.filter(
        (log) => this.selectedAgent.identifier == log.agentIdentifier
      );

      filteredLogs.forEach((log) => {
        let logResolution = this.resolutions.find(
          (res) => res.identifier == log.identifier
        );
        log.logResolution = logResolution;
        all.push(log);
      });
      return all;
    },
  },

  created() {
    if (this.agents.length) {
      this.selectedAgent = this.agents.find(
        (agent) => agent.identifier == this.$route.params.id
      );
    }
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
