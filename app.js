//Set up variables

let xp = 0;
let health = 100;
let gold = 500;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["small knife"];

// get information from the HTML document
const button1 = document.querySelector('#button1');
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

const weapons = [
  { name: 'small knife', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'axe', power: 50 },
  { name: 'Crossbow', power: 100 },
  { name: 'Two Handed Axe', power: 300 },
  { name: 'Sword', power: 400 },
  { name: 'Machine Gun', power: 500 },
];
const monsters = [
  {
    name: "weasel",
    picture: "images/angryWeasel.png",
    level: 2,
    health: 15
  },
  {
    name: "spooky owl",
    picture: "images/angryOwl3.png",
    level: 8,
    health: 30
  },
  {
    name: "small badger",
    picture: "images/angryBadger.png",
    level: 12,
    health: 60
  },
  {
    name: "magic owl",
    picture: "images/angryOwl2.png",
    level: 24,
    health: 100
  },
  {
    name: "squirrel ninja",
    picture: "images/angrySquirrel.png",
    level: 32,
    health: 240
  },
  {
    name: "wonky moose",
    picture: "images/angryMoose.png",
    level: 128,
    health: 800
  },
  {
    name: "badger",
    picture: "images/bigBadger.jpg",
    level: 512,
    health: 3200
  }
]
const locations = [
  {
    // location 0
    name: "town square",
    picture: "images/townSquare.png",
    "button text": ["Go to Shop", "Go to Cave", "Go to Castle", "Fight Badger"],
    "button functions": [goShop, goCave, goCastle, fightBadger],
    text: "You are in the town square. You see a sign that says \"Shop\"."
  },
  {
    // location 1
    name: "shop",
    picture: "images/shop.png",
    "button text": ["Buy 10 health (10 gold)", "Buy Weapon (50 gold)", "Buy mega health (100 gold)", "Go to Town Square"],
    "button functions": [buyHealth, buyWeapon, buyMegaHealth, goTown],
    text: "You enter the shop."
  },
  {
    // location 2
    name: "cave",
    picture: "images/cave.png",
    "button text": ["Fight Weasel", "Fight Spooky Owl", "Fight Small Badger","Go to Town Square"],
    "button functions": [fightWeasel, fightSpookyOwl, fightSmallBadger, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    // location 3
    name: "castle",
    picture: "images/castle.png",
    "button text": ["Fight Magic Owl", "Fight Squirrel Ninja", "Fight Wonky Moose", "Go to Town Square"],
    "button functions": [fightMagicOwl, fightSquirrel, fightMoose, goTown],
    text: "You enter the castle. You see some monsters."
  },
  {
    // location 4
    name: "fight",
    picture: "images/angryWeasel.png",
    "button text": ["Attack", "Dodge", "Block", "Run"],
    "button functions": [attack, dodge, block, goTown],
    text: "You are fighting a monster."
  },
  {
    // location 5
    name: "fight",
    picture: "images/angryOwl3.png",
    "button text": ["Attack", "Dodge", "Block", "Run"],
    "button functions": [attack, dodge, block, goTown],
    text: "You are fighting a monster."
  },
    {
    // location 6
    name: "fight",
    picture: "images/angryBadger.png",
    "button text": ["Attack", "Dodge", "Block", "Run"],
    "button functions": [attack, dodge, block, goTown],
    text: "You are fighting a monster."
  },
    {
    // location 7
    name: "fight",
    picture: "images/angryOwl2.png",
    "button text": ["Attack", "Dodge", "Block", "Run"],
    "button functions": [attack, dodge, block, goTown],
    text: "You are fighting a monster."
  },
    {
    // location 8
    name: "fight",
    picture: "images/angrySquirrel.png",
    "button text": ["Attack", "Dodge", "Block", "Run"],
    "button functions": [attack, dodge, block, goTown],
    text: "You are fighting a monster."
  },
    {
    // location 9
    name: "fight",
    picture: "images/angryMoose.png",
    "button text": ["Attack", "Dodge", "Block", "Run"],
    "button functions": [attack, dodge, block, goTown],
    text: "You are fighting a monster."
  },
    {
    // location 10
    name: "fight",
    picture: "images/bigBadger.jpg",
    "button text": ["Attack", "Dodge", "Block", "Run"],
    "button functions": [attack, dodge, block, goTown],
    text: "You are fighting a monster."
  },
  {
    // location 11
    name: "kill monster",
    picture: "images/rip.png",
    "button text": ["Go to town square", "Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    // location 12
    name: "lose",
    picture: "images/gameOver.png",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    // location 13
    name: "win",
    picture: "images/start.png",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart, restart], 
    text: "You defeat the massive badger! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    // location 14
    name: "easter egg",
    picture: "images/start.png",
    "button text": ["2", "8", "Go to town square?", "Run Away"],
    "button functions": [pickTwo, pickEight, goTown, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

// initialize buttons
button1.onclick = goShop;
button2.onclick = goCave;
button3.onclick = goCastle;
button4.onclick = fightBadger;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button4.innerText = location["button text"][3];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  button4.onclick = location["button functions"][3];
  text.innerHTML = location.text;
  document.getElementById("img").src=location["picture"];
}

function goTown() {
  update(locations[0]);
}

function goShop() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function goCastle() {
  update(locations[3]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyMegaHealth() {
  if (gold >= 100) {
    gold -= 100;
    health += 100;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy mega health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 50) {
      gold -= 50;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      let power = weapons[currentWeapon].power; // Added line to get weapon power
      text.innerText = "You now have a " + newWeapon + " with power " + power + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightWeasel() {
  fighting = 0;
  goFight();
}

function fightSpookyOwl() {
  fighting = 1;
  goFight();
}

function fightSmallBadger() {
  fighting = 2;
  goFight();
}

function fightMagicOwl() {
  fighting = 3;
  goFight();
}

function fightSquirrel() {
  fighting = 4;
  goFight();
}

function fightMoose() {
  fighting = 5;
  goFight();
}

function fightBadger() {
  fighting = 6;
  goFight();
}

function goFight() {
  document.getElementById('fightSound').play();
  update(locations[4+fighting]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  document.getElementById('attackSound').play();
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  let weaponName = weapons[currentWeapon].name; // Added line to get weapon name
  let weaponPower = weapons[currentWeapon].power; // Added line to get weapon power
  text.innerText += " You attack it with your " + weaponName + " (Power: " + weaponPower + ").";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weaponPower + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 6) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    document.getElementById('breakSound').play();
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function block() {
  document.getElementById('defendSound').play();
  text.innerText = "You block the attack from the " + monsters[fighting].name;
    if (Math.random() <= .6) {
        text.innerText += " and manage to get in a sneaky but devestating counter attack.";
        monsterHealth -= Math.floor(monsterHealth/2);
  }
    else {
        text.innerText += " but the monster pushes you back and whacks you upside the head.";
        health -= Math.floor(health/2);
    }
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 9.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[11]);
}

function lose() {
  update(locations[12]);
}

function winGame() {
  update(locations[13]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["spoon"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[14]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
