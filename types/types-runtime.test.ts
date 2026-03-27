describe("types modules", () => {
  it("loads type barrel modules without runtime errors", async () => {
    await expect(import("./index")).resolves.toBeDefined();
    await expect(import("./news.types")).resolves.toBeDefined();
    await expect(import("./contact.types")).resolves.toBeDefined();
  });
});
