import { mount } from "@vue/test-utils";
import Agent from "@/views/Agent.vue";

let wrapper;

const $route = {
  name: "Agent",
  path: "/agent/:id",
  params: {
    id: "e86b789e-a8f3-11e7-b549-b60535cbd9d7",
  },
};

describe("Agent.vue", () => {

  it("checks the value of formattedAgentResolution when all props are empty arrays", async () => {
    wrapper = mount(Agent, {
      propsData: {
        agents: [],
        logs: [],
        resolutions: [],
      },
      mocks: {
        $route,
      },
    });

    expect(wrapper.vm.selectedAgent).toEqual({});
    expect(wrapper.vm.formattedAgentResolution).toEqual([]);
    expect(wrapper.vm.formattedAgentResolution.length).toBe(0);
  });

  it("tests the dateFormatter method", async () => {
    wrapper = mount(Agent, {
      propsData: {
        agents: [],
        logs: [],
        resolutions: [],
      },
      mocks: {
        $route,
      },
    });

    let displayedDate = wrapper.vm.dateFormatter("2020-10-06T13:50:00.000Z");
    expect(displayedDate).toBe("6/10/2020 14:50:0");
  });

  it("checks the value of formattedAgentResolution when props have data", async () => {
    wrapper = mount(Agent, {
      propsData: {
        agents: [
          {
            identifier: "e86b789e-a8f3-11e7-b549-b60535cbd9d7",
            firstName: "Morris",
            lastName: "Chambers",
            email: "Morris.Chambers@callcenter.xyz",
            photo:
              "https://via.placeholder.com/300/E241BC/FFFFFF?text=Morris.Chambers",
          },
          {
            identifier: "8273f480-a28b-11e7-b106-e7aa9bbee08e",
            firstName: "Rose",
            lastName: "Patterson",
            email: "RosePatterson@callcenter.xyz",
            photo:
              "https://via.placeholder.com/300/FF805D/333333?text=Rose.Patterson",
          },
        ],
        logs: [
          {
            identifier: "730f0d87-030f-4d8d-b1de-686144ad8d73",
            agentIdentifier: "e86b789e-a8f3-11e7-b549-b60535cbd9d7",
            number: "+49221514231",
            dateTime: "2020-09-01T13:50:00.000Z",
            duration: 247,
          },
        ],
        resolutions: [
          {
            identifier: "730f0d87-030f-4d8d-b1de-686144ad8d73",
            resolution: "needs follow up",
          },
        ],
      },
      mocks: {
        $route,
      },
    });

    let modifiedLog = {
      identifier: "730f0d87-030f-4d8d-b1de-686144ad8d73",
      agentIdentifier: "e86b789e-a8f3-11e7-b549-b60535cbd9d7",
      number: "+49221514231",
      dateTime: "2020-09-01T13:50:00.000Z",
      duration: 247,
      logResolution: {
        identifier: "730f0d87-030f-4d8d-b1de-686144ad8d73",
        resolution: "needs follow up",
      },
    };

    let selectedAgent = {
      identifier: "e86b789e-a8f3-11e7-b549-b60535cbd9d7",
      firstName: "Morris",
      lastName: "Chambers",
      email: "Morris.Chambers@callcenter.xyz",
      photo:
        "https://via.placeholder.com/300/E241BC/FFFFFF?text=Morris.Chambers",
    };

    expect(wrapper.vm.selectedAgent).toEqual(selectedAgent);
    expect(wrapper.vm.formattedAgentResolution).toEqual([modifiedLog]);
    expect(wrapper.vm.formattedAgentResolution.length).toBe(1);
    expect(wrapper.text()).toContain("+49221514231");
  });

});
