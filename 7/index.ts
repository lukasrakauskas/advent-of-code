const file = await Deno.readTextFile("./7/input.txt");
const lines = file.split(/\r?\n/);

type File = { name: string; size: string };
type Dir = { name: string; files: Array<File | Dir> };

const isFile = (it: File | Dir): it is File => "size" in it;
const isDir = (it: File | Dir): it is Dir => "files" in it;

const qualifyingDirs: Array<{ name: string; size: number }> = [];
const allDirs: Array<{ name: string; size: number }> = [];

const totalSpace = 70000000;
const needSpace = 30000000;

const getDirSize = ({ name, files }: Dir): number => {
  const dirs: Dir[] = [];
  let size = 0;

  for (const it of files) {
    if (isDir(it)) dirs.push(it);
    if (isFile(it)) {
      size += Number(it.size);
    }
  }

  size +=
    dirs.length === 0
      ? 0
      : dirs.reduce<number>((s, dir) => {
          return s + getDirSize(dir);
        }, 0);

  if (size <= 100000) {
    qualifyingDirs.push({ name, size });
  }
  allDirs.push({ name, size });

  return size;
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

const usedSpace = Number(getDirSize(fileSystem));

console.log(
  "Problem one:",
  qualifyingDirs.reduce((sum, dir) => sum + dir.size, 0).toString()
);

const freeSpace = totalSpace - usedSpace;
const needToFreeUp = needSpace - freeSpace;

const deleteDir = allDirs
  .filter((it) => it.size > needToFreeUp)
  .reduce((min, current) => {
    const minDirSize = Math.min(min.size, current.size);

    if (minDirSize == min.size) {
      return min;
    } else {
      return current;
    }
  });

console.log("Problem two:", deleteDir.name, deleteDir.size);
