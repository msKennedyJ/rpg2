
// ==========================================
// 1. PLAYER VARIABLES
// ==========================================

let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let currentMonster = 0;
let monsterHealth = 0;

// ==========================================
// 2. HTML ELEMENTS
// ==========================================

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");

const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");

const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const image = document.querySelector("#img");

// ==========================================
// 3. WEAPONS
// ==========================================

const weapons = [
  { name: "Small Knife", power: 5 },
  { name: "Dagger", power: 30 },
  { name: "Axe", power: 50 },
  { name: "Crossbow", power: 100 },
  { name: "Two Handed Axe", power: 300 },
  { name: "Sword", power: 400 }
];

// ==========================================
// 4. MONSTERS
// ==========================================

const monsters = [
  {
    name: "Kennedy",
    picture: "kennedy.png",
    level: 2,
    health: 15
  },
  {
    name: "Harold",
    picture: "harold.png",
    level: 10,
    health: 100
  },
  {
    name: "Toth",
    picture: "toth.png",
    level: 50,
    health: 400
  },
  {
    name: "Walker",
    picture: "walker.png",
    level: 100,
    health: 1000
  }
];

// ==========================================
// 5. LOCATIONS
// ==========================================

const locations = {

  town: {
    buttonText: ["Go to Shop", "Go to Cave", "Go to Castle", "Fight Boss"],
    buttonFunctions: [goShop, goCave, goCastle, fightWalker],
    text: "You are in the town square. What would you like to do?",
    picture: "town.png"
  },

  shop: {
    buttonText: ["Buy Health (10 gold)", "Buy Weapon (50 gold)", "Go to Town", "Go to Town"],
    buttonFunctions: [buyHealth, buyWeapon, goTown, goTown],
    text: "Welcome to the shop!",
    picture: "shop.png"
  },

  cave: {
    buttonText: ["Fight Kennedy", "Go to Castle", "Go to Shop", "Go to Town"],
    buttonFunctions: [fightKennedy, goCastle, goShop, goTown],
    text: "You enter the cave. You see Kennedy!",
    picture: "cave.png"
  },

  castle: {
    buttonText: ["Fight Harold", "Fight Toth", "Fight Walker", "Go to Town"],
    buttonFunctions: [fightHarold, fightToth, fightWalker, goTown],
    text: "You enter the castle. You see some monsters!",
    picture: "castle.png"
  },

  fight: {
    buttonText: ["Attack", "Dodge", "Block", "Run"],
    buttonFunctions: [attack, dodge, block, goTown],
    text: "You are fighting a monster."
  },

  defeated: {
    buttonText: ["Go to Town", "Go to Town", "Go to Town", "Go to Town"],
    buttonFunctions: [goTown, goTown, goTown, goTown],
    text: "The monster has been defeated! You gain XP and gold.",
    picture: "rip.png"
  },

  lose: {
    buttonText: ["Replay", "Replay", "Replay", "Replay"],
    buttonFunctions: [restart, restart, restart, restart],
    text: "You have been defeated!",
    picture: "gameOver.png"
  },

  win: {
    buttonText: ["Replay", "Replay", "Replay", "Replay"],
    buttonFunctions: [restart, restart, restart, restart],
    text: "Congratulations! You defeated the final boss! You win!",
    picture: "start.png"
  }

};

// ==========================================
// 6. UPDATE THE GAME SCREEN
// ==========================================

// This function changes the buttons, text and picture.

function update(location) {

  monsterStats.style.display = "none";

  button1.innerText = location.buttonText[0];
  button2.innerText = location.buttonText[1];
  button3.innerText = location.buttonText[2];
  button4.innerText = location.buttonText[3];

  button1.onclick = location.buttonFunctions[0];
  button2.onclick = location.buttonFunctions[1];
  button3.onclick = location.buttonFunctions[2];
  button4.onclick = location.buttonFunctions[3];

  text.innerText = location.text;

  if (location.picture && image) {
    image.src = location.picture;
  }
}

