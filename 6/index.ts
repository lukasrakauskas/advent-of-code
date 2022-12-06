const file = await Deno.readTextFile("./6/input.txt");

function processDataStream(dataStream: string, size: number) {
  const buffer: string[] = [];

  for (let i = 0; i < dataStream.length; i++) {
    if (buffer.length === size && new Set(buffer).size === size) {
      return i;
    }

    buffer.push(file[i]);

    if (buffer.length > size) {
      buffer.shift();
    }
  }

  return -1;
}

console.log("Problem one: ", processDataStream(file, 4));
console.log("Problem two: ", processDataStream(file, 14));
