/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your module, or remove it.
 * Author: [your name]
 * Content License: [copyright and-or license] If using an existing system
 * 					you may want to put a (link to a) license or copyright
 * 					notice here (e.g. the OGL).
 * Software License: [your license] Put your desired license here, which
 * 					 determines how others may use and modify your module.
 */

// Import TypeScript modules
import { registerSettings } from './settings';
import { preloadTemplates } from './preloadTemplates';
import { ActionsIndex } from './actions-index';
import { ItemConstructor } from './globals';
import { Flag } from './utils';
import { SkillActions } from './skill-actions-collections';
import { SkillActionOwnerships } from './skill-actions-collections';

const skillActions = new SkillActions();

// Initialize module
Hooks.once('init', async () => {
  console.log('sheet-skill-actions | Initializing sheet-skill-actions');

  // Assign custom classes and constants here

  // Register custom module settings
  registerSettings();

  // Preload Handlebars templates
  await preloadTemplates();
});

Hooks.once('ready', async () => {
  await ActionsIndex.instance.loadCompendium('pf2e.feats-srd');
  await ActionsIndex.instance.loadCompendium('pf2e.actionspf2e');
});

// Add any additional hooks if necessary
Hooks.on('renderActorSheet', async (app: ActorSheet, html: JQuery<HTMLElement>) => {
  if (app.actor.type !== 'character') return;

  const tpl = 'modules/pf2e-sheet-skill-actions/templates/skill-actions.html';

  const actionOwnerships = new SkillActionOwnerships(skillActions, app.actor);

  const allVisible = Flag.get(app.actor, 'allVisible');
  const skillData = actionOwnerships.all
    .map((ownership) => {
      return {
        enabled: ownership.visible || allVisible,
        key: ownership.key,
        icon: ownership.action.icon,
        label: ownership.label,
        rollOptions: ownership.rollOptions(),
        visible: ownership.visible,
      };
    })
    .sort((a, b) => {
      return a.label > b.label ? 1 : -1;
    });

  const skillActionHtml = $(await renderTemplate(tpl, { skills: skillData, allVisible: allVisible }));
  const $items = skillActionHtml.find('li.item');

  skillActionHtml.on('click', '.toggle-hidden-actions', function () {
    Flag.set(app.actor, 'allVisible', !Flag.get(app.actor, 'allVisible'));
  });

  $items.on('click', '.skill-action.tag.variant-strike', function (e) {
    actionOwnerships.fromEvent(e)?.rollSkillAction(e);
  });

  $items.on('click', '.item-image', function (e) {
    const pf2eItem = actionOwnerships.fromEvent(e)?.action.pf2eItem;
    if (!pf2eItem) return;

    const ownedItem = new (pf2eItem.constructor as ItemConstructor)(pf2eItem.toJSON(), { parent: app.actor });
    ownedItem.toChat();
  });

  $items.on('click', '.item-toggle-equip', function (e) {
    const ownership = actionOwnerships.fromEvent(e);
    ownership?.update({ visible: !ownership.visible });
  });

  const target = $(html).find('.actions-list.item-list.directory-list.strikes-list');
  target.after(skillActionHtml);
});
