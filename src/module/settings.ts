import { getGame } from './utils';

export const SKILLS_ACTIONS_MODULE_NAME = 'pf2e-sheet-skill-actions';

export function registerSettings(): void {
  getGame().settings.register(SKILLS_ACTIONS_MODULE_NAME, 'Position', {
    name: `${SKILLS_ACTIONS_MODULE_NAME}.Settings.Position.name`,
    hint: `${SKILLS_ACTIONS_MODULE_NAME}.Settings.Position.hint`,
    scope: 'client',
    config: true,
    default: 'top',
    type: String,
    choices: {
      top: `${SKILLS_ACTIONS_MODULE_NAME}.Settings.Position.top`,
      bot: `${SKILLS_ACTIONS_MODULE_NAME}.Settings.Position.bot`,
    },
  });
  getGame().settings.register(SKILLS_ACTIONS_MODULE_NAME, 'IconStyle', {
    name: `${SKILLS_ACTIONS_MODULE_NAME}.Settings.IconStyle.name`,
    hint: `${SKILLS_ACTIONS_MODULE_NAME}.Settings.IconStyle.hint`,
    scope: 'client',
    config: true,
    default: 'top',
    type: String,
    choices: {
      actionCostIcon: `${SKILLS_ACTIONS_MODULE_NAME}.Settings.IconStyle.actionCostIcon`,
      skillIcon: `${SKILLS_ACTIONS_MODULE_NAME}.Settings.IconStyle.skillIcon`,
    },
  });
}
