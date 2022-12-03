const file = await Deno.readTextFile("./3/input.txt");
const lines = file.split(/\r?\n/);

type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, []>
  : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N
  ? R
  : _TupleOf<T, N, [T, ...R]>;

const isUppercase = (char: string) => char.toUpperCase() === char;

const getPriority = (char: string) => {
  if (isUppercase(char)) {
    return char.charCodeAt(0) - 65 + 27;
  }

  return char.charCodeAt(0) - 96;
};

function group<T>(arr: T[], n: 3 = 3) {
  type TupledT = Tuple<T, typeof n>;
  const group: Array<Tuple<T, typeof n>> = [];

  for (let i = 0, end = arr.length / n; i < end; ++i) {
    group.push(arr.slice(i * n, (i + 1) * n) as TupledT);
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
