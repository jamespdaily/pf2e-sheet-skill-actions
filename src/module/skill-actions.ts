/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { ActionsIndex } from './actions-index';
import { Flag } from './utils';
import { ModifierPF2e } from './pf2e';

interface RollOption {
  label: string;
  map: number;
}

export interface ActorSkillAction {
  visible: boolean;
}

export default class SkillAction {
  key: string;
  label: string;
  icon: string;
  proficiencyKey: string;
  featRequired: true;

  constructor(
    key: string,
    label: string,
    proficiencyKey: string,
    trainingRequired: boolean,
    icon: string,
    featRequired: boolean,
  ) {
    this.key = key;
    this.label = label;
    this.proficiencyKey = proficiencyKey;
    this.icon = 'systems/pf2e/icons/spells/' + icon + '.webp';
    this.featRequired = featRequired;
  }

  get pf2eItem() {
    return ActionsIndex.instance.get(this.label);
  }

  rollOptions(modifier: number): Array<RollOption> {
    const result = [{ label: `Roll ${modifier}`, map: 0 }];
    if (this.pf2eItem.data.data.traits.value.includes('attack')) {
      const map = this.pf2eItem.calculateMap();
      result.push({ label: game.i18n.format('PF2E.MAPAbbreviationLabel', { penalty: map.map2 }), map: map.map2 });
      result.push({ label: game.i18n.format('PF2E.MAPAbbreviationLabel', { penalty: map.map3 }), map: map.map3 });
    }
    return result;
  }

  rollModifiers(e) {
    const modifiers = [];
    if (!(game instanceof Game)) return modifiers;

    const map = parseInt(e.currentTarget.dataset.map);
    if (map) {
      modifiers.push(
        new ModifierPF2e({
          label: game.i18n.localize('PF2E.MultipleAttackPenalty'),
          modifier: map,
          type: 'untyped',
        }),
      );
    }
    return modifiers;
  }
}

export class SkillActionOwnership {
  action: SkillAction;
  actor: Actor;

  constructor(skillAction: skillAction, actor: Actor) {
    this.action = skillAction;
    this.actor = actor;
  }

  get key() {
    return this.action.key;
  }

  get label() {
    return game.i18n.localize(this.skill.label) + ': ' + this.action.label;
  }

  get skill() {
    return this.actor.data.data.skills[this.action.proficiencyKey];
  }

  get enabled() {
    return (
      (!this.action.trainingRequired || this.skill._modifiers[1].modifier > 0) &&
      (!this.action.featRequired || this.hasFeat())
    );
  }

  get visible() {
    return this.actorData?.visible ?? true;
  }

  private get actorData(): ActorSkillAction | undefined {
    return Flag.get(this.actor, `actions.${this.key}`);
  }

  async update(data: ActorSkillAction) {
    await Flag.set(this.actor, `actions.${this.key}`, data);
  }

  rollOptions() {
    const modifier = (this.skill.value >= 0 ? ' +' : ' ') + this.skill.value;
    return this.action.rollOptions(modifier);
  }

  rollSkillAction(e) {
    game.pf2e.actions[this.key]({ event: e, modifiers: this.action.rollModifiers(e) });
  }

  private hasFeat() {
    const items = this.actor.data.items;
    const result = items.filter((item) => item.data.name === this.action.label);
    return result.length > 0;
  }
}
