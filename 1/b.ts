const file = await Deno.readTextFile("./1/input.txt");

const lines = file.split(/\r?\n/);

let sum = 0;

const sums: number[] = [];

lines.push("");

for (let index = 0; index < lines.length; index++) {
  const line = lines[index];
  const calories = Number(line);

  if (line === "") {
    sums.push(sum);
    sum = 0;
  } else {
    sum += calories;
  }
}

sums.sort((a, b) => a - b);

const totalCalories = sums.slice(-3).reduce((acc, prev) => acc + prev);

console.log(`Total calories: ${totalCalories}`);
