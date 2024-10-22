import { zRes } from "./get";
import { getPublishersWithSearchTerm } from "./get.model";

describe("GET /campaign/:id/publisher", () => {
  test("the result of the campaign publishers should return well-formatted json", async () => {
    const publishers = await getPublishersWithSearchTerm({ term: "레터" });

    console.log(JSON.stringify(publishers, undefined, 2));
    expect(zRes.safeParse(publishers).success).toEqual(true);
  });
});
