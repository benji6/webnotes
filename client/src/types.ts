export interface INote {
  body: string
  dateCreated: string
  dateUpdated: string
}

export interface INoteLocal extends INote {
  syncState?: 'created' | 'deleted' | 'updated'
}
