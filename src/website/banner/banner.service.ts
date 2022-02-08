import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { BannerEntity } from './banner.entity';
import { CreateBannerDto, QueryBannerDto, UpdateBannerDto } from './banner.dto';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(BannerEntity)
    private readonly bannerRepo: Repository<BannerEntity>,
  ) {}

  public async createBanner(body: CreateBannerDto) {
    const banner = this.bannerRepo.create(body);
    return this.bannerRepo.save(banner);
  }

  public async deleteBanner(id: number) {
    return this.bannerRepo.delete({ id });
  }

  public async updateBanner(body: UpdateBannerDto) {
    const { id, ...rest } = body;
    return this.bannerRepo.update({ id }, rest);
  }

  public async queryActiveBanners() {
    return this.bannerRepo.find({ disable: true });
  }

  public async queryBanners(query: QueryBannerDto) {
    query = Object.assign({}, { pageSize: 20, current: 1 }, query);
    const { disable } = query;
    const condition = [];
    disable && condition.push({ disable });
    try {
      const [list, total] = await this.bannerRepo.findAndCount({
        where: condition,
        skip: (query.current - 1) * query.pageSize,
        take: query.pageSize,
      });
      return {
        list,
        total,
      };
    } catch (error) {
      throw error;
    }
  }
}
