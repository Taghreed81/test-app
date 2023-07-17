import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { Repository, ObjectLiteral, DeepPartial, FindOneOptions } from 'typeorm';

@Injectable()
export class crudService<Entity extends ObjectLiteral, CreateDto, UpdateDto> {
  constructor(private repository: Repository<Entity>) { }

  async create(createDto: CreateDto) {
    const entity = this.repository.create(createDto as DeepPartial<Entity>);
    return await this.repository.save(entity);
  }

  async findAll() {
    return await this.repository.find();
  }

  // async findOne(id: any) {
  //   const entity = await this.repository.findByIds([id]);

  //   return entity[0];
  // }

  async findOne(id: any): Promise<any>{
    const entity = await this.repository.findOne(id);
    if(!entity) throw new NotFoundException(`${entity} not found`);
    return entity;
  }

  async findUserByEmail (email: any){
    return await this.repository.findOneBy({ email: email });
  }

  async update(id: string, updateDto: UpdateDto) {
    return await this.repository.update(id, updateDto as DeepPartial<Entity>);
  }

  async remove(id: string) {
    return await this.repository.delete(id);
  }
}
