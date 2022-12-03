/*
@title: myballgame
@author: joanna

Instructions:

Welcome to Sprig!!!

Hit "run" to execute the code and
start the game (you can also press shift+enter).

To beat each level you'll have to edit the code.

The code for this game starts below this comment.

The objective is to push the purple boxes onto the green goals.
Press j to reset the current level.

Click the "open help" to discover your toolkit.

--------
Level 1
--------

Make the purple block pushable. 

--------
Level 2
--------

Add controls to move up and left, use "w" and "a" as inputs

Tip: 
Do you find it annoying restarting at level 0?
Try adjusting the starting level.

--------
Level 3
--------

Edit the map.

--------
Level 4
--------

Make boxes push boxes.

--------
Level 5
--------

Add sound effects when you move.

--------
Level 6
--------

Solve the puzzle!

--------
END
--------

Make your own game! Try
 - adding two players
 - leaving a trail as you move
 - having different blocks and goal types
 - come up with your own mechanic!

*/

const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
................
................
......0000......
.....000000.....
...0000000000...
....07777770....
....07077070.00.
..000777777000..
.00.07777770....
....00777700....
.....000000.....
......0...0.....
....CCC...CCC...
.0..CCC...CCC.0.
.00000000000000.
..9..........9..`],
  [ box, bitmap`
................
................
................
....HHHHHHHHH...
...H22HHHHHHHH..
...H2HHHHHHHHH..
...H2H0HHHH0HH..
...H2HHHHHHHHH..
...HHHHHHHHHHH..
...H2H00000HHH..
...HHH00000HHH..
...HHH33300HHH..
...HHHHHHHHHHH..
....HHHHHHHHH...
................
................`],
  [ goal, bitmap`
................
................
................
................
................
..333333333333..
..31...1...1.3..
.33...1...1..33.
.3...1...1...13.
.3..1...1...1.3.
.3.1...1...1..3.
331...1...1...33
................
................
................
................`],
  [ wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
);

let level = 0;
const levels = [
  map`
p.bg`,
  map`
p..
.b.
..g`,
  map`
p..g
.b..
....
....`,
  map`
pg..
....
.b.b
gb.g`,
  map`
...
.p.
...`,
  map`
p...
.b.g
....
..bg`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]);

setPushables({
  [player]: [player, box]
});

// START - PLAYER MOVEMENT CONTROLS

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});
onInput("s", () => {
  getFirst(player).y += 1;
});
onInput("d", () => {
  getFirst(player).x += 1;
});
// END - PLAYER MOVEMENT CONTROLS

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
const melody=tune `
500,
500: b5/500,
500: a5/500,
500: g5/500 + d4-500,
500: f5/500 + d4-500,
500: e5/500 + d4-500,
500: d5/500 + e4-500,
500: c5/500 + e4-500,
500: e4-500 + f4-500,
500: f4-500,
500: g4-500 + a4-500 + e5-500 + f5-500 + g5-500,
500: b4-500 + c5-500 + d5-500 + e5-500,
500: e5~500 + d4^500,
500: e5~500 + d4^500 + e4^500 + c5-500,
500: e5~500 + f5~500 + e4^500 + a4-500,
500: f5~500 + g5~500 + f4^500 + d5-500 + a4-500,
500: a5~500 + f4^500 + b4-500 + a4-500,
500: a5~500 + g4^500,
500: a5~500 + g4^500,
500: a5~500 + g5~500 + f5~500 + e5~500 + d5~500,
500: d5~500 + a4^500,
500: d5~500 + a4^500,
500: d5~500 + a4^500,
500: d5~500 + a4^500,
500: d5~500 + a4^500,
500: d5~500 + c5~500 + a4^500 + g4^500,
500: c5~500 + f4^500,
500: d5~500 + e4^500,
500: d5~500 + e5~500 + f5~500 + e4^500,
500: d4^500,
500: d4^500 + c4^500,
500: c4^500`
playTune(melody)
