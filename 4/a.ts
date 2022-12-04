const file = await Deno.readTextFile("./4/input.txt");
const lines = file.split(/\r?\n/);

type Assignment = [number, number];

function fullyContains(first: Assignment, second: Assignment): boolean {
  const firstContainsSecond = first[0] >= second[0] && first[1] <= second[1];
  const secondContainsFirst = first[0] <= second[0] && first[1] >= second[1];

  return firstContainsSecond || secondContainsFirst;
}

const count = lines
  .map((line) =>
    line.split(",").map((pair) => pair.split("-").map(Number) as Assignment)
  )
  .map(([elf1, elf2]) => (fullyContains(elf1, elf2) ? 1 : 0))
  .reduce<number>((sum, value) => sum + value, 0);

console.log("Count:", count);
