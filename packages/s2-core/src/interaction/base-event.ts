import { RootInteraction } from './root';
import { SpreadSheet } from '@/sheet-type';

export type EventConstructor = new (
  spreadsheet: SpreadSheet,
  interaction: RootInteraction,
) => BaseEvent;

export interface BaseEventImplement {
  bindEvents: () => void;
}

export abstract class BaseEvent {
  public spreadsheet: SpreadSheet;

  public interaction: RootInteraction;

  constructor(spreadsheet: SpreadSheet, interaction: RootInteraction) {
    this.spreadsheet = spreadsheet;
    this.interaction = interaction;
    this.bindEvents();
  }

  public abstract bindEvents(): void;
}
