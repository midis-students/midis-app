export function classNames(...args: any[]) {
  return args.filter((arg) => typeof arg === "string").join(" ");
}
