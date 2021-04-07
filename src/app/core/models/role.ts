export interface Role {
  id: number;
  name: string;
  privileges: Privilege[];
}

export interface Privilege {
  id: number;
  name: string;
}
