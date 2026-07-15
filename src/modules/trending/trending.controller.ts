import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TrendingService } from "./trending.service";

@ApiTags("Trending")
@Controller("trending")
export class TrendingController {
  constructor(private readonly service: TrendingService) {}
  @Get()
  getTrendingKW() {
    return this.service.getTrendingKW();
  }
}
