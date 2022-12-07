const file = await Deno.readTextFile("./7/input.txt");
const lines = file.split(/\r?\n/);

type File = { name: string; size: string };
type Dir = { name: string; files: Array<File | Dir> };

const isFile = (it: File | Dir): it is File => "size" in it;
const isDir = (it: File | Dir): it is Dir => "files" in it;

const qualifyingDirs: Array<{ name: string; size: bigint }> = [];

const getDirSize = (dir: Dir): bigint => {
  const dirs: Dir[] = [];
  let size = 0n;

  for (const it of dir.files) {
    if (isDir(it)) dirs.push(it);
    if (isFile(it)) {
      size += BigInt(it.size);
    }
  }

  const childDirSize =
    dirs.length === 0
      ? 0n
      : dirs.reduce<bigint>((s, dir) => {
          return s + getDirSize(dir);
        }, 0n);

  const totalSize = childDirSize + size;

  console.log({ name: dir.name, size, childs: childDirSize });

  if (totalSize <= 100000n) {
    qualifyingDirs.push({ name: dir.name, size: totalSize });
  }

  return totalSize;
};

const fileSystem: Dir = {
  name: "/",
  files: [],
};

let history: Dir[] = [fileSystem];
let currentDir: Dir = fileSystem;

const isCommand = (it: string) => it.startsWith("$");

for (const line of lines) {
  if (isCommand(line)) {
    const [_, command, arg] = line.split(" ");

    if (command === "cd") {
      if (arg === "/") {
        history = [fileSystem];
        currentDir = fileSystem;
      } else if (arg === "..") {
        history.pop();

        const prevDir = history.at(-1);

        if (prevDir) {
          currentDir = prevDir;
        }
      } else {
        const newDir = currentDir?.files?.find((dir) => dir.name === arg);

        if (newDir && isDir(newDir)) {
          history.push(newDir);
          currentDir = newDir;
        }
      }
    }
  } else {
    const [dirOrSize, name] = line.split(" ");

    const isDirectory = dirOrSize === "dir";

    currentDir.files.push({
      name,
      ...(isDirectory ? { files: [] } : { size: dirOrSize }),
    });
  }
}

getDirSize(fileSystem);
// console.log(JSON.stringify(fileSystem, null, 2));
console.log(qualifyingDirs.reduce((sum, dir) => sum + dir.size, 0n));
