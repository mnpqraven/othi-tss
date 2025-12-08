import {
  type CnOptions,
  createTV,
  type TVConfig,
  cnMerge as tv_cn,
} from "tailwind-variants";

const conf: TVConfig = {
  twMerge: true,
};

export const tv = createTV(conf);

export const cn = <T extends CnOptions>(...classes: T) => tv_cn(classes)(conf);

export function prettyDate(unix: bigint) {
  return new Date(unix as unknown as number).toLocaleString();
}

export function prettyTime(unix: bigint | number) {
  return new Date(Number(unix)).toLocaleTimeString();
}

export function currency(amount: number): string {
  const numberFormat = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return numberFormat.format(amount);
}
