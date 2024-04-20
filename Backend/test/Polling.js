const { expect } = require("chai");

describe("Voting contract", function () {
  let Polling;
  let poll;

  beforeEach(async function () {
    Polling = await ethers.getContractFactory("Polling");
    poll = await Polling.deploy();
    await poll.waitForDeployment();
  });

  describe("createPoll", function () {
    it("should add a new proposal with the selected number of options", async function () {
      const option1 = "Option 1";
      const option2 = "Option 2";
      const option3 = "Option 3";
      await poll.createPoll([option1, option2, option3], ["0xdD2FD4581271e230360230F9337D5c0430Bf44C0", "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"], "Poll1");

      const polled = await poll.getPolls();
      const options = await poll.getOptions();

      console.log(polled.length)

      expect(polled.length).to.equal(1)

      expect(options.length).to.equal(3)
    });
  });


});
