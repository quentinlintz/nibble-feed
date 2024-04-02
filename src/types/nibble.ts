export type Nibble = {
  uuid: string;
  topic: string;
  status: "creating" | "new" | "in progress" | "completed";
};
