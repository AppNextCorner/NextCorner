import userInterface from "./user.interface";

/**
 * Interface for reviews
 */
export interface reviewInterface {
  _id?: string;
  idOfItem: string;
  review: string;
  rating: number;
  user: userInterface;
  createdOn?: Date;
}
