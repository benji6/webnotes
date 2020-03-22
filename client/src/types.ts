export interface Note {
  body: string;
  dateCreated: string;
  dateUpdated: string;
}

export interface NoteLocal extends Note {
  syncState?: "created" | "deleted" | "updated";
}
