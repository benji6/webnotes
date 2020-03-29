export interface Note {
  body: string;
  dateCreated: string;
  dateUpdated: string;
}

export interface ClientNote extends Note {
  syncState?: "created" | "deleted" | "updated";
}
