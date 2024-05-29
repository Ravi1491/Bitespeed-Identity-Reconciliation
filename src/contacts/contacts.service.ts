import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact)
    private contactModel: typeof Contact,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<any> {
    const payload = createContactDto.phoneNumber
      ? { phoneNumber: createContactDto.phoneNumber }
      : { email: createContactDto.email };

    const existingContact = await this.findOne(payload);

    if (existingContact) {
      const primaryContact = await this.getPrimaryContact(existingContact);
      await this.linkContact(primaryContact, createContactDto);
      return this.formatResponse(primaryContact);
    }

    const newPrimaryContact = await this.contactModel.create({
      ...createContactDto,
      linkPrecedence: LinkPrecedence.PRIMARY,
    });

    return this.formatResponse(newPrimaryContact);
  }

  private async findOne(payload: {}): Promise<Contact> {
    return this.contactModel.findOne({
      where: payload,
    });
  }

  private async getPrimaryContact(contact: Contact): Promise<Contact> {
    if (contact.linkPrecedence === LinkPrecedence.PRIMARY) {
      return contact;
    }
    return this.contactModel.findOne({
      where: { id: contact.linkedId },
    });
  }

  private async linkContact(
    primaryContact: Contact,
    createContactDto: CreateContactDto,
  ): Promise<void> {
    await this.contactModel.create({
      ...createContactDto,
      linkedId: primaryContact.id,
      linkPrecedence: LinkPrecedence.SECONDARY,
    });
  }

  private async formatResponse(primaryContact: Contact): Promise<any> {
    const linkedContacts = await this.contactModel.findAll({
      where: {
        linkedId: primaryContact.id,
      },
    });

    const emails = new Set([primaryContact.email]);
    const phoneNumbers = new Set([primaryContact.phoneNumber]);
    const secondaryContactIds = [];

    linkedContacts.forEach((contact) => {
      if (contact.email) {
        emails.add(contact.email);
      }

      if (contact.phoneNumber) {
        phoneNumbers.add(contact.phoneNumber);
      }
      secondaryContactIds.push(contact.id);
    });

    return {
      contact: {
        primaryContactId: primaryContact.id,
        emails: Array.from(emails),
        phoneNumbers: Array.from(phoneNumbers),
        secondaryContactIds,
      },
    };
  }
}
