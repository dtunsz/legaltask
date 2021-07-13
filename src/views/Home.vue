<template>
  <div>
    <h2>Home Page</h2>
    <div class="both">
      <table>
        <tr>
          <th>#</th>
          <th>Phone number</th>
          <th>Number of calls</th>
          <th>Last call details</th>
        </tr>
        <tr v-for="(log, index) in formattedLogs" :key="log.identifier">
          <td>{{ index + 1 }}</td>
          <td>
            <router-link :to="`/call/${log.number}`">
              {{ log.number }}
            </router-link>
          </td>
          <td>
            {{ log.callCount }} {{ log.callCount > 1 ? "calls" : "call" }}
          </td>
          <td>
            <router-link :to="`/agent/${log.agent.identifier}`">
              {{ log.agent.firstName }} {{ log.agent.lastName }}
            </router-link>
            / {{ dateFormatter(log.dateTime) }}
          </td>
        </tr>
      </table>

      <GChart
        v-if="graphData.length"
        type="PieChart"
        :data="graphData"
        :options="chartOptions"
      />
    </div>
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";

export default {
  name: "Home",

  components: {
    GChart,
  },

  data() {
    return {
      formattedLogs: [],
      chartOptions: {
        title: "Agent Calls Data",
        width: 700,
        pieHole: 0.4,
        enableInteractivity: true,
        pieSliceTextStyle: {
          fontSize: "auto",
        },
        pieSliceText: "none",
        backgroundColor: "#f6f7f8",
        tooltip: {
          textStyle: {
            fontSize: 15,
          },
          isHtml: true,
        },
        legend: {
          position: "labeled",
        },
      },
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
  },

  computed: {
    graphData() {
      let all = [];
      if (this.formattedLogs.length) {
        all.push(["Calls", "No Of Times"]);
        this.formattedLogs.forEach((log) => {
          let callBy = log.agent.firstName;
          let callTo = log.number;
          let times = log.callCount;
          let call = `${callBy} to (${callTo})`;
          all.push([call, times]);
        });
      }
      return all;
    },
  },

  mounted() {
    this.logsFormatter();
  },

  methods: {
    logsFormatter() {
      let all = [];
      for (let index = 0; index < this.logs.length; index++) {
        let agent = this.agents.find(
          (agent) => agent.identifier == this.logs[index].agentIdentifier
        );
        if (agent) {
          this.logs[index].agent = agent;
        }
        let sameLogs = this.logs.filter(
          (log) =>
            log.number == this.logs[index].number &&
            log.agentIdentifier == agent.identifier
        );
        this.logs[index].callCount = sameLogs.length;
        let added = all.filter(
          (log) =>
            log.number == this.logs[index].number &&
            log.agentIdentifier == agent.identifier
        );
        if (!added.length) {
          all.push(this.logs[index]);
        }
      }
      this.formattedLogs = [...all];
    },

    dateFormatter(date) {
      date = new Date(date);
      let hours = date.getHours();
      let minutes = date.getMinutes();
      return `${hours}:${minutes}`;
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
a {
  color: cadetblue;
  text-decoration: none;
}
.both {
  display: flex;
}
</style>
