declare namespace API {
  type TAIResult = {
    move: {
      from: {
        row: number;
        col: number;
      };
      to: {
        row: number;
        col: number;
      };
    };
  };
}
