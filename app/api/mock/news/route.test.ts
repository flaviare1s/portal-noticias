jest.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown) => ({
      status: 200,
      json: async () => body,
    }),
  },
}));

import { noticias } from "@/infrastructure/data/news";
import { GET } from "./route";

describe("mock news route", () => {
  it("returns the in-memory news payload", async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(noticias);
  });
});
