class Flarpinator {
  public bar(): string {
    return 'yes';
  }

  public baz(): string {
    return 'no';
  }

  public foo(): number {
    return 42;
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
