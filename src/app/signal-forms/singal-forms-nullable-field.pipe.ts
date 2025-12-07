import { Pipe, PipeTransform } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';


// Since Signal Forms are experimental, nullable fields are not properly supported yet.
// This pipe is a workaround.
@Pipe({
  name: 'nullableField',
  pure: true
})
export class NullableFieldCoercionPipe implements PipeTransform {
  public transform<T>(field: FieldTree<T | null>): FieldTree<T> {
    return field as FieldTree<T>;
  }
}
