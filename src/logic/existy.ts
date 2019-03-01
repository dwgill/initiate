function existy<X>(val: X): val is NonNullable<X> {
  return val != null;
}

export default existy;