import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UppercasePipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if(!value) return value;
    
    return value.toUpperCase();
  }
}
