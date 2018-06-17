/* * * ./app/emitter.service.ts * * */
// https://gist.github.com/sasxa
//https://gist.github.com/sasxa/e1164d9773b31459f6dc
// Imports
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EmitterService {
  // Event store
  private static _emitters: { [channel: string]: EventEmitter<any> } = {};
  // Set a new event in the store with a given ID
  // as key
  static get(channel: string): EventEmitter<any> {
    if (!this._emitters[channel])
      this._emitters[channel] = new EventEmitter();
    return this._emitters[channel];
  }
}
