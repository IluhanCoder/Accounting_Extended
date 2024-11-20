import { makeAutoObservable } from 'mobx';
import { ReactNode } from 'react';
import User from './user-types';

export default new class UserStore {
  user: User | null | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(newUser: User): void {
    this.user = newUser;
  }

  dropUser(): void {
    this.user = null;
  }

  isAdmin(): boolean {
    return this.user?.role === "admin";
  }

  isMain(): boolean {
    return this.user?.role === "main";
  }

  isJustUser(): boolean {
    return this.user?.role === "user"
  }

  isCurrentUser(user: User): boolean {
    return this.user?._id === user._id
  }
}