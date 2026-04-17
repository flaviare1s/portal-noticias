import { noticias } from "@/infrastructure/data/news";
import { NEWS_MOCK_API_URL } from "@/services/mockUrls";
import { delay, http, HttpResponse } from "msw";

const MOCK_REQUEST_DELAY_MS = 150;

export const handlers = [
  http.get(`*${NEWS_MOCK_API_URL}`, async () => {
    await delay(MOCK_REQUEST_DELAY_MS);

    return HttpResponse.json(noticias);
  }),
];
