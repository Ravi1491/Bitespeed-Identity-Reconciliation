import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  create(createContactDto: CreateContactDto) {
    return 'This action adds a new contact';
  }
}