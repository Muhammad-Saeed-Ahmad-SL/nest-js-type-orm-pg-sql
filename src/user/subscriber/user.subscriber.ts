import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcryptjs';
@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  beforeInsert(event: InsertEvent<User>) {
    const user = event.entity;
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashedPassword;
  }

  beforeUpdate(event: UpdateEvent<User>) {
    const user = event.entity;

    // Only hash the password if it's being updated
    if (user.password) {
      const hashedPassword = bcrypt.hashSync(user.password, 10);
      user.password = hashedPassword;
    }
  }
}
