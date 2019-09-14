export const errorProp = (meta: any): string | undefined =>
  meta.error && meta.touched ? meta.error : undefined
