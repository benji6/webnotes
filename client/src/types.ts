export interface INote {
  body: string
  dateCreated: string
  dateUpdated: string
  userId: string
}

export interface INoteLocal extends INote {
  meta?: {
    created?: boolean
    deleted?: boolean
    updated?: boolean
  }
}
