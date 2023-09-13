import { Controller, Get, UseGuards } from '@nestjs/common';
import axios from 'axios';
import { JwtGuard } from 'src/auth/auth.guard';

@Controller('api/random-joke')
export class JokesController {
  @Get()
  @UseGuards(JwtGuard)
  async getRandomJoke() {
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
    return response.data.value;
  }
}
