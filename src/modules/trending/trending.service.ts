import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { getJson } from "serpapi";

@Injectable()
export class TrendingService {
  constructor(private readonly configService: ConfigService) {}

  async getTrendingKW() {
    const json = await getJson({
      engine: "google_trends_trending_now",
      geo: "VN",
      hours: "168",
      api_key: this.configService.getOrThrow<string>("GOOGLE_TRENDING_API_KEY"),
    });

    return json["trending_searches"];
  }
}
