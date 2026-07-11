export class ResourceNotFoundError extends Error {
  constructor(resource: string, id: string) { super(`${resource} with id ${id} was not found`); }
}
