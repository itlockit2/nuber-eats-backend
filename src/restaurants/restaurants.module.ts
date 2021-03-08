import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restuarant } from './entities/restaurants.entity';
import { RestuarantsResolver } from './restaurants.resolver';
import { RestaurantService } from './restaurants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restuarant])],
  providers: [RestuarantsResolver, RestaurantService],
})
export class RestaurantsModule {}
