class Brojac {
  value: number;

  constructor(v: number) {
    this.value = v;
  }

  public static fromJSON(m: any) {
    return new Brojac(m.value);
  }

  public addOneAndReturn() {
    return this.value + 1;
  }

  public toJSON() {
    return { value: this.value };
  }
}

export default Brojac;
