// A - rock, B - paper, C - scissors
// X - rock, Y - paper, Z - scissors
// score:
// X - 1, Y - 2, Z - 3,
// lost - 0, draw - 3, win - 6

const file = await Deno.readTextFile("./2/input.txt");
const lines = file.split(/\r?\n/);

let score = 0;

const scoreMap = new Map([
  ["X", 1],
  ["Y", 2],
  ["Z", 3],
]);

const versusMap = new Map([
  ["A Z", 0],
  ["B X", 0],
  ["C Y", 0],

  ["A X", 3],
  ["B Y", 3],
  ["C Z", 3],

  ["A Y", 6],
  ["B Z", 6],
  ["C X", 6],
]);

for (const line of lines) {
  const [, p2] = line.split(" ");

  score += scoreMap.get(p2) ?? 0;
  score += versusMap.get(line) ?? 0;
}

console.log(`Score: ${score}`);
