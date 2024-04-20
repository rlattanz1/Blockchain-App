const { expect } = require("chai");

describe("Voting contract", function () {
  let Polling;
  let poll;

  beforeEach(async function () {
    Polling = await ethers.getContractFactory("Polling");
    poll = await Polling.deploy();
    await poll.waitForDeployment();
    const option1 = "Option 1";
    const option2 = "Option 2";
    const option3 = "Option 3";
    await poll.createPoll([option1, option2, option3], ["0xdD2FD4581271e230360230F9337D5c0430Bf44C0", "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"], "Poll1");
  });

  describe("createPoll", function () {
    it("should add a new proposal", async function () {

      const polled = await poll.getPolls();

      //   console.log(polled.length)

      expect(polled.length).to.equal(1)

    });
    it("should add the correct number of options", async function () {
        const options = await poll.getOptions(1);
        expect(options.length).to.equal(3)
    })

    it("should add multiple polls", async function () {
        const title2 = "Poll2";
        const options = [
          "This is the first option",
          "This is the second option",
          "This is the third option",
          "This is the fourth option"
        ];

        await poll.createPoll(options, ["0xdD2FD4581271e230360230F9337D5c0430Bf44C0", "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E", "0x2546BcD3c84621e976D8185a91A922aE77ECEc30"], title2);


        const polled = await poll.getPolls();
        expect(polled.length).to.equal(2)
        expect(polled[0].name).to.equal("Poll1")
        expect(polled[1].name).to.equal(title2)
        expect(polled[1].options.length).to.equal(4)
        expect(polled[0].options.length).to.equal(3)
      });
  });

  describe("Vote", function () {
    it("should allow a user to vote", async function () {
        await poll.Vote(1, 0);
        const options = await poll.getOptions(1);

      expect(Number(options[0].count)).to.equal(1);
    });

    it("should not allow a user to vote twice", async function () {
        await poll.Vote(1, 1);
        await expect(poll.Vote(1, 1)).to.be.revertedWith("You have already voted");
    });

    it("should allow voting for a different poll", async function() {
        const title2 = "Poll2";
        const options = [
          "This is the first option",
          "This is the second option",
          "This is the third option",
          "This is the fourth option"
        ];

        await poll.createPoll(options, ["0xdD2FD4581271e230360230F9337D5c0430Bf44C0", "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E", "0x2546BcD3c84621e976D8185a91A922aE77ECEc30"], title2);
        await poll.Vote(1, 1);
        await poll.Vote(2, 3);
        const options1 = await poll.getOptions(1);
        const options2 = await poll.getOptions(2);
        expect(Number(options1[1].count)).to.equal(1);
        expect(Number(options2[3].count)).to.equal(1);
    })

    it("should not allow voting for a poll that does not exist", async function() {
        await expect(poll.Vote(2, 1)).to.be.revertedWith("Invalid poll");
    })

    it("should not allow voting for an option that does not exist", async function() {
        await expect(poll.Vote(1, 10)).to.be.revertedWith("Invalid option");
    })
  });


});
