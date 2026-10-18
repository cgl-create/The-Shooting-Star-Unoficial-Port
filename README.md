# The Shooting Star — Unofficial Bedrock Port

An unofficial fan-made recreation project for Minecraft Bedrock Edition, initially targeting Bedrock 26.52 on iPadOS. Original project: [The Shooting Star Demo on CurseForge](https://www.curseforge.com/minecraft/mc-mods/the-shooting-star-demo).

> **Status: prototype, not verified in-game yet.** This repository is not affiliated with or endorsed by the original mod author. It does not contain the original Fabric JAR or original mod assets.

The Java Edition Fabric JAR cannot run directly on iPad Bedrock. This project recreates selected ideas with Bedrock add-on formats; it is not a conversion of the original Java bytecode.

## Current prototype

- **Stellar Remote** — short-range ray attack (8 damage).
- **Railgun Core** — longer-range ray attack (18 damage).
- **Gungnir** — shorter-range spear-inspired ray attack (14 damage).
- **Seven Stars** — damages nearby non-player entities (6 damage each, within 8 blocks).
- Uses Minecraft's normal touch controls and item-use interaction.

These are starter mechanics, not a claim of exact parity with the Java mod. Models, custom textures, animations, sounds, and advanced effects are not implemented yet. Item icons currently reference vanilla textures. Compatibility with Bedrock 26.52 must be tested; the script API version or item schema may need adjustment if the game rejects the pack.

## Build an installable .mcaddon

A GitHub Actions workflow builds a downloadable package when run manually or on a version tag. Open the repository's **Actions** tab, run **Build Bedrock Add-on**, then download the artifact named `shooting-star-bedrock-addon` from the completed workflow run. Alternatively, create a tag beginning with `v` to produce a GitHub Release asset.

## Test in Minecraft on iPad

1. Download the generated `.mcaddon` file to the iPad and open it; choose Minecraft when prompted.
2. Create a new **test world** first. Enable both the Shooting Star prototype Behavior Pack and Resource Pack in the world settings if they are not enabled automatically.
3. Enter the world and use chat to grant the items one at a time:

   - `/give @s shootingstar:stellar_remote`
   - `/give @s shootingstar:railgun_core`
   - `/give @s shootingstar:gungnir_spear`
   - `/give @s shootingstar:seven_stars`

4. Hold an item and tap the normal use-item control. Aim at entities for the ray attacks. Seven Stars affects nearby non-player entities.
5. Back up worlds before testing add-ons. If Minecraft reports an import, manifest, or script error, share the exact error so the pack can be corrected.

## Development notes

The Behavior Pack is in `behavior_pack/`; the Resource Pack is in `resource_pack/`. The current script uses `@minecraft/server` and standard Bedrock entity/item APIs. Test on the target Bedrock build before treating any artifact as release-ready.

## Credits and permissions

This is an unofficial fan project. Do not redistribute the original mod's code, textures, models, or other assets without permission from their respective owners. Names are used only to describe the fan-made compatibility project.
