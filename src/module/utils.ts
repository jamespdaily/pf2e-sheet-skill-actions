import { PF2eActorFlag } from './globals';

export const Flag = {
  set: async function <K extends keyof PF2eActorFlag, V extends PF2eActorFlag[K]>(actor: Actor, key: K, data: V) {
    await actor.setFlag('pf2e-sheet-skill-actions', key, data);
  },
  get: function <K extends keyof PF2eActorFlag>(actor: Actor, key: K): PF2eActorFlag[K] {
    return actor.getFlag('pf2e-sheet-skill-actions', key);
  },
} as const;
