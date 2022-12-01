const file = await Deno.readTextFile("./1/sample.txt");

const lines = file.split(/\r?\n/);

let max = 0;
let sum = 0;

for (let index = 0; index < lines.length; index++) {
  const line = lines[index];
  const calories = Number(line);

  if (line === "") {
    if (sum > max) {
      max = sum;
    }

    sum = 0;
  } else {
    sum += calories;
  }
}

console.log(`Max calories: ${max}`);
