export class useMark {
  // Преобразует строку меток в массив, разделяя по ;
  static parse(marks: string): string[] {
    return marks
      .split(';')
      .map((mark) => mark.trim())
      .filter((mark) => mark.length > 0); // Обрезаем пробелы и исключаем пустые строки
  }

  // Преобразует массив меток в строку с разделителем ;
  static stringify(marks: string[]): string {
    return marks.reduce(
      (accum, value, index, items) => accum + value + (index < items.length - 1 ? ';' : ''),
      ''
    );
  }
}
