const file = await Deno.readTextFile("./5/input.txt");
const [cratesData, moveData] = file.split("\n\n");

const stacks: string[][] = [];

const crateData = cratesData.split("\n");
const moves = moveData.split("\n");

const stackCount = crateData.length;

for (let i = 0; i < stackCount; i++) {
  stacks.push([]);
}

crateData.pop();

for (const crate of crateData) {
  for (let i = 0; i < crate.length / 4; i++) {
    const element = crate
      .slice(i * 4, i * 4 + 4)
      .replaceAll(" ", "")
      .replaceAll("[", "")
      .replaceAll("]", "");

    if (element) {
      stacks[i].unshift(element);
    }
  }
}

for (const move of moves) {
  const [times, from, to] = move
    .replaceAll(/([a-z])\w+ /g, "")
    .split(" ")
    .map(Number);

  for (let i = 0; i < times; i++) {
    const element = stacks[from - 1].pop();
    if (element) {
      stacks[to - 1].push(element);
    }
  }
}

console.log("Answer:", stacks.map((stack) => stack.at(-1)).join(""));
