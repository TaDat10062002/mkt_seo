import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cache } from "cache-manager";
import { getJson } from "serpapi";

@Injectable()
export class TrendingService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getTrendingKW() {
    const dataCached = await this.cacheManager.get("google-trending-kw");

    if (dataCached) {
      console.log("Data from cache");
      return dataCached;
    }

    const data = await getJson({
      engine: "google_trends_trending_now",
      geo: "VN",
      hours: "168",
      api_key: this.configService.getOrThrow<string>("GOOGLE_TRENDING_API_KEY"),
    });
    await this.cacheManager.set("google-trending-kw", data);
    return data;

    // const json = await getJson({
    //   engine: "google_trends_trending_now",
    //   geo: "VN",
    //   hours: "168",
    //   api_key: this.configService.getOrThrow<string>("GOOGLE_TRENDING_API_KEY"),
    // });

    // return json["trending_searches"];
  }
}
