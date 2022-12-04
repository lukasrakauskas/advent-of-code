const file = await Deno.readTextFile("./4/input.txt");
const lines = file.split(/\r?\n/);

type Assignment = [number, number];

function partiallyContains(first: Assignment, second: Assignment): boolean {
  const firstContainsSecond = first.some(
    (x) => second[0] <= x && x <= second[1]
  );
  const secondContainsFirst = second.some(
    (x) => first[0] <= x && x <= first[1]
  );

  return firstContainsSecond || secondContainsFirst;
}

const count = lines
  .map((line) =>
    line.split(",").map((pair) => pair.split("-").map(Number) as Assignment)
  )
  .map(([elf1, elf2]) => (partiallyContains(elf1, elf2) ? 1 : 0))
  .reduce<number>((sum, value) => sum + value, 0);

console.log("Count:", count);
