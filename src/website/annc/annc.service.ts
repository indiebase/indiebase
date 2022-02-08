import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { AnncEntity } from './annc.entity';
import { Repository } from 'typeorm';
import { CreateAnncDto, UpdateAnncDto } from './annc.dto';

@Injectable()
export class AnncService {
  constructor(
    @InjectRepository(AnncEntity)
    private readonly bannerRepo: Repository<AnncEntity>,
  ) {}

  public async createAnnc(body: CreateAnncDto) {
    const banner = this.bannerRepo.create(body);
    return this.bannerRepo.save(banner);
  }

  public async deleteAnnc(id: number) {
    return this.bannerRepo.delete({ id });
  }

  public async updateAnnc(body: UpdateAnncDto) {
    const { id, ...rest } = body;
    return this.bannerRepo.update({ id }, rest);
  }
}
