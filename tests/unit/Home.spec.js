import { mount, RouterLinkStub } from "@vue/test-utils";
import Home from "@/views/Home.vue";

let wrapper;
describe("Home.vue", () => {

  it("checks the major elements in the component", () => {
    wrapper = mount(Home, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
      propsData: {
        agents: [],
        logs: [],
      },
    });

    expect(wrapper.find('h2')).toBeTruthy();
    expect(wrapper.find('h2').text()).toBe('Home Page');
    expect(wrapper.find('table')).toBeTruthy();
  });

  it("checks the major elements in the component", () => {
    wrapper = mount(Home, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
      propsData: {
        agents: [],
        logs: [],
      },
    });

    let displayedTime = wrapper.vm.dateFormatter("2020-10-06T13:50:00.000Z");
    expect(displayedTime).toBe("14:50");
  });

  it("checks the value of formattedLogs & graphData when props are all empty arrays", () => {
    wrapper = mount(Home, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
      propsData: {
        agents: [],
        logs: [],
      },
    });

    expect(wrapper.vm.formattedLogs).toEqual([]);
    expect(wrapper.vm.formattedLogs.length).toEqual(0);
    expect(wrapper.vm.graphData).toEqual([]);
    expect(wrapper.vm.graphData.length).toEqual(0);
  });

  it("checks the value of formattedLogs & graphData when props have data", async () => {
    wrapper = mount(Home, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
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
      },
    });

    let modifiedLog = {
      identifier: "730f0d87-030f-4d8d-b1de-686144ad8d73",
      agentIdentifier: "e86b789e-a8f3-11e7-b549-b60535cbd9d7",
      number: "+49221514231",
      dateTime: "2020-09-01T13:50:00.000Z",
      duration: 247,
      callCount: 1,
      agent: {
        identifier: "e86b789e-a8f3-11e7-b549-b60535cbd9d7",
        firstName: "Morris",
        lastName: "Chambers",
        email: "Morris.Chambers@callcenter.xyz",
        photo:
          "https://via.placeholder.com/300/E241BC/FFFFFF?text=Morris.Chambers",
      },
    };

    let graphData = [
        ['Calls', 'No Of Times'],
        ['Morris to (+49221514231)', 1]
    ]

    expect(wrapper.vm.formattedLogs.length).toBe(1);
    expect(wrapper.vm.formattedLogs).toEqual([modifiedLog]);
    expect(wrapper.vm.graphData).toEqual(graphData);
    expect(wrapper.vm.graphData.length).toEqual(2);
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('Morris Chambers');
  });

});
