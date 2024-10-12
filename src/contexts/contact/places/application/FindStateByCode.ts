import { Inject } from '@nestjs/common';
import { StateNotFoundException } from '../domain/exceptions/StateNotFoundException';
import { PlacesRepository } from '../domain/PlacesRepository';
import { StateResponse } from './StateResponse';

export class FindStateByCode {
  constructor(
    @Inject('PlacesRepository')
    private readonly placesRepo: PlacesRepository,
  ) {}

  public async run(
    countryCode: string,
    stateCode: string,
  ): Promise<StateResponse> {
    try {
      const found = await this.placesRepo.findStatesByCountryCode(countryCode);
      const state = found.find((state) => state.getIsoCode() === stateCode);
      if (!state) throw new StateNotFoundException(stateCode);
      return new StateResponse(state);
    } catch (e) {
      throw e;
    }
  }
}
