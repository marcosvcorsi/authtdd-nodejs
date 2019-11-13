const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const factory = require("../factories");
const truncate = require("../utils/truncate");

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("shoud encrypt user password", async () => {
    const user = await factory.create("User", {
      password: "123456"
    });

    const compareHash = await bcrypt.compare("123456", user.password_hash);

    expect(compareHash).toBe(true);
  });

  it("should return a jwt token", async () => {
    const user = await factory.create("User", {
      password: "123456"
    });

    expect(user.generateToken()).not.toBeNull();
  });
});
