export interface Note {
  body: string;
  dateCreated: string;
  dateUpdated: string;
  tag?: string;
}

export interface ClientNote extends Note {
  syncState?: "created" | "deleted" | "updated";
}

export interface Patch {
  delete?: string[];
  put?: Note[];
}
