import SkillAction, { SkillActionOwnership } from './skill-actions';

export class IndexedCollection<T extends { key: string }> {
  elements: T[];
  indexed: Map<string, T>;

  constructor() {
    this.elements = [];
    this.indexed = new Map<string, T>();
  }

  get all() {
    return this.elements;
  }

  add(e: T) {
    this.elements.push(e);
    this.indexed.set(e.key, e);
  }

  get(key: string) {
    return this.indexed.get(key);
  }
}

export class SkillActions extends IndexedCollection<SkillAction> {
  constructor() {
    super();
    this.add(new SkillAction('disarm', 'Disarm', 'ath', true, 'perfect-strike', false));
    this.add(new SkillAction('grapple', 'Grapple', 'ath', false, 'remove-fear', false));
    this.add(new SkillAction('trip', 'Trip', 'ath', false, 'natures-enmity', false));
    this.add(new SkillAction('demoralize', 'Demoralize', 'itm', false, 'blind-ambition', false));
    this.add(new SkillAction('shove', 'Shove', 'ath', false, 'ki-strike', false));
    this.add(new SkillAction('feint', 'Feint', 'dec', true, 'delay-consequence', false));
    this.add(new SkillAction('bonMot', 'Bon Mot', 'dip', false, 'hideous-laughter', true));
  }
}

export class SkillActionOwnerships extends IndexedCollection<SkillActionOwnership> {
  constructor(skillActions: SkillActions, actor: Actor) {
    super();
    skillActions.all
      .map((action) => new SkillActionOwnership(action, actor))
      .filter((ownership) => ownership.enabled)
      .forEach((ownership) => this.add(ownership));
  }

  fromEvent(e: JQuery.TriggeredEvent) {
    return this.get(e.delegateTarget.dataset.actionId);
  }
}
