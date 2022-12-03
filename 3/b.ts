const file = await Deno.readTextFile("./3/input.txt");
const lines = file.split(/\r?\n/);

const isUppercase = (char: string) => char.toUpperCase() === char;

const getPriority = (char: string) => {
  if (isUppercase(char)) {
    return char.charCodeAt(0) - 65 + 27;
  }

  return char.charCodeAt(0) - 96;
};

function group<T>(arr: T[], n: number) {
  const group: T[][] = [];

  for (let i = 0, end = arr.length / n; i < end; ++i) {
    group.push(arr.slice(i * n, (i + 1) * n));
  }

  return group;
}

const chars = [];

const groups = group(lines, 3);

for (const group of groups) {
  const rucksacks = group.map((it) => [...new Set(it)].join("")).join("");

  const map = new Map();

  for (const char of rucksacks) {
    map.set(char, (map.get(char) ?? 0) + 1);
  }

  const [key] = [...map.entries()].find(([, value]) => value === 3) ?? [];

  if (key) {
    chars.push(key);
  }
}

console.log(
  chars.map((it) => getPriority(it)).reduce((sum, item) => sum + item)
);
