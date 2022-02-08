import { POSSESSION_DELETE } from './possession.sql';
import { CreatePossessionDto } from './possession.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { PossessionEntity } from './possession.entity';
import { Repository } from 'typeorm';

/**
 * 资源节点
 *
 */
export interface PossessionNode extends PossessionEntity {
  isLeaf?: boolean;
  children: PossessionNode[];
}

@Injectable()
export class PossessionService {
  constructor(
    @InjectRepository(PossessionEntity)
    private readonly possessionRepo: Repository<PossessionEntity>,
  ) {}

  /**
   * 生成从所给定的pid开始生成树
   *
   * @param {Number} pid
   * @param {PossessionNode[]} all
   * @returns {}
   */
  private convert2Tree(pid: number, all: PossessionNode[]): PossessionNode {
    let n = { children: [] };

    for (let i = 0; i < all.length; i++) {
      const node = all[i];
      if (node.pid === pid) {
        const cc = Array.from(all);
        cc.splice(i, 1);
        const r = this.convert2Tree(node.id, cc);
        node.children = r.children;
        if (r.children.length < 1) {
          node.children = null;
          node.isLeaf = true;
        }

        n.children.push(node);
      }
    }
    return n as PossessionNode;
  }

  /**
   * 创建资源
   * @param {CreatePossessionDto} body
   * @returns
   */
  async createPossession(body: CreatePossessionDto): Promise<any> {
    const pEntity = this.possessionRepo.create(body);

    return this.possessionRepo.save(pEntity);
  }

  async queryPossessions(pid?: number) {
    return this.possessionRepo.find({ pid });
  }

  async getPossessionsTree(id: number, showLeaf?: number) {
    const all = (await this.possessionRepo.find()) as PossessionNode[];

    return this.convert2Tree(id, all);
  }

  /**
   * 关联删除子树节点
   * @param {number} id 删除节点 将关联删除子节点
   */
  async delPossession(id: number) {
    return this.possessionRepo.query(POSSESSION_DELETE(id));
  }

  async updatePossession(body: CreatePossessionDto) {
    return this.possessionRepo.update({ id: body.id }, body);
  }
}
