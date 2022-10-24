### ⚠️ Not compatible with Foundry v10

_PF2e Character Sheet Skill Actions_ is deprecated as of Foundry v10. Its features have been absorbed into [PF2e Workbench](https://github.com/xdy/xdy-pf2e-workbench/), which you should install for continued support.

---

# pf2e-sheet-skill-actions

This will add a number of skill actions to your stikes list to be more easily accessible to the player.

The module will hide any skill actions that you're currently not trained in.

Actions that require a feat (ex: Bon Mot) will not show up unless you actually have the feat.

MAP rolls are in the plan, however the system doesn't currently support the capability. Once that's in, the module will be updated accordingly.

I love you.

![FoundryVTT_gXx4SEfnUz](https://user-images.githubusercontent.com/478289/146876931-e4c97f10-7508-46f7-a949-f29f670d9068.png)

# Contributing new actions

* Go to https://github.com/jamespdaily/pf2e-sheet-skill-actions/edit/master/src/module/skill-actions-data.ts
* Find a section relevant for your action and add JSON for your action. Keys explained:
  * **slug** (required) - slug to match PF2e action item in compendium. To get the slug: find the name of the action/feat in PF2e compendium, remove "'" and "`" characters, replace anything that's not a letter or number with "-" and downcase everything.
  * **compendiumID** (required) - ID of the action or feat in the compendium. You can drag and drop the action in a jounal to find the link generated (like @Compendium[pf2e.actionspf2e.S9PZFOVe7zhORkUc]).
  * **proficiencyKey** (required) - 3 letter acronym for the skill in PF2e (`acr`, `arc`, `ath`, `cra`, `dec`, `dip`, `itm`, `med`, `nat`, `occ`, `prf`, `rel`, `soc`, `ste`, `sur`, `thi`)
  * **icon** - name of icon in `[FOUNDRY DATA]/Data/systems/pf2e/icons/spells` to use.
  * **actionType** - add if this does not use 1 action. 'A' - 1 action (default), 'D' - 2 actions, 'T' - 3 actions, 'F' - free action, 'R' - reaction.
  * **key** - is used to match action implemented by PF2e. You shouldn't need to specify it.
  * **variants** - an array of variants, each of which will create a separate button. MAP & assurance variants are added automatically. Each entry can have:
    * **proficiencyKey** (required) - 3 letter acronym for the skill in PF2e (`acr`, `arc`, `ath`, `cra`, `dec`, `dip`, `itm`, `med`, `nat`, `occ`, `prf`, `rel`, `soc`, `ste`, `sur`, `thi`)
    * **label** - a label in case you don't want to use the default "[Skill]"
    * **requiredRank** - add if variant requires training in skill. 0 - untrained (default), 1 - trained, 2 - expert, 3 - master, 4 - legendary.
    * **extra** - any extra parameters that are passed to pf2e actions.
* Click "Propose changes" and "Create pull request".
