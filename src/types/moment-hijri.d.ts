import * as moment from "moment";

declare module "moment" {
  interface Moment {
    iYear(): number;
    iMonth(): number;
    iDate(): number;
    format(formatString: string): string;
    add(amount: number, unit: string): Moment;
    subtract(amount: number, unit: string): Moment;
  }
}

export = moment;