// ==========================================
// 7. MOVEMENT BETWEEN LOCATIONS
// ==========================================

function goTown() {
  update(locations.town);
}

function goShop() {
  update(locations.shop);
}

function goCave() {
  update(locations.cave);
}

function goCastle() {
  update(locations.castle);
}

// ==========================================
// 8. SHOP FUNCTIONS
// ==========================================

function buyHealth() {

  if (gold >= 10) {

    gold -= 10;
    health += 10;

    updateStats();

    text.innerText = "You bought 10 health!";

  } else {

    text.innerText = "You do not have enough gold!";

  }
}

function buyWeapon() {

  if (currentWeapon < weapons.length - 1 && gold >= 50) {

    gold -= 50;
    currentWeapon++;

    updateStats();

    text.innerText = "You bought a " + weapons[currentWeapon].name + "!";

  } else if (currentWeapon === weapons.length - 1) {

    text.innerText = "You already have the best weapon!";

  } else {

    text.innerText = "You do not have enough gold!";

  }
}

// ==========================================
// 9. STARTING A FIGHT
// ==========================================

function fightKennedy() {
  startFight(0);
}

function fightHarold() {
  startFight(1);
}

function fightToth() {
  startFight(2);
}

function fightWalker() {
  startFight(3);
}

function startFight(monsterIndex) {

  currentMonster = monsterIndex;

  monsterHealth = monsters[currentMonster].health;

  update(locations.fight);

  monsterStats.style.display = "block";

  monsterName.innerText = monsters[currentMonster].name;
  monsterHealthText.innerText = monsterHealth;

  if (image) {
    image.src = monsters[currentMonster].picture;
  }

}

// ==========================================
// 10. ATTACK FUNCTION
// ==========================================

function attack() {

  const weapon = weapons[currentWeapon];

  // Player attacks monster.

  monsterHealth -= weapon.power;

  text.innerText = "You attack " + monsters[currentMonster].name +
    " with your " + weapon.name + "!";

  // Check whether monster has been defeated.

  if (monsterHealth <= 0) {

    defeatMonster();
    return;

  }

  // Monster attacks player.

  const damage = monsters[currentMonster].level * 2;

  health -= damage;

  text.innerText += " The monster attacks you for " + damage + " damage.";

  // Update the screen.

  updateStats();
  monsterHealthText.innerText = monsterHealth;

  if (health <= 0) {
    lose();
  }

}

// ==========================================
// 11. DODGE FUNCTION
// ==========================================

function dodge() {

  text.innerText = "You dodge the monster's attack!";

}

// ==========================================
// 12. BLOCK FUNCTION
// ==========================================

function block() {

  const damage = monsters[currentMonster].level * 2;

  const reducedDamage = Math.ceil(damage / 2);

  health -= reducedDamage;

  text.innerText = "You block the attack and only take " +
    reducedDamage + " damage!";

  updateStats();

  if (health <= 0) {
    lose();
  }

}

// ==========================================
// 13. DEFEATING A MONSTER
// ==========================================

function defeatMonster() {

  const monster = monsters[currentMonster];

  xp += monster.level;

  gold += monster.level * 10;

  updateStats();

  // The final monster wins the game.

  if (currentMonster === 3) {

    update(locations.win);

  } else {

    update(locations.defeated);

  }

}

// ==========================================
// 14. LOSING THE GAME
// ==========================================

function lose() {

  update(locations.lose);

}

// ==========================================
// 15. RESTARTING THE GAME
// ==========================================

function restart() {

  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  currentMonster = 0;
  monsterHealth = 0;

  updateStats();

  goTown();

}

function updateStats() {
  xpText.innerText = xp;
  healthText.innerText = health;
  goldText.innerText = gold;
}



// ==========================================
// 16. START THE GAME
// ==========================================

updateStats();
goTown();
