import { ConflictException } from '@nestjs/common';

export class CrudHelper {
  static versionCheck(
    entity: IVersionCheckEntity,
    entityDto: IVersionCheckEntity,
  ) {
    if (entity.ocVersion !== entityDto.ocVersion) {
      throw new ConflictException(
        'Optimistic concurrency error. Somebody updatet item before you.',
      );
    }
  }

  static idMatchOnUndefined(idFromDto: any, idFromParam: any): void {
    if (typeof idFromDto === 'undefined' || idFromDto === null) {
      return null;
    }

    if (idFromDto !== idFromParam) {
      throw new ConflictException(
        'ID on request body object should be undefined or equal to the one on a URL parameter.',
      );
    }
  }

  static idShouldBeUndefined(id: number) {
    if (typeof id !== 'undefined' && id !== null) {
      throw new ConflictException('ID should not be defined.');
    }
  }
}
export interface IVersionCheckEntity {
  ocVersion?: number;
}
