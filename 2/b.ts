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

const replaceMap = {
  X: {
    A: "Z",
    B: "X",
    C: "Y",
  },
  Y: {
    A: "X",
    B: "Y",
    C: "Z",
  },
  Z: {
    A: "Y",
    B: "Z",
    C: "X",
  },
};

for (const originalLine of lines) {
  const [p1, originalP2] = originalLine.split(" ") as [
    "A" | "B" | "C",
    "X" | "Y" | "Z"
  ];

  const p2 = replaceMap[originalP2][p1];

  const line = `${p1} ${p2}`;

  score += scoreMap.get(p2) ?? 0;
  score += versusMap.get(line) ?? 0;
}

console.log(`Score: ${score}`);
