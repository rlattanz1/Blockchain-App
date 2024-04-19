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
    it("should add a new proposal", async function () {
      const option1 = "Option 1";
      const option2 = "Option 2";
      const option3 = "Option 3";
      await poll.createPoll([option1, option2, option3]);

      const polled = await poll.getOptions();
      // console.log(polled)

      expect(polled.length).to.equal(3)
    });
  });


});
