import { world, EntityDamageCause } from "@minecraft/server";

/*
 * Unofficial Bedrock prototype. These are inspired-by mechanics, not the
 * original Java mod implementation. Kept intentionally lightweight for iPad.
 */

const IDS = {
  remote: "shootingstar:stellar_remote",
  railgun: "shootingstar:railgun_core",
  gungnir: "shootingstar:gungnir_spear",
  stars: "shootingstar:seven_stars"
};

function tell(player, message) {
  try { player.sendMessage("§b[Shooting Star]§r " + message); } catch {}
}

function particleLine(player, maxDistance = 32, particle = "minecraft:critical_hit_emitter") {
  const dimension = player.dimension;
  const start = player.getHeadLocation();
  const view = player.getViewDirection();
  for (let d = 1.5; d <= maxDistance; d += 1.5) {
    const p = {
      x: start.x + view.x * d,
      y: start.y + view.y * d,
      z: start.z + view.z * d
    };
    try { dimension.spawnParticle(particle, p); } catch {}
  }
}

function hitRay(player, damage, maxDistance, label) {
  const origin = player.getHeadLocation();
  const direction = player.getViewDirection();
  const dimension = player.dimension;
  let hits = 0;

  try {
    const results = dimension.getEntitiesFromRay(origin, direction, { maxDistance });
    for (const result of results) {
      const target = result.entity;
      if (!target || target.id === player.id || target.typeId === "minecraft:item" ||
          target.typeId === "minecraft:xp_orb" || target.typeId === "minecraft:arrow") continue;
      try {
        target.applyDamage(damage, {
          cause: EntityDamageCause.projectile,
          damagingEntity: player
        });
        hits++;
      } catch {}
      // Keep this prototype focused on the first target in the line.
      break;
    }
  } catch {
    // If a game build exposes a different ray-query surface, still show the effect.
  }

  particleLine(player, maxDistance);
  tell(player, hits ? label + " hit a target for " + damage + " damage." : label + " fired.");
}

function useSevenStars(player) {
  const dimension = player.dimension;
  const origin = player.location;
  let hits = 0;
  try {
    const targets = dimension.getEntities({
      location: origin,
      maxDistance: 8,
      excludeTypes: ["minecraft:player", "minecraft:item", "minecraft:xp_orb"]
    });
    for (const target of targets) {
      try {
        target.applyDamage(6, {
          cause: EntityDamageCause.magic,
          damagingEntity: player
        });
        try {
          dimension.spawnParticle("minecraft:critical_hit_emitter", {
            x: target.location.x,
            y: target.location.y + 1,
            z: target.location.z
          });
        } catch {}
        hits++;
      } catch {}
    }
  } catch {}
  tell(player, "Seven Stars activated. Nearby targets struck: " + hits + ".");
}

world.afterEvents.itemUse.subscribe((event) => {
  const player = event.source;
  if (!player || player.typeId !== "minecraft:player") return;

  switch (event.itemStack.typeId) {
    case IDS.remote:
      hitRay(player, 8, 28, "Stellar Remote");
      break;
    case IDS.railgun:
      hitRay(player, 18, 48, "Railgun");
      break;
    case IDS.gungnir:
      hitRay(player, 14, 20, "Gungnir");
      break;
    case IDS.stars:
      useSevenStars(player);
      break;
  }
});

world.afterEvents.playerSpawn.subscribe((event) => {
  if (!event.initialSpawn) return;
  tell(event.player, "Prototype loaded. Use /give @s shootingstar:stellar_remote, railgun_core, gungnir_spear, or seven_stars.");
});
