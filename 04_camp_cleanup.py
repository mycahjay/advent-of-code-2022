def part_one():
  input = open('inputs/04', 'r')
  sum = 0
  for line in input:
    [elf1, elf2] = line.strip().split(',')
    [start1, end1] = map(lambda n: int(n), elf1.split('-'))
    [start2, end2] = map(lambda n: int(n), elf2.split('-'))
    if (
        (start1 <= start2 and end1 >= end2) or
        (start2 <= start1 and end2 >= end1)
        ):
      sum += 1
  return sum

def part_two():
  input = open('inputs/04', 'r')
  sum = 0
  for line in input:
    [elf1, elf2] = line.strip().split(',')
    [start1, end1] = map(lambda n: int(n), elf1.split('-'))
    [start2, end2] = map(lambda n: int(n), elf2.split('-'))
    if (
        (start1 <= start2 and end1 >= start2) or
        (start2 <= start1 and end2 >= start1)
        ):
      sum += 1
  return sum

print(part_one())
print(part_two())
