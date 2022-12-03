const file = await Deno.readTextFile("./3/input.txt");
const lines = file.split(/\r?\n/);

const isUppercase = (char: string) => char.toUpperCase() === char;

const getPriority = (char: string) => {
  if (isUppercase(char)) {
    return char.charCodeAt(0) - 65 + 27;
  }

  return char.charCodeAt(0) - 96;
};

const chars = [];

for (const line of lines) {
  const first = new Set(line.slice(0, line.length / 2));
  const second = new Set(line.slice(line.length / 2, line.length));

  const map = new Map();

  for (const char of first) {
    map.set(char, (map.get(char) ?? 0) + 1);
  }

  for (const char of second) {
    map.set(char, (map.get(char) ?? 0) - 1);
  }

  const [key] = [...map.entries()].find(([, value]) => value === 0) ?? [];

  if (key) {
    chars.push(key);
  }
}

console.log(
  chars.map((it) => getPriority(it)).reduce((sum, item) => sum + item)
);
