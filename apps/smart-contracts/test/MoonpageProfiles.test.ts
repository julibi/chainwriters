import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, upgrades } from "hardhat";
import { expect } from "chai";

describe("MoonpageProfiles", function () {
  let deployer: SignerWithAddress;
  let creatorA: SignerWithAddress;
  let creatorB: SignerWithAddress;
  let userA: SignerWithAddress;
  let userB: SignerWithAddress;
  let profiles: any;
  let profilesAsCreatorA: any;
  let profilesAsCreatorB: any;

  beforeEach(async function () {
    [deployer, creatorA, creatorB, userA, userB] = await ethers.getSigners();

    // ------------------
    // DEPLOY CONTRACT
    // -----------------

    // deploy Profiles
    const MoonpageProfilesFactory = await ethers.getContractFactory(
      "MoonpageProfiles"
    );
    profiles = await upgrades.deployProxy(MoonpageProfilesFactory, [], {
      kind: "uups",
    });
    profilesAsCreatorA = profiles.connect(creatorA);
    profilesAsCreatorB = profiles.connect(creatorB);
  });

  describe("Profiles", () => {
    it("Profiles can be setup as expected", async () => {
      await profilesAsCreatorA.configureProfile(
        "Zoe Jeremy Miller",
        "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg",
        "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg",
        "www.jeremymiller.io"
      );

      const newProfile = await profiles.profiles(creatorA.address);
      expect(newProfile.name).to.equal("Zoe Jeremy Miller");
      expect(newProfile.imageIPFSHash).to.equal(
        "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg"
      );
      expect(newProfile.descriptionIPFSHash).to.equal(
        "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg"
      );
      expect(newProfile.website).to.equal("www.jeremymiller.io");
      expect(newProfile.discord).to.equal("");
      expect(newProfile.instagram).to.equal("");
      expect(newProfile.paragraphxyz).to.equal("");
      expect(newProfile.substack).to.equal("");
      expect(newProfile.twitter).to.equal("");
      expect(newProfile.youtube).to.equal("");
      expect(newProfile.isVerified).to.equal(false);
    });

    it("Profiles can be configured", async () => {
      await profilesAsCreatorA.configureProfile(
        "Zoe Jeremy Miller",
        "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg",
        "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg",
        "www.jeremymiller.io"
      );

      await profilesAsCreatorA.configureSocials(
        "DiscordLink",
        "InstagrmLink",
        "ParagraphXYZ",
        "SubstackLink",
        "TwitterLink",
        "YoutubeLink"
      );

      const newProfile = await profiles.profiles(creatorA.address);
      expect(newProfile.discord).to.equal("DiscordLink");
      expect(newProfile.instagram).to.equal("InstagrmLink");
      expect(newProfile.paragraphxyz).to.equal("ParagraphXYZ");
      expect(newProfile.substack).to.equal("SubstackLink");
      expect(newProfile.twitter).to.equal("TwitterLink");
      expect(newProfile.youtube).to.equal("YoutubeLink");
    });
    it("Profiles can be verified only by owner", async () => {
      await profilesAsCreatorA.configureProfile(
        "Zoe Jeremy Miller",
        "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg",
        "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg",
        "www.jeremymiller.io"
      );

      const profileAData = await profilesAsCreatorA.profiles(creatorA.address);
      expect(profileAData.isVerified).to.equal(false);
      const ProfilesAsDeployer = profiles.connect(deployer);

      await ProfilesAsDeployer.setIsVerified([creatorA.address], [true]);
      const verifiedProfileA = await profilesAsCreatorA.profiles(
        creatorA.address
      );
      expect(verifiedProfileA.isVerified).to.equal(true);
    });

    it("Profiles need to be verified once name or socials are changed", async () => {
      await profilesAsCreatorA.configureProfile(
        "Zoe Jeremy Miller",
        "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg",
        "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg",
        "www.jeremymiller.io"
      );
      const ProfilesAsDeployer = profiles.connect(deployer);
      await ProfilesAsDeployer.setIsVerified([creatorA.address], [true]);
      const verifiedProfileA = await profilesAsCreatorA.profiles(
        creatorA.address
      );
      expect(verifiedProfileA.isVerified).to.equal(true);
      await profilesAsCreatorA.configureProfile(
        "JUST Zoeeee",
        "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg",
        "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg",
        "www.jeremymiller.io"
      );
      const adjustedProfileA = await profilesAsCreatorA.profiles(
        creatorA.address
      );
      expect(adjustedProfileA.isVerified).to.equal(false);
    });
    it("Socials can be configured at once", async () => {
      await profilesAsCreatorA.configureProfile(
        "Zoe Jeremy Miller",
        "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg",
        "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg",
        "www.jeremymiller.io"
      );

      await profilesAsCreatorA.configureSocials(
        "discord",
        "instagram",
        "paragraphxyz",
        "substack",
        "twitter",
        "youtube"
      );
      const profileA = await profilesAsCreatorA.profiles(creatorA.address);
      expect(profileA.name).to.equal("Zoe Jeremy Miller");
      expect(profileA.discord).to.equal("discord");
      expect(profileA.youtube).to.equal("youtube");
    });
    it("Socials can be configured individually", async () => {
      await profilesAsCreatorA.configureProfile(
        "Zoe Jeremy Miller",
        "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg",
        "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg",
        "www.jeremymiller.io"
      );

      await profilesAsCreatorA.configureInstagram("Myinstagram");
      const profileA = await profilesAsCreatorA.profiles(creatorA.address);
      expect(profileA.name).to.equal("Zoe Jeremy Miller");
      expect(profileA.imageIPFSHash).to.equal(
        "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg"
      );
      expect(profileA.instagram).to.equal("Myinstagram");
      expect(profileA.youtube).to.equal("");
      expect(profileA.twitter).to.equal("");
    });
    it("Profiles can be reset", async () => {
      const profileA = await profilesAsCreatorA.profiles(creatorA.address);
      expect(profileA.name).to.equal("");
      await profilesAsCreatorA.configureProfile(
        "Zoe Jeremy Miller",
        "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg",
        "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg",
        "www.jeremymiller.io"
      );

      await profilesAsCreatorA.configureSocials(
        "discord",
        "instagram",
        "paragraphxyz",
        "substack",
        "twitter",
        "youtube"
      );

      const updatedProfileA = await profilesAsCreatorA.profiles(
        creatorA.address
      );
      expect(updatedProfileA.name).to.equal("Zoe Jeremy Miller");
      await profilesAsCreatorA.resetProfile();
      const resetProfileA = await profilesAsCreatorA.profiles(creatorA.address);
      expect(resetProfileA.name).to.equal("");
    });
  });
});
