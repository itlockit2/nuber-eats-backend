import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Restuarant } from './entities/restaurants.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restuarant)
    private readonly restaurants: Repository<Restuarant>,
  ) {}

  getAll(): Promise<Restuarant[]> {
    return this.restaurants.find();
  }

  createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restuarant> {
    const newRestaurant = this.restaurants.create(createRestaurantDto);
    return this.restaurants.save(newRestaurant);
  }
}
